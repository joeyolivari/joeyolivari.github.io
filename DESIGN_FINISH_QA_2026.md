# Website visual and functional QA · November 2026
## Improvements in this phase
- Shared responsive finish layer `site-finish-v1.css`: fluid type, balanced headings, readable case-study metadata, unified card corners and spacing, stronger keyboard focus rings and a reduced-motion override.
- Retained **one green navigation underline** defined in `styles-v13.css` only. The finish layer does not add any second underline or duplicate active-state rule.
- All six pages load the same finish layer, use a real top-of-page anchor and focusable main content, and lazy-load below-the-fold images with asynchronous decoding.
- English/Spanish navigation ARIA labels now reflect the chosen language. Browser history navigation restores the selected language when a URL has no language parameter.
- A GitHub Actions Chromium test suite checks 6 pages at **320, 390, 768, 1280 and 1440 CSS pixels**, selected green underline, horizontal overflow, EN→ES→EN without reload, quote validation, and keyboard-accessible case-study tabs. Screenshots and traces are saved on failures.

## Validation performed before the commit
- Checked source references, duplicated IDs, exactly one selected nav link per primary page, no extra active link on Privacy, one language control and one page H1.
- Checked each nondecorative image keeps alt text and now uses lazy loading and async decoding.
- Validated CSS delimiter balance, no duplicate underline rules in the new CSS, responsive breakpoints, and reduced-motion handling.
- Validated JavaScript syntax and parsed the bilingual translation dictionary.
- Validated the Playwright test and configuration syntax.

## What remains to verify
This environment cannot fetch the public GitHub Pages domain and cannot run the *actual full website* from the connected GitHub repository in a local container. The new Actions workflow will execute browser tests on GitHub's runner after the commit. It may surface findings that need a subsequent fix. Do **not** interpret successful static QA as proof that live Pages rendering or FormSubmit email delivery was verified. Confirm that the Pages deployment is publishing the latest `main` commit before relying on production behaviour.

### Manual production checklist
1. Open Home, Services, Career Tools, Privacy and both project pages on a phone and desktop browser.
2. Change EN→ES→EN, including during a quote request; verify there is still exactly **one green line** beneath the active navigation item.
3. Drag the Excel comparison, switch KPI scenarios, use case-study tabs and inspect the quote wizard at narrow widths.
4. Check the quote form's email delivery with a dummy, non-sensitive inquiry only after the FormSubmit destination is activated.
5. Review the Actions run under **GitHub → Actions → Website visual QA**; inspect screenshots from any failed tests.
