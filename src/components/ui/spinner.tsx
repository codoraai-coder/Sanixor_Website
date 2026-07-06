import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  /** Visually-hidden label for screen readers. */
  label?: string;
}

/**
 * Reusable loading spinner. Announced to assistive tech via role="status".
 * Use inside buttons during submission or as a standalone loading indicator.
 */
export function Spinner({ className, label = "Loading" }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" className="inline-flex items-center">
      <Loader2 className={cn("h-4 w-4 animate-spin", className)} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
