# Joey Olivari — Reporting & Excel Services

Static GitHub Pages website: https://joeyolivari.github.io/

## Main pages
- `index.html` — services-first homepage, industry examples, and verifiable reporting evidence
- `services.html` — services and pricing, downloadable fictional workbooks, FAQs, and guided quote request
- `excel-cleanup-case-study.html` and `budget-tracker-case-study.html` — step-by-step Excel sample case studies
- `ai-command-center.html` and `sql-quest.html` — independent technical project case studies
- `career-tools.html` — separate resume rewrite service (unchanged in this phase)
- `thanks.html` — quote handoff page, accessed after successful FormSubmit redirection
- `404.html` — custom GitHub Pages error screen using absolute asset paths
- `privacy.html` — data-use and temporary language-switch draft-storage disclosure

## Bilingual structure
- Spanish static pages are in `es/` with translated text in the HTML source.
- Public English and Spanish pages declare reciprocal `hreflang` tags and self-referential canonical URLs.
- `language-route-v1.js` switches between dedicated language URLs; while filling a quote form, a draft is transferred in session storage and cleared after restoration.
- The sitemap lists 14 English/Spanish public URLs. Privacy, 404 and thank-you pages are not indexed.

## Inquiry and testimonials
- FormSubmit processes the quote form and can redirect to the corresponding `thanks.html` page through `_next`.
- FormSubmit must be activated and a safe end-to-end submission must be verified before relying on email delivery.
- `verified-reviews.json` is intentionally empty. `verified-reviews-v1.js` renders only genuine, permission-approved bilingual quotes. No client reviews are invented.

## QA & deployment
- Playwright Chromium tests run on GitHub Actions for mobile and desktop widths, both language routes, single-line navigation, form behaviour and case studies.
- GitHub Pages deploys from `main` (root directory). Build and browser-check status appears under GitHub Actions.
- Do not infer real email delivery or production ranking from source checks alone.
