# Excluded from the public directory

The page files are kept in `en/<slug>/` (nothing was deleted). They are not listed in the directory or sitemap, are set to `noindex`, and show a "temporarily unavailable" banner.

## Tools that cannot run (6)

- `html-tag-stripper` — Source script is corrupted (quotes double-escaped, string literals broken). Not repairable without rewriting the tool.
- `html-to-docx` — Source script is corrupted (broken string literals in the DOCX XML builder). Not repairable without rewriting the tool.
- `pdf-signature` — Source script is corrupted (broken string literals in the page builder). Not repairable without rewriting the tool.
- `tag-generator` — Source script is truncated mid-string (unterminated literal at end of file).
- `string-escape` — Source script has a malformed escape-map object (mismatched quotes), tool cannot run.
- `invoice-template` — Source script has a chunk of code overwritten by unrelated markup (garbled mid-function), tool cannot run.

## Old hub / legal pages (not tools), 20
These listed other tools or were legal pages of the original website. They are `noindex` and not in the directory; the old `privacy-policy` page was replaced with a redirect to the new Privacy Policy.

`calc`, `converter`, `creative`, `design`, `dev`, `fun`, `gif-tools`, `health`, `image`, `json`, `math`, `media`, `network`, `office`, `pdf`, `privacy-policy`, `security`, `text`, `text-effects-tools`, `utility`

## Chinese duplicate set
The ~3,700 Chinese-language duplicate pages at the root of the ZIP were intentionally not included (you asked for English tools only).
