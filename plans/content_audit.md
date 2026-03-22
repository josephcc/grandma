# Content Editability Audit

This document maps every piece of visible text on the website to its source, and classifies it by who can change it.

## Editability Legend

| Level | Who | How | Review needed? |
|-------|-----|-----|----------------|
| **Markdown** | Non-technical maintainer | Edit `.md` files in `content/tw/` or `content/en/` via GitHub | No (exempted in CODEOWNERS) |
| **site.json** | Non-technical maintainer | Edit `content/site.json` via GitHub | Yes — requires technical maintainer approval |
| **Hardcoded** | Technical maintainer only | Edit `.astro` source files | Yes — code change |

---

## Homepage (`/tw/`, `/en/`)

### Hero Section

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Tagline | "Non-Profit Medical Foundation" | "Non-Profit Medical Foundation" | `site.json` → `homepage.tagline` | site.json |
| Title line 1 | "財團法人臺北市" | "Lin Huang Yueh-Ying" | `site.json` → `homepage.heroTitle[0]` | site.json |
| Title line 2 | "林黃月英醫療基金會" | "Medical Foundation" | `site.json` → `homepage.heroTitle[1]` | site.json |
| Subtitle | "Lin Huang Yueh-Ying Medical Foundation, Taipei, Taiwan" | "財團法人臺北市林黃月英醫療基金會 — Taipei, Taiwan" | `site.json` → `homepage.heroSubtitle` | site.json |
| Meta description | "財團法人臺北市林黃月英醫療基金會——..." | "Lin Huang Yueh-Ying Medical Foundation..." | `site.json` → `homepage.description` | site.json |
| Background image | hero-background.jpg | hero-background.jpg | Hardcoded path in template | Hardcoded |

### Mission Section

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Section label | "Our Mission" | "What We Do" | `site.json` → `homepage.missionLabel` | site.json |
| Section heading | "基金會宗旨" | "Mission" | `content/tw/mission.md` frontmatter `title` | Markdown |
| Intro paragraph | "本基金會是一個以推動醫療創新..." | "The foundation is a non-profit..." | `content/tw/mission.md` body | Markdown |
| Bullet items (4) | 🏥 強化重大疾病... etc. | 🏥 Strengthen resources... etc. | `content/tw/mission.md` body | Markdown |
| Emoji icons | 🏥 🔬 🧬 💝 | 🏥 🔬 🧬 💝 | `content/tw/mission.md` body (emoji prefix on each `- ` item) | Markdown |

### Story Teaser Section

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Section label | "Our Story" | "Our Story" | `site.json` → `homepage.storyLabel` | site.json |
| Section heading | "創辦緣起" | "Our Story" | `content/tw/story.md` frontmatter `title` | Markdown |
| Teaser text | "林黃月英女士長年與肝硬化對抗..." | "Ms. Huang Yueh-Ying Lin fought..." | `content/tw/story.md` frontmatter `description` | Markdown |
| Link text | "閱讀完整故事" | "Read the full story" | `site.json` → `homepage.storyLink` | site.json |
| Image | lin-huang-yueh-ying.png | lin-huang-yueh-ying.png | Hardcoded path in template | Hardcoded |
| Image alt text | "林黃月英女士" | "Ms. Huang Yueh-Ying Lin" | Hardcoded in template | Hardcoded |

### CTA Section

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Heading | "支持我們的使命" | "Support Our Mission" | `site.json` → `homepage.ctaHeading` | site.json |
| Body | "您的每一份捐款，都是為病人帶來希望的力量。" | "Every donation brings hope..." | `site.json` → `homepage.ctaBody` | site.json |
| Button text | "愛心捐款" | "Donate" | `site.json` → `homepage.ctaButton` | site.json |

---

