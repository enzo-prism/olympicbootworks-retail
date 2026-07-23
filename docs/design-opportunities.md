# Design & Growth Opportunities

Status: July 22, 2026, after the alpine redesign (see `docs/releases/2026-07-22-alpine-redesign.md`).

## Completed

- July 22, 2026 — Alpine design system (Fraunces/Inter, glacial-blue + ink tokens), dual-path homepage, `/boot-fitting` landing page with the prefilled fitting-inquiry template, sticky mobile bike inquiry bar, Copy-full-inquiry fallback, deferred Vimeo hero with posters, consolidated `SiteImage` with blur-up loading, accessibility pass (skip link, 44px targets, contrast), and `/shop` → `/e-bikes` 308.
- Homepage leads with Fantic e-bikes, “Italian Made Freedom,” model descriptions, current website prices, and direct email to Buck.
- All 11 models have indexable description pages and model-specific inquiry emails.
- The public Ecwid/Lightspeed storefront, cart, checkout, stale checkout-price warning, external product CDN dependency, and storefront analytics were removed.
- The three-step purchase process is explained on the `/e-bikes` hub and every model page (`/shop` now redirects to the hub).
- Product imagery is self-hosted in `public/images/e-bikes/`.
- Unverified inventory status, strikethrough list prices, and percent-off claims were removed.
- Global navigation now prioritizes E-Bikes & Prices, Boot Fitting, About, Locations & Contact, and Email Buck.

## Owner confirmations still needed

1. Confirm XTF 1.5 Carbon at $4,200 and 1.4 Carbon Sport at $4,000 directly; these match the prior catalog but were not found in Buck’s price emails.
2. Provide a dated price sheet if list prices or savings percentages should return.
3. Confirm the exact SKU and model year for every physical bike before adding motor, battery, travel, component, range, size, or color specifications.
4. Confirm current payment, test-ride, preparation, pickup, delivery, shipping, warranty, and service policies before making them more specific.
5. Clarify whether the older $100 boot-fitting appointment payment request still applies.

## Next design opportunities

### Verified specifications

Once Buck provides exact model-year/SKU documentation, add structured specification tables to `data/bikes.ts` and the model pages. Cite the source internally and do not infer missing values.

### Better original photography

Replace catalog-style product shots with approved Fantic lifestyle photography and local shop/test-ride images where possible. Preserve the current self-hosted asset strategy.

### Mobile conversion polish

After screenshot-based testing, consider a small safe-area-aware mobile action rail for Email Buck, Request a Test Ride, and Call. Keep it inquiry-first and avoid covering content or cookie controls.

### Local bike SEO

Consider focused pages for Fantic e-bikes in Olympic Valley/Palisades Tahoe and South Lake Tahoe only after current inventory, test-ride, and service claims are owner-confirmed.

### Retired storefront rule

Do not reintroduce a storefront, cart, checkout, financing display, or third-party catalog sync unless Buck explicitly changes the business direction and provides a maintained operational source of truth.
