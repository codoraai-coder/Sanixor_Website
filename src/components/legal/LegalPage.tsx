import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/sanixor/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  COMPANY,
  isNotRegistered,
  isUnconfirmed,
  resolveCompanyFact,
  unconfirmedLabel,
} from "@/config/company.config";
import { NotRegisteredFact, UnconfirmedFact } from "./CompanyFact";
import { formatPolicyDate, type PolicyMeta } from "@/config/policies.config";
import type { LegalBlock, LegalDocument } from "./legal-content";

/* ────────────────────────────────────────────────────────────────────────
   Safe inline markup
   ──────────────────────────────────────────────────────────────────────── */

const INLINE = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\{\{[a-zA-Z.]+\}\})/g;

/**
 * Parses the tiny inline subset into React elements. Nothing is ever passed
 * to dangerouslySetInnerHTML, so policy text cannot inject markup.
 */
function renderInline(text: string): ReactNode {
  const parts = text.split(INLINE).filter(Boolean);

  return parts.map((part, i) => {
    // {{company.path}}
    const fact = /^\{\{([a-zA-Z.]+)\}\}$/.exec(part);
    if (fact) {
      const value = resolveCompanyFact(fact[1]);
      if (value === undefined) return <Fragment key={i}>{part}</Fragment>;
      if (isNotRegistered(value)) return <NotRegisteredFact key={i} />;
      if (isUnconfirmed(value)) {
        return <UnconfirmedFact key={i} needs={unconfirmedLabel(value)} />;
      }
      return <Fragment key={i}>{value}</Fragment>;
    }

    // [label](url)
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      const isInternal = href.startsWith("/");
      return isInternal ? (
        <Link key={i} to={href} className="text-primary underline-offset-4 hover:underline">
          {label}
        </Link>
      ) : (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          {label}
        </a>
      );
    }

    // **bold**
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={i}>{bold[1]}</strong>;

    // `code`
    const code = /^`([^`]+)`$/.exec(part);
    if (code) {
      return (
        <code
          key={i}
          className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[0.85em]"
        >
          {code[1]}
        </code>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}

/* ────────────────────────────────────────────────────────────────────────
   Block renderer
   ──────────────────────────────────────────────────────────────────────── */

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="leading-relaxed text-foreground/85">{renderInline(block.text)}</p>;

    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-6 text-foreground/85">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-6 text-foreground/85">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );

    case "definitions":
      return (
        <dl className="space-y-3">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-foreground/[0.08] bg-foreground/[0.02] p-4"
            >
              <dt className="font-semibold text-foreground">{renderInline(item.term)}</dt>
              <dd className="mt-1 leading-relaxed text-foreground/80">{renderInline(item.text)}</dd>
            </div>
          ))}
        </dl>
      );

    case "note":
      return (
        <div className="rounded-lg border border-foreground/[0.08] bg-foreground/[0.03] p-4">
          <p className="mb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
            Note
          </p>
          <p className="leading-relaxed text-foreground/80">{renderInline(block.text)}</p>
        </div>
      );

    case "warning":
      return (
        <div className="rounded-lg border border-amber-500/25 bg-amber-500/[0.05] p-4">
          <p className="mb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400">
            Important
          </p>
          <p className="leading-relaxed text-foreground/85">{renderInline(block.text)}</p>
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border border-foreground/[0.08]">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            {block.caption && <caption className="sr-only">{block.caption}</caption>}
            <thead>
              <tr className="border-b border-foreground/[0.08] bg-foreground/[0.03]">
                {block.headers.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3 font-semibold text-foreground">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-foreground/[0.06] last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-3 align-top text-foreground/80">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

/* ────────────────────────────────────────────────────────────────────────
   Page shell
   ──────────────────────────────────────────────────────────────────────── */

interface LegalPageProps {
  meta: PolicyMeta;
  document: LegalDocument;
  /** Overrides the registry title, for event-scoped policies. */
  titleOverride?: string;
  /** Extra line under the title, e.g. the event name. */
  eyebrow?: string;
  /** Optional interactive block (e.g. a request form) rendered after the sections. */
  slot?: ReactNode;
  /** Heading for the slot. */
  slotHeading?: string;
}

export function LegalPage({
  meta,
  document,
  titleOverride,
  eyebrow,
  slot,
  slotHeading,
}: LegalPageProps) {
  const title = titleOverride ?? meta.title;

  usePageMeta(`${title} — ${COMPANY.brandName}`, meta.summary);

  return (
    <Layout>
      <article className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        {/* ── Header ── */}
        <header>
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{meta.summary}</p>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 rounded-lg border border-foreground/[0.08] bg-foreground/[0.02] p-4 font-mono text-xs">
            <div>
              <dt className="text-muted-foreground">Version</dt>
              <dd className="mt-1 font-medium text-foreground">{meta.version}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Effective</dt>
              <dd className="mt-1 font-medium text-foreground">
                {formatPolicyDate(meta.effectiveDate)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Last updated</dt>
              <dd className="mt-1 font-medium text-foreground">
                {formatPolicyDate(meta.lastUpdated)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Owner</dt>
              <dd className="mt-1 font-medium text-foreground">
                <a
                  href={`mailto:${COMPANY.contact.privacy}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {COMPANY.contact.privacy}
                </a>
              </dd>
            </div>
          </dl>
        </header>

        {/* ── Intro ── */}
        {document.intro && document.intro.length > 0 && (
          <div className="mt-10 space-y-4">
            {document.intro.map((text, i) => (
              <p key={i} className="leading-relaxed text-foreground/85">
                {renderInline(text)}
              </p>
            ))}
          </div>
        )}

        {/* ── Table of contents ── */}
        <nav aria-labelledby="toc-heading" className="mt-10">
          <h2
            id="toc-heading"
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            On this page
          </h2>
          <ol className="mt-4 space-y-2">
            {document.sections.map((section, i) => (
              <li key={section.id} className="text-sm">
                <a
                  href={`#${section.id}`}
                  className="text-foreground/75 underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  <span className="mr-2 font-mono text-xs text-muted-foreground">{i + 1}.</span>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Sections ── */}
        <div className="mt-14 space-y-12">
          {document.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-2xl font-semibold tracking-tight">
                <span className="mr-3 font-mono text-base text-muted-foreground">{i + 1}.</span>
                {section.heading}
              </h2>

              <div className="mt-4 space-y-4">
                {section.blocks.map((block, b) => (
                  <Block key={b} block={block} />
                ))}
              </div>

              {section.subsections?.map((sub, s) => (
                <div key={sub.id} id={sub.id} className="mt-8 scroll-mt-28">
                  <h3 className="text-lg font-semibold">
                    <span className="mr-2 font-mono text-sm text-muted-foreground">
                      {i + 1}.{s + 1}
                    </span>
                    {sub.heading}
                  </h3>
                  <div className="mt-3 space-y-4">
                    {sub.blocks.map((block, b) => (
                      <Block key={b} block={block} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>

        {/* ── Interactive slot (request forms) ── */}
        {slot && (
          <section id="submit" className="mt-16 scroll-mt-28">
            {slotHeading && (
              <h2 className="mb-6 text-2xl font-semibold tracking-tight">{slotHeading}</h2>
            )}
            {slot}
          </section>
        )}

        {/* ── Footer note ── */}
        <footer className="mt-16 border-t border-foreground/[0.08] pt-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Questions about this policy? Contact{" "}
            <a
              href={`mailto:${COMPANY.contact.privacy}`}
              className="text-primary underline-offset-4 hover:underline"
            >
              {COMPANY.contact.privacy}
            </a>
            . For a complaint, see{" "}
            <Link to="/grievance" className="text-primary underline-offset-4 hover:underline">
              Grievance Redressal
            </Link>
            .
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            {title} · v{meta.version} · effective {formatPolicyDate(meta.effectiveDate)}
          </p>
        </footer>
      </article>
    </Layout>
  );
}
