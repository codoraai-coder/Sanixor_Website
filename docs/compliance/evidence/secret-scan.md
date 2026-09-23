# Secret Scan

**Generated:** 2026-09-23T11:52:45.251Z
**Result:** `No findings`

## Scope

Scanned `src/`, `public/` and `docs/` in both repositories for 10 credential
patterns, plus a check that `.env`, `.dev.vars` and service-account files are
not tracked in git.

**Not** scanned: git history, binaries, `node_modules`, `package-lock.json`.
A clean result here means "nothing this scan looks for", not a guarantee.

## Findings

_No credential patterns matched in scanned source._

## Reviewed and suppressed

These matched a pattern but were reviewed and confirmed harmless. They are listed so the suppression is visible rather than silent.

- `src/services/google/google-auth.ts:58` — Private key block
  PEM header string literal inside pemToPkcs8(), the parser that strips those markers before base64-decoding a key. No key material is present. Reviewed 2026-09-23.

## Environment files

_No environment or service-account file is tracked in git._

## If a real secret is found

1. **Treat it as exposed.** Rotate it immediately — do not merely delete the line.
2. Remember it is in git history even after deletion.
3. Follow `incident-response-reference.md` §3.
4. For a Google service-account key specifically, Google may already have
   auto-revoked it; the symptom is a 503 on form submission.

## Cadence

Every release, and monthly. See `security-controls.md`.
