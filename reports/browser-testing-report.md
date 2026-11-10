# Browser testing report (Chromium, Playwright)

Browser: Chromium 141 (headless) via Playwright, served from a local server that mimics GitHub Pages under `/ToolGuideHub/` with `404.html` for missing paths. Sandbox has **no internet**, so external CDN files were blocked.

## Homepage and site pages, by viewport

| Viewport | Checks run | Passed | Failed |
|---|---|---|---|
| 320px | 34 | 34 | none |
| 360px | 34 | 34 | none |
| 390px | 34 | 34 | none |
| 412px | 34 | 34 | none |
| 768px | 34 | 34 | none |
| 1366px | 33 | 33 | none |

Each viewport checked: page load, 24 cards render, no horizontal scroll, logo, hero text, grid column count (2 mobile / 3 tablet / 4 desktop), card overflow, menu, search, no-results message, category filter, category+search, pagination, favourites (saved + persists after reload), recently viewed, tool navigation, back button, categories/submit/pricing/about/contact/privacy/terms/disclaimer pages, custom 404, console errors, failed requests.

## Tool pages (320px viewport)

- Pages opened: **464**
- Loaded successfully: **463**
- Loaded with no JS error and no failed local file: **422**
- Pages with at least one JS error (load or probe): **36** (47 of the sampled pages also needed an external library that was blocked offline)
- Pages where a generic interaction probe (fill inputs, click up to 8 buttons) changed the page output: **350**
- Pages with horizontal scroll > 2px at 320px: **26**

The interaction probe is generic (it types sample text/numbers and clicks buttons). A changed page means *something* happened, **not** that the answer is correct. Correctness was not verified per tool.

### Pages with JS errors in the sample

- `ai-prompt-optimizer` — Cannot read properties of undefined (reading 'target')
- `audio-compressor` — Cannot read properties of null (reading 'addEventListener')
- `batch-qr-generator` — QRCode is not defined
- `color-picker-hex` — Cannot read properties of null (reading 'addEventListener')
- `env-file-generator` — Cannot read properties of undefined (reading 'target')
- `hash-diff-checker` — Maximum call stack size exceeded
- `isometric-grid` — row is not defined
- `json-lint` — copyText is not defined
- `msgpack-viewer` — Cannot read properties of undefined (reading 'target')
- `number-to-words-converter` — Cannot read properties of undefined (reading 'target')
- `numeric-keypad` — history.map is not a function
- `online-piano-keyboard` — Failed to construct 'MediaRecorder': parameter 1 is not of type 'MediaStream'.
- `open-graph-debugger` — Cannot read properties of null (reading 'textContent')
- `pdf-add-image` — pdfjsLib is not defined
- `pdf-add-text` — pdfjsLib is not defined
- `pdf-add-watermark` — pdfjsLib is not defined
- `pdf-diff` — pdfjsLib is not defined
- `pdf-extract-text` — pdfjsLib is not defined
- `pdf-flatten` — Cannot read properties of null (reading 'addEventListener')
- `pdf-merger` — PDFLib is not defined
- `pdf-page-deleter` — pdfjsLib is not defined
- `pdf-page-extractor` — pdfjsLib is not defined
- `pdf-to-image` — pdfjsLib is not defined
- `pdf-watermark` — PDFLib is not defined
- `piano-keyboard` — Cannot set properties of null (setting 'textContent')
- `quiz-generator` — escapeHtml is not defined
- `random-address-generator` — Invalid or unexpected token
- `roas-calculator` — Cannot read properties of null (reading 'addEventListener')
- `roman-to-decimal` — copyDecimal is not defined
- `semantic-version-parser` — Cannot read properties of undefined (reading 'trim')
- `serp-preview` — type is not defined
- `ssh-key-generator` — Cannot read properties of null (reading 'innerText')
- `text-sort` — Cannot read properties of undefined (reading 'target')
- `text-to-docx` — JSZip is not defined
- `vtt-editor` — Cannot read properties of null (reading 'addEventListener')
- `wheel-spin` — Cannot set property history of #<Window> which has only a getter

### Note on retest
After the full sweep, a late fix (missing `showToast` helper, stray `gtag` call) was applied. 17 affected pages were re-run and their results replaced the earlier ones in the figures above. The six-viewport homepage run (203 checks) was done before that fix, which only touches tool pages.
