import Link from "next/link";
import type { Project } from "@/lib/types";
import { CATEGORY_LABEL } from "@/lib/types";

const CAT_COLOR: Record<string, string> = {
  web: "#38bdf8",
  automation: "#5eead4",
  reversing: "#f472b6",
  ai: "#a78bfa",
  data: "#fbbf24",
  desktop: "#34d399",
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const color = CAT_COLOR[project.category] ?? "#5eead4";
  return (
    <Link href={`/projects/${project.slug}`} className="rise block" style={{ animationDelay: `${index * 60}ms` }}>
      <article className="card h-full p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="mono text-[11px] px-2 py-1 rounded-full border"
            style={{ color, borderColor: `color-mix(in srgb, ${color} 40%, transparent)`, background: `color-mix(in srgb, ${color} 8%, transparent)` }}>
            {CATEGORY_LABEL[project.category]}
          </span>
          <span className="mono text-xs" style={{ color: "var(--fg-faint)" }}>{project.year}</span>
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight mb-1.5 flex items-center gap-2">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            {project.tagline}
          </p>
        </div>

        {project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="rounded-lg px-2 py-2 text-center"
                style={{ background: "var(--panel-2)", border: "1px solid var(--border-soft)" }}>
                <div className="mono text-[13px] font-semibold" style={{ color: "var(--fg)" }}>{m.value}</div>
                <div className="text-[10px] mt-0.5" style={{ color: "var(--fg-faint)" }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="mono text-[10.5px]" style={{ color: "var(--fg-faint)" }}>#{s}</span>
          ))}
        </div>
      </article>
    </Link>
  );
}
