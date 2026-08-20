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
      <main className="flex-1 pt-12 pb-4">
        <div className="container-x" style={{ maxWidth: 820 }}>
          <Link href="/#work" className="mono text-xs inline-flex items-center gap-1.5 mb-8 hover:text-white transition-colors"
            style={{ color: "var(--fg-dim)" }}>
            ← 전체 작업
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="tag accent-text">{CATEGORY_LABEL[project.category]}</span>
            <span className="tag">{project.year}</span>
            <span className="tag">{project.status}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">{project.title}</h1>
          <p className="mt-3 text-lg" style={{ color: "var(--fg-dim)" }}>{project.tagline}</p>

          {/* meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
            {[
              { k: "역할", v: project.role },
              { k: "클라이언트", v: project.client },
              { k: "상태", v: project.status },
            ].map((m) => (
              <div key={m.k} className="card p-4">
                <div className="mono text-[11px] mb-1" style={{ color: "var(--fg-faint)" }}>{m.k}</div>
                <div className="text-sm" style={{ color: "var(--fg)" }}>{m.v}</div>
              </div>
            ))}
          </div>

          {/* metrics */}
          {project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="card p-4 text-center">
                  <div className="text-lg font-bold mono" style={{ color: "var(--accent)" }}>{m.value}</div>
                  <div className="text-[11px] mt-1" style={{ color: "var(--fg-faint)" }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* stack */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.stack.map((s) => (
              <span key={s} className="mono text-xs px-2.5 py-1 rounded-md"
                style={{ background: "var(--panel-2)", border: "1px solid var(--border-soft)", color: "var(--fg-dim)" }}>
                {s}
              </span>
            ))}
          </div>

          <hr className="my-10" style={{ borderColor: "var(--border-soft)" }} />

          {/* body */}
          <article className="prose-body" dangerouslySetInnerHTML={{ __html: project.bodyHtml }} />

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-10">
              {project.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
                  className="mono text-sm px-4 py-2 rounded-lg border"
                  style={{ borderColor: "var(--border)", color: "var(--accent)" }}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
