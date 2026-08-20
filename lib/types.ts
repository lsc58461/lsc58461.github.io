export type Category =
  | "web"
  | "automation"
  | "reversing"
  | "ai"
  | "data"
  | "desktop";

export interface ProjectMeta {
  slug: string;
  title: string;
  tagline: string;
  /** One or more categories. Frontmatter accepts `categories: [..]` or a single `category:`. */
  categories: Category[];
  year: string;
  role: string;
  client: string;
  status: string;
  featured: boolean;
  order: number;
  stack: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  links: { label: string; href: string }[];
}

export interface Project extends ProjectMeta {
  bodyHtml: string;
}

/** Kept short: a project can carry several of these at once. */
export const CATEGORY_LABEL: Record<Category, string> = {
  reversing: "리버싱",
  automation: "자동화",
  web: "웹",
  ai: "AI",
  data: "데이터",
  desktop: "데스크톱",
};

/** Display order for filter chips and category lists. */
export const CATEGORY_ORDER: Category[] = [
  "reversing",
  "automation",
  "web",
  "ai",
  "data",
  "desktop",
];

export const isCategory = (v: unknown): v is Category =>
  typeof v === "string" && v in CATEGORY_LABEL;

/** Keep a project's categories in the canonical display order. */
export function sortCategories(cats: Category[]): Category[] {
  return [...cats].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );
}
