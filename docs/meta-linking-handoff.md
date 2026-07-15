# Meta linking handoff

## Approved destination pattern

Use the direct Seven Day Living page for Seven Day creative:

`https://www.olympicbootworks.com/e-bikes/seven-day-living`

Use the lineup page only for ads that genuinely compare the wider Fantic range:

`https://www.olympicbootworks.com/e-bikes`

Trina owns the final campaign, ad-set, and ad-level UTM values. Append them to the matching destination URL; do not replace the path or send Seven Day ads to the generic lineup page. The site preserves query parameters in GA4 page views.

Recommended naming shape if a new convention is needed:

`?utm_source=meta&utm_medium=paid_social&utm_campaign=<campaign>&utm_content=<ad>`

## What is verified in the site

- Seven Day Living has a dedicated canonical page, product image, plain-language description, `$1,499` current website price, and model-specific Email Buck action.
- The primary email action appears directly below the name and price on mobile.
- Email, phone, test-ride, and copy-email intent paths retain native browser behavior and are measured after analytics consent.
- Product context is attached to model-page email and phone events.
- The e-bike process band uses the supplied Fantic wordmark on black.
- `/shop/boots` uses a permanent absolute redirect to the public contact page.
- Exact technical specifications, stock quantities, financing, discounts, and guaranteed shipping are intentionally excluded until a dated owner-approved source exists.

## Meta measurement boundary

The website does not currently install a Meta Pixel or Conversions API integration. This handoff is ready for Meta Traffic or Landing Page Views linking. It is not ready to claim Meta-attributed on-site leads or to optimize a Meta Lead/Sales campaign from website events.

Adding Meta measurement requires a confirmed Pixel/Dataset ID, an event plan, consent and privacy-copy updates, and production verification in Meta Test Events. Do not paste an unverified Pixel ID into the site.

## Release gate before Trina switches ads

1. GitHub `main` passes `pnpm check`.
2. The same commit is published through the existing Replit Autoscale deployment.
3. The two destination URLs return 200 on `www.olympicbootworks.com`.
4. The Seven Day page visibly shows `Fantic Seven Day Living`, `$1,499`, and the Email Buck action on mobile and desktop.
5. A destination URL with sample UTMs returns 200 and keeps the complete query string in the browser.
6. Email and phone links remain native and correct.
7. Trina receives the final direct URL and explicit green light in the existing email thread.
