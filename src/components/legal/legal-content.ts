/**
 * Content model for legal pages.
 *
 * Policy text is authored as structured data rather than hand-written JSX so
 * that every page gets the same chrome, table of contents, anchor links and
 * version block for free, and so the text can be diffed cleanly when a
 * policy is revised.
 *
 * Inline markup inside `text` values supports a deliberately tiny subset,
 * parsed into React elements by `renderInline` — never injected as HTML:
 *   [label](https://url)   → link
 *   **bold**               → <strong>
 *   `code`                 → <code>
 *   {{company.field}}      → a value from company.config, or a visible
 *                            "[ TO BE CONFIRMED ]" marker if unconfirmed
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  | { type: "note"; text: string }
  | { type: "warning"; text: string }
  | { type: "definitions"; items: { term: string; text: string }[] };

export interface LegalSection {
  /** URL anchor, e.g. "what-we-collect". Must be unique within a page. */
  id: string;
  heading: string;
  blocks: LegalBlock[];
  /** Nested sub-sections, rendered one heading level down. */
  subsections?: { id: string; heading: string; blocks: LegalBlock[] }[];
}

export interface LegalDocument {
  sections: LegalSection[];
  /** Optional lead paragraph shown above the table of contents. */
  intro?: string[];
}
