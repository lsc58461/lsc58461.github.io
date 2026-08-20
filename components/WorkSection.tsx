"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project, Category } from "@/lib/types";
import { CATEGORY_LABEL, CATEGORY_ORDER } from "@/lib/types";

const ORDER: (Category | "all")[] = ["all", ...CATEGORY_ORDER];
const LABEL: Record<string, string> = { all: "전체", ...CATEGORY_LABEL };

function FeaturedCard({ p, i }: { p: Project; i: number }) {
  return (
    <Link href={`/projects/${p.slug}`} className="rise block group" style={{ animationDelay: `${i * 70}ms` }}>
      <article className="card h-full p-7 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
            {p.categories.map((c, ci) => (
              <span key={c} className="eyebrow" style={{ color: "var(--accent-dim)" }}>
                {ci > 0 && <span style={{ opacity: 0.4, marginRight: 8 }}>/</span>}
                {CATEGORY_LABEL[c]}
              </span>
            ))}
          </div>
          <span className="mono text-[11px] shrink-0" style={{ color: "var(--fg-faint)" }}>
            {p.year}
          </span>
        </div>

        <h3 className="text-[19px] font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>
          {p.title}
        </h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-dim)" }}>
          {p.tagline}
        </p>

        <ul className="flex flex-col gap-2.5 mb-7">
          {p.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex gap-2.5 text-[13px] leading-[1.65]" style={{ color: "var(--fg-dim)" }}>
              <span
                aria-hidden
                className="shrink-0"
                style={{
                  width: 4, height: 4, borderRadius: 99,
                  background: "var(--accent-dim)", marginTop: 8,
                }}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5 border-t" style={{ borderColor: "var(--border-soft)" }}>
          <div className="mono text-[11px] truncate" style={{ color: "var(--fg-faint)" }}>
            {p.stack.slice(0, 3).join(" · ")}
          </div>
          <span
            className="text-[13px] shrink-0 transition-transform group-hover:translate-x-0.5"
            style={{ color: "var(--accent)" }}
          >
            자세히 →
          </span>
        </div>
      </article>
    </Link>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group block rise" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
      <div
        className="py-5 px-1 border-b flex items-start gap-4 sm:gap-5 transition-colors"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <span className="mono text-[11px] w-7 sm:w-9 shrink-0 pt-0.5" style={{ color: "var(--fg-faint)" }}>
          {String(i + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <h4
            className="text-[15px] font-medium transition-colors group-hover:text-[var(--accent)]"
            style={{ color: "var(--fg)" }}
          >
            {p.title}
          </h4>
          <p className="text-[13px] mt-1 leading-snug" style={{ color: "var(--fg-dim)" }}>
            {p.tagline}
          </p>
          <div className="mono text-[11px] mt-2 truncate" style={{ color: "var(--fg-faint)" }}>
            {p.stack.slice(0, 4).join(" · ")}
          </div>
          <div className="mono text-[10.5px] mt-2 sm:hidden" style={{ color: "var(--fg-faint)" }}>
            {p.categories.map((c) => CATEGORY_LABEL[c]).join(" · ")} · {p.year}
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0 pt-0.5">
          <span className="text-[11px] text-right" style={{ color: "var(--fg-faint)" }}>
            {p.categories.map((c) => CATEGORY_LABEL[c]).join(" · ")}
          </span>
          <span className="mono text-[11px] shrink-0" style={{ color: "var(--fg-faint)" }}>
            {p.year}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WorkSection({ featured, rest }: { featured: Project[]; rest: Project[] }) {
  const [active, setActive] = useState<Category | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rest.length };
    for (const p of rest) {
      for (const cat of p.categories) c[cat] = (c[cat] ?? 0) + 1;
    }
    return c;
  }, [rest]);

  const shown =
    active === "all" ? rest : rest.filter((p) => p.categories.includes(active));

  return (
    <section id="work" className="container-x scroll-mt-16 pb-4">
      {/* featured */}
      <div className="section-title mb-9">대표 작업</div>
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.slug} p={p} i={i} />
        ))}
      </div>

      {/* the rest, as a list */}
      <div className="section-title mt-24 mb-7">그 외 작업</div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {ORDER.filter((k) => k === "all" || counts[k]).map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className="text-[12px] px-3 py-1.5 rounded-full border transition-colors"
            style={
              active === k
                ? { color: "#0a0b0e", background: "var(--accent)", borderColor: "var(--accent)" }
                : { color: "var(--fg-dim)", background: "transparent", borderColor: "var(--border)" }
            }
          >
            {LABEL[k]}
            <span className="mono ml-1.5" style={{ opacity: 0.55, fontSize: 11 }}>
              {counts[k] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <div>
        {shown.map((p, i) => (
          <ProjectRow key={p.slug} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
