# Architecture

Based on decisions in `tech_choices.md`: Astro + Bun + Vercel + Tailwind CSS, single branch with `/content/`.

---

## 1. Repository structure

```
grandma/
├── content/                    # ← Non-technical maintainer edits here
│   ├── README.md               # Guide for the non-technical maintainer
│   ├── site.json               # Site-wide config: nav labels, footer, donation info (keyed by locale)
│   ├── tw/                     # Traditional Chinese content
│   │   ├── index.md            # Homepage
│   │   ├── mission.md          # Foundation Mission (基金會宗旨)
│   │   ├── story.md            # Founding Story (創辦緣起)
│   │   ├── founders.md         # Founders (創辦人)
│   │   ├── news.md             # Recent News (最新消息)
│   │   └── donate.md           # Donations (愛心捐款)
│   └── en/                     # English content
│       ├── index.md
│       ├── mission.md
│       ├── story.md
│       ├── founders.md
│       ├── news.md
│       └── donate.md
├── src/                        # ← Source code (technical maintainer only)
│   ├── components/
│   │   ├── Header.astro        # Site header with nav + language toggle (inline)
│   │   ├── Footer.astro        # Site footer with contact info
│   │   ├── PageHero.astro      # Shared page hero banner with background image
│   │   ├── MissionCards.astro  # Parses mission markdown into icon cards
│   │   └── DonationInfo.astro  # Donation methods display
│   ├── layouts/
│   │   └── BaseLayout.astro    # Shared layout: head, header, footer, SEO meta
│   ├── pages/
│   │   ├── index.astro         # Root → redirects to /tw/ (required by Astro i18n)
│   │   ├── tw/
│   │   │   ├── index.astro     # Homepage (custom layout, not rendered from index.md)
│   │   │   ├── story.astro
│   │   │   ├── founders.astro
│   │   │   ├── news.astro
│   │   │   └── donate.astro
│   │   └── en/
│   │       ├── index.astro     # Homepage (custom layout)
│   │       ├── story.astro
│   │       ├── founders.astro
│   │       ├── news.astro
│   │       └── donate.astro
│   ├── content.config.ts       # Astro content collection definition
│   └── styles/
│       └── global.css          # Tailwind directives + custom styles
├── public/
│   ├── images/
│   │   ├── founders/           # Portrait photos (including grandma)
│   │   └── site/               # Logo + hero background image
│   └── robots.txt
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CODEOWNERS
├── CLAUDE.md
├── maintainance.md
└── plans/
    ├── main.md
    ├── requirements.md
    ├── tech_choices.md
    ├── architecture.md
    ├── implementation_choices.md
    └── content_audit.md
```

---

## 2. Content layer

### Site-wide config (`content/site.json`)

A single `content/site.json` file contains all site-wide configuration, keyed by locale (`tw`, `en`) plus a `shared` section for language-agnostic data (email, website URL). Each locale key holds: site name, nav labels, footer text, copyright, and donation method details (bank info, links, labels). Layout components import this file and select the appropriate locale key at build time.

### Markdown frontmatter schema

Each content markdown file uses this frontmatter:

```yaml
---
title: "基金會宗旨"           # Page title (used in <title> and <h1>)
description: "本基金會致力於..."  # Meta description for SEO
---

Page content in markdown here...
```

Donation method details (bank info, links, labels) are stored in `content/site.json` under each locale's `donation` key, NOT in the donate.md frontmatter. The donate page template reads from site.json to render donation methods in a styled layout, while donate.md provides only the page intro text.

### Astro content collections

Content files live at `/content/` (root level, not `src/content/`). Astro's content collection is configured with a `glob()` loader pointing to the root `content/` directory:

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '{tw,en}/**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { pages };
```

Note: The glob pattern `{tw,en}/**/*.md` intentionally excludes `content/README.md` (which has no frontmatter and would fail schema validation).

Page files in `src/pages/` are thin wrappers that load the corresponding content entry and render it through the shared layout:

```astro
---
// src/pages/tw/mission.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getEntry } from 'astro:content';

const entry = await getEntry('pages', 'tw/mission');
const { Content } = await entry.render();
---
<BaseLayout title={entry.data.title} description={entry.data.description} lang="zh-TW">
  <Content />
