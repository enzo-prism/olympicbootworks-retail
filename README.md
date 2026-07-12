# Olympic Bootworks — olympicbootworks.com

Marketing + e-commerce site for Olympic Bootworks, a Lake Tahoe ski-boot-fitting and Fantic e-bike shop with two locations (Olympic Valley and South Lake Tahoe).

Production: https://www.olympicbootworks.com (Vercel project `v0-olympic-bootworks-cy`, deploys from `main`).

## Stack

- Next.js (App Router, React Server Components) + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Ecwid / Lightspeed embedded storefront on `/shop` (store id 115212795)
- GA4 (dual streams) + Google Ads conversion tracking, Hotjar
- No database or CMS — all content lives in code (`data/`, page components)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5000
pnpm build      # production build
```

## Where things live

| Concern | Location |
|---|---|
| Pages | `app/` (server components; interactivity in `*-client.tsx` siblings) |
| Locations, hours, seasonal notice | `data/locations.ts` |
| Testimonials | `data/testimonials.ts` |
| **E-bike catalog, sale prices, financing flag** | `data/bikes.ts` |
| E-bikes hub page | `app/e-bikes/` (Product + FAQ JSON-LD in `page.tsx`) |
| Bike product cards | `components/bike-card.tsx` |
| Structured data (JSON-LD) | `components/seo-jsonld.tsx` |
| Analytics config (GA4/Ads IDs) | `lib/analytics-config.ts` (env-overridable) |
| Conversion events | `lib/track-conversion.ts` |
| Shop embed + hardening | `app/shop/shop-client.tsx` |
| Social share image | `public/images/og-default.png` (1200×630) |

## E-bike merchandising

The `/e-bikes` hub, the homepage featured row, and the bike JSON-LD all render from
`data/bikes.ts`. **The Ecwid store (id 115212795) is the source of truth for prices and
stock** — when anything changes in the store admin (price, sale, sold out, new product),
mirror it in `data/bikes.ts` in the same change. Each entry carries the Ecwid product id
and deep link (`/shop#!/Name/p/<id>`).

- `featured: true` + `inStock: true` puts a bike on the homepage row (keep it to ~4).
- "Up to X% off" copy is computed from the data (`maxSavingsPct`) — never hardcode it.
- **Financing**: `financing.enabled` in `data/bikes.ts` is `false` until Klarna (or another
  BNPL provider) is actually enabled in the Ecwid admin. Flipping it to `true` turns on
  "from $X/mo" framing on every bike card. Do not enable it before checkout supports it.
- Bike conversion events: `test_ride_request` and `bike_page_view` in
  `lib/track-conversion.ts`, plus GA4 `select_item` fired from `bike-card.tsx`.
- Product photos load from the Ecwid CDN (`d2j6dbq0eux0bg.cloudfront.net`, allowlisted in
  `next.config.mjs`).

## Seasonal content

The site banner, location cards, footer and JSON-LD all read from `seasonalScheduleNotice` and the per-location `hours` in `data/locations.ts`. Update that one file when the schedule changes.

JSON-LD emits `openingHoursSpecification` only when `hours` entries use weekday names and time ranges (e.g. `{ day: "Wednesday", hours: "9:00 AM – 4:00 PM" }`). Appointment-only/seasonal strings are intentionally skipped.

## Conversion tracking

Email (`mailto:`) and phone (`tel:`) clicks are the primary conversions — there are no forms. All CTAs route through `trackConversion()` which fires both GA4 recommended events and the Google Ads conversion. Keep the `location` metadata on new CTAs for segmentation.