## Story Page (`/tw/story`, `/en/story`)

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Hero title | "創辦緣起" | "Our Story" | Hardcoded in template | Hardcoded |
| Hero subtitle | "Our Story" | "創辦緣起" | Hardcoded in template | Hardcoded |
| Page title (browser tab) | "創辦緣起" | "Our Story" | `content/tw/story.md` frontmatter `title` | Markdown |
| Meta description | "林黃月英女士長年與肝硬化對抗..." | "Ms. Huang Yueh-Ying Lin fought..." | `content/tw/story.md` frontmatter `description` | Markdown |
| Full narrative body | (full story text) | (full story text) | `content/tw/story.md` body | Markdown |
| Portrait image | lin-huang-yueh-ying.png | lin-huang-yueh-ying.png | Hardcoded path | Hardcoded |
| Image alt text | "林黃月英女士" | "Ms. Huang Yueh-Ying Lin" | Hardcoded | Hardcoded |
| Image caption | "林黃月英女士" | "Ms. Huang Yueh-Ying Lin" | Hardcoded | Hardcoded |

---

## Founders Page (`/tw/founders`, `/en/founders`)

### Hero & Page Meta

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Hero title | "創辦人" | "Founders" | Hardcoded in template | Hardcoded |
| Hero subtitle | "Founders" | "創辦人" | Hardcoded in template | Hardcoded |
| Page title (browser tab) | "創辦人" | "Founders" | `content/tw/founders.md` frontmatter `title` | Markdown |
| Meta description | "認識本基金會的創辦人..." | "Meet the founders..." | `content/tw/founders.md` frontmatter `description` | Markdown |

### Founder Portrait Cards (above the fold)

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Card 1 name | "林俊彥醫師" | "Dr. Chun-Yen Lin" | Hardcoded | Hardcoded |
| Card 1 title | "創辦人暨榮譽董事長" | "Founder & Honorary Chairman" | Hardcoded | Hardcoded |
| Card 1 subtitle | "Dr. Chun-Yen Lin" | "林俊彥醫師" | Hardcoded | Hardcoded |
| Card 1 image alt | "林俊彥醫師" | "Dr. Chun-Yen Lin" | Hardcoded | Hardcoded |
| Card 2 name | "林伯庭醫師" | "Dr. Po-Ting Lin" | Hardcoded | Hardcoded |
| Card 2 title | "創辦人暨董事長" | "Founder & Chairman" | Hardcoded | Hardcoded |
| Card 2 subtitle | "Dr. Po-Ting Lin" | "林伯庭醫師" | Hardcoded | Hardcoded |
| Card 2 image alt | "林伯庭醫師" | "Dr. Po-Ting Lin" | Hardcoded | Hardcoded |
| Card image paths | lin-chun-yen.png, lin-po-ting.png | same | Hardcoded | Hardcoded |

### Founder Biographies (below the fold)

| Element | Source | Editable by |
|---------|--------|-------------|
| Full biographical text for both founders | `content/tw/founders.md` / `content/en/founders.md` body | Markdown |
| Section headings (經歷, 研究與貢獻, 現任, etc.) | Markdown body | Markdown |
| Anchor IDs (`#lin-chun-yen`, `#lin-po-ting`) | Markdown body (`<div id="...">`) | Markdown (but must not be removed or cards break) |

---

## News Page (`/tw/news`, `/en/news`)

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Hero title | "最新消息" | "Recent News" | Hardcoded in template | Hardcoded |
| Hero subtitle | "Recent News" | "最新消息" | Hardcoded in template | Hardcoded |
| Page title (browser tab) | "最新消息" | "Recent News" | `content/tw/news.md` frontmatter `title` | Markdown |
| Meta description | "林黃月英醫療基金會最新消息與活動公告。" | "Latest news and announcements..." | `content/tw/news.md` frontmatter `description` | Markdown |
| All news entries | (date, title, body for each entry) | (date, title, body for each entry) | `content/tw/news.md` body | Markdown |

**How to add a news entry:** The non-technical maintainer adds a new `## DATE｜Title` heading followed by a paragraph and a `---` separator in the markdown file. Newest entries should go at the top (below the `# 最新消息` heading).

---

## Donate Page (`/tw/donate`, `/en/donate`)

### Hero & Introduction

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Hero title | "愛心捐款" | "Donate" | Hardcoded in template | Hardcoded |
| Hero subtitle | "Donate" | "愛心捐款" | Hardcoded in template | Hardcoded |
| Page title (browser tab) | "愛心捐款" | "Donate" | `content/tw/donate.md` frontmatter `title` | Markdown |
| Meta description | from frontmatter `description` | from frontmatter `description` | Markdown | Markdown |
| Introduction paragraph | "感謝您的善心支持..." | "Thank you for your generous support..." | `content/tw/donate.md` body | Markdown |

