import { ApiError, type FieldError } from "./apiError";

/** Shape of a successful backend envelope. */
export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

/** Shape of an error backend envelope. */
export interface ApiErrorBody {
  success: false;
  message: string;
  errors: FieldError[];
  timestamp: string;
}

type ApiEnvelope<T> = ApiSuccess<T> | ApiErrorBody;

/**
 * Normalize a fetch Response into typed data or a thrown ApiError.
 *
 * Handles: non-JSON bodies, the backend's `{ success, message, errors }`
 * envelope, plain HTTP errors, and validation (400/422) with field errors.
 */
export async function handleResponse<T>(res: Response): Promise<T> {
  let body: ApiEnvelope<T> | null = null;

  try {
    const text = await res.text();
    body = text ? (JSON.parse(text) as ApiEnvelope<T>) : null;
  } catch {
    body = null;
  }

  if (res.ok && body && body.success) {
    return body.data;
  }

  // Error path — prefer the backend's message + field errors when present.
  const message = (body && "message" in body && body.message) || `Request failed (${res.status}).`;
  const fieldErrors: FieldError[] =
    body && "errors" in body && Array.isArray(body.errors) ? body.errors : [];

  const kind = res.status === 400 || res.status === 422 ? "validation" : "http";

  throw new ApiError(message, { kind, status: res.status, fieldErrors });
}
