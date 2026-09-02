import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cloudmodular.com.au",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
});
