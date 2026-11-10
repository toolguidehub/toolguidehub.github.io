# Fixed tools and site-wide repairs

Every item below was applied by the build scripts and re-verified with a Node syntax check of all inline scripts (7,000+ blocks) after the repair.

## 1. Tools whose JavaScript did not parse in the original ZIP (21 repaired)

`jwt-debugger`, `llm-model-comparator`, `markdown-link-checker`, `msgpack-viewer`, `serp-preview`, `wheel-spinner`, `test-score-calculator`, `macro-nutrient-calculator`, `jwt-parser`, `jwt-validator`, `obsidian-frontmatter-generator`, `toml-editor`, `toml-formatter`, `yaml-path-finder`, `jwt-generator`, `quiz-maker`, `total-time-calculator`, `gzip-compressor`, `redirect-tracer`, `roman-to-decimal`, `sql-query-builder`

Plus 79 tool pages whose "related tools" loader had lost its `(function(){ ... })();` wrapper (top-level `return` made the whole script block fail, which also removed `showToast` from those pages). Wrapper restored.

## 2. Missing local libraries (21 pages)
The source pointed at a `libs/` folder that was not in the ZIP. Replaced with pinned CDN builds (jsDelivr / cdnjs / unpkg). **Not testable offline in my sandbox.**

- `barcode-generator`: JsBarcode.all.min.js
- `flowchart-generator`: mermaid.min.js
- `image-to-pdf`: jspdf.umd.min.js
- `image-to-text-ocr`: tesseract.min.js
- `pdf-compressor`: pdf.min.js, pdf-lib.min.js
- `pdf-metadata-viewer`: pdf.min.js
- `pdf-ocr`: pdf.min.js, tesseract.min.js
- `pdf-page-deleter`: pdf-lib.min.js, pdf.min.js
- `pdf-page-extractor`: pdf.min.js, pdf-lib.min.js
- `pdf-redact`: pdf-lib.min.js, pdf.min.js
- `pdf-rotator`: pdf-lib.min.js, pdf.min.js
- `pdf-splitter`: pdf-lib.min.js, pdf.min.js
- `pdf-text-extractor`: pdf.min.js
- `pdf-to-html`: pdf.min.js
- `pdf-to-image`: pdf.min.js, jszip.min.js
- `pdf-to-png`: pdf.min.js
- `pdf-to-text`: pdf.min.js
- `ppt-to-pdf`: jszip.min.js, jspdf.umd.min.js
- `qr-code-generator`: qrcode-generator.min.js
- `web-screenshot`: html2canvas.min.js
- `wifi-qr-code`: qrcode-generator.min.js

## 3. Site-wide repairs
- Removed fabricated star ratings / review counts: 33 pages
- Removed dead feedback code containing a hard-coded GitHub token string and a call to the original owner's repo: 13 pages
- Removed third-party ad-network script and the original owner's Google Analytics tag from every page; added a harmless `gtag` stub on 18 pages that still called it
- Removed the original owner's email address everywhere
- Converted ~20,000 absolute links (`/en/...`) to relative links so they work under `/ToolGuideHub/`
- Fixed 124 canonical URLs that pointed at a different page; all canonicals now equal the page's own GitHub Pages URL
- Added the missing `#toast` element on 205 pages whose scripts call `showToast()`
- Fixed an invalid structured-data type attribute (`ld\+json`) on `gzip-compressor`
- Added a fallback stylesheet (`assets/style.css`) for 4 pages whose shared stylesheet was missing from the ZIP
- 19 old category-hub pages kept but set to `noindex` and removed from the tool directory
