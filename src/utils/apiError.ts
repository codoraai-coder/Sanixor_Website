/**
 * Frontend error model mirroring the backend's error envelope
 * `{ success: false, message, errors: [{ field, message }], timestamp }`.
 *
 * A single error type lets every form surface backend messages and highlight
 * field-level validation errors uniformly.
 */

export interface FieldError {
  field: string;
  message: string;
}

export type ApiErrorKind = "network" | "timeout" | "validation" | "http" | "unknown";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number;
  readonly fieldErrors: FieldError[];

  constructor(
    message: string,
    options: {
      kind?: ApiErrorKind;
      status?: number;
      fieldErrors?: FieldError[];
    } = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.kind = options.kind ?? "unknown";
    this.status = options.status ?? 0;
    this.fieldErrors = options.fieldErrors ?? [];
  }

  /** True when the backend returned field-level validation errors. */
  get isValidation(): boolean {
    return this.kind === "validation" || this.fieldErrors.length > 0;
  }

  /** Map field errors to a `{ field: message }` object for form binding. */
  fieldErrorMap(): Record<string, string> {
    return this.fieldErrors.reduce<Record<string, string>>((acc, e) => {
      if (e.field && !acc[e.field]) acc[e.field] = e.message;
      return acc;
    }, {});
  }

  static network(message = "Network error. Please check your connection and try again.") {
    return new ApiError(message, { kind: "network" });
  }

  static timeout(message = "The request timed out. Please try again.") {
    return new ApiError(message, { kind: "timeout" });
  }
}
