import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div className="container-x py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="mono text-xs" style={{ color: "var(--fg-faint)" }}>
          © 2026 {SITE.name} · built with Next.js · md-driven
        </div>
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--fg-dim)" }}>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">{SITE.email}</a>
        </div>
      </div>
    </footer>
  );
}