</BaseLayout>
```

---

## 3. i18n routing

### URL structure

| URL | Content source | Language |
|-----|---------------|----------|
| `/` | Redirect → `/tw/` | — |
| `/tw/` | Homepage (custom layout, pulls from mission.md + story.md + site.json) | zh-TW |
| `/tw/story` | `content/tw/story.md` | zh-TW |
| `/tw/founders` | `content/tw/founders.md` | zh-TW |
| `/tw/news` | `content/tw/news.md` | zh-TW |
| `/tw/donate` | `content/tw/donate.md` | zh-TW |
| `/en/` | Homepage (custom layout, pulls from mission.md + story.md + site.json) | en |
| `/en/story` | `content/en/story.md` | en |
| `/en/founders` | `content/en/founders.md` | en |
| `/en/news` | `content/en/news.md` | en |
| `/en/donate` | `content/en/donate.md` | en |

Note: The Mission section (基金會宗旨) is displayed as a section on the homepage, not as a separate page. The `mission.md` content is parsed by the `MissionCards` component on the homepage.

### Astro i18n config

```js
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: 'tw',
    locales: ['tw', 'en'],
    routing: {
      prefixDefaultLocale: true,  // /tw/ prefix even for default
      redirectToDefaultLocale: true, // / → /tw/
    },
  },
});
```

### Language toggle

The language toggle is built directly into `Header.astro` as a simple link that swaps `/tw/` ↔ `/en/` in the current URL path. No JavaScript required — it's a plain `<a>` tag. Example: on `/tw/story`, the toggle links to `/en/story`.

---

## 4. Layout and components

### BaseLayout.astro

Wraps every page. Responsibilities:
- `<html lang={lang}>` attribute for accessibility/SEO
- `<head>`: charset, viewport, page title, meta description, Open Graph tags, favicon, Tailwind CSS
- `<Header />` with navigation links and language toggle
- `<main>` slot for page content
- `<Footer />` with contact info
- Structured data (JSON-LD) for Organization schema

### Header.astro

- Foundation name/logo
- Navigation links: Homepage, Story, Founders, News (from `site.json` nav config)
- Donate CTA button (styled separately as gold pill)
- Language toggle (tw/en, inline — no separate component)
- Responsive: hamburger menu on mobile with vanilla JS toggle

### Footer.astro

- Contact info: address, email, website
- Foundation name
- Quick links (Story, Founders, News, Donate)
- Copyright notice
- All text sourced from `site.json`

### PageHero.astro

- Shared hero banner for inner pages (story, founders, news, donate)
- Background image (`hero-background.jpg`) with gradient overlay
- Takes `title` and optional `subtitle` props

### MissionCards.astro

- Parses raw mission markdown body to extract emoji-prefixed list items
- Renders cards with large emoji icons and text
- Used on homepage to display mission section

---

## 5. Styling

Using Tailwind CSS v4 with Astro's official Vite plugin integration. Tailwind v4 uses CSS-based configuration — no `tailwind.config.mjs` file needed.

### Global CSS

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-brand-teal: #2a3a5c;       /* deep indigo navy — primary */
  --color-brand-teal-dark: #1a2640;   /* darker navy — gradients */
  --color-brand-cream: #f7f5f0;       /* warm cream — body background */
  --color-brand-green: #141c2e;       /* dark navy — footer */
  --color-brand-gold: #c4956a;        /* amber copper — accent/CTAs */
}
```

Brand colors are available as `bg-brand-teal`, `text-brand-cream`, etc. The variable names (`teal`, `green`) are historical — the actual colors are an indigo navy palette chosen to complement the sepia-toned hero background image.

### Typography

Tailwind's `@tailwindcss/typography` plugin (`prose` classes) will be used to style the rendered markdown content with proper headings, paragraphs, lists, etc.

---

## 6. SEO implementation

### Per-page

- `<title>`: From frontmatter `title` + site name suffix (e.g., "基金會宗旨 | 林黃月英醫療基金會")
- `<meta name="description">`: From frontmatter `description`
- `<html lang>`: `zh-TW` or `en` based on locale
- `<link rel="alternate" hreflang="...">`: Cross-references between tw/en versions of each page
- Open Graph meta tags for social sharing

