import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/content";

export const dynamic = "force-static";

const BASE = "https://nixlab.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...getProjectSlugs().map((slug) => ({
      url: `${BASE}/projects/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
