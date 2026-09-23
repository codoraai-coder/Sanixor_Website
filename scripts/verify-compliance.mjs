#!/usr/bin/env node
/**
 * Compliance verification — policy-to-code consistency checks.
 *
 * Run with:  node scripts/verify-compliance.mjs
 *
 * This is the automated half of the post-implementation audit. It fails the
 * build if a published policy claims something the code contradicts, or if a
 * policy exists but is unreachable.
 *
 * It deliberately checks CLAIMS AGAINST CODE rather than just "does the page
 * render" — a legal page that renders beautifully while describing a feature
 * that does not exist is the exact failure this whole exercise was meant to
 * fix.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

let failures = 0;
let warnings = 0;
const pass = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const fail = (m) => {
  console.log(`  \x1b[31m✗\x1b[0m ${m}`);
  failures++;
};
const warn = (m) => {
  console.log(`  \x1b[33m!\x1b[0m ${m}`);
  warnings++;
};
const section = (t) => console.log(`\n\x1b[1m${t}\x1b[0m`);

const main = read("src/main.tsx");
const policies = read("src/config/policies.config.ts");
const company = read("src/config/company.config.ts");
const footer = read("src/components/sanixor/Footer.tsx");

/* ── 1. Every registered policy has a reachable route ─────────────────── */
section("1. Policy routes are registered");

const routeIds = [...policies.matchAll(/route:\s*"(\/[a-z-]+)"/g)].map((m) => m[1]);
if (routeIds.length === 0) fail("no policy routes found in policies.config.ts");

for (const route of routeIds) {
  if (main.includes(`path="${route}"`)) pass(`${route} is routed`);
  else fail(`${route} is declared in the policy registry but NOT routed in main.tsx`);
}

/* ── 2. Event policy routes exist ─────────────────────────────────────── */
section("2. Event policy routes are registered");

for (const kind of ["terms", "code-of-conduct", "rules", "refund", "privacy"]) {
  const path = `/events/:eventSlug/${kind}`;
  if (main.includes(path)) pass(`${path} is routed`);
  else fail(`${path} is NOT routed`);
}

/* ── 3. Footer reaches every policy ───────────────────────────────────── */
section("3. Footer links to every policy");

for (const route of routeIds) {
  if (footer.includes(`href="${route}"`)) pass(`footer links to ${route}`);
  else fail(`footer does NOT link to ${route}`);
}

/* ── 4. No obsolete claims survive anywhere in the source ─────────────── */
section("4. No obsolete or false claims in source");

const srcFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(rel);
    else if (/\.(ts|tsx)$/.test(entry.name)) srcFiles.push(rel);
  }
})("src");

// Policy PROSE legitimately names LinkedIn and analytics vendors in order to
// DENY them ("we do not use LinkedIn sign-in", "no Google Analytics"). So the
// implementation scan must exclude policy content, and policy accuracy is
// checked separately against the specific affirmative claims that were false.
const implFiles = srcFiles.filter((f) => !f.startsWith("src/content/"));
const policyFiles = srcFiles.filter((f) => f.startsWith("src/content/"));

