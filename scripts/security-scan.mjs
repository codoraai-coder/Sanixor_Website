#!/usr/bin/env node
/**
 * Supply-chain and secret scanning.
 *
 * Run with:  npm run security:scan
 *
 * Produces three artefacts in `docs/compliance/evidence/`:
 *   • sbom.json                  — CycloneDX-style software bill of materials
 *   • dependency-audit.md        — npm audit results, both repos
 *   • secret-scan.md             — findings from a source scan for credentials
 *
 * ── WHAT THIS IS AND IS NOT ────────────────────────────────────────────
 * This is a cheap, dependency-free first pass, not a replacement for a
 * proper scanner. It catches the things that actually bite small projects:
 * a key pasted into source, a `.env` that stopped being gitignored, a
 * dependency with a known critical advisory.
 *
 * It does NOT do entropy analysis, git-history scanning, or binary
 * inspection. Where it finds nothing, that means "nothing this scan looks
 * for", and the report says so rather than implying a clean bill of health.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const FE = join(here, "..");
const BE = join(FE, "..", "Sanixor_Website_backend");
const OUT = join(FE, "docs", "compliance", "evidence");
mkdirSync(OUT, { recursive: true });

const now = new Date().toISOString();

/* ── 1. SBOM ─────────────────────────────────────────────────────────── */

function componentsFor(repoDir, repoName) {
  const pkgPath = join(repoDir, "package.json");
  if (!existsSync(pkgPath)) return [];
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

  const collect = (deps, scope) =>
    Object.entries(deps ?? {}).map(([name, range]) => ({
      type: "library",
      name,
      version: String(range).replace(/^[\^~]/, ""),
      scope,
      repository: repoName,
      purl: `pkg:npm/${name.replace("@", "%40")}@${String(range).replace(/^[\^~]/, "")}`,
    }));

  return [...collect(pkg.dependencies, "required"), ...collect(pkg.devDependencies, "optional")];
}

const components = [
  ...componentsFor(FE, "Sanixor_Website"),
  ...componentsFor(BE, "Sanixor_Website_backend"),
];

const sbom = {
  bomFormat: "CycloneDX",
  specVersion: "1.5",
  version: 1,
  metadata: {
    timestamp: now,
    component: { type: "application", name: "Sanixor AI", version: "1.0.0" },
    note: "Generated from package.json declared ranges. Resolved transitive versions are in package-lock.json.",
  },
  components,
};

writeFileSync(join(OUT, "sbom.json"), JSON.stringify(sbom, null, 2), "utf8");

/* ── 2. Dependency audit ─────────────────────────────────────────────── */

