import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://cloudmodular.com.au",
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      // Design-refresh test pages stay out of the sitemap until they replace live routes
      filter: (page) => !["/alt-home/", "/quality/", "/why-cloud-modular/", "/faq/"].some((path) => page.includes(path)),
    }),
  ],
});
