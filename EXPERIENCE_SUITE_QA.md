# Portfolio Experience Suite — Implementation and QA

**Repository:** `joeyolivari/joeyolivari.github.io`  
**Branch:** `main`  
**Implementation:** November 11, 2026

## Shipped features

| Feature | Page | User action | Fallback | Bilingual behaviour |
| --- | --- | --- | --- | --- |
| Before/after Excel comparison | `services.html#samples` | Drag the slider or use arrow keys | Comparison starts at 50%; two fictional sheets remain visible | Static labels translate; range accessibility text updates on switch |
| Advanced KPI dashboard | Homepage hero | Choose spending scenario and Jan/Feb/Mar drilldown | Pre-filled starting figures and bars | Currency formats, status and monthly text switch to English/Spanish |
| Project spotlight | Homepage `#work` | Select AI Industry or SQL Quest, or use arrow keys | With JS off, both project cards remain visible | Section/controls translate; brand project names preserved |
| Animated three-step process | Homepage process | Scroll into view | All three explanatory steps remain visible | Step descriptions translate; connecting bar is decorative |
| FAQ and package disclosures | `services.html` | Open native `details`/summary panels | Works without JavaScript; older browsers open immediately | Titles, FAQs and package descriptions translate |

## Source validation completed

- Checked all six HTML pages reference `experience-suite-v2.css`, `experience-suite-v1.js`, and `language-v16.js`.
- Homepage references only `kpi-dashboard-v3.js`, with three month buttons, three budget bars, three actual bars, two spotlight buttons, and two project articles.
- Services page contains one comparison slider, two sheet tables, four native FAQ disclosures, and six native package disclosures.
- Parsed the three JavaScript files as valid ECMAScript using `new Function(...)` without syntax errors.
- Parsed and checked **325 English-to-Spanish translation keys**.
- Verified animation stylesheet has balanced braces, mobile breakpoint rules, and a reduced-motion override.
- Verified no fixed overlay is introduced by the new experience stylesheet.
- Verified the FormSubmit contact action and consent checkbox remain present.
- Verified budget arithmetic: `3000 + 3200 + 3800 = 10000`; within-budget actual `2700 + 2900 + 3100 = 8700` (variance `-1300`, `-13%`); overspend actual `3300 + 3700 + 4500 = 11500` (variance `+1500`, `+15%`).

## Manual live-browser tests remaining

**Not yet verified:** the actual GitHub Pages deployment, device rendering, interactions with a real touch screen, and cross-browser animation playback. Both public URLs were inaccessible from the available web testing environment. These checks must be performed before claiming end-to-end production QA.

1. **Desktop** (Chrome/Edge/Firefox at ~1440 and 1024 CSS px): check no horizontal overflow; verify all visible and clickable links, bars, panel controls.
2. **Mobile** (Chrome Android and Safari iOS at ~320, 375, 390 CSS px): check the EN/ES header doesn't obscure the quote CTA, the Excel slider moves on touch, package disclosures are readable, and KPI cards wrap into two columns.
3. **Mobile browser Desktop Site mode:** confirm the header and language selector remain separated; check the comparison table's text remains legible.
4. **Bilingual:** on both Home and Services, switch EN→ES→EN; check package details, FAQs, compare slider label, KPI status and spotlight group; ensure no full reload or mixed-language states.
5. **Reduced motion:** use OS accessibility setting and verify counters change instantly, spotlight switches without movement, timeline is filled without animation, and page transitions are disabled.
6. **Keyboard:** Tab through the range input and adjust with Left/Right; open FAQ and packages with Enter/Space; tab through spotlight buttons and change projects with arrow keys.
7. **Lead conversion:** submit a test inquiry only after verifying FormSubmit destination activation; check confirmation and email delivery. Source QA cannot prove delivery.
8. **Performance and layout:** run Lighthouse and inspect LCP, INP, CLS on live Pages before declaring performance results.

All sample figures are fictional and are not customer outcomes. No autoplay video or third-party animation library was added.

## Header single-underline rebuild — November 11, 2026

**Reported defect:** two lines appeared below selected navigation links, and some pages lacked a selected state.

### Root causes identified
- `styles-v11.css` applied the browser's **text-decoration underline** to `nav a[aria-current="page"]`.
- `site-polish-v4.css` separately drew a **green background-gradient underline**. Both were simultaneously visible.
- `page-transition-v1.css` crossfaded both old and new header snapshots; navigation changes briefly showed two different page states.

### Source-of-truth correction
- `styles-v12.css`: removed the legacy active text-decoration and now owns the **only** active indicator: a 2px green `::after` pseudo-element on `.nav-active`. Non-selected navigation links have no underline, even on hover.
- `site-polish-v5.css`: removed all redundant nav underline and background-gradient rules.
- `page-transition-v2.css`: header snapshot switches immediately instead of crossfading old and new active lines. Page content keeps its subtle transition.
- All six pages now share one seven-link navigation. Home, Services, Career Tools and project case studies have one active item; Privacy remains an auxiliary footer-only page without a false active main-nav link.
- `language-v17.js` translates the new Home label without changing the bilingual switcher.
- Updated stylesheet filenames are new, reducing the risk of displaying previously cached CSS.

### Tests and evidence
- Parsed and compared the current source across all six pages: all expected links, one active state per represented main page, zero competing CSS underline rules, and preserved quote form and language selector.
- Reproduced the rebuilt navigation in a standalone local Chromium smoke test at **320px, 375px, 768px and 1440px**, including longer Spanish text. All tested states showed exactly one 2px green active indicator, no extra background or text underline, and no horizontal overflow.
- The local test is a *representative header test*, not a fully rendered screenshot of the published GitHub Pages site.
- Public GitHub Pages remained unreachable from the available environment. Production browser rendering, CDN publication, and live tap transitions remain **unverified**.
