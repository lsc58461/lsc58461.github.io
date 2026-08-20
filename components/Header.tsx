import Link from "next/link";
import { SITE } from "@/lib/site";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{
        background: "color-mix(in srgb, var(--bg) 82%, transparent)",
        borderColor: "var(--border-soft)",
      }}
    >
      <div className="container-x flex items-center justify-between h-14">
        <Link href="/" className="text-[14px] font-semibold" style={{ letterSpacing: "-0.01em" }}>
          {SITE.name}
        </Link>
        <nav className="flex items-center gap-6 text-[13px]" style={{ color: "var(--fg-dim)" }}>
          <a href="/#work" className="hover:text-white transition-colors">작업</a>
          <a href="/#about" className="hover:text-white transition-colors">강점</a>
          <a href="/#contact" className="hover:text-white transition-colors">연락</a>
        </nav>
      </div>
    </header>
  );
}
