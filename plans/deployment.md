# Deployment Guide

You have the code pushed to GitHub. This guide walks through connecting it to Vercel, setting up your custom domain, and configuring GitHub branch protection so the non-technical maintainer can safely edit content.

---

## 1. Connect GitHub repo to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up / log in with your GitHub account.
2. Click **"Add New Project"** from the dashboard.
3. Select your `grandma` repository from the list (authorize Vercel to access it if prompted).
4. Vercel will auto-detect the Astro framework. Verify these settings on the configure screen:
   - **Framework Preset:** Astro
   - **Build Command:** `astro build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** change to `bun install` (Vercel defaults to npm — you want Bun)
5. Click **"Deploy"**.

The first build will take ~30 seconds. Once it succeeds, Vercel gives you a `.vercel.app` URL where the site is live.

**From this point on:**
- Every push to `main` triggers an automatic production deploy.
- Every pull request gets a unique preview URL (visible in the PR's GitHub checks).

---

## 2. Set up custom domain (`lhyymed.org`)

### In Vercel

1. Go to your project in the Vercel dashboard → **Settings** → **Domains**.
2. Add `lhyymed.org` as a domain.
3. Vercel will show DNS records you need to configure. Typically:
   - **A record:** `76.76.21.21` for the apex domain (`lhyymed.org`)
   - **CNAME record:** `cname.vercel-dns.com` for `www.lhyymed.org` (optional)
4. Vercel will also offer to redirect `www` → apex or vice versa. Choose **redirect `www.lhyymed.org` → `lhyymed.org`** (simpler, matches the canonical URL in the code).

### At your domain registrar

1. Log into wherever you registered `lhyymed.org`.
2. Go to DNS settings and add the records from the previous step:
   - **A record:** Host `@`, Value `76.76.21.21`
   - **CNAME record:** Host `www`, Value `cname.vercel-dns.com` (optional)
3. Remove any existing A/CNAME records that conflict.

### Verification

- Back in Vercel, the domain status will change from "Pending" to "Valid Configuration" once DNS propagates (usually 1–30 minutes, can take up to 48 hours).
- Vercel automatically provisions an SSL certificate (HTTPS) — no action needed.
- Test by visiting `https://lhyymed.org` in a browser.

---

## 3. Update CODEOWNERS with your GitHub username

The `CODEOWNERS` file currently uses `@josephc` as a placeholder. Update it to your actual GitHub username:

```
# All files require technical maintainer review by default
* @YOUR_GITHUB_USERNAME

# Markdown content — non-technical maintainer can merge freely
/content/tw/
/content/en/
/content/README.md
```

This ensures:
- PRs touching any file (except content markdown) require **your** approval.
- PRs that only touch files in `/content/tw/`, `/content/en/`, or `/content/README.md` can be merged by the non-technical maintainer without your review.
- PRs touching `content/site.json` require your review (it inherits the `*` rule).

---

## 4. Enable GitHub branch protection on `main`

Go to your GitHub repo → **Settings** → **Branches** → **Add branch protection rule**.

Configure:

| Setting | Value |
|---------|-------|
| **Branch name pattern** | `main` |
| **Require a pull request before merging** | Yes |
| **Required approvals** | 1 |
| **Require review from Code Owners** | Yes |
| **Require status checks to pass before merging** | Yes (optional — enable after first Vercel deploy so the check exists) |
| **Require branches to be up to date before merging** | No (not needed for a small team) |
| **Include administrators** | Your choice — Yes means even you must use PRs |

**How this works with CODEOWNERS:**
- The non-technical maintainer edits a markdown file on GitHub → GitHub creates a PR → since the changed files are in the CODEOWNERS exempted paths (`/content/tw/`, `/content/en/`), **no approval is required** → they can merge immediately.
- If the PR touches `site.json` or any code file → CODEOWNERS requires your approval → the PR is blocked until you review.

---

## 5. Set up the non-technical maintainer

### GitHub access

1. Invite the non-technical maintainer as a **collaborator** on the repo (Settings → Collaborators).
2. Give them **Write** access (needed to create branches and merge PRs).

### Bookmark for them

Give them this direct link to the content folder (replace with your actual repo URL):

```
https://github.com/YOUR_USERNAME/grandma/tree/main/content
```

### What to tell them

- To edit content: click a file in the `content/` folder → click the pencil icon → edit → click "Commit changes" → this creates a PR → they can merge it immediately if it only touches markdown files.
- After merging, the site redeploys automatically in ~30 seconds.
- The `content/README.md` file has detailed editing instructions in both Chinese and English.
- They can add news entries by editing `content/tw/news.md` and `content/en/news.md`.

---

## 6. Verify everything works

After completing the above steps, test the full workflow:

1. **Production deploy:** Push a small change to `main` and verify the site updates at `https://lhyymed.org`.
2. **Preview deploy:** Create a PR with a content change. Verify the Vercel bot posts a preview URL in the PR, and the preview shows the change.
3. **CODEOWNERS enforcement:** Have the non-technical maintainer create a PR that only edits a markdown file in `content/tw/`. Verify they can merge without your approval.
4. **CODEOWNERS blocking:** Create a PR that touches a code file. Verify it requires your approval before merging.
5. **All pages:** Visit each page in both languages and verify they render correctly:
   - `/tw/` and `/en/` (homepage)
   - `/tw/story` and `/en/story`
   - `/tw/founders` and `/en/founders`
   - `/tw/news` and `/en/news`
   - `/tw/donate` and `/en/donate`

---

## Ongoing maintenance

Once deployed, the site requires minimal maintenance:

| Task | Frequency | How |
|------|-----------|-----|
| Review PRs touching `site.json` or code | As needed | GitHub notifications |
| Dependency updates | Every few months | `bun update` → `bun run build` → commit if it works |
| Monitor Vercel builds | Rarely | Vercel dashboard or email alerts on build failure |
| DNS/domain renewal | Annually | Domain registrar |

The Vercel free tier supports 100 deploys/day and 100GB bandwidth/month — far more than a foundation website needs.
