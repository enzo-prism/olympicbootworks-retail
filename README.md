# Olympic Bootworks — olympicbootworks.com

Inquiry-first website for Olympic Bootworks, a Lake Tahoe ski-boot-fitting and Fantic e-bike shop with locations in Olympic Valley and South Lake Tahoe.

Deployment target: Replit Autoscale, configured in `.replit` and published from the Replit project.
Public domain: https://www.olympicbootworks.com.
GitHub `main` is the source of truth; republish from Replit after syncing `main`.

## Current business direction

- Olympic Bootworks does **not** use online checkout for its Fantic e-bikes.
- Visitors compare model descriptions and current website prices, then contact Buck directly.
- Email is the primary bike conversion. Phone calls and test-ride requests are secondary.
- Buck confirms current availability, size, color, exact specifications, payment, pickup, and available shipping.
- Do not publish exact inventory quantities.
- Do not publish technical specifications until the physical SKU and model year are confirmed.
- `/shop` is retained as a static “How to Get a Bike” compatibility route. It has no storefront, cart, account, or checkout.

## Stack

- Next.js 16 App Router + React 19 + TypeScript
- Tailwind CSS + shadcn/ui/Radix components
- Consent-gated GA4, Google Ads conversion measurement, and Hotjar
- Replit Autoscale production hosting
- No database, CMS, online storefront, or checkout integration

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5000
pnpm build
pnpm check      # lint, typecheck, tests, build
```

Use Node.js 20.19 or newer. GitHub Actions pins pnpm 11.12. Replit uses the pnpm bundled with its `nodejs-22` module. Do not add a `packageManager` field to `package.json`; Replit attempts to install that version before the application build and can fail before `next build` starts.

## Where things live

| Concern | Location |
|---|---|
| Pages | `app/` |
| Locations, hours, seasonal notice | `data/locations.ts` |
| Testimonials | `data/testimonials.ts` |
| E-bike names, prices, descriptions, and local images | `data/bikes.ts`, `public/images/e-bikes/` |
| E-bike hub and model pages | `app/e-bikes/` |
| Static “How to Get a Bike” route | `app/shop/page.tsx` |
| Model inquiry CTA | `components/bike-inquiry-button.tsx` |
| Structured data | `components/seo-jsonld.tsx`, e-bike pages |
| Analytics configuration | `lib/analytics-config.ts` |
| Conversion events | `lib/track-conversion.ts` |
| Privacy notice | `app/privacy/page.tsx` |
| Owner-flow regression tests | `tests/bikes.test.mjs`, `tests/buck-flow.test.mjs` |
| Release notes | `docs/releases/` |

## E-bike pricing and content

`data/bikes.ts` is the public website catalog. Keep the hub, homepage, model pages, structured data, and inquiry emails driven by this one file.

The July 13, 2026 review established Seven Day Living at **$1,499**. The current website prices are regression-tested. Owner-provided records directly support nine of the eleven current prices. Two prices currently come from the prior product catalog and still need direct owner reconfirmation:

- XTF 1.5 Carbon — $4,200
- 1.4 Carbon Sport — $4,000

Do not add strikethrough list prices, percent-off claims, financing claims, “in stock” badges, checkout links, or inventory quantities without a new, dated owner-approved source.

Product photos are stored locally in `public/images/e-bikes/`; do not reintroduce a dependency on an external storefront CDN.

## Conversion tracking

Email, phone, and test-ride actions are the real conversions. Page views and e-bike list views are GA4-only and must never use the Google Ads lead action. Google and Hotjar scripts load only after analytics consent. Keep `components/tracking-consent.tsx` and `app/privacy/page.tsx` aligned when measurement changes.

## Seasonal content

The banner, location cards, footer, and JSON-LD read from `seasonalScheduleNotice` and each location’s `hours` in `data/locations.ts`. Update that file when the schedule changes.

## Release checks

GitHub Actions runs `pnpm check` for pull requests and pushes to `main`. A release is ready for Replit only after lint, strict TypeScript, unit tests, and the production build pass. After publishing, verify the custom domain, homepage, `/e-bikes`, all model routes, `/shop`, email links, phone links, and mobile navigation.

The July 14 inquiry-first release is documented in `docs/releases/2026-07-14-inquiry-first.md`.