function audit(dir, label) {
  try {
    const raw = execSync("npm audit --json", {
      cwd: dir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return { label, data: JSON.parse(raw) };
  } catch (err) {
    // npm audit exits non-zero when vulnerabilities exist — the JSON is
    // still on stdout, so parse it rather than treating this as a failure.
    try {
      return { label, data: JSON.parse(err.stdout ?? "{}") };
    } catch {
      return { label, data: null, error: err.message?.slice(0, 200) };
    }
  }
}

const audits = [audit(FE, "Sanixor_Website"), audit(BE, "Sanixor_Website_backend")];

/**
 * Separate advisories that can reach production from those that cannot.
 *
 * An undifferentiated "5 high" is close to useless: a high advisory in the
 * deploy CLI and a high advisory in a runtime dependency are entirely
 * different risks. This classifies each advisory by whether the DIRECT
 * package it enters through is a production dependency or dev tooling.
 *
 * It is a heuristic, not reachability analysis — but it is the distinction
 * that actually drives the decision.
 */
function productionImpact(repoDir, auditData) {
  const pkg = JSON.parse(readFileSync(join(repoDir, "package.json"), "utf8"));
  const prod = new Set(Object.keys(pkg.dependencies ?? {}));
  const dev = new Set(Object.keys(pkg.devDependencies ?? {}));

  const vulns = Object.values(auditData?.vulnerabilities ?? {});
  const serious = vulns.filter((v) => ["critical", "high"].includes(v.severity));

  const inProduction = [];
  const inTooling = [];
  const unclassified = [];

  for (const v of serious) {
    if (prod.has(v.name)) inProduction.push(v);
    else if (dev.has(v.name)) inTooling.push(v);
    else if (v.isDirect) unclassified.push(v);
    else {
      // Transitive: attribute it to whichever direct dependency pulls it in.
      const viaNames = (v.effects ?? []).concat(v.nodes ?? []);
      const touchesProd = viaNames.some((n) => [...prod].some((d) => String(n).includes(d)));
      (touchesProd ? inProduction : inTooling).push(v);
    }
  }

  return { inProduction, inTooling, unclassified, prodDeps: [...prod] };
}

const impacts = audits.map(({ label, data }, i) => ({
  label,
  ...productionImpact(i === 0 ? FE : BE, data),
}));

const prodSerious = impacts.reduce((n, i) => n + i.inProduction.length, 0);

const auditRows = audits.map(({ label, data, error }) => {
  if (!data || error) return `| ${label} | _audit failed_ | ${error ?? "no data"} |`;
  const v = data.metadata?.vulnerabilities ?? {};
  const total = Object.values(v).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);
  return `| ${label} | ${total} | critical ${v.critical ?? 0} · high ${v.high ?? 0} · moderate ${v.moderate ?? 0} · low ${v.low ?? 0} |`;
});

const totalCritical = audits.reduce(
  (n, { data }) => n + (data?.metadata?.vulnerabilities?.critical ?? 0),
  0,
);
const totalHigh = audits.reduce(
  (n, { data }) => n + (data?.metadata?.vulnerabilities?.high ?? 0),
  0,
);

writeFileSync(
  join(OUT, "dependency-audit.md"),
  `# Dependency Audit

**Generated:** ${now}
**Result:** ${totalCritical > 0 ? "`CRITICAL ADVISORIES PRESENT`" : totalHigh > 0 ? "`HIGH ADVISORIES PRESENT`" : "`No critical or high advisories`"}

| Repository | Total advisories | Breakdown |
|---|---:|---|
${auditRows.join("\n")}

## Production impact

| Repository | Reaching production | Dev/tooling only | Production dependencies |
|---|---:|---:|---|
${impacts.map((i) => `| ${i.label} | **${i.inProduction.length}** | ${i.inTooling.length} | ${i.prodDeps.join(", ") || "—"} |`).join("\n")}

${
  prodSerious === 0
    ? "> **No critical or high advisory affects a package that reaches production.** The remaining advisories are in build and deploy tooling, which runs on a developer machine and in CI but is never part of the deployed Worker or the browser bundle. They should still be cleared on a schedule — a compromised build tool can inject into the output — but they are not a live exposure."
    : `> **${prodSerious} critical/high advisor${prodSerious === 1 ? "y" : "ies"} affect production dependencies.** These are the ones to fix first:
>
${impacts
  .flatMap((i) => i.inProduction.map((v) => `> - \`${i.label}\` → **${v.name}** [${v.severity}]`))
  .join("\n")}`
}

${
  impacts.some((i) => i.inTooling.length > 0)
    ? `### Tooling-only advisories

${impacts
  .flatMap((i) => i.inTooling.map((v) => `- \`${i.label}\` → ${v.name} [${v.severity}]`))
  .join("\n")}`
    : ""
}

## How to read this

\`npm audit\` reports advisories against the **resolved dependency tree**, which
includes transitive packages a build tool pulls in. A high count is common in
a Vite/React project and does not by itself mean the deployed site is
exploitable — many advisories affect dev-only tooling that never ships.

**What matters:**

1. Any **critical** or **high** advisory in a \`required\` (production)
   dependency. Fix or replace these.
2. Advisories in dev dependencies are lower priority but should still be
   cleared on a schedule, because a compromised build tool can inject into
   the bundle.

Run \`npm audit\` in each repository for the detail, and \`npm audit fix\` for
the ones that resolve without a breaking change.

## Cadence

Monthly, and before any release. See \`security-controls.md\`.
`,
  "utf8",
);

/* ── 3. Secret scan ──────────────────────────────────────────────────── */

const SECRET_PATTERNS = [
  { name: "Private key block", re: /-----BEGIN (RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/ },
  { name: "Google service-account JSON", re: /"type"\s*:\s*"service_account"/ },
  { name: "Razorpay live key", re: /\brzp_live_[A-Za-z0-9]{10,}/ },
  { name: "Razorpay test key", re: /\brzp_test_[A-Za-z0-9]{10,}/ },
  { name: "Resend API key", re: /\bre_[A-Za-z0-9]{20,}/ },
  { name: "AWS access key id", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: "Slack token", re: /\bxox[baprs]-[A-Za-z0-9-]{10,}/ },
  {
    name: "Generic bearer secret",
    re: /(?:api[_-]?key|secret|password)\s*[:=]\s*["'][A-Za-z0-9_\-]{24,}["']/i,
  },
  { name: "PAN (Indian tax id)", re: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/ },
  { name: "IFSC code", re: /\b[A-Z]{4}0[A-Z0-9]{6}\b/ },
];

/**
 * Matches that have been reviewed by a human and confirmed harmless.
 *
 * Narrow by design: file AND pattern must both match. A blanket "ignore
 * this rule" would defeat the scan; suppressing one reviewed line does not.
 * Every entry records WHO decided and WHY, so a future reader can re-check
 * rather than trusting the suppression.
 */
const REVIEWED_FALSE_POSITIVES = [
  {
    file: "src/services/google/google-auth.ts",
    pattern: "Private key block",
    reason:
      "PEM header string literal inside pemToPkcs8(), the parser that strips those markers before base64-decoding a key. No key material is present. Reviewed 2026-09-23.",
  },
];

function isReviewedFalsePositive(file, pattern) {
  return REVIEWED_FALSE_POSITIVES.some((f) => file.endsWith(f.file) && f.pattern === pattern);
}

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", ".wrangler", "evidence", "coverage"]);
const SCAN_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|json|md|css|html|yml|yaml|jsonc|txt)$/;

const findings = [];
const suppressed = [];

function scanDir(dir, repoLabel, repoRoot) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full, repoLabel, repoRoot);
      continue;
    }
    if (!SCAN_EXT.test(entry.name)) continue;
    if (entry.name === "package-lock.json") continue;

    let content;
    try {
      content = readFileSync(full, "utf8");
    } catch {
      continue;
    }

    for (const { name, re } of SECRET_PATTERNS) {
      const m = re.exec(content);
      if (!m) continue;
      const line = content.slice(0, m.index).split("\n").length;
      const rel = relative(repoRoot, full).split("\\").join("/");
      const entry = { repo: repoLabel, file: rel, line, pattern: name };

      // A reviewed match is recorded separately, not dropped — a silent
      // suppression is not evidence of anything.
      if (isReviewedFalsePositive(rel, name)) suppressed.push(entry);
      else findings.push(entry);
    }
  }
}

