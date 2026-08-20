import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Category, Project, ProjectMeta } from "./types";

const PROJECT_DIR = path.join(process.cwd(), "content", "projects");

function coerce(data: Record<string, unknown>, slug: string): ProjectMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    tagline: String(data.tagline ?? ""),
    category: (data.category as Category) ?? "web",
    year: String(data.year ?? ""),
    role: String(data.role ?? ""),
    client: String(data.client ?? ""),
    status: String(data.status ?? ""),
    featured: Boolean(data.featured ?? false),
    order: Number(data.order ?? 100),
    stack: (data.stack as string[]) ?? [],
    highlights: (data.highlights as string[]) ?? [],
    metrics: (data.metrics as { label: string; value: string }[]) ?? [],
    links: (data.links as { label: string; href: string }[]) ?? [],
  };
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECT_DIR).filter((f) => f.endsWith(".md"));
  const projects = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(PROJECT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const meta = coerce(data, slug);
    const bodyHtml = marked.parse(content, { async: false }) as string;
    return { ...meta, bodyHtml };
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
