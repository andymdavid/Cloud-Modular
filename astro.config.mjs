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
      // Redirect stubs are not pages
      filter: (page) => !page.includes("/alt-home/"),
    }),
  ],
});
