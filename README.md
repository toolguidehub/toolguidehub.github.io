# ToolGuideHub

A directory of **3,700 free online tools** (calculators, converters, PDF/image/text/developer utilities and more), built from an open-source tools collection and restyled with a purple, AIxploria-inspired design.

- Live site: https://toolguidehub.github.io/
- Repository: https://github.com/toolguidehub/toolguidehub.github.io

## What is inside
| Path | What |
|---|---|
| `index.html` | Homepage: search, category pills, 24-per-page pagination, favourites, recently viewed |
| `categories.html`, `pricing.html`, `submit-tool.html`, `404.html` | Supporting pages |
| `en/<tool>/index.html` | One folder per tool (3,700 listed, plus a few unlisted pages) |
| `en/about`, `en/contact`, `en/privacy`, `en/terms`, `en/disclaimer` | Info and legal pages |
| `data/tools-index.json` | The tool list that powers search and filters (generated from the real pages) |
| `js/config.js` | **The only file you edit** to turn on ads / set a contact email |
| `sitemap.xml`, `robots.txt` | SEO files |
| `.github/workflows/pages.yml` | GitHub Pages deployment |
| `reports/` | Inventory, fixes, exclusions, known issues, test report |

## Publish on GitHub Pages
1. Copy every file in this ZIP (including hidden `.github` and `.nojekyll`) to the root of the `main` branch of the repository.
2. Repository **Settings → Pages → Source → GitHub Actions**.
3. Push. The workflow publishes to https://toolguidehub.github.io/ in about a minute.

## AdSense (when you are approved)
Edit `js/config.js`:
```js
adsenseClient: "ca-pub-YOUR_REAL_ID",
adSlots: { header: "1234567890", content: "", sidebar: "", footer: "", tool: "" }
```
Only slots with a real numeric ID appear. A privacy-choice banner appears once an ID is set. Approval is not guaranteed. EEA/UK visitors need a Google-certified consent platform (not included).

## Honest notes
No ratings, reviews, prices or traffic figures are shown because none exist. See `reports/` for fixed tools, excluded tools (6 tools that cannot run), known issues and what was and was not tested.
