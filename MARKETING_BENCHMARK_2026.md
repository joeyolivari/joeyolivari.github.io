# Competitive marketing research and motion design plan
**Joey Olivari business portfolio · November 11, 2026**

## Executive recommendation
Position the site as a **boutique, fixed-scope reporting service** backed by enterprise financial reporting experience, with a secondary, clearly separated resume-writing offer. The priority is not to imitate a large consulting firm’s grand claims: show exactly what customers receive and how they can verify it.

**Proposed market message:** "Messy spreadsheets into reconciled, decision-ready reports — with clear scope, transparent starting prices, and files your team can maintain."

The site's most defensible advantages are: (1) transparent service scope and starting prices, (2) editable Excel workbooks with documented QA, (3) credible multi-year experience with complex reporting processes, (4) downloadable synthetic samples, (5) bilingual English/Spanish communication.

### Evidence limitations
This is a directional **public-website benchmark**, not a full traffic, pricing, user-interview or market-share study. We reviewed publicly indexed content; no private analytics, conversion data, A/B results, or site-owner information was obtained. Design recommendations are hypotheses to test; **no conversion uplift is promised**. Do not invent customer reviews, client logos, current employer endorsement or performance figures.

## Competitor and adjacent benchmark

| Benchmark | Positioning and observed feature | Application for Joey |
| --- | --- | --- |
| [Excel Help](https://www.excelhelp.com/) | Comprehensive spreadsheet consulting; emphasizes business outcomes, use cases, process, consultation, and testimonials | Lead with a concise transformation promise, then guide people to specific deliverables. Avoid claiming its large-enterprise capabilities as your own. |
| [DataScientist.ca](https://www.datascientist.ca/) | Toronto BI practice highlighting live dashboards, real-world examples and technical stack | Bring portfolio artifacts closer to the offer. Let visitors inspect demos and downloadable samples. |
| [r42](https://r42.ca/) | Data visualization studio with strong visual identity, interactive work and explicit project gallery | Use a distinct but restrained branded motion language rather than generic tech stock images. |
| [TopResume](https://ca.topresume.com/how-top-resume-works) | Guided step-by-step process and prominently advertised first step | Keep inquiry, first draft, revisions and delivery simple; maintain a separate career-services route. |
| [TopResume free review](https://ca.topresume.com/resume-review) | Low-friction entry point and clear explanation of what the user receives | A future lead magnet could be an ethical checklist or sample, not an unvalidated automatic ATS score. |
| [Upwork Excel dashboard service](https://www.upwork.com/services/product/admin-customer-support-a-professional-excel-dashboard-and-business-tracker-2091238106684043766) | Tiers with tangible output, delivery and FAQ | Retain clear limits, included revisions and written quote. |
| [Excel R](https://ca.linkedin.com/company/excel-report) | Toronto-based boutique BI and Excel reporting profile emphasizing right-sized tools | Local SMB positioning can be more distinctive than vague "AI transformation" language. |
| [Metis BI website redesign](https://xacrosoft.com/case-study/metis-bi-consultancy-webflow-website/) | Design case describes a BI site built around service pages, case studies, lead forms and lightweight animation | Motion should support clarity and credibility, not replace substantive evidence. |

## B2B buyer psychology and messaging implications
Nielsen Norman Group's B2B usability work emphasizes visible service information, practical evaluation, price guidance, proof of benefit and easy next steps; see [B2B UX](https://www.nngroup.com/reports/b2b-websites-usability/) and its [pricing analysis](https://www.nngroup.com/articles/b2b-usability/). Their research on [company credibility](https://www.nngroup.com/articles/about-us-information-on-websites/) favors transparent and human explanations over generic corporate claims.

### Jobs the visitor wants completed
1. **Owner or operator:** "My spreadsheet is unreliable; how do I get a clean version without buying a big software platform?" Point to Excel Cleanup, sample screenshots, QA log and fixed starting price.
2. **Project manager or finance lead:** "Where are the overspends?" Point to variance tracker, adjustable tolerance, monthly breakdown and downloadable sample.
3. **Procurement-aware buyer:** "Can I trust this person with a file?" State confidentiality limits, scope, data exclusions, delivery timing and revisions clearly.
4. **Recruiter or collaborator:** "Can this person handle rigorous analytics?" Show GitHub, SQL Quest, AI dashboard and the enterprise reporting story.
5. **Career-services client:** "What will a resume rewrite change?" Provide one focused package, deliverables, exclusions, time, and realistic non-guarantees.

### Main homepage narrative
**Problem → transformation → proof → process → invitation.**
- Current hero communicates what the service does, who it serves and where to inquire.
- New decorative data-to-report panel makes the transformation visual. It is deliberately illustrative and contains no invented client data.
- Pricing cards qualify leads early; descriptive links route users to service details.
- Process steps explain the working relationship.
- About copy communicates real experience and skills.
- Downloadable samples and projects give visitors a way to verify work without committing.
- Final contact prompt offers a single next action.

## Design system rationale

### Visual principles
- **Palette:** retained dark forest green, warm off-white and lime accents. Used for contrast and consistency, not an overly fluorescent "crypto" look.
- **Typography:** keep Manrope for editorial headings and DM Sans for reading clarity.
- **Composition:** mix large calm type with strong section dividers and purposeful white space.
- **Visual proof:** realistic dashboard thumbnails and illustrative transformations, not stock photography masquerading as client projects.
- **Responsive layout:** one language selector in a reserved header slot. Avoid fixed overlays and controls that obstruct a CTA.

### Motion specification shipped
| Element | Behavior | Why | Safeguards |
| --- | --- | --- | --- |
| Home reporting panel | 700 ms intro; chart bars grow once when visible | Demonstrates the shift from raw inputs to usable output | Decorative, no real customer data, no infinite animation |
| Cards | ~380 ms elevation and slight image zoom on hover | Suggests inspectable projects and signals clickability | Touch devices disable hover movement |
| Scroll elements | ~470 ms entrance, subtle 12 px travel | Helps scanning from section to section | Content remains visible with JS off; plays once |
| Buttons | ~220 ms hover / press | Immediate feedback on a primary action | No layout reflow |
| Pricing and form fields | 180 ms tint / focus emphasis | Highlights selection and active input | Existing validation remains intact |

Motion patterns follow [Nielsen Norman Group](https://www.nngroup.com/articles/animation-duration/), [Google web.dev performance guidance](https://web.dev/articles/animations-guide), and [GitHub Primer accessibility](https://primer.style/accessibility/design-guidance/motion-and-animation/). The implementation uses no third-party animation bundle, avoids constant loops, and respects the visitor's reduced-motion setting.

## What was intentionally *not* shipped
- Continuous parallax, spinning hero backgrounds, autoplay video, chat popups, forced carousels, or scroll hijacking.
- Fake testimonials, review badges, certifications, client endorsements, or unverifiable savings claims.
- Hover-only information needed to understand prices or deliverables.
- Marketing trackers or cookies without an explicit decision about measurement and consent.

## Conversion pathway and research backlog
| Priority | Hypothesis | Test / metric |
| --- | --- | --- |
| P0 | Header and language selection work at every viewport, including mobile browser "desktop site" | Manual visual smoke test at CSS widths 320, 375, 768, 1024, 1440 and desktop-mode mobile |
| P0 | Inquiry form actually delivers messages | Test submission end-to-end after FormSubmit destination activation; check inbox/spam and privacy policy |
| P0 | English and Spanish content is consistent | Switch each page EN→ES→EN, verify layout stability and translation completeness |
| P1 | Visitors understand the two paid service offers | Five-user first-impression interviews; ask what is sold, to whom, and at what starting price |
| P1 | Sample files make the work more credible | Compare sample-download clicks and inquiry completion; do not infer causality from small samples |
| P1 | Case studies speak to buyer problems rather than tools alone | Rewrite each project as question, approach, output, validation and limitations |
| P1 | Genuine customer proof improves trust | Ask real customers for permission-based testimonials; never invent them |
| P2 | Search visitors can find the services | Review query intent: Excel cleanup Toronto, budget vs actual Excel tracker, Excel reporting freelancer, bilingual spreadsheet consultant |
| P2 | Calls to action could be more focused | Test service-focused "Request an Excel quote" versus generic "Get a quote" after baseline measurement |
| P2 | Performance remains healthy | Run Lighthouse / PageSpeed; inspect Core Web Vitals and motion preference behavior |

Google's [Web Vitals guidance](https://web.dev/articles/vitals) uses LCP, INP and CLS as user-experience indicators; performance should be measured on real devices rather than assumed from code.

## Deployment and QA note
The animations and bilingual additions were committed to the GitHub `main` branch. Source QA verifies that all six HTML pages reference the same motion assets, the script syntax is valid, the homepage has one reporting panel, and the original quote form action is intact. **Published-site visual QA and actual form delivery remain unverified**, because the public site was not reachable from the available browsing environment.

## Source list
- https://www.excelhelp.com/
- https://www.datascientist.ca/
- https://r42.ca/
- https://ca.topresume.com/how-top-resume-works
- https://ca.topresume.com/resume-review
- https://www.upwork.com/services/product/admin-customer-support-a-professional-excel-dashboard-and-business-tracker-2091238106684043766
- https://ca.linkedin.com/company/excel-report
- https://xacrosoft.com/case-study/metis-bi-consultancy-webflow-website/
- https://www.nngroup.com/articles/b2b-usability/
- https://www.nngroup.com/articles/about-us-information-on-websites/
- https://www.nngroup.com/articles/animation-purpose-ux/
- https://www.nngroup.com/articles/animation-duration/
- https://web.dev/articles/animations-guide
- https://primer.style/accessibility/design-guidance/motion-and-animation/


## Cross-page navigation polish · November 2026

**Decision:** a quiet native *cross-document View Transition* rather than a slider, page wipe, elaborate zoom, or a JavaScript router. This matches the research's "boutique reporting consultancy" positioning: practical, calm, credible, and quick.

- Old document gently fades in **160ms**, with only a 3px upward exit.
- New document arrives over **240ms**, with a 5px upward settling motion.
- Shared site header uses a named snapshot so it stays visually continuous between pages and does not become a floating overlay.
- All six first-party HTML pages load the same stylesheet, `page-transition-v1.css`, so both the source and destination opt in.
- Hash-only links preserve normal on-page smooth scrolling; external links and the FormSubmit form are not intercepted.
- No navigation delays, no JavaScript-dependent router, no permanent loading screen, and no added animation library.
- `prefers-reduced-motion: reduce` disables cross-document transitions.
- Browsers without cross-document View Transition support continue navigating normally, rather than having a fragile custom fallback.

**Sources:** [MDN @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition), [Google Chrome — Cross-Document Transitions](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/cross-document-transitions), [WebKit's cross-document crossfade guidance](https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/), [Nielsen Norman Group — Animation Duration](https://www.nngroup.com/articles/animation-duration/).

**Validation caveat:** GitHub repository source was checked; the live GitHub Pages deployment could not be fetched from the research/testing environment, so device-level visual verification remains pending.
