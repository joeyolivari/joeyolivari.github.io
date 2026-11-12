# Growth and Conversion Phase — Implementation & QA
**Joey Olivari portfolio • November 11, 2026 • `main` branch**

## Goal
Build on the verified single-line header fix with a clearer path from discovering services to requesting a quote, stronger evidence of reporting quality, more inspectable portfolio work, and Toronto-focused discovery. Keep the website static, bilingual, responsive and low-maintenance.

## Implemented

| Area | Deliverable | Main files |
| --- | --- | --- |
| Quote builder | Three steps: service/size → project objective/timing → contact/review/consent. Required reply email field, client-side validation and a plain-language summary. Does **not** calculate an arbitrary instant price. | `services.html`, `quote-wizard-v2.js`, `main-v6.js`, `growth-v2.css` |
| Career lead routing | Resume-page quote link preselects the resume-rewrite service through `?service=resume`. | `career-tools.html`, `quote-wizard-v2.js` |
| Credibility | Three concrete reporting practices: reconcile to source data, document exceptions, and deliver maintainable workbooks. Removed an unsupported “20% less effort” claim. No fabricated testimonials, client logos or credentials. | `index.html`, `growth-v2.css` |
| Case-study walkthroughs | AI Command Center: stakeholder question → evidence/uncertainty → decision brief. SQL Quest: synthetic mission → illustrative SQL → fictional result. Progressive-enhancement tabs work with click, keyboard arrows, Home and End. | `ai-command-center.html`, `sql-quest.html`, `case-lab-v2.js` |
| Search visibility | Descriptive titles/descriptions, canonical URLs, Open Graph URLs, Twitter card hints and JSON-LD for WebSite/Person/Service/CreativeWork where relevant. Existing sitemap and robots verified. | Five indexable HTML pages, `sitemap.xml`, `robots.txt` |
| Bilingual | 407 English→Spanish dictionary entries. New quote, reporting-standards and case-study text translated; dynamic review and accessible labels respond to language switching. | `language-v20.js`, the feature controllers |
| Performance & accessibility | Removed duplicate Google Fonts `@import`; kept native form/fieldset and link semantics, focus-visible outlines, reduced-motion CSS and no third-party animation frameworks. Header underlines and placement are unchanged by the growth layer. | `styles-v13.css`, `growth-v2.css` |

## Source QA — completed
- **19 repository files** checked on `main`; all source assertions passed.
- Six pages reference identical shared CSS, language, main scripts and retain exactly one language selector.
- Nav active item count: one on named primary pages, none on the utility Privacy page.
- No duplicate HTML IDs found and exactly one H1 on every page.
- Three quote stages, required reply email and consent, FormSubmit destination, and anti-spam honeypot retained.
- Four FAQs and six package disclosures remain available, as does the Excel before/after comparison.
- Three credibility cards and two three-stage case walkthroughs present.
- JavaScript syntax checked for six scripts. CSS block counts balanced.
- JSON-LD parsed for five public pages: WebSite + Person + Service on home; two Services on services page; one Service on career page; CreativeWork on each case study.
- `sitemap.xml` exists and `robots.txt` points to it; the noindex Privacy page is excluded.
- Translation dictionary parsed as strict JSON with **407 keys** after fixing one invalid escape sequence.

## Browser-level component tests — completed
A local Chromium smoke-test harness (representative page markup, with the quote and case-controller logic) passed at **320, 375, 768 and 1440 CSS pixels**:
- Quote: resume-service preselection, step navigation, required objective, invalid email rejection, valid-submit path interception, Spanish accessibility labels, and no horizontal overflow.
- Case-study tabs: click activation, left/right and Home keyboard navigation, Spanish ARIA labels, and no horizontal overflow.

**Scope limitation:** The harness uses representative local layouts and copies of the controller logic. It is **not** a full render or end-to-end browser test of the actual published GitHub Pages deployment.

## Production QA — still required
1. On the published page, switch EN→ES→EN, including while a quote request is in progress.
2. On Android, iOS and mobile desktop-site mode, confirm the header has only one green underline and the quote form does not overflow.
3. Click from Career Tools to the quote builder and confirm Resume rewrite is selected.
4. Test the form with a safe sample inquiry only. Confirm FormSubmit destination **activation** and actual email delivery (including spam folder). Do not assume delivery from source checks.
5. Test keyboard navigation, select/checkbox labels and low-motion settings in a live browser.
6. Run Lighthouse/PageSpeed and inspect LCP, INP and CLS on the published website. No live performance score is claimed.
7. Verify the site in Google Search Console, submit the existing sitemap and monitor indexing. Do not claim Google ranking or rich-result eligibility from schema alone.

## SEO rationale and boundaries
- Google Search Central prioritizes helpful, original content and crawlable, descriptive links. There is no guaranteed first-page ranking.
- JSON-LD describes visible services and the independent projects truthfully. No fictitious street address, opening hours, awards, reviews or employer endorsements are claimed.
- We deliberately did not add FAQPage markup as a rich-result tactic for an ordinary small-business website; Google restricts FAQ rich results primarily to authoritative government and health sources.
- Structured data should be checked with Google's Rich Results Test when the public deployment is reachable.

Official references:
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google FAQ rich-result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Core Web Vitals](https://web.dev/articles/vitals)

## Privacy and commercial claims
- No analytics tracking, login system or customer database was added.
- FormSubmit remains the existing third-party message processor.
- No personal customer file is included in sample projects; illustrations and sample data are fictional.
- Prices shown on the existing site are starting points only; a written scoped quote must confirm cost and terms.
