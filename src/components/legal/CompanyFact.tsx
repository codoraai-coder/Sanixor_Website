import {
  isNotRegistered,
  isUnconfirmed,
  resolveCompanyFact,
  unconfirmedLabel,
} from "@/config/company.config";

/**
 * Renders a company identity fact.
 *
 * Three states, deliberately distinguished:
 *   • confirmed      → the value
 *   • not registered → "Not registered" (a confirmed negative, e.g. a
 *                      proprietorship has no CIN, and the business is not
 *                      GST-registered)
 *   • unconfirmed    → a visible amber marker
 *
 * Publishing an invented registered address, GSTIN or grievance-officer name
 * would be considerably worse than publishing an obvious gap — a fabricated
 * legal identity is exactly the kind of claim a regulator or a customer is
 * entitled to rely on. So a gap renders as a marker that is impossible to
 * miss, and a confirmed negative renders as an honest "Not registered"
 * rather than being quietly hidden.
 */

export function UnconfirmedFact({ needs }: { needs: string }) {
  return (
    <span
      className="mx-0.5 inline-flex items-center rounded border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 align-baseline font-mono text-[0.72em] font-medium text-amber-600 dark:text-amber-400"
      title={`Pending confirmation: ${needs}`}
    >
      [ TO BE CONFIRMED — {needs} ]
    </span>
  );
}

export function NotRegisteredFact() {
  return <span className="text-muted-foreground">Not registered</span>;
}

/** Renders `COMPANY.<path>` in whichever of the three states applies. */
export function CompanyFact({ path }: { path: string }) {
  const value = resolveCompanyFact(path);
  if (value === undefined) return null;
  if (isNotRegistered(value)) return <NotRegisteredFact />;
  if (isUnconfirmed(value)) return <UnconfirmedFact needs={unconfirmedLabel(value)} />;
  return <>{value}</>;
}