// (a) Implementation ground truth — is there actually any OAuth/auth code?
const AUTH_IMPL =
  /signInWithLinkedIn|linkedinOAuth|oauth2|openid-client|passport|useSession\(|getSession\(/i;
const authHits = implFiles.filter((f) => AUTH_IMPL.test(read(f)));
if (authHits.length === 0) {
  pass("no authentication/OAuth implementation exists (policies correctly say so)");
} else {
  warn(
    `auth/OAuth implementation found in ${authHits.join(", ")} — the privacy policy states none exists and must be updated`,
  );
}

// (b) Policy accuracy — the specific affirmative claims that were false.
const FALSE_CLAIMS = [
  {
    pattern: /Information Collected via LinkedIn/i,
    what: "'Information Collected via LinkedIn' section heading",
  },
  {
    pattern: /sign in using LinkedIn OAuth, we may collect/i,
    what: "affirmative LinkedIn OAuth collection claim",
  },
  {
    pattern: /account credentials when you register/i,
    what: "account-credentials claim (no accounts exist)",
  },
  {
    pattern: /authenticating you via LinkedIn Sign-In/i,
    what: "LinkedIn authentication purpose claim",
  },
];

for (const { pattern, what } of FALSE_CLAIMS) {
  const hits = policyFiles.filter((f) => pattern.test(read(f)));
  if (hits.length === 0) pass(`no ${what}`);
  else fail(`found ${what} in: ${hits.join(", ")}`);
}

// (c) The automatic-refund promise must not appear in any UI copy.
const refundHits = implFiles.filter((f) => /refunded automatically/i.test(read(f)));
if (refundHits.length === 0) pass("no automatic-refund promise in UI copy");
else fail(`automatic-refund promise still in: ${refundHits.join(", ")}`);

/* ── 5. Cookie policy matches actual storage usage ────────────────────── */
section("5. Cookie policy matches real storage");

const storageKeys = new Set();
for (const f of srcFiles) {
  for (const m of read(f).matchAll(/localStorage\.setItem\(\s*["'`]([^"'`]+)/g)) {
    storageKeys.add(m[1]);
  }
}
const cookiePolicy = read("src/content/legal/site-policies.ts");
for (const key of storageKeys) {
  if (cookiePolicy.includes(key)) pass(`cookie policy documents localStorage key "${key}"`);
  else fail(`localStorage key "${key}" is used but NOT documented in the cookie policy`);
}

// Any real cookie write must be disclosed.
const cookieWriters = srcFiles.filter(
  (f) => /document\.cookie\s*=/.test(read(f)) && !f.includes("ui/sidebar"),
);
if (cookieWriters.length === 0) {
  pass("no cookies are set (consistent with the cookie policy)");
} else {
  fail(`cookies are set in ${cookieWriters.join(", ")} but the policy says none are set`);
}

/* ── 6. Analytics claim holds ─────────────────────────────────────────── */
section("6. 'No tracking' claim holds");

const TRACKERS =
  /googletagmanager|google-analytics|gtag\(|mixpanel|posthog|hotjar|clarity\.ms|fbq\(/i;
const trackerHits = srcFiles
  .filter((f) => !f.startsWith("src/content/"))
  .filter((f) => TRACKERS.test(read(f)));
const indexHtml = read("index.html");
if (trackerHits.length === 0 && !TRACKERS.test(indexHtml)) {
  pass("no analytics or advertising tags present");
} else {
  fail(
    `tracking technology found (${[...trackerHits, TRACKERS.test(indexHtml) ? "index.html" : ""].filter(Boolean).join(", ")}) — the cookie and privacy policies claim there is none`,
  );
}

/* ── 7. Consent capture is wired end to end ───────────────────────────── */
section("7. Consent capture is wired");

const modal = read("src/components/sanixor/AgentVerseRegistrationModal.tsx");
if (modal.includes("acceptedTerms") && modal.includes("confirmedAge")) {
  pass("registration modal requires terms acceptance and age confirmation");
} else {
  fail("registration modal does NOT capture terms acceptance / age confirmation");
}
if (modal.includes("TERMS_VERSION") && modal.includes("PRIVACY_VERSION")) {
  pass("registration modal records policy versions");
} else {
  fail("registration modal does NOT record policy versions");
}

for (const [file, label] of [
  ["src/components/legal/FormPrivacyNotice.tsx", "privacy-notice component"],
  ["src/routes/contact.tsx", "contact form"],
  ["src/routes/hiring.tsx", "hiring form"],
  ["src/components/sanixor/BookDemoModal.tsx", "demo modal"],
]) {
  if (existsSync(join(root, file)) && read(file).includes("FormPrivacyNotice")) {
    pass(`${label} carries a collection notice`);
  } else {
    fail(`${label} is MISSING a collection notice`);
  }
}

/* ── 8. Reduced motion is genuinely implemented ───────────────────────── */
section("8. Accessibility claims hold");

if (read("src/styles.css").includes("prefers-reduced-motion")) {
  pass("reduced-motion CSS is present");
} else {
  fail("accessibility statement claims reduced-motion support, but no CSS implements it");
}
if (read("src/hooks/useSmoothScroll.ts").includes("prefers-reduced-motion")) {
  pass("smooth-scroll is gated on reduced-motion");
} else {
  fail("smooth-scroll is NOT gated on reduced-motion");
}

/* ── 7b. Every {{company.x}} placeholder resolves ─────────────────────── */
section("7b. Policy placeholders resolve against the company config");

// Guards against a policy referencing a config field that was renamed or
// removed, which would render the literal "{{operatingCity}}" to visitors.
const declaredPaths = new Set();
{
  const stack = [];
  for (const line of company.split(/\r?\n/)) {
    const open = /^\s{2,}(\w+):\s*\{\s*$/.exec(line);
    if (open) {
      stack.push(open[1]);
      continue;
    }
    if (/^\s{2,}\},?\s*$/.test(line)) {
      stack.pop();
      continue;
    }
    const leaf = /^\s{2,}(\w+):\s*(?:"|TODO\(|NOT_REGISTERED|`)/.exec(line);
    if (leaf) declaredPaths.add([...stack, leaf[1]].join("."));
  }
}

const usedPlaceholders = new Set();
for (const f of policyFiles) {
  for (const m of read(f).matchAll(/\{\{([a-zA-Z.]+)\}\}/g)) usedPlaceholders.add(m[1]);
}

let unresolved = 0;
for (const ph of usedPlaceholders) {
  if (!declaredPaths.has(ph)) {
    fail(`policy text uses {{${ph}}} but company.config.ts declares no such field`);
    unresolved++;
  }
}
if (unresolved === 0) {
  pass(`all ${usedPlaceholders.size} policy placeholders resolve`);
}

/* ── 8b. Published price matches what Razorpay is actually charged ────── */
section("8b. Published price matches the backend (price drift)");

const eventsCfg = read("src/config/events.config.ts");
const fePaise = [...eventsCfg.matchAll(/feePaise:\s*(\d+)/g)].map((m) => Number(m[1]));

// The backend is a sibling repo and may be absent in some checkouts.
const bePath = join(root, "..", "Sanixor_Website_backend", "src", "constants", "index.ts");
if (!existsSync(bePath)) {
  warn("backend repo not found alongside — price drift not checked this run");
} else {
  const be = readFileSync(bePath, "utf8");
  const bePaise = [...be.matchAll(/(?:student|professional):\s*(\d+)/g)].map((m) => Number(m[1]));

  if (bePaise.length === 0) {
    warn("could not read AGENTVERSE_PRICING from the backend constants");
  } else if (fePaise.length === 0) {
    fail("no feePaise found in events.config.ts");
  } else {
    const uniqueBe = [...new Set(bePaise)];
    const mismatched = fePaise.filter((p) => !uniqueBe.includes(p));
    if (mismatched.length === 0) {
      pass(
        `published price matches the backend charge (${uniqueBe.map((p) => `INR ${p / 100}`).join(", ")})`,
      );
    } else {
      fail(
        `PRICE DRIFT: events.config.ts publishes ${mismatched.join(", ")} paise but the backend charges ${uniqueBe.join(", ")} paise`,
      );
    }
  }
}

/* ── 9. Unconfirmed company facts (blocking) ──────────────────────────── */
section("9. Company identity facts");

const todos = [...company.matchAll(/(\w+):\s*TODO\("([^"]+)"\)/g)].map((m) => ({
  field: m[1],
  needs: m[2],
}));
if (todos.length === 0) {
  pass("all company identity facts are confirmed");
} else {
  for (const { field, needs } of todos) warn(`UNCONFIRMED: ${field} — needs ${needs}`);
  warn(
    `${todos.length} company fact(s) still render as "[ TO BE CONFIRMED ]" on the live site. These are P0 launch blockers for Razorpay and the E-Commerce Rules.`,
  );
}

/* ── 10. Consent management (Phase 2) ─────────────────────────────────── */
section("10. Consent management");

const consentCfg = read("src/config/consent.config.ts");
const consentLib = read("src/lib/consent.ts");
const provider = read("src/components/consent/ConsentProvider.tsx");
const banner = read("src/components/consent/ConsentBanner.tsx");
const prefs = read("src/components/consent/PreferenceCentre.tsx");

// Every real localStorage key must be declared in the technology registry.
for (const key of storageKeys) {
  if (consentCfg.includes(key)) pass(`technology registry declares "${key}"`);
  else fail(`localStorage key "${key}" is used but NOT in the technology registry`);
}
if (consentCfg.includes("sanixor_consent")) {
  pass('technology registry declares the consent record itself ("sanixor_consent")');
} else {
  fail("the consent record's own storage key is not declared in the registry");
}

// Optional technologies must default to denied.
if (
  /category === "necessary"\) return true;/.test(consentLib) &&
  /return record\.choices\[category\] === "granted";/.test(consentLib)
) {
  pass("optional categories default to DENIED until a choice is made");
} else {
  fail("consent default is not provably deny-by-default — check isAllowed()");
}

// Banner must offer a reject path with equal prominence.
if (banner.includes("rejectOptional") && banner.includes("acceptAll")) {
  pass("banner offers both Accept all and Reject optional");
} else {
  fail("banner does not offer a symmetric accept/reject choice");
}
if (banner.includes("openPreferences")) pass("banner offers Manage preferences");
else fail("banner has no Manage preferences route");

// No pre-ticked optional boxes.
if (/defaultChecked/.test(prefs)) {
  fail("preference centre uses defaultChecked — optional boxes must not be pre-ticked");
} else {
  pass("preference centre has no pre-ticked optional boxes");
}

// Withdrawal must actually purge, not merely stop future writes.
if (provider.includes("purgeCategory") && provider.includes("withdrawAll")) {
  pass("withdrawal purges the storage it governed");
} else {
  fail("withdrawal does not purge previously stored data");
}

// The gated writes must actually consult consent.
for (const [file, label] of [
  ["src/components/sanixor/ThemeProvider.tsx", "theme persistence"],
  ["src/components/sanixor/BookDemoModal.tsx", "demo-booked flag"],
]) {
  if (read(file).includes("useConsent")) pass(`${label} is gated on consent`);
  else fail(`${label} writes storage WITHOUT consulting consent`);
}

/* ── 11. Data lifecycle (Phase 2, backend) ────────────────────────────── */
section("11. Data lifecycle controls");

const bePath2 = join(root, "..", "Sanixor_Website_backend", "src");
if (!existsSync(bePath2)) {
  warn("backend repo not found alongside — lifecycle controls not checked this run");
} else {
  const beRead = (rel) => readFileSync(join(bePath2, rel), "utf8");

  const retention = beRead("services/retention.service.ts");
  if (/dryRun = true/.test(retention)) pass("retention job defaults to DRY-RUN");
  else fail("retention job does not default to dry-run — it could write unprompted");

  if (retention.includes("MAX_ROWS_PER_RUN")) pass("retention job has a blast-radius cap");
  else fail("retention job has no safety cap");

  if (/protectedColumns/.test(retention)) pass("retention job protects payment/consent columns");
  else fail("retention job does not protect payment/consent columns");

  const privacySvc = beRead("services/privacy.service.ts");
  if (!/deleteRow|removeRow|clearRow/.test(privacySvc)) {
    pass("DSR intake records requests only — it cannot delete data directly");
  } else {
    fail("DSR intake appears to mutate data directly from a public endpoint");
  }

  const loggerSrc = beRead("config/logger.ts");
  if (/\^e\?mail\$/.test(loggerSrc) && /\^phone\$/.test(loggerSrc)) {
    pass("logger redacts PII keys (email, phone) as well as secrets");
  } else {
    fail("logger does not redact PII keys");
  }
}

/* ── Summary ──────────────────────────────────────────────────────────── */
console.log(`\n${"─".repeat(64)}`);
if (failures === 0) {
  console.log(`\x1b[32mPASS\x1b[0m — 0 failures, ${warnings} warning(s)`);
  if (warnings > 0) {
    console.log("Warnings are blocking for publication but not for the build.");
  }
} else {
  console.log(`\x1b[31mFAIL\x1b[0m — ${failures} failure(s), ${warnings} warning(s)`);
}
process.exit(failures === 0 ? 0 : 1);
