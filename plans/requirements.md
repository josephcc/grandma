# Requirements

## Stakeholders and Roles

- **The users**: Users access the website to learn about the non-profit foundation, and see recent news and updates. Some of the users are mandarin speakers who resides in Taiwan, others are international users who are fluent only in English.
- **The non-technical maintainer**: The non-technical maintainer does not have the technical skillset to read and modify code. They are able to edit and modify markdown files in-order to change the content of the website and post updates.
- **The technical maintainer**: I am the technical maintainer of this website, 

## High-level architecture requirements

- Static website generator from markdown files using React SSR
- Freemium hosting plan
- Freemium post-commit triggers to automatically deploy
- Do not require hosting a container or a vps
- I like tech such as bun, vercel, github pages, but these are not hard requirements, use them to figure out the appropriate architecture.

## User requirements

Based on the current website at https://lhyymed.fund/, the following are the detailed user requirements:

### Bilingual support (i18n)

- The website must support **Traditional Chinese** (primary) and **English** (secondary).
- Users can toggle between languages. Both versions should have equivalent content.

### Pages and content

1. **Homepage (首頁)**
   - Foundation name in both Chinese and English
   - Brief introduction / hero section
   - Navigation to all other sections

2. **Foundation Mission (基金會宗旨)**
   - Core objectives: strengthening treatment resources for major diseases, supporting patient participation in clinical research, fostering interdisciplinary medical development, creating integrated healthcare platforms combining humanistic care with science.

3. **Founding Story (創辦緣起)**
   - Narrative about Ms. Huang Yueh-Ying Lin and the motivation for establishing the foundation (her struggle with liver cirrhosis and liver cancer).

4. **Founders (創辦人)**
   - **Dr. Chun-Yen Lin** (Founder & Honorary Chairman) — Dean of College of Medicine at Chang Gung University, hepatology and immunology expert, 100+ international publications.
   - **Dr. Po-Ting Lin** (Founder & Chairman) — Attending physician in gastroenterology and hepatology, liver cancer and precision medicine researcher.
   - Each founder should have a portrait photo and biographical text.

5. **Donations (愛心捐款)**
   - Credit card recurring donations (external link: https://donate.newebpay.com/Period/lhyymed/lhyy)
   - Taiwan domestic bank transfer info (元大銀行 Yuanta Commercial Bank, Guoting Branch)
   - International wire transfer info (SWIFT code)
   - Google Form for donor information (https://forms.gle/3hqREm5G49iFZKW56)

### Design and layout

- Responsive design (mobile-first, works on all screen sizes)
- Color scheme: dark teal (#004e7a), cream (#fff8f0), dark green (#012b1b), with accent colors
- Professional typography
- Consistent header/footer across all pages
- Portrait photos and decorative imagery

### Contact information (footer)

- Address: 2F., No. 2, Ln. 55, Tong'an St., Zhongzheng Dist., Taipei City 10037
- Website: https://lhyymed.fund/
- Email: lhyy.med.foundation@gmail.com

### SEO requirements

- Unique, descriptive page titles per page
- Meta descriptions for each page
- Descriptive URLs (e.g., `/about`, `/donate`, not `/page/2`)
- Alt text on all images
- XML sitemap
- Mobile-friendly (Google mobile-first indexing)
- Structured data where applicable (Organization schema)
- Proper heading hierarchy (h1, h2, etc.)

## The non-technical maintainer requirements

The non-technical maintainer will use GitHub to update the content of the website by editing markdown files in the `/content/` directory. All content and code live on a single branch (`main`). Any push to `main` automatically triggers Vercel to regenerate and deploy the static site, with preview URLs available on every PR.

### Access control

To prevent the non-technical maintainer from accidentally modifying code while still allowing the technical maintainer full access:

- **CODEOWNERS file**: Require the technical maintainer's review for all files, with `/content/tw/`, `/content/en/`, and `/content/README.md` exempted so the non-technical maintainer can merge markdown content changes independently. `content/site.json` is NOT exempted — it contains structured data (nav labels, donation info, footer) that could break the site if malformed, so it requires technical maintainer review.
- **Branch protection on `main`**: Require at least 1 approval from CODEOWNERS before merging. Content-only PRs won't need approval (exempted in CODEOWNERS); PRs touching code files will be blocked until the technical maintainer approves.
- **Bookmarked link**: Provide the non-technical maintainer a direct link to `github.com/<repo>/tree/main/content` so they navigate straight to the content folder.
- **README in `/content/`**: A simple guide for the non-technical maintainer explaining how to edit and add content.

## The technical maintainer requirements

Co-work with a coding agent to figure out the right architecture and implementation of this website. Once the website is developed, there should be minimal maintancance work required. Most changes should be self-serviced for the non-technical maintainer listed above.

<TODO-Future> Once we planned out more detailed architecture, update this section for the actual maintainance work for me to review and confirm that it is acceptable.


## SEO requirements

Follow the below SEO guidelines from google for best practices:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide

<TODO-Future> Once the website is up and running, we will use the below mcp tool to conduct further SEO:
- https://github.com/AminForou/mcp-gsc
