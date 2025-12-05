# Cloud Modular Web

Marketing site for Cloud Modular, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS to match the requirements outlined in `../Design-Docs`.

## Tech Stack
- Next.js 16 with the App Router (static export)
- TypeScript
- Tailwind CSS 3
- Form submissions via Formspree (client-side POST)

## Local Development
```bash
npm install
npm run dev
```
The site is available at http://localhost:3000. Page structure and content follow the design docs inside `../Design-Docs`.

## Building & Static Export
Static HTML export is enabled via `next.config.ts` (`output: 'export'`). Running
```bash
npm run build
```
produces the `/out` directory that GitHub Pages will serve.

## Environment Variables
Copy `.env.example` to `.env.local` and update the Formspree endpoint once it is provisioned:
```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## Assets & Content To-Do
- Replace Unsplash placeholders with the ~20 optimized images referenced in `Design-Docs/00 - Project Brief.md`.
- Provide final FAQ answers, project descriptions, confirmed phone number, and business hours once available.
- Drop in the real Formspree endpoint (and production email/analytics IDs) before launch.

## Deployment (GitHub Pages)
The repository root contains `.github/workflows/deploy.yml`, which:
1. Installs dependencies inside `/web`
2. Runs `npm run build` to create `/web/out`
3. Publishes the static export to GitHub Pages with the included `public/CNAME` (`cloudmodular.com.au`).

Push to `main` (or run the workflow manually) to deploy. Update DNS per `Design-Docs/07 - GitHub Pages Hosting Guide.md`.
