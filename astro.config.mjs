import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cloudmodular.com.au",
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  // The redesigned home was previewed at /alt-home/ before it replaced /
  redirects: { "/alt-home/": "/" },
  integrations: [
    sitemap({
      // Redirect stubs are not pages, and the fact review is for the team only
      filter: (page) => !page.includes("/alt-home/") && !page.includes("/review/"),
    }),
  ],
});
