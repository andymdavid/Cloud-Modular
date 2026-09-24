import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cloudmodular.com.au",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // Design-refresh test pages stay out of the sitemap until they replace live routes
      filter: (page) => !page.includes("/alt-home/"),
    }),
  ],
});