scanDir(join(FE, "src"), "Sanixor_Website", FE);
scanDir(join(FE, "public"), "Sanixor_Website", FE);
scanDir(join(FE, "docs"), "Sanixor_Website", FE);
scanDir(join(BE, "src"), "Sanixor_Website_backend", BE);

// A tracked env file is its own finding, separate from content matching.
const envLeaks = [];
for (const [root, label] of [
  [FE, "Sanixor_Website"],
  [BE, "Sanixor_Website_backend"],
]) {
  for (const f of [".env", ".dev.vars", "service-account.json"]) {
    if (!existsSync(join(root, f))) continue;
    try {
      const tracked = execSync(`git ls-files --error-unmatch "${f}"`, {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (tracked) envLeaks.push(`${label}/${f} is **TRACKED IN GIT**`);
    } catch {
      // Not tracked — which is the correct state.
    }
  }
}

const clean = findings.length === 0 && envLeaks.length === 0;

writeFileSync(
  join(OUT, "secret-scan.md"),
  `# Secret Scan

**Generated:** ${now}
**Result:** ${clean ? "`No findings`" : "`FINDINGS — REVIEW REQUIRED`"}

## Scope

Scanned \`src/\`, \`public/\` and \`docs/\` in both repositories for ${SECRET_PATTERNS.length} credential
patterns, plus a check that \`.env\`, \`.dev.vars\` and service-account files are
not tracked in git.

**Not** scanned: git history, binaries, \`node_modules\`, \`package-lock.json\`.
A clean result here means "nothing this scan looks for", not a guarantee.

## Findings

${
  findings.length === 0
    ? "_No credential patterns matched in scanned source._"
    : `| Repository | File | Line | Pattern |\n|---|---|---:|---|\n${findings
        .map((f) => `| ${f.repo} | \`${f.file}\` | ${f.line} | ${f.pattern} |`)
        .join(
          "\n",
        )}\n\n> Review each. A match may be a false positive (an example value, a regex, or documentation), but every one must be looked at.`
}

## Reviewed and suppressed

${
  suppressed.length === 0
    ? "_None._"
    : `These matched a pattern but were reviewed and confirmed harmless. They are listed so the suppression is visible rather than silent.

${suppressed
  .map((f) => {
    const note = REVIEWED_FALSE_POSITIVES.find(
      (x) => f.file.endsWith(x.file) && x.pattern === f.pattern,
    );
    return `- \`${f.file}:${f.line}\` — ${f.pattern}
  ${note?.reason ?? ""}`;
  })
  .join("\n")}`
}

## Environment files

${
  envLeaks.length === 0
    ? "_No environment or service-account file is tracked in git._"
    : envLeaks.map((e) => `- ⚠ ${e}`).join("\n")
}

## If a real secret is found

1. **Treat it as exposed.** Rotate it immediately — do not merely delete the line.
2. Remember it is in git history even after deletion.
3. Follow \`incident-response-reference.md\` §3.
4. For a Google service-account key specifically, Google may already have
   auto-revoked it; the symptom is a 503 on form submission.

## Cadence

Every release, and monthly. See \`security-controls.md\`.
`,
  "utf8",
);

/* ── Summary ─────────────────────────────────────────────────────────── */

console.log("\nSecurity scan complete.");
console.log(`  SBOM components:     ${components.length}`);
console.log(`  Critical advisories: ${totalCritical}`);
console.log(`  High advisories:     ${totalHigh}`);
console.log(`  Secret findings:     ${findings.length}`);
console.log(`  Tracked env files:   ${envLeaks.length}`);
console.log(`\n  Evidence written to ${OUT}\n`);

// Only a tracked secret file or a real credential match should fail the run.
// Dependency advisories are reported, not gated: failing a build on a
// transitive dev-only advisory teaches people to ignore the check.
process.exit(clean ? 0 : 1);
