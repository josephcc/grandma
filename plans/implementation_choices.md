# Implementation Choices

Decisions made during implementation, with reasoning. Review these and request changes for iterative improvements.

---

## 1. Homepage: Custom layout vs. rendered markdown

**Choice:** Homepages (`tw/index.astro`, `en/index.astro`) use custom Astro templates with a hero section, mission highlights cards, story teaser, and CTA — rather than simply rendering `index.md` markdown.

**Reasoning:** The homepage needs a visually rich layout (hero with gradient and background image, mission icon cards, story teaser, CTA) that markdown cannot express. The homepage pulls content from multiple sources: `mission.md` (parsed by `MissionCards` component into emoji-icon cards), `story.md` (frontmatter used for teaser), and `site.json` (hero copy, section labels, CTA text).

**Tradeoff:** The non-technical maintainer can edit mission bullets and story teaser via markdown, and homepage copy (hero, CTA) via `site.json` (with tech review). The overall layout requires code changes.

---

## 2. Language toggle: Plain `<a>` tag, no JS

**Choice:** Language switching is a simple `<a>` link that replaces `/tw/` with `/en/` (or vice versa) in the current URL path.

**Reasoning:** No JavaScript needed — works with disabled JS, is crawlable by search engines, and is the simplest possible implementation. The architecture doc specified this approach.

---

## 3. Mobile menu: Minimal vanilla JS

**Choice:** The mobile hamburger menu uses a small inline `<script>` that toggles a CSS class.

**Reasoning:** This is ~6 lines of JS, ships as a tiny inline script, and avoids pulling in any framework. Astro's "zero JS by default" philosophy means we should minimize client-side JavaScript.

---

## 4. Founders page: Portrait cards + prose content

**Choice:** The founders page has a visual header with circular portrait cards showing names and titles, followed by the full markdown biographical content rendered with prose styling. The markdown `<h1>` is hidden via `prose-h1:hidden` since the page provides its own styled heading.

**Reasoning:** The old website had large portrait photos prominently displayed. The card layout gives a modern, clean presentation while keeping the detailed bios accessible. Hiding the markdown h1 prevents duplicate headings.

---

## 5. Story page: Image + prose

**Choice:** The story page shows the grandmother's photo prominently at the top, then renders the markdown content below.

**Reasoning:** The founding story is emotionally significant — the photo of Ms. Lin should be visible immediately. The old website also featured her photo on this page.

---

## 6. Donation page: Structured cards from site.json + markdown intro

**Choice:** The donate page renders the markdown intro text, then uses the `DonationInfo` component to display structured donation methods as styled cards with icons. All donation data (bank info, URLs) comes from `content/site.json`.

**Reasoning:** Bank account numbers, SWIFT codes, and URLs are structured data that benefits from consistent formatting (monospace fonts, clear labels, card grouping). Putting this in site.json rather than markdown ensures consistent rendering and prevents the non-technical maintainer from accidentally breaking the layout by editing bank details as freeform text.

---

## 7. Color palette — Japanese indigo inspired

**Choice:** Deep indigo navy palette chosen to complement the sepia-toned hero background image (a Japanese colonial-era building):
- 60% neutral: `brand-cream: #f7f5f0` (warm cream) and white for content backgrounds
- 30% primary: `brand-teal: #2a3a5c` (deep indigo navy) for headings, hero overlays, accents
- 10% accent: `brand-gold: #c4956a` (amber copper) for CTAs (donate buttons, key action items)
- Footer: `brand-green: #141c2e` (dark navy)
- Gradient depth: `brand-teal-dark: #1a2640`
- Body text: `#1e2232` (warm dark charcoal)

Note: CSS variable names (`brand-teal`, `brand-green`) are historical from the original teal/green palette. The actual colors are indigo navy tones.

**Reasoning:** The hero background image has warm sepia tones from a Japanese-style wooden building. A deep indigo (藍染 inspired) palette harmonizes with these warm tones while maintaining the professionalism expected of a medical foundation. The amber copper accent ties back to the wood tones in the image.

---

## 8. Typography: Serif/sans pairing (Playfair Display + Noto Serif TC + Inter + Noto Sans TC)

**Choice:** Display headings (h1-h3) use a serif typeface pairing: Playfair Display for English and Noto Serif TC for Chinese. Body text and UI elements use the sans-serif pairing: Inter for English and Noto Sans TC for Chinese. Font elements can be overridden back to sans-serif with `font-sans` class where appropriate (nav labels, card titles, buttons).

**Reasoning:** Serif headings with sans-serif body is the most highly recommended pairing for medical/foundation websites — it conveys authority and trust (serif) while maintaining readability (sans). This is the approach used by the Gates Foundation, Mayo Clinic, and most Awwwards-nominated nonprofit sites. The contrast between serif display and clean sans body creates a sophisticated editorial feel that elevates the design above generic template territory.

---

## 9. Tailwind Typography plugin for markdown

**Choice:** All rendered markdown content uses Tailwind's `@tailwindcss/typography` (`prose` classes) with custom overrides for heading colors (`prose-headings:text-brand-teal`) and link colors.

**Reasoning:** The typography plugin provides excellent default styling for rendered HTML from markdown (proper spacing, readable line lengths, styled lists, blockquotes, etc.) with zero custom CSS needed.