### Site-wide

- `robots.txt` in `/public/` allowing all crawlers
- XML sitemap auto-generated by `@astrojs/sitemap` integration
- JSON-LD structured data for Organization schema in BaseLayout
- Semantic HTML: proper heading hierarchy, landmarks (`<nav>`, `<main>`, `<footer>`)
- All images with `alt` attributes
- Descriptive URLs (`/tw/mission`, not `/page/2`)

---

## 7. Build and deploy flow

### Local development

```bash
bun install          # Install dependencies
bun run dev          # Start Astro dev server (hot reload)
bun run build        # Production build → dist/
bun run preview      # Preview production build locally
```

### Vercel deployment

1. Connect GitHub repo to Vercel project (one-time setup).
2. Vercel auto-detects Astro, sets build command (`astro build`) and output directory (`dist/`).
3. **On push to `main`**: Vercel automatically builds and deploys to production.
4. **On PR**: Vercel creates a preview deployment with a unique URL. The non-technical maintainer can view the preview before merging.
5. Custom domain `lhyymed.org` configured in Vercel dashboard with DNS pointing to Vercel.

### Astro config

No Vercel adapter needed for static output — Vercel auto-detects Astro and serves static files. No Tailwind integration needed — Tailwind v4 uses its own Vite plugin installed via `astro add tailwind`.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lhyymed.org',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'tw',
    locales: ['tw', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});
```

---

## 8. Access control

### CODEOWNERS

```
# All files require technical maintainer review by default
* @<technical-maintainer-github-username>

# Markdown content — non-technical maintainer can merge freely
/content/tw/
/content/en/
/content/README.md

# site.json is structured data — requires technical maintainer review
# (inherits from the * rule above, so no explicit rule needed here)
```

Note: `content/site.json` is intentionally NOT exempted — it inherits the `*` rule, so any changes to it require the technical maintainer's approval. This prevents the non-technical maintainer from accidentally breaking the site with malformed JSON or missing fields.

### Branch protection rules on `main`

- Require PR before merging (no direct pushes)
- Require 1 approval from CODEOWNERS
- Markdown-only PRs (files in `content/tw/`, `content/en/`) bypass the approval requirement
- PRs touching `content/site.json` or any code files require technical maintainer approval

---

## 9. Non-technical maintainer workflow

### Editing existing content

1. Navigate to bookmarked link: `github.com/<repo>/tree/main/content`
2. Open the desired language folder (`tw/` or `en/`)
3. Click on the markdown file to edit (e.g., `mission.md`)
4. Click the pencil icon (edit) on GitHub
5. Make changes to the markdown content (below the `---` frontmatter block)
6. Click "Commit changes" → creates a PR (if branch protection is on) or commits directly
7. If PR: Vercel preview URL appears in the PR checks — click to preview
8. Merge the PR → Vercel auto-deploys to production

### Adding a new page (requires technical maintainer)

Adding a new page requires:
1. New markdown files in `content/tw/` and `content/en/`
2. New page files in `src/pages/tw/` and `src/pages/en/`
3. Navigation link added to `Header.astro`

This is a technical change and would require the technical maintainer.

---

## 10. Dependencies

| Package | Purpose | Dev only |
|---------|---------|----------|
| `astro` | Static site framework | |
| `@astrojs/sitemap` | XML sitemap generation | |
| `tailwindcss` | Utility-first CSS framework (v4, installed via `astro add tailwind`) | yes |
| `@tailwindcss/typography` | Prose styling for rendered markdown | yes |
| `@tailwindcss/vite` | Tailwind v4 Vite plugin (installed automatically by `astro add tailwind`) | yes |
| `typescript` | Type checking | yes |

---

## 11. Future considerations

- **Image optimization**: Astro's `<Image />` component can be used for automatic format conversion (WebP/AVIF) and responsive sizing.
- **Contact form**: If needed, can be added as a React island component using a third-party form service (Formspree, etc.) to avoid needing a backend.
- **Favicon**: Currently using the logo PNG as favicon. A proper multi-size favicon set (16x16, 32x32, apple-touch-icon) could be generated from the logo using realfavicongenerator.net.
