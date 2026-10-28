import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Category, Project, ProjectImage, ProjectMeta } from "./types";
import { isCategory, sortCategories } from "./types";

const PROJECT_DIR = path.join(process.cwd(), "content", "projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Pixel size from the file header (webp / png / jpeg), so the gallery can reserve space. */
function readImageSize(file: string): { width: number; height: number } {
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
    }
    if (chunk === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  }
  if (b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  // JPEG: walk segments to the first SOFn marker
  let i = 2;
  while (i < b.length) {
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
    }
    i += 2 + len;
  }
  throw new Error(`unknown image format: ${file}`);
}

/**
 * `images: [{ src, caption }]` or plain file names. A bare name resolves to
 * `public/shots/<slug>/<name>`; a path starting with "/" is used as is.
 */
function readImages(data: Record<string, unknown>, slug: string): ProjectImage[] {
  if (!Array.isArray(data.images)) return [];
  return data.images.map((item) => {
    const entry = typeof item === "string" ? { src: item } : (item as { src: string; caption?: string });
    const src = entry.src.startsWith("/") ? entry.src : `/shots/${slug}/${entry.src}`;
    return { src, caption: String(entry.caption ?? ""), ...readImageSize(path.join(PUBLIC_DIR, src)) };
  });
}

/**
 * Accepts `categories: [a, b]` (preferred) or a single legacy `category: a`.
 * Unknown values are dropped; an empty result falls back to "web" so a typo
 * never makes a project vanish from every filter.
 */
function readCategories(data: Record<string, unknown>): Category[] {
  const raw = Array.isArray(data.categories)
    ? data.categories
    : [data.categories, data.category];

  const seen = new Set<Category>();
  for (const v of raw) {
    if (isCategory(v)) seen.add(v);
  }
  return seen.size ? sortCategories([...seen]) : ["web"];
}

function coerce(data: Record<string, unknown>, slug: string): ProjectMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    tagline: String(data.tagline ?? ""),
    categories: readCategories(data),
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
    images: readImages(data, slug),
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
