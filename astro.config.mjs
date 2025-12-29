import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],

  server: {
    port: 4321
  },

  vite: {
    resolve: {
      alias: {
        "@yysng/astro-boilerplate/content-storage":
          process.env.ASTRO_ADAPTER === "cloudflare"
            ? "/src/content-system/storage.edge.entry.js"
            : "/src/content-system/storage.js"
      }
    }
  }
});