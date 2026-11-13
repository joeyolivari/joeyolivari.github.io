# Social link preview update · November 12, 2026
The English and Spanish homepage Open Graph previews now use a dedicated JPEG at
`assets/social-portfolio-2026.jpg`, with a new, stable filename to avoid the previous image cache.
The graphic is 1200 x 630 pixels, 70,968 bytes, and maintains the title
within the middle square-safe area for messaging app cards that center-crop images.

- English OG title: Joey Olivari | Excel Reporting & Budget Tracking.
- Spanish OG title: Joey Olivari | Informes de Excel y presupuestos.
- OG descriptions now describe the services and project samples without an unverified or dated years-of-experience claim.
- Both pages declare the public HTTPS image URL, image type, 1200 by 630 dimensions,
  localized alt text, locale, and matching Twitter summary-card details.
- The generator source is retained at `tools/generate-social-preview.py` for future refreshes.

**Validation**
- Generated image SHA-1 Git blob: `d1d8b8f0de94e5a38dbad5deec4ef095dbd5a1e6`.
- GitHub Actions staging browser run #43334866462: **127 tests passed**, including
  Open Graph, image decoding, bilingual links, navigation and responsive checks.
- The published site and Messenger/Instagram cached attachments require separate observation.
  Existing DM cards may continue to display a cached older image. Share a new clean link
  and, where available, use Meta's Sharing Debugger to request a fresh scrape.

This change updates the site's own HTML and image. It does not control Instagram's
existing message previews or automatically clear Meta's cache.
