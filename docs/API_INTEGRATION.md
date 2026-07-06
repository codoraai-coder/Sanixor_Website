# API Integration Guide

How the frontend talks to the Sanixor backend, and how to add a new integrated
form. The golden rule: **components manage UI only — never call `fetch`
directly.** All network access flows through the reusable API layer.

## Layers

```
Component  ─►  useFormSubmission (hook)  ─►  formService.*  ─►  apiClient  ─►  backend
   UI            loading / toast / errors     typed payloads     fetch wrapper
```

| File | Responsibility |
| ---- | -------------- |
| `config/api.config.ts` | `API_BASE_URL` (from `VITE_API_BASE_URL`), timeout, endpoint map |
| `services/api.ts` | Single fetch wrapper: base URL, JSON, timeout (AbortController), typed errors, auth-ready header hook |
| `services/form.service.ts` | One typed function per endpoint; payload types mirror backend Zod schemas |
| `utils/responseHandler.ts` | Parses `{ success, message, data, errors, timestamp }`; throws `ApiError` on failure |
| `utils/apiError.ts` | Typed `ApiError` with `kind`, `status`, and `fieldErrors` |
| `hooks/useFormSubmission.ts` | Loading state, success/error toasts, duplicate guard, field-error map |
| `components/ui/spinner.tsx` | Accessible loading spinner for buttons |

## Response envelope

**Success**
```json
{ "success": true, "message": "…", "data": { "persisted": true, "emailed": true }, "timestamp": "…" }
```
**Error**
```json
{ "success": false, "message": "…", "errors": [{ "field": "email", "message": "…" }], "timestamp": "…" }
```

`handleResponse` returns `data` on success and throws an `ApiError` (with
`fieldErrors`) otherwise. `useFormSubmission` turns that into a toast + a
`{ field: message }` map you can use for inline validation highlighting.

## Using the hook

```tsx
const { submit, isSubmitting, fieldErrors } = useFormSubmission({
  submit: formService.submitContact,
  successMessage: "Message sent — we'll reply within 24 hours.",
  onSuccess: () => resetForm(),          // reset / close modal
  // onError keeps values automatically; add inline handling if desired
});

await submit({ name, email, topic, message });
```

- `isSubmitting` → disable the button and show `<Spinner />`.
- `fieldErrors["email"]` → show an inline message under the email input.
- Values are **never** cleared on error, so users don't retype.

## Adding a new integrated form

1. **Endpoint** — add it to `API_ENDPOINTS` in `config/api.config.ts`.
2. **Payload type + service fn** — add a typed function to `form.service.ts`
   mirroring the backend schema.
3. **Wire the component** — use `useFormSubmission({ submit: formService.myForm })`;
   bind `isSubmitting` to the button and render `<Spinner />` while loading.
4. That's it — timeouts, JSON parsing, error toasts, and the duplicate guard are
   inherited.

## Configuration & environments

- Base URL comes from `VITE_API_BASE_URL` (see `.env.example`). Never hardcode
  production URLs in components.
- Requests time out after 15s (`API_TIMEOUT_MS`) and surface a friendly message.
- **Auth-ready:** when JWT lands, populate `authHeaders()` in `services/api.ts` —
  every request picks up the token automatically.
- **Versioning:** the backend also serves `/api/v1/*`; switching is a one-line
  change to the endpoint map.

## Manual test checklist

- [ ] Contact / Demo / Hiring / AgentVerse happy paths → success toast + reset/close
- [ ] Validation failure (e.g. bad email) → error toast, values kept
- [ ] Duplicate AgentVerse email → `409` message shown inline
- [ ] Offline / backend down → network error toast (no silent failure)
- [ ] Slow network → button stays disabled with spinner; timeout after 15s
- [ ] Mobile + desktop layouts unchanged
