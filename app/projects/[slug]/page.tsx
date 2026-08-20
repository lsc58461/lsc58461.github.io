import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject, getProjectSlugs } from "@/lib/content";
import { CATEGORY_LABEL } from "@/lib/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 pt-14 pb-24">
        <div className="container-x" style={{ maxWidth: 760 }}>
          <Link
            href="/#work"
            className="text-[13px] inline-flex items-center gap-2 mb-12 transition-colors hover:text-white"
            style={{ color: "var(--fg-faint)" }}
          >
            <span aria-hidden>←</span> 작업 목록
          </Link>

          {/* title block */}
          <div className="eyebrow mb-4" style={{ color: "var(--accent-dim)" }}>
            {CATEGORY_LABEL[project.category]}
          </div>
          <h1
            className="font-semibold"
            style={{ fontSize: "clamp(1.7rem, 4vw, 2.3rem)", lineHeight: 1.25, letterSpacing: "-0.025em" }}
          >
            {project.title}
          </h1>
          <p className="mt-3.5 text-[15.5px] leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            {project.tagline}
          </p>

          {/* meta strip */}
          <dl
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 py-6 border-y"
            style={{ borderColor: "var(--border-soft)" }}
          >
            {[
              { k: "연도", v: project.year },
              { k: "역할", v: project.role.replace(/\s*\([^)]*\)\s*/g, "").trim() },
              { k: "구분", v: project.client },
              { k: "상태", v: project.status },
            ].map((m) => (
              <div key={m.k}>
                <dt className="eyebrow mb-1.5">{m.k}</dt>
                <dd className="text-[13.5px] leading-snug" style={{ color: "var(--fg)" }}>
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>

          {/* metrics */}
          {project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              {project.metrics.map((m) => (
                <div key={m.label} className="card p-5 flex flex-col justify-center min-h-[92px]">
                  <div
                    className="font-semibold leading-snug"
                    style={{ fontSize: 15, color: "var(--accent)", letterSpacing: "-0.01em" }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[11.5px] mt-2" style={{ color: "var(--fg-faint)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* stack */}
          <div className="flex flex-wrap gap-1.5 mt-8">
            {project.stack.map((s) => (
              <span
                key={s}
                className="mono text-[11.5px] px-2.5 py-1.5 rounded-md"
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--fg-dim)",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* body */}
          <article
            className="prose-body mt-14"
            dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
          />

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-12">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] px-4 py-2.5 rounded-lg border transition-colors hover:border-[#333844]"
                  style={{ borderColor: "var(--border)", color: "var(--accent)" }}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}

          <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--border-soft)" }}>
            <Link
              href="/#work"
              className="text-[13px] transition-colors hover:text-white"
              style={{ color: "var(--fg-faint)" }}
            >
              ← 다른 작업 보기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