---

## 10. SEO: Comprehensive meta tags + JSON-LD

**Choice:** Every page includes: `<title>`, `<meta description>`, `<link canonical>`, `<link alternate hreflang>` for both languages, Open Graph tags, and a single JSON-LD `NonprofitOrganization` schema in the layout.

**Reasoning:** This covers Google's SEO starter guide recommendations. The hreflang tags help Google understand the language relationship. JSON-LD provides structured data for rich results. The sitemap is auto-generated by `@astrojs/sitemap`.

---

## 11. Favicon using logo PNG

**Choice:** The favicon `<link>` points to `/images/site/logo.png` directly.

**Reasoning:** Using the existing logo PNG avoids a 404 error and provides a recognizable favicon. A proper multi-size favicon set (ICO, apple-touch-icon) could be generated as a follow-up using realfavicongenerator.net.

---

## 12. CODEOWNERS placeholder

**Choice:** Used `@josephc` as the technical maintainer's GitHub username placeholder.

**Reasoning:** The actual GitHub username should be updated once the repo is connected to the correct GitHub account.

---

## 13. Navigation: Sticky header with backdrop blur + prominent donate CTA

**Choice:** The header is sticky at the top with `position: sticky; top: 0` and a semi-transparent white background (`bg-white/95`) with `backdrop-filter: blur`. The Donate button is separated from nav links and styled as an amber copper pill-shaped CTA.

**Reasoning:** The sticky header maintains navigation access at all times. The backdrop blur provides a subtle frosted-glass effect. The prominent donate CTA follows nonprofit best practice — the most important action is visually distinct from regular navigation.

---

## 14. Scroll-reveal animations

**Choice:** Elements with class `reveal` fade in and translate up 24px when they enter the viewport. Uses a tiny IntersectionObserver script (~8 lines). Staggered timing via CSS `transition-delay` for card grids using `reveal-stagger`. Elements are unobserved after revealing to avoid re-triggering.

**Reasoning:** Scroll animations are used by virtually every award-winning site. The implementation uses no external libraries (GSAP, Lenis, etc.) — just native IntersectionObserver + CSS transitions. This aligns with Astro's minimal-JS philosophy while providing the visual polish of a curated design.

---

## 15. Page hero component with bilingual subtitles and background image

**Choice:** Inner pages (story, founders, news, donate) share a `PageHero` component — a hero banner with the sepia building background image, indigo gradient overlay, the page title, and a subtitle in the alternate language.

**Reasoning:** Consistent page headers create visual rhythm and brand cohesion. The shared background image ties all pages to the foundation's visual identity. The bilingual subtitle subtly reinforces the i18n nature of the site without requiring a toggle click.

---

## 16. Asymmetric layouts for story and homepage

**Choice:** The story page uses a 2/5 + 3/5 grid with the grandmother's photo sticky-positioned alongside scrolling text. The homepage story teaser uses the same asymmetric split. The photo has a decorative rotated background rectangle behind it.

**Reasoning:** Asymmetric layouts create visual tension and feel more editorial/magazine-like than symmetric grids. The sticky image keeps the emotional anchor visible while the user reads the narrative. The rotated background adds depth without requiring additional imagery.

---

## 17. Founders page: Overlapping card + prose editorial layout

**Choice:** Founder portrait cards overlap the page hero by using negative top margin (`-mt-16`). Below, the biographical markdown content uses `prose-h2:border-t` to create visual section breaks between founders.

**Reasoning:** The overlapping cards create a layered, dimensional feel. The border-top on h2 elements gives each founder's bio section a clear visual separator without adding custom markup to the markdown content. Clicking a founder card smooth-scrolls to their biography via anchor links (`#lin-chun-yen`, `#lin-po-ting`) defined as `<div id="...">` elements in the markdown.

---

## 18. Mission cards: Emoji icons from markdown

**Choice:** The `MissionCards` component parses the raw markdown body of `mission.md`, extracts emoji prefixes from list items (e.g., `- 🏥 Text here`), and renders them as styled cards with large emoji icons and a gold left border accent.

**Reasoning:** This lets the non-technical maintainer control both the icon and text for each mission item by simply editing the markdown. No code changes needed to update icons — just swap the emoji. A suggested emoji list is documented in `content/README.md`.

---

## 19. Centralized strings in site.json

**Choice:** Homepage hero text, section labels, CTA copy, navigation labels, footer text, and donation details are all stored in `content/site.json` keyed by locale. The `homepage` section stores hero title (as array for line breaks), subtitle, tagline, description, and CTA text. A `shared` section stores language-agnostic data (email, website URL, structured address for JSON-LD).

**Reasoning:** Prevents the foundation name and other key strings from being scattered across template files. All changes to these strings happen in one place. The `site.json` requires technical maintainer review via CODEOWNERS since malformed JSON could break the site.

---

## 20. News page: Simple date-stamped entries

**Choice:** The news page renders markdown with `## DATE｜Title` headings separated by `---` horizontal rules. New entries are added at the top of the markdown file.

**Reasoning:** This is the simplest format for the non-technical maintainer to add news. No special components or frontmatter arrays needed — just append a new heading + paragraph + separator. The prose styling handles the visual presentation.