### Donation Methods (DonationInfo component)

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Credit card label | "信用卡定期定額捐款請點我" | "Credit Card Recurring Donation" | `site.json` → `donation.creditCard.label` | site.json |
| Credit card URL | newebpay.com link | same | `site.json` → `donation.creditCard.url` | site.json |
| Credit card button | "前往捐款" | "Donate Now" | Hardcoded | Hardcoded |
| TWD transfer label | "台幣匯款" | "Taiwan Dollar Bank Transfer" | `site.json` → `donation.twdTransfer.label` | site.json |
| TWD account name | "財團法人臺北市林黃月英醫療基金會" | "Lin Huang Yueh-Ying Medical Foundation" | `site.json` → `donation.twdTransfer.accountName` | site.json |
| TWD bank code | "(806) 元大銀行／古亭分行" | "(806) Yuanta Commercial Bank / Guting Branch" | `site.json` → `donation.twdTransfer.bankCode` | site.json |
| TWD account number | "20362000082079" | same | `site.json` → `donation.twdTransfer.accountNumber` | site.json |
| Foreign transfer label | "外幣匯款" | "Foreign Currency Wire Transfer" | `site.json` → `donation.foreignTransfer.label` | site.json |
| Foreign account name | "Lin Huang Yueh-Ying Medical Foundation" | same | `site.json` → `donation.foreignTransfer.accountName` | site.json |
| Foreign account no. | "0367280046861" | same | `site.json` → `donation.foreignTransfer.accountNumber` | site.json |
| SWIFT code | "APBKTWTH" | same | `site.json` → `donation.foreignTransfer.swiftCode` | site.json |
| Bank name | "YUANTA COMMERCIAL BANK CO., LTD." | same | `site.json` → `donation.foreignTransfer.bankName` | site.json |
| Bank address | "3F, NO. 210, SEC. 3, CHENGDE ROAD, TAIPEI 103, TAIWAN" | same | `site.json` → `donation.foreignTransfer.bankAddress` | site.json |
| Donation form label | "匯款請點此填寫捐款表單" | "Click here to fill out the donation form" | `site.json` → `donation.donationForm.label` | site.json |
| Donation form URL | Google Forms link | same | `site.json` → `donation.donationForm.url` | site.json |
| Donation form button | "填寫表單" | "Fill Out Form" | Hardcoded | Hardcoded |
| Field labels ("戶名", "銀行代碼", "帳號", "Account Name", "SWIFT Code", etc.) | — | — | Hardcoded | Hardcoded |

---

## Header (all pages)

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Logo alt text | "財團法人臺北市林黃月英醫療基金會" | "Lin Huang Yueh-Ying Medical Foundation, Taipei, Taiwan" | `site.json` → `siteName` | site.json |
| Site name (next to logo) | "林黃月英醫療基金會" | "Lin Huang Yueh-Ying Medical Foundation" | `site.json` → `siteNameShort` | site.json |
| Nav: Home | "首頁" | "Home" | `site.json` → `nav.home` | site.json |
| Nav: Story | "創辦緣起" | "Our Story" | `site.json` → `nav.story` | site.json |
| Nav: Founders | "創辦人" | "Founders" | `site.json` → `nav.founders` | site.json |
| Nav: News | "最新消息" | "Recent News" | `site.json` → `nav.news` | site.json |
| Nav: Donate | "愛心捐款" | "Donate" | `site.json` → `nav.donate` | site.json |
| Language toggle | "English" | "中文" | `site.json` → `languageToggle` | site.json |
| Nav aria-label | "主要導覽" | "Main navigation" | Hardcoded (ternary) | Hardcoded |
| Mobile menu button | "Toggle menu" | "Toggle menu" | Hardcoded | Hardcoded |

## Footer (all pages)

