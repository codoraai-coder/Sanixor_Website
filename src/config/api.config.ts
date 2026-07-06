/**
 * Centralized API configuration.
 *
 * The base URL is read from the environment (`VITE_API_BASE_URL`) so we never
 * hardcode production URLs in components. A sensible production default keeps
 * the app working even if the env var is missing at build time.
 */

const DEFAULT_BASE_URL = "https://api.sanixor.space";

/** Backend base URL (no trailing slash). */
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL
).replace(/\/+$/, "");

/** Default per-request timeout (ms). Forms shouldn't hang forever on slow nets. */
export const API_TIMEOUT_MS = 15_000;

/**
 * All backend endpoints in one place. Versioned under `/api` today; the backend
 * also exposes `/api/v1`, so bumping to a version prefix later is a one-line change.
 */
export const API_ENDPOINTS = {
  contact: "/api/contact",
  demo: "/api/demo",
  hiring: "/api/hiring",
  agentverse: "/api/agentverse",
  health: "/health",
} as const;
