import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CONSENT_CATEGORIES,
  UNGATEABLE_TECHNOLOGY_IDS,
  technologiesIn,
  type ConsentCategory,
} from "@/config/consent.config";
import { useConsent } from "@/hooks/useConsent";
import type { ConsentStatus } from "@/lib/consent";

/**
 * Preference centre — per-category control, reachable at any time from the
 * footer and from the Cookie Policy.
 *
 * Optional categories start UNCHECKED for anyone who has not decided.
 * Pre-ticking an optional box is the single most common consent dark
 * pattern, so the default state here is the privacy-protective one.
 *
 * A category with no technologies registered against it is not shown at all:
 * offering an "Analytics" switch while running no analytics would be a
 * fabricated choice.
 */
export function PreferenceCentre() {
  const { record, preferencesOpen, closePreferences, savePreferences, withdrawAll } = useConsent();

  const visibleCategories = useMemo(
    () => CONSENT_CATEGORIES.filter((c) => technologiesIn(c.id).length > 0),
    [],
  );

  const [draft, setDraft] = useState<Partial<Record<ConsentCategory, ConsentStatus>>>({});

  // Re-seed the draft each time the panel opens, from the stored record.
  useEffect(() => {
    if (!preferencesOpen) return;
    const seeded: Partial<Record<ConsentCategory, ConsentStatus>> = {};
    for (const c of visibleCategories) {
      if (!c.optional) continue;
      seeded[c.id] = record?.choices[c.id] === "granted" ? "granted" : "denied";
    }
    setDraft(seeded);
  }, [preferencesOpen, record, visibleCategories]);

  // Escape closes, as for any modal.
  useEffect(() => {
    if (!preferencesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preferencesOpen, closePreferences]);

  if (!preferencesOpen) return null;

  const toggle = (id: ConsentCategory) =>
    setDraft((d) => ({ ...d, [id]: d[id] === "granted" ? "denied" : "granted" }));

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={closePreferences}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="prefs-heading"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-foreground/[0.12] bg-background p-6 shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="prefs-heading" className="text-xl font-semibold tracking-tight">
          Storage preferences
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This site sets no cookies and runs no analytics or advertising. The only choices below are
          the ones that genuinely exist. Full detail is in the{" "}
          <Link to="/cookie-policy" className="text-primary underline-offset-4 hover:underline">
            Cookie Policy
          </Link>
          .
        </p>

        <div className="mt-6 space-y-4">
          {visibleCategories.map((category) => {
            const items = technologiesIn(category.id);
            const gateable = items.some((t) => !UNGATEABLE_TECHNOLOGY_IDS.includes(t.id));
            const checked = !category.optional || draft[category.id] === "granted";

            return (
              <section
                key={category.id}
                className="rounded-xl border border-foreground/[0.08] bg-foreground/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{category.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  {category.optional && gateable ? (
                    <label className="flex shrink-0 cursor-pointer items-center gap-2">
                      <span className="sr-only">Allow {category.label}</span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(category.id)}
                        className="h-5 w-5 cursor-pointer accent-[var(--primary)]"
                      />
                    </label>
                  ) : (
                    <span className="shrink-0 rounded border border-foreground/15 px-2 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                      {category.optional ? "Always loads" : "Required"}
                    </span>
                  )}
                </div>

                <ul className="mt-3 space-y-2 border-t border-foreground/[0.06] pt-3">
                  {items.map((t) => (
                    <li key={t.id} className="text-xs leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground/80">{t.name}</span>
                      {" — "}
                      {t.purpose}
                      <br />
                      <span className="font-mono text-[0.7rem]">
                        {t.identifier} · {t.mechanism} · {t.duration} ·{" "}
                        {t.firstParty ? "first party" : t.provider}
                      </span>
                      {UNGATEABLE_TECHNOLOGY_IDS.includes(t.id) && (
                        <span className="mt-1 block text-[0.7rem] text-amber-600 dark:text-amber-400">
                          Loaded by the browser before any script runs, so it cannot be switched off
                          here. We are working to serve this from our own domain, which removes the
                          third party entirely.
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => {
              savePreferences(draft);
              closePreferences();
            }}
            className="rounded-lg border border-foreground/20 bg-foreground/[0.06] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={() => {
              withdrawAll();
              closePreferences();
            }}
            className="rounded-lg border border-foreground/20 bg-foreground/[0.06] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Withdraw and clear
          </button>
          <button
            type="button"
            onClick={closePreferences}
            className="rounded-lg px-5 py-2.5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:ml-auto"
          >
            Cancel
          </button>
        </div>

        {record && (
          <p className="mt-4 font-mono text-[0.7rem] text-muted-foreground">
            Recorded {new Date(record.timestamp).toLocaleString("en-IN")} · consent model v
            {record.consentVersion} · id {record.consentId}
          </p>
        )}
      </div>
    </div>
  );
}
