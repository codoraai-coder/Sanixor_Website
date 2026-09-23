import { useContext } from "react";
import { ConsentContext } from "@/components/consent/ConsentProvider";

/**
 * Access consent state.
 *
 * Throws outside the provider rather than returning a permissive default:
 * a silent "allowed" fallback would mean optional storage quietly working
 * wherever someone forgot to mount the provider, which is exactly the bug
 * this system exists to prevent.
 */
export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used inside <ConsentProvider>.");
  }
  return ctx;
}
