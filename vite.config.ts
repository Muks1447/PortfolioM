
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  nitro: false,
  vite: {
    plugins: [nitro()],
    base: "/",
  },
  tanstackStart: {
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index.html",
        crawlLinks: false,
      },
    },
  },
});
