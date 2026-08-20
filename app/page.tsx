import { getAllProjects } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const stats = [
    { value: `${projects.length}+`, label: "프로젝트" },
    { value: "6", label: "도메인" },
    { value: "실서비스", label: "운영 경험" },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-24 pt-16 pb-4">
        {/* HERO */}
        <section className="container-x">
          <div className="rise">
            <div className="tag mb-6">
              <span style={{ width: 7, height: 7, borderRadius: 99, background: "var(--accent)", display: "inline-block" }} />
              작업 의뢰 가능 · 숨고 · 개인 외주
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              {SITE.tagline.split(" · ").map((w, i) => (
                <span key={w}>
                  {i > 0 && <span style={{ color: "var(--fg-faint)" }}> · </span>}
                  <span style={{ color: i === 0 ? "var(--accent)" : "var(--fg)" }}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: "var(--fg-dim)" }}>
              {SITE.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="mono text-sm px-5 py-2.5 rounded-lg font-medium"
                style={{ background: "var(--accent)", color: "var(--bg)" }}>
                작업 보기 →
              </a>
              <a href={SITE.github} target="_blank" rel="noreferrer"
                className="mono text-sm px-5 py-2.5 rounded-lg border"
                style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}>
                GitHub
              </a>
            </div>

            <div className="mt-12 flex gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>{s.value}</div>
                  <div className="mono text-xs mt-1" style={{ color: "var(--fg-faint)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="container-x scroll-mt-20">
          <div className="flex items-end justify-between mb-7">
            <h2 className="text-2xl font-semibold tracking-tight">
              <span className="mono text-sm accent-text mr-2">01</span>대표 작업
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((p, i) => (
              <a key={p.slug} href={`/projects/${p.slug}`} className="rise block" style={{ animationDelay: `${i * 70}ms` }}>
                <article className="card h-full p-7 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs accent-text">FEATURED</span>
                    <span className="mono text-xs" style={{ color: "var(--fg-faint)" }}>{p.year} · {p.role.split("(")[0].trim()}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight mb-1.5">{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>{p.tagline}</p>
                  </div>
                  <ul className="flex flex-col gap-1.5 text-[13px]" style={{ color: "var(--fg-dim)" }}>
                    {p.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="accent-text">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="mono text-[10.5px]" style={{ color: "var(--fg-faint)" }}>#{s}</span>
                    ))}
                  </div>
                </article>
              </a>
            ))}
          </div>
        </section>

        {/* ALL WORK */}
        <WorkSection projects={projects} />

        {/* ABOUT */}
        <section id="about" className="container-x scroll-mt-20">
          <h2 className="text-2xl font-semibold tracking-tight mb-7">
            <span className="mono text-sm accent-text mr-2">03</span>강점
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {SITE.strengths.map((s, i) => (
              <div key={s.title} className="card p-6 rise" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="mono text-xs accent-text mb-3">0{i + 1}</div>
                <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="card mt-6 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="text-lg font-semibold mb-1">함께 만들 것이 있으신가요?</h3>
              <p className="text-sm" style={{ color: "var(--fg-dim)" }}>자동화 · 리버싱 · 웹/데스크톱 제품 문의를 환영합니다.</p>
            </div>
            <a href={`mailto:${SITE.email}`} className="mono text-sm px-5 py-2.5 rounded-lg font-medium whitespace-nowrap"
              style={{ background: "var(--accent)", color: "var(--bg)" }}>
              {SITE.email}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
