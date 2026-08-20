import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div className="container-x py-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-[12px]" style={{ color: "var(--fg-faint)" }}>
          © 2026 {SITE.name}
        </div>
        <div className="flex items-center gap-5 text-[12px]" style={{ color: "var(--fg-dim)" }}>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href={SITE.soomgo} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            숨고
          </a>
          <a href={`mailto:${SITE.email}`} className="mono hover:text-white transition-colors">
            {SITE.email}
          </a>
          <a
            href={`tel:${SITE.phone.replace(/-/g, "")}`}
            className="mono hover:text-white transition-colors"
          >
            {SITE.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}
