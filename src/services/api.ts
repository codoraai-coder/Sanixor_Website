import { API_BASE_URL, API_TIMEOUT_MS } from "@/config/api.config";
import { ApiError } from "@/utils/apiError";
import { handleResponse } from "@/utils/responseHandler";

/**
 * Single, reusable fetch wrapper for the whole app.
 *
 * Responsibilities:
 *   • prefix requests with the configured base URL,
 *   • serialise JSON bodies + set headers,
 *   • enforce a request timeout (AbortController),
 *   • translate network/timeout failures into typed ApiErrors,
 *   • parse the standard backend envelope via handleResponse.
 *
 * Components/hooks never call `fetch` directly — they go through here.
 */

export interface RequestOptions {
  /** Override the default timeout for this request. */
  timeoutMs?: number;
  /** Extra headers (e.g. a future Authorization token). */
  headers?: Record<string, string>;
  /** Caller-supplied abort signal, composed with the timeout signal. */
  signal?: AbortSignal;
}

/**
 * Placeholder for future auth. When JWT lands, read the token here (e.g. from an
 * auth store) and return the Authorization header — every request picks it up.
 */
function authHeaders(): Record<string, string> {
  return {};
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? API_TIMEOUT_MS);

  // Compose caller signal with our timeout signal.
  if (options.signal) {
    if (options.signal.aborted) controller.abort();
    else options.signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeaders(),
        ...options.headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    return await handleResponse<T>(res);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    // AbortError → timeout; everything else at this layer → network failure.
    if (err instanceof DOMException && err.name === "AbortError") {
      throw ApiError.timeout();
    }
    throw ApiError.network();
  } finally {
    clearTimeout(timeout);
  }
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
};
