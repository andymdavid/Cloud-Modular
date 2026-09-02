# Cloud Modular Web

Static marketing site for Cloud Modular, built with Astro, TypeScript and Tailwind CSS.

## Requirements

- Node.js 22.12 or newer
- npm 9.6.5 or newer

## Local development

```bash
npm install
npm run dev
```

The local site is available at `http://localhost:4321`.

## Quality checks

```bash
npm run check
npm run build
```

The production build is written to `dist/`.

## Deployment

GitHub Actions deploys the static `dist/` output to GitHub Pages when changes are pushed to `main`. Work on other branches does not update the production site.

The custom domain is configured by `public/CNAME`.
