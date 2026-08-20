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
  category: Category;
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

export const CATEGORY_LABEL: Record<Category, string> = {
  web: "웹 · 풀스택",
  automation: "자동화 · HTTP",
  reversing: "리버스 엔지니어링",
  ai: "AI 활용",
  data: "데이터 수집",
  desktop: "데스크톱 앱",
};
