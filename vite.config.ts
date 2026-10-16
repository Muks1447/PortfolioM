import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static build for GitHub Pages (no server needed).
const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  nitro: false,
  vite: { base },
  tanstackStart: {
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: { outputPath: "/index.html", crawlLinks: false },
    },
  },
});
