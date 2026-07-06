import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@/utils/apiError";

export type SubmissionStatus = "idle" | "loading" | "success" | "error";

interface UseFormSubmissionOptions<TInput, TResult> {
  /** The async submit function (usually a `formService.*` call). */
  submit: (input: TInput) => Promise<TResult>;
  /** Toast shown on success. Set to `false` to suppress. */
  successMessage?: string | false;
  /** Called after a successful submit (reset form, close modal, …). */
  onSuccess?: (result: TResult, input: TInput) => void;
  /** Called after a failed submit (result kept — values are never cleared here). */
  onError?: (error: ApiError) => void;
}

interface UseFormSubmissionReturn<TInput, TResult> {
  submit: (input: TInput) => Promise<TResult | undefined>;
  status: SubmissionStatus;
  isSubmitting: boolean;
  error: ApiError | null;
  /** `{ field: message }` from backend validation, for inline highlighting. */
  fieldErrors: Record<string, string>;
  reset: () => void;
}

/**
 * Reusable form-submission hook — the single place all forms get:
 *   • loading state (disable button / show spinner),
 *   • duplicate-submission guard (ignores calls while in-flight),
 *   • success toast + `onSuccess` (reset form / close modal),
 *   • friendly error toast, typed error, and field-error map (values kept),
 *   • graceful network/timeout handling (never silently fails).
 *
 * Components stay UI-only; this owns the submission lifecycle.
 */
export function useFormSubmission<TInput, TResult>({
  submit: submitFn,
  successMessage = "Submitted successfully.",
  onSuccess,
  onError,
}: UseFormSubmissionOptions<TInput, TResult>): UseFormSubmissionReturn<TInput, TResult> {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState<ApiError | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const inFlight = useRef(false);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setFieldErrors({});
  }, []);

  const submit = useCallback(
    async (input: TInput): Promise<TResult | undefined> => {
      // Prevent duplicate submissions while a request is already in flight.
      if (inFlight.current) return undefined;
      inFlight.current = true;

      setStatus("loading");
      setError(null);
      setFieldErrors({});

      try {
        const result = await submitFn(input);
        setStatus("success");
        if (successMessage) toast.success(successMessage);
        onSuccess?.(result, input);
        return result;
      } catch (err) {
        const apiError =
          err instanceof ApiError
            ? err
            : new ApiError("Something went wrong. Please try again.");
        setStatus("error");
        setError(apiError);
        setFieldErrors(apiError.fieldErrorMap());
        toast.error(apiError.message);
        onError?.(apiError);
        return undefined;
      } finally {
        inFlight.current = false;
      }
    },
    [submitFn, successMessage, onSuccess, onError],
  );

  return {
    submit,
    status,
    isSubmitting: status === "loading",
    error,
    fieldErrors,
    reset,
  };
}
