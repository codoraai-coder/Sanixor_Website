import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ConsentCategory } from "@/config/consent.config";
import {
  allChoices,
  buildConsentRecord,
  isAllowed,
  needsDecision,
  readConsent,
  writeConsent,
  type ConsentRecord,
  type ConsentStatus,
} from "@/lib/consent";

/**
 * Consent state for the whole app.
 *
 * Anything that writes optional browser storage or loads optional
 * third-party content must ask `allows(category)` first and respect a
 * `false` answer. Optional technologies default to DENIED until a choice is
 * made, so nothing loads ahead of consent.
 */

interface ConsentContextValue {
  record: ConsentRecord | null;
  /** True while a decision is still outstanding — the banner is showing. */
  needsChoice: boolean;
  allows: (category: ConsentCategory) => boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (
    choices: Partial<Record<ConsentCategory, ConsentStatus>>,
    source?: ConsentRecord["source"],
  ) => void;
  /** Withdraw consent entirely and clear the storage it governed. */
  withdrawAll: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  preferencesOpen: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * Storage keys governed by each optional category. When consent is denied or
 * withdrawn, these are actively removed — withdrawal that leaves the data in
 * place is not withdrawal.
 */
const CATEGORY_STORAGE_KEYS: Partial<Record<ConsentCategory, string[]>> = {
  functional: ["sanixor-theme", "sanixor_demo_booked"],
};

function purgeCategory(category: ConsentCategory): void {
  for (const key of CATEGORY_STORAGE_KEYS[category] ?? []) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* storage blocked — nothing to purge */
    }
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // Read once on mount. Until then `needsChoice` stays false so the banner
  // does not flash for someone who already decided.
  useEffect(() => {
    setRecord(readConsent());
    setHydrated(true);
  }, []);

  const commit = useCallback(
    (choices: Partial<Record<ConsentCategory, ConsentStatus>>, source: ConsentRecord["source"]) => {
      const next = buildConsentRecord(choices, source);
      writeConsent(next);
      setRecord(next);

      // Enforce the decision immediately rather than waiting for a reload.
      for (const [category, status] of Object.entries(choices)) {
        if (status === "denied") purgeCategory(category as ConsentCategory);
      }
    },
    [],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      record,
      needsChoice: hydrated && needsDecision(record),
      allows: (category) => isAllowed(record, category),
      acceptAll: () => commit(allChoices("granted"), "banner"),
      rejectOptional: () => commit(allChoices("denied"), "banner"),
      savePreferences: (choices, source = "preference-centre") => commit(choices, source),
      withdrawAll: () => {
        for (const category of Object.keys(CATEGORY_STORAGE_KEYS) as ConsentCategory[]) {
          purgeCategory(category);
        }
        commit(allChoices("denied"), "preference-centre");
      },
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      preferencesOpen,
    }),
    [record, hydrated, preferencesOpen, commit],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
