# 網站內容編輯指南 / Content Editing Guide

本資料夾包含網站的所有文字內容。
This folder contains all the text content for the website.

---

## 資料夾結構 / Folder Structure

```
content/
├── site.json       ← 網站設定（導覽列、捐款資訊、頁尾）— 修改需技術維護者審核
│                     Site config (nav, donation info, footer) — requires tech review
├── tw/             ← 繁體中文內容
│   ├── index.md       (首頁)
│   ├── mission.md     (基金會宗旨)
│   ├── story.md       (創辦緣起)
│   ├── founders.md    (創辦人)
│   ├── news.md        (最新消息)
│   └── donate.md      (愛心捐款)
└── en/             ← English content
    ├── index.md       (Home)
    ├── mission.md     (Mission)
    ├── story.md       (Our Story)
    ├── founders.md    (Founders)
    ├── news.md        (Recent News)
    └── donate.md      (Donate)
```

## 如何編輯 / How to Edit

1. 點選要編輯的檔案 / Click the file you want to edit
2. 點選鉛筆圖示 / Click the pencil icon
3. 修改 `---` 區塊**下方**的文字內容 / Edit the text **below** the `---` block
4. 點選「Commit changes」儲存 / Click "Commit changes" to save

## 宗旨圖示 / Mission Icons

宗旨頁面（`mission.md`）的每個項目可以在前面加上 emoji 表情符號作為圖示。
Each item in `mission.md` can have an emoji at the beginning to display as an icon.

例如 / Example:
```
- 🏥 強化重大疾病的診療資源
- 🔬 支援病人參與臨床研究
```

常用圖示 / Suggested icons:
- 🏥 醫院 / Hospital
- 🔬 研究 / Research
- 🧬 科學 / Science
- 💝 關懷 / Care
- 💊 藥物 / Medicine
- 🩺 診療 / Medical care
- 🤝 合作 / Collaboration
- 🌱 成長 / Growth

---

## 重要提醒 / Important

- `---` 區塊之間的內容是頁面設定（標題、描述），請小心修改。
  The content between `---` lines is page settings (title, description) — edit carefully.
- 修改中文內容請編輯 `tw/` 資料夾；修改英文內容請編輯 `en/` 資料夾。
  Edit files in `tw/` for Chinese, `en/` for English.
- 儲存後，網站會自動重新部署，約1-2分鐘後生效。
  After saving, the website will automatically redeploy in about 1-2 minutes.
- `site.json` 包含網站設定（導覽列文字、捐款帳戶資訊、頁尾資訊），修改需技術維護者審核。
  `site.json` contains site config (nav labels, donation account info, footer) — changes require technical maintainer review.
