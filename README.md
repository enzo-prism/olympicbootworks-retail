# Olympic Bootworks — olympicbootworks.com

Marketing + e-commerce site for Olympic Bootworks, a Lake Tahoe ski-boot-fitting and Fantic e-bike shop with two locations (Olympic Valley and South Lake Tahoe).

Deployment target: Replit Autoscale, configured in `.replit` and published from the Replit project.
Public domain: https://www.olympicbootworks.com — DNS points to the Replit deployment. Treat
GitHub `main` as the source of truth, then republish in Replit and verify the public site.

## Stack

- Next.js 16 (App Router, React Server Components) + React 19 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Ecwid / Lightspeed embedded storefront on `/shop` (store id 115212795)
- Consent-gated GA4 (dual streams) + Google Ads conversion tracking and Hotjar
- No database or CMS — all content lives in code (`data/`, page components)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5000
pnpm build      # production build
pnpm check      # lint, typecheck, tests, live Ecwid catalog verification, build
```

Use Node.js 20.19 or newer. GitHub Actions pins pnpm 11.12 explicitly, while Replit uses
the pnpm bundled with its `nodejs-22` module. Do not add a `packageManager` field to
`package.json`: Replit tries to install that package-manager version before the app build,
which can prevent publishing before `next build` starts.

## Where things live

| Concern | Location |
|---|---|
| Pages | `app/` (server components; interactivity in `*-client.tsx` siblings) |
| Locations, hours, seasonal notice | `data/locations.ts` |
| Testimonials | `data/testimonials.ts` |
| **E-bike catalog, sale prices, financing flag** | `data/bikes.ts` |
| E-bikes hub + model pages | `app/e-bikes/` (hub FAQ/List JSON-LD; static `[slug]` pages with Product JSON-LD) |
| Bike product cards | `components/bike-card.tsx` |
| Model inquiry button | `components/bike-inquiry-button.tsx` |
| Structured data (JSON-LD) | `components/seo-jsonld.tsx` |
| Analytics config (GA4/Ads IDs) | `lib/analytics-config.ts` (env-overridable) |
| Conversion events | `lib/track-conversion.ts` |
| Shop embed + hardening | `app/shop/shop-client.tsx` |
| Analytics/cookie consent | `components/tracking-consent.tsx` |
| Privacy notice | `app/privacy/page.tsx` |
| Social share image | `public/images/og-default.png` (1200×630) |
| Buck-flow regression tests | `tests/bikes.test.mjs`, `tests/buck-flow.test.mjs` |

## E-bike merchandising

The `/e-bikes` hub, static model-description pages, homepage featured row, and bike JSON-LD
all render from `data/bikes.ts`. **The Ecwid store (id 115212795) is the source of truth for
checkout prices and stock** — when anything changes in the store admin (price, sale, sold out, new
product), mirror it in `data/bikes.ts` in the same change. If Buck approves a website price before
Ecwid can be changed, set `price` to the approved offer and set `checkoutPrice` to the still-live
Ecwid price. The product page will hide the mismatched checkout link and direct the visitor to Buck;
remove `checkoutPrice` as soon as Ecwid matches. Each entry also carries a stable
description-page slug and its secondary Ecwid purchase link (`/shop#!/Name/p/<id>`).

The owner-approved conversion path is description-first and email-first: model cards open
the on-site description, and every model has a prefilled inquiry to Buck. Keep Ecwid purchase
options available but visually secondary unless the owner explicitly changes this direction.

Ecwid currently provides no product descriptions or technical specifications for these 11
items. The owner-reviewable `overview` and `goodFor` fields intentionally use conservative
riding-category guidance.
Do not add motor, battery, travel, component, range, size, or color claims until the physical
inventory SKU/model year has been confirmed with the owner.

Run `pnpm catalog:verify` after any store or catalog update. It compares all live Ecwid
product IDs, names, prices, sale prices, overall stock, and main images against
`data/bikes.ts`; the same check runs in CI.

- `featured: true` + `inStock: true` puts a bike on the homepage row (keep it to ~4).
- "Up to X% off" copy is computed from the data (`maxSavingsPct`) — never hardcode it.
- **Financing**: `financing.enabled` in `data/bikes.ts` is `false` until Klarna (or another
  BNPL provider) is actually enabled in the Ecwid admin. Flipping it to `true` turns on
  "from $X/mo" framing on every bike card. Do not enable it before checkout supports it.
- Bike conversion events: model-specific `email_click` leads, `test_ride_request`, and the
  GA4-only `bike_page_view` hub/list view live in `lib/track-conversion.ts`; bike cards also
  fire GA4 `select_item` when a visitor opens a model description.
- Product photos load from the Ecwid CDN (`d2j6dbq0eux0bg.cloudfront.net`, allowlisted in
  `next.config.mjs`).

## Seasonal content

The site banner, location cards, footer and JSON-LD all read from `seasonalScheduleNotice` and the per-location `hours` in `data/locations.ts`. Update that one file when the schedule changes.

JSON-LD emits `openingHoursSpecification` only when `hours` entries use weekday names and time ranges (e.g. `{ day: "Wednesday", hours: "9:00 AM – 4:00 PM" }`). Appointment-only/seasonal strings are intentionally skipped.

## Conversion tracking

Email (`mailto:`) and phone (`tel:`) clicks are the primary conversions — there are no forms. Reusable lead CTAs route through `trackConversion()`, which fires GA4 recommended events and the Google Ads lead conversion after analytics consent. Keep the `location` metadata on new CTAs for segmentation.

Page views, contact-page views, shop mounts, and e-bike list views are GA4-only; they must
never use the Google Ads lead conversion action. Google and Hotjar scripts load only after
the visitor chooses analytics cookies. Keep `components/tracking-consent.tsx` and
`app/privacy/page.tsx` aligned when measurement tools change.

## Release checks

GitHub Actions runs `pnpm check` for pull requests and pushes to `main`. A release is not
ready until lint, strict TypeScript, unit tests, live Ecwid reconciliation, and the Next.js
production build all pass. Replit publishing and the public custom domain still require browser
QA because third-party video and storefront behavior cannot be proven by compilation alone.
