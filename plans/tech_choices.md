# Tech Choices

This document lists technology decisions for the project. Each section presents the chosen option, alternatives considered, and reasoning.

---

## 1. Static Site Framework

**Decision needed**

| Option | Pros | Cons |
|--------|------|------|
| **Astro** (with React integration) | Purpose-built for content sites, zero JS by default (ships only HTML/CSS unless you opt-in), built-in markdown/MDX support, very fast builds, supports React components where needed, "islands architecture" lets you add interactivity incrementally | Smaller ecosystem than Next.js |
| **Next.js** (with `output: 'export'` for static) | Most popular React SSG, huge ecosystem, first-class Vercel support, built-in i18n routing, image optimization | Heavier than needed for a simple content site, pulls in more JS than necessary, more vendor lock-in to Vercel (full features like ISR/middleware only work well on Vercel), `output: 'export'` mode gives up the features that differentiate Next.js |

**Recommendation:** Astro.
- Content-heavy static site with minimal interactivity — Astro's "zero JS by default" is ideal.
- React components can be used where needed (language toggle, donation buttons) via `client:` directives.
- First-class markdown support and i18n routing built in.
- **Interactivity story:** If more interactivity is needed later, Astro's islands architecture lets you hydrate individual React components (`client:load`, `client:visible`, `client:idle`) without rearchitecting. If needs grow dramatically, migrating to Next.js is feasible since content is markdown and components are already React.
- **Community:** 40k+ GitHub stars, backed by a funded company (The Astro Technology Company), active Discord (~30k members), used in production by Google, Microsoft, Porsche. Even if development slowed, output is plain static HTML — site keeps working, and markdown content migrates easily to any other SSG.
- **Lock-in:** Minimal. Output is static files deployable anywhere. SSR adapters available for Vercel, Cloudflare, Node, Deno if needed later.


**Decision:**: Astro

---

## 2. Runtime / Package Manager

**Decision needed**

| Option | Pros | Cons |
|--------|------|------|
| **Bun** | Fast installs and builds, modern, TypeScript native | Slightly less mature ecosystem, some edge cases with packages |
| **Node + npm/pnpm** | Most battle-tested, widest compatibility | Slower installs |

**Recommendation:** Bun. Fast, modern, and the project is simple enough that Bun's edge cases won't matter. Falls back to Node easily if issues arise.

**Decision:**: Bun

---

## 3. Hosting / Deployment

**Decision needed**

| Option | Pros | Cons |
|--------|------|------|
| **Vercel** (free tier) | Great DX, automatic deploys from git push, preview deploys on every PR (non-technical maintainer can preview content changes before merging), image optimization CDN, edge functions if needed later, auto-detects Astro with official `@astrojs/vercel` adapter | Free tier limits (100 deploys/day, 100GB bandwidth/month), requires separate account |
| **GitHub Pages** (free) | Truly free, no account limits, native GitHub integration, custom domain support | No server-side features, no preview deploys without extra Actions setup, 1GB storage / 100GB bandwidth soft limits, no control over HTTP headers/redirects, no image optimization, 10 builds/hour limit |
| **Cloudflare Pages** (free tier) | Generous free tier (unlimited bandwidth), fast global CDN | Requires Cloudflare account, less native GitHub integration |

**Recommendation:** Vercel.
- Automatic preview deploys on PRs are very valuable for the non-technical maintainer — they can see a live preview of content changes before merging.
- Zero-config Astro deploys (Vercel auto-detects Astro projects).
- Built-in image optimization, HTTP header control, proper redirects.
- Free tier is more than sufficient for a non-profit foundation website.
- Custom domain (lhyymed.fund) supported.
- **Switching to GitHub Pages later** is ~30 minutes of work: remove Vercel adapter, add a GitHub Actions workflow (~30 lines), update DNS. Site code and content don't change at all.

**Decision:**: Vercel

---

## 4. Markdown Processing

Depends on framework choice:

- **If Astro:** Built-in markdown/MDX support. Natively processes `.md` and `.mdx` files with frontmatter. Supports remark/rehype plugins for extended features. No additional configuration needed.
- **If Next.js:** Use `next-mdx-remote` or `contentlayer` for markdown processing.

---

## 5. Internationalization (i18n)

**Chosen: File-based routing with language prefix**

- Structure: `/tw/` for Chinese (default), `/en/` for English.
- Content files organized as `content/tw/*.md` and `content/en/*.md`.
- Astro has built-in i18n routing support (`astro:i18n`).
- Language toggle component in the header.

Alternative considered: single-page with client-side i18n (e.g., react-i18next) — rejected because it requires JavaScript and hurts SEO (content not in HTML).

---

## 6. Styling

**Decision needed**

| Option | Pros | Cons |
|--------|------|------|
| **Tailwind CSS** | Utility-first, fast development, small production bundle (purges unused), widely adopted, first-class Astro integration | Learning curve for those unfamiliar, verbose class names |
| **Vanilla CSS / CSS Modules** | No dependencies, simple, full control | Slower development, harder to maintain consistency |

**Recommendation:** Tailwind CSS. Fast to develop, produces small bundles, and Astro has first-class Tailwind integration. Good for matching the foundation's specific color scheme via theme config.

**Decision:** Tailwind CSS.

---

## 7. CI/CD

**Suggestion: Vercel's built-in CI/CD** (if Vercel is chosen for hosting)

- Automatic deploys on push to the deployed branch — no config needed.
- Preview deploys on every PR automatically.
- If GitHub Pages is chosen instead: GitHub Actions (free, ~30 lines of workflow config).

**Decision: Vercel's built-in CI/CD** (if Vercel is chosen for hosting)

---

## 8. Branch Strategy

**Decision needed**

| Option | Pros | Cons |
|--------|------|------|
| **Single branch with `/content/` directory** | Dead simple — Vercel auto-deploys on any push, preview deploys on PRs work automatically for content changes, standard git workflow, single history | Maintainer sees code files alongside content (mitigated by bookmarked link to `/content/` folder, README, and CODEOWNERS branch protection) |
| **Two branches (`main` = content, `source` = code)** | Maintainer sees only markdown on the default branch — cleanest possible UX | Fights against Vercel's strengths: no automatic preview deploys for content changes (Vercel watches one branch), requires deploy hook + GitHub Action glue, build must `git fetch` content from another branch, harder to debug build failures, extra CI complexity |

**Recommendation:** Single branch with `/content/` directory.
- With Vercel, the single-branch approach gives the maintainer **preview URLs on every content PR for free** — arguably more valuable than hiding code files.
- Mitigations for maintainer seeing code: bookmark link directly to `github.com/repo/tree/main/content`, clear README in `/content/`, CODEOWNERS file requiring review for changes outside `/content/`.
- The 2-branch approach made more sense with GitHub Pages (where you write your own Actions anyway). With Vercel, it adds complexity and loses Vercel's best feature (automatic preview deploys).

**Decision:** Single branch with `/content/`
