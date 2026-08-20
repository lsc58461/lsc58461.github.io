import Link from "next/link";
import { SITE } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{ background: "color-mix(in srgb, var(--bg) 78%, transparent)", borderColor: "var(--border-soft)" }}>
      <div className="container-x flex items-center justify-between h-14">
        <Link href="/" className="mono text-sm font-semibold tracking-tight">
          <span className="accent-text">~/</span>{SITE.handle}
        </Link>
        <nav className="flex items-center gap-5 text-sm" style={{ color: "var(--fg-dim)" }}>
          <a href="/#work" className="hover:text-white transition-colors">작업</a>
          <a href="/#about" className="hover:text-white transition-colors">소개</a>
          <a href={`mailto:${SITE.email}`} className="tag hover:border-[var(--accent)] transition-colors">
            연락하기
          </a>
        </nav>
      </div>
    </header>
  );
}
