# AOK Portfolio

[25-aok-portfolio.vercel.app](https://25-aok-portfolio.vercel.app)

A small portfolio that lists recent projects, shows generated screenshots, embeds a
live preview of each deployment, and includes a contact form.

## Tech stack

- [SvelteKit](https://svelte.dev/docs/kit) 3 + Svelte 5 (runes)
- [Vite](https://vite.dev) 8
- [Open Props](https://open-props.style) design tokens
- [Nodemailer](https://nodemailer.com) for the contact form (Gmail SMTP)
- Playwright + Sharp for automated screenshots

## Requirements

- Node.js 24 or newer (`engines.node` is `>=24`, matching the Vercel runtime)

## Commands

```bash
npm install
npm run dev        # dev server
npm run check      # svelte-check + generated types
npm run build      # production build
npm run preview    # preview the production build
```

## Environment variables

Copy `.env.example` to `.env` and fill in a Gmail address and an
[app password](https://support.google.com/accounts/answer/185833):

```dotenv
SMTP_USER=you@gmail.com
SMTP_PASS=your-google-app-password
```

`VITE_GOOGLE_EMAIL` / `VITE_GOOGLE_EMAIL_PASSWORD` are still read as a fallback so
older deployments keep working. Variables are declared in `src/env.js` and read on
the server through `$app/env/private`.

## Project data

`src/lib/projects.json` only needs presentation data:

```json
{
	"title": "Cariari Agency",
	"slug": "cariari-agency",
	"url": "https://25-cariari-agency.vercel.app",
	"logo": "https://25-cariari-agency.vercel.app/logo/logo_minimal_gold.svg",
	"summary": "A real estate listing platform for browsing, mapping, and managing properties."
}
```

Optional `details` (`client`, `year`, `technologies`) are rendered on the detail page.
Screenshots are **not** stored here — they are generated.

## Screenshots

`scripts/capture-screenshots.js` visits every project URL with Playwright, captures
desktop, full-page desktop, tablet, and mobile views, converts them to AVIF + WebP
with Sharp, and writes the manifest at `src/lib/screenshots.generated.json`.

```bash
npx playwright install chromium   # once per machine
npm run screenshots               # all projects
npm run screenshots -- --only=cariari-agency
```

Commit the generated images and manifest so deploys do not need a browser. The
`Screenshots` GitHub workflow refreshes them weekly, and components fall back to a
gradient + logo card when a project has no screenshots yet.

## Deployment

The app deploys to Vercel with `@sveltejs/adapter-vercel` (`nodejs24.x`). Detail pages
and `sitemap.xml` are prerendered at build time; the home page is server-rendered
because it hosts the contact form action.

Set `SMTP_USER` and `SMTP_PASS` in the Vercel project before deploying.
