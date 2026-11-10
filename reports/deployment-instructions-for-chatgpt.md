# Deployment instructions (for ChatGPT / whoever has GitHub access)

Repository: https://github.com/adi63586/ToolGuideHub  
Live URL: https://adi63586.github.io/ToolGuideHub/  
ZIP size: about 25 MB (25.3 MB, measured after packaging; exact bytes in the final message)

## What this package is
A plain static website. **No build step.** `index.html` is at the ZIP root, tool pages are in `en/<tool>/index.html`.

## Recommended method
1. Unzip the package.
2. Put **all** files (including the hidden `.github/` folder and `.nojekyll`) at the **root of the `main` branch** of `adi63586/ToolGuideHub`. Use `git add --all && git commit && git push`, not the web uploader: there are about 4,000 files and the web uploader limits file counts.
3. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow `.github/workflows/pages.yml` runs on every push to `main` (or run it manually from the Actions tab). It copies the repository (excluding `.git`, `.github`, `reports`) into `_site` and deploys it.
5. Wait for the workflow to go green, then open https://adi63586.github.io/ToolGuideHub/.

## Before telling the user it works
- Open https://adi63586.github.io/ToolGuideHub/ and https://adi63586.github.io/ToolGuideHub/en/json-formatter/ and https://adi63586.github.io/ToolGuideHub/en/does-not-exist/ (should show the purple 404 page).
- Open the PDF tools, QR code generator and web-screenshot tool and confirm they work. They load libraries from CDNs, which could not be tested in the build sandbox.
- Run the Actions "Deploy" log and confirm "Pages in site: ~3,750".

## Rules the package follows
- All internal links are relative; the only absolute `/ToolGuideHub/` path is inside `404.html` (GitHub serves it for any missing URL).
- `js/config.js` has empty `adsenseClient`, `adSlots` and `contactEmail`. Nothing ad-related loads until a real publisher ID is added. Do not invent IDs.
- `reports/` is documentation and is excluded from the deployed site.
