import type { MetadataRoute } from "next";

// Lets phones "add to home screen" as a little retro console app.
// Colors mirror --bg-base / --accent in globals.css (manifests can't read CSS).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sagnik Sen · SAGNIK-OS",
    short_name: "SAGNIK-OS",
    description: "Sagnik Sen's portfolio, as a retro console menu.",
    start_url: "/",
    display: "standalone",
    background_color: "#070b12",
    theme_color: "#070b12",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
