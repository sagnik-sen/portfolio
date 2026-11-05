import type { MetadataRoute } from "next";
import { PROJECTS, SITE_URL, slug } from "@/content";

// The menu screens are URL hashes, which don't belong in a sitemap; the plain pages do.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/plain` },
    ...PROJECTS.filter((p) => p.study).map((p) => ({ url: `${SITE_URL}/projects/${slug(p.name)}` })),
  ];
}
