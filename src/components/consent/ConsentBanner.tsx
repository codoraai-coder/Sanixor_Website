import { Link } from "react-router-dom";
import { CONSENT_NOTICE_TEXT } from "@/config/consent.config";
import { useConsent } from "@/hooks/useConsent";

/**
 * Consent banner.
 *
 * ── NO DARK PATTERNS ───────────────────────────────────────────────────
 * "Reject optional" carries exactly the same visual weight as "Accept all":
 * same size, same border, same contrast. Neither is styled to look like the
 * safe or obvious choice. There is no pre-ticked box anywhere, and the
 * banner cannot be dismissed without making a decision — closing it by
 * clicking away would have to be interpreted as something, and interpreting
 * silence as consent is precisely what the rules forbid.
 *
 * It appears only when there is a real choice to make: if the technology
 * registry contains no gateable optional entries, `needsChoice` is false and
 * nothing renders. We do not display a banner for the sake of appearing to
 * have one.
 */
export function ConsentBanner() {
  const { needsChoice, acceptAll, rejectOptional, openPreferences } = useConsent();

  if (!needsChoice) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-heading"
      aria-describedby="consent-body"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-foreground/[0.12] bg-background/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
        <h2 id="consent-heading" className="text-base font-semibold text-foreground">
          Your choice about browser storage
        </h2>

        <p id="consent-body" className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {CONSENT_NOTICE_TEXT}
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* Equal weight, deliberately. Neither button is the "designed" one. */}
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-lg border border-foreground/20 bg-foreground/[0.06] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={rejectOptional}
            className="rounded-lg border border-foreground/20 bg-foreground/[0.06] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={openPreferences}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Manage preferences
          </button>

          <Link
            to="/cookie-policy"
            className="text-sm text-primary underline-offset-4 hover:underline sm:ml-auto"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
