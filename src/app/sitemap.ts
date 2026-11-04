import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content";

// One page: the menu screens are URL hashes, which don't belong in a sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/` }, { url: `${SITE_URL}/plain` }];
}
