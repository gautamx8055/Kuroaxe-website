# Kuroaxe

Premium marketing-house website for **Kuroaxe** — a creative growth partner for ambitious brands. Built with Astro, TypeScript, and Tailwind CSS 4.

Tagline: **Make your brand impossible to ignore.**

## Setup

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Dev server: [http://localhost:4321](http://localhost:4321)

```sh
npm run build
npm run preview
```

## Editing content

Copy, services, case-study plates, testimonials, team, and contact options live in TypeScript modules. Change these files; pages read from them.

| File | What it controls |
|---|---|
| `src/content/site.ts` | Name, URLs, contact, Codeaxes link, navigation |
| `src/content/home.ts` | Homepage sections |
| `src/content/services.ts` | Six service pages (copy, FAQs, process, jewels) |
| `src/content/work.ts` | Lookbook plates / case studies |
| `src/content/testimonials.ts` | Quotes |
| `src/content/about.ts` | Story, values, team placeholders |
| `src/content/contact.ts` | Form options and “what happens next” |
| `design-system/kuroaxe/MASTER.md` | Visual rules (do not drift) |

Replace placeholder client names, metrics, team profiles, and `https://kuroaxe.com` in `src/content/site.ts` and `astro.config.mjs` before launch. Wire the contact form in `src/components/ContactForm.astro` to your provider (Formspree, Basin, or a custom endpoint). It currently validates in the browser and shows a success state.

The **Codeaxes** nav item is an external link (`https://codeaxes.com`) with `rel="noopener noreferrer"`.

## Structure

```text
src/
  content/          Editable copy
  components/       Header, footer, plates, form, stills
  layouts/          BaseLayout
  lib/schema.ts     JSON-LD helpers
  pages/            Routes (including /services/[slug])
  styles/global.css Tokens, type, motion
```

Routes: `/`, `/services`, `/services/{seo,smm,performance-marketing,ar-vr,graphics,video-production}`, `/about`, `/contact`, `/privacy`, `/terms`.

## Design

Ink, charcoal, midnight, ivory, and gilt. Libre Bodoni + Public Sans. Pinned lookbook, process spine, silk scroll. See `design-system/kuroaxe/MASTER.md`.

## Deploy

Any static host: `npm run build` then publish `dist/`. Set `site` in `astro.config.mjs` to the production URL so canonicals, Open Graph, sitemap, and `robots.txt` resolve correctly.

Vercel / Netlify: import the repo and use the Astro preset. Cloudflare Pages: build command `npm run build`, output `dist`.
# Kuroaxe-website
