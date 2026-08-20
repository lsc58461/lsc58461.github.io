import { getAllProjects } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const rest = projects.filter((p) => !featured.includes(p));

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ---------- HERO ---------- */}
        <section className="container-x pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="rise max-w-3xl">
            <div className="chip mb-8">
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 99,
                  background: "var(--accent)",
                  boxShadow: "0 0 0 3px rgba(125,211,192,0.15)",
                }}
              />
              작업 의뢰 가능
            </div>

            <h1
              className="font-semibold"
              style={{
                fontSize: "clamp(2.1rem, 5.2vw, 3.4rem)",
                lineHeight: 1.22,
                letterSpacing: "-0.025em",
              }}
            >
              문서 없는 시스템을 열어
              <br />
              <span className="accent-text">돌아가는 제품</span>으로 만듭니다.
            </h1>

            <p
              className="mt-7 text-[15.5px] sm:text-base leading-[1.85] max-w-2xl"
              style={{ color: "var(--fg-dim)" }}
            >
              {SITE.intro}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              <a
                href="#work"
                className="text-sm px-5 py-2.5 rounded-lg font-medium transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)", color: "#0a0b0e" }}
              >
                작업 보기
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm px-5 py-2.5 rounded-lg border transition-colors hover:border-[#333844]"
                style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
              >
                연락하기
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm px-5 py-2.5 rounded-lg border transition-colors hover:border-[#333844]"
                style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
              >
                GitHub
              </a>
            </div>
          </div>

          {/* stats */}
          <div
            className="mt-14 grid grid-cols-3 gap-px rounded-xl overflow-hidden border"
            style={{ borderColor: "var(--border)", background: "var(--border-soft)" }}
          >
            {[
              { v: "16", suffix: "건", label: "프로젝트" },
              { v: "6", suffix: "", label: "작업 도메인" },
              { v: "실서비스", suffix: "", label: "운영 경험" },
            ].map((s) => (
              <div key={s.label} className="px-3.5 py-5 sm:px-5 sm:py-6" style={{ background: "var(--bg-soft)" }}>
                <div
                  className="font-semibold"
                  style={{ fontSize: "clamp(1.05rem, 4.4vw, 1.5rem)", letterSpacing: "-0.02em", color: "var(--fg)", whiteSpace: "nowrap" }}
                >
                  {s.v}
                  {s.suffix && (
                    <span style={{ fontSize: 14, color: "var(--fg-faint)", marginLeft: 2 }}>
                      {s.suffix}
                    </span>
                  )}
                </div>
                <div className="text-[11px] sm:text-xs mt-1.5" style={{ color: "var(--fg-faint)", whiteSpace: "nowrap" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- WORK ---------- */}
        <WorkSection featured={featured} rest={rest} />

        {/* ---------- STRENGTHS ---------- */}
        <section id="about" className="container-x py-20 scroll-mt-16">
          <div className="section-title mb-9">강점</div>
          <div className="grid gap-5 md:grid-cols-3">
            {SITE.strengths.map((s, i) => (
              <div key={s.title} className="rise" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="eyebrow mb-3.5">0{i + 1}</div>
                <h3 className="text-[15px] font-semibold mb-2.5">{s.title}</h3>
                <p className="text-sm leading-[1.75]" style={{ color: "var(--fg-dim)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section className="container-x pb-24">
          <div className="card p-9 sm:p-11 text-center">
            <h3 className="text-xl sm:text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
              함께 만들 것이 있으신가요?
            </h3>
            <p className="mt-3 text-sm" style={{ color: "var(--fg-dim)" }}>
              자동화 · 리버싱 · 웹/데스크톱 제품 문의를 환영합니다.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4">
              <a
                href={`mailto:${SITE.email}`}
                className="mono text-sm px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)", color: "#0a0b0e" }}
              >
                {SITE.email}
              </a>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px]">
                <a
                  href={`tel:${SITE.phone.replace(/-/g, "")}`}
                  className="mono transition-colors hover:text-white"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {SITE.phone}
                </a>
                <span aria-hidden style={{ color: "var(--fg-faint)", opacity: 0.5 }}>·</span>
                <a
                  href={SITE.soomgo}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                  style={{ color: "var(--fg-faint)" }}
                >
                  숨고에서 견적 요청하기 ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
