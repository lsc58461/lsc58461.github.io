"use client";

import { useMemo, useState } from "react";
import type { Project, Category } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

const ORDER: (Category | "all")[] = ["all", "reversing", "automation", "web", "ai", "data", "desktop"];
const LABEL: Record<string, string> = { all: "전체", ...CATEGORY_LABEL };

export function WorkSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    for (const p of projects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, [projects]);

  const shown = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="container-x scroll-mt-20">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-7">
        <h2 className="text-2xl font-semibold tracking-tight">
          <span className="mono text-sm accent-text mr-2">02</span>작업
        </h2>
        <div className="mono text-xs" style={{ color: "var(--fg-faint)" }}>
          {shown.length} / {projects.length} projects
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {ORDER.filter((k) => k === "all" || counts[k]).map((k) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            className="mono text-xs px-3 py-1.5 rounded-full border transition-colors"
            style={
              active === k
                ? { color: "var(--bg)", background: "var(--accent)", borderColor: "var(--accent)" }
                : { color: "var(--fg-dim)", background: "var(--panel)", borderColor: "var(--border)" }
            }
          >
            {LABEL[k]} <span style={{ opacity: 0.6 }}>{counts[k] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
