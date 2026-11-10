# Known issues

1. **Tool pages keep their original dark theme.** The homepage and info pages are light/purple; only a small purple ToolGuideHub bar was added to tool pages.
2. **Libraries loaded from CDNs.** 47 of 464 sampled tools load an external library (pdf.js, jsPDF, JSZip, QR code, etc.). My test sandbox has no internet, so these were blocked and the affected tools could not be exercised. They should work online but **must be re-tested on the live site**.
3. **Categories are keyword-based.** The source database only had 16 coarse buckets (2,992 tools were "calc-tools"). Categories were assigned by keyword rules on tool names; some are imperfect (e.g. 358 tools sit in "Utilities", 870 in "Developer").
4. **Featured / Popular sections are editorial picks**, not traffic data. There are no ratings, reviews or popularity numbers anywhere because none exist.
5. **No login.** The header has no Login button because there is no account system.
6. **Submit Tool** opens a pre-filled GitHub issue (no backend). It needs a GitHub account.
7. **Ads are inactive** until a real AdSense ID is put in `js/config.js`. For visitors in the EEA/UK/Switzerland Google requires a certified consent management platform; the built-in banner is a simple choice banner and is not a certified CMP.
8. **Pre-existing source bugs that remain** (found by the browser sweep, present in the original ZIP):
   - `ai-prompt-optimizer`: Cannot read properties of undefined (reading 'target')
   - `audio-compressor`: Cannot read properties of null (reading 'addEventListener')
   - `color-picker-hex`: Cannot read properties of null (reading 'addEventListener')
   - `env-file-generator`: Cannot read properties of undefined (reading 'target')
   - `hash-diff-checker`: Maximum call stack size exceeded
   - `isometric-grid`: row is not defined
   - `json-lint`: copyText is not defined
   - `msgpack-viewer`: Cannot read properties of undefined (reading 'target')
   - `number-to-words-converter`: Cannot read properties of undefined (reading 'target')
   - `numeric-keypad`: history.map is not a function
   - `online-piano-keyboard`: Failed to construct 'MediaRecorder': parameter 1 is not of type 'MediaStream'.
   - `open-graph-debugger`: Cannot read properties of null (reading 'textContent')
   - `pdf-flatten`: Cannot read properties of null (reading 'addEventListener')
   - `pdf-merger`: PDFLib is not defined
   - `pdf-watermark`: PDFLib is not defined
   - `piano-keyboard`: Cannot set properties of null (setting 'textContent')
   - `quiz-generator`: escapeHtml is not defined
   - `random-address-generator`: Invalid or unexpected token
   - `roas-calculator`: Cannot read properties of null (reading 'addEventListener')
   - `roman-to-decimal`: copyDecimal is not defined
   - `semantic-version-parser`: Cannot read properties of undefined (reading 'trim')
   - `serp-preview`: type is not defined
   - `ssh-key-generator`: Cannot read properties of null (reading 'innerText')
   - `text-sort`: Cannot read properties of undefined (reading 'target')
   - `vtt-editor`: Cannot read properties of null (reading 'addEventListener')
   - `wheel-spin`: Cannot set property history of #<Window> which has only a getter

9. About 2,990 of the tools are formula calculators generated from templates; only a subset was exercised in a browser (see `tool-inventory.csv`, column `browser_tested`).