| Element | TW text | EN text | Source | Editable by |
|---------|---------|---------|--------|-------------|
| Logo alt text | (same as header) | (same as header) | `site.json` → `siteName` | site.json |
| Foundation name | "財團法人臺北市林黃月英醫療基金會" | "Lin Huang Yueh-Ying Medical Foundation, Taipei, Taiwan" | `site.json` → `siteName` | site.json |
| Address | "10037 臺北市中正區同安街55巷2號2樓" | "2F., No. 2, Ln. 55, Tong'an St...." | `site.json` → `footer.address` | site.json |
| Email | lhyy.med.foundation@gmail.com | same | `site.json` → `shared.email` | site.json |
| Quick Links heading | "快速連結" | "Quick Links" | `site.json` → `ui.quickLinks` | site.json |
| Quick link labels | (uses nav labels) | (uses nav labels) | `site.json` → `nav.*` | site.json |
| Copyright | "© 2025 財團法人臺北市林黃月英醫療基金會" | "© 2025 Lin Huang Yueh-Ying..." | `site.json` → `footer.copyright` | site.json |
| Website URL | "https://lhyymed.fund/" | same | `site.json` → `shared.website` | site.json |

---

## SEO & Structured Data (BaseLayout)

| Element | Source | Editable by |
|---------|--------|-------------|
| `<title>` | Page prop (from markdown frontmatter `title` + `siteNameShort`) | Markdown + site.json |
| `<meta description>` | Page prop (from markdown frontmatter `description` or `homepage.description`) | Markdown or site.json |
| `<link rel="canonical">` | Auto-generated from URL | Automatic |
| `<link rel="alternate" hreflang>` | Auto-generated from locale | Automatic |
| Open Graph tags | Derived from above sources | Markdown + site.json |
| JSON-LD organization name | `site.json` → `tw.siteName` | site.json |
| JSON-LD alternate name | `site.json` → `en.siteName` | site.json |
| JSON-LD address | `site.json` → `shared.structuredAddress` | site.json |
| JSON-LD email | `site.json` → `shared.email` | site.json |
| JSON-LD URL | `site.json` → `shared.website` | site.json |
| XML sitemap | Auto-generated by `@astrojs/sitemap` | Automatic |
| robots.txt | Static file at `public/robots.txt` | Hardcoded |

---

## Summary

### What the non-technical maintainer CAN edit independently (no review)

All markdown files under `content/tw/` and `content/en/`:

| File | Controls |
|------|----------|
| `mission.md` | Mission section heading, intro text, bullet items, and emoji icons |
| `story.md` | Story page title, meta description, teaser text, and full narrative |
| `founders.md` | Founders page title, meta description, and all biographical content |
| `news.md` | News page title, meta description, and all news entries (date, title, body) |
| `donate.md` | Donate page title, meta description, and introduction paragraph |

### What requires technical maintainer review (site.json)

`content/site.json` changes need approval. This controls:

- Foundation name (all variants)
- Navigation labels
- Language toggle text
- Homepage hero copy (tagline, title lines, subtitle)
- Homepage section labels and CTA text
- All donation method labels, bank account details, and URLs
- Footer address, copyright, email, website URL
- Quick Links heading
- SEO structured data (address, organization name)

### What requires code changes (hardcoded in templates)

| Item | File(s) |
|------|---------|
| PageHero titles & subtitles (story, founders, news, donate) | `src/pages/{tw,en}/{story,founders,news,donate}.astro` |
| Founder portrait card names & titles | `src/pages/{tw,en}/founders.astro` |
| Founder portrait card image paths | `src/pages/{tw,en}/founders.astro` |
| Story page image path, alt text & caption | `src/pages/{tw,en}/story.astro` |
| Homepage story teaser image path & alt text | `src/pages/{tw,en}/index.astro` |
| Hero background image path | `src/pages/{tw,en}/index.astro`, `src/components/PageHero.astro` |
| DonationInfo field labels & button text | `src/components/DonationInfo.astro` |
| Navigation aria-labels | `src/components/Header.astro` |
| Color scheme | `src/styles/global.css` |
| Fonts | `src/layouts/BaseLayout.astro` (Google Fonts link) |
| robots.txt | `public/robots.txt` |
