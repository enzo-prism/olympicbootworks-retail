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
- Boot fitting is the second core service line: `/boot-fitting` is its landing page, and every fitting CTA uses the prefilled inquiry template in `lib/fitting-inquiry.ts`.
- `/shop` is a legacy compatibility route that permanently redirects (308) to `/e-bikes`. There is no storefront, cart, account, or checkout anywhere.

## Stack

- Next.js 16 App Router + React 19 + TypeScript
- Tailwind CSS + shadcn/ui/Radix components
- Consent-gated GA4, Google Ads conversion measurement, and Hotjar
- Replit Autoscale production hosting
- No database, CMS, online storefront, or checkout integration

## Design system

The July 2026 redesign established an "alpine boutique" system. Stay inside it:

- **Type**: Fraunces (display serif) for h1–h3 via a global rule; Inter for body. Both self-hosted through `next/font` in `app/layout.tsx`. Card-level h3s opt out with `font-sans tracking-normal`.
- **Color**: tokens only, defined in `app/globals.css` — glacial-blue `primary`, `ink` (deep alpine navy) for dark bands, ice/stone `secondary`/`muted` tints. No raw hex, no `bg-gray-*`. Fantic red is scoped to `.fantic-theme` on e-bike merchandising.
- **Patterns**: eyebrow labels are `text-xs font-semibold uppercase tracking-[0.22em] text-primary`; section rhythm is `py-16 md:py-24`; alternating bands use `bg-secondary/60`; closing CTAs use `bg-ink text-ink-foreground`.
- **Dark mode is intentionally not offered** — the layout forces the light theme and no `dark:` variants exist. Do not add them.
- **Images**: use `components/site-image.tsx` (blur-up placeholders + working error fallbacks). The background-video hero (`components/vimeo-video-hero.tsx`) defers the Vimeo player until after page load and always needs a `posterSrc`.

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
| Design tokens and global styles | `app/globals.css`, `tailwind.config.ts` |
| Locations, hours, seasonal notice | `data/locations.ts` |
| Testimonials | `data/testimonials.ts` |
| E-bike names, prices, descriptions, and local images | `data/bikes.ts`, `public/images/e-bikes/` |
| E-bike hub and model pages | `app/e-bikes/` |
| Boot-fitting landing page | `app/boot-fitting/` |
| Fitting inquiry template (mailto + copy fallback) | `lib/fitting-inquiry.ts` |
| Legacy `/shop` 308 redirect | `app/shop/route.ts` |
| Model inquiry CTA | `components/bike-inquiry-button.tsx` |
| Sticky mobile bike inquiry bar | `components/bike-sticky-inquiry-bar.tsx` |
| Shared image component | `components/site-image.tsx` |
| Structured data | `components/seo-jsonld.tsx`, e-bike pages |
| Analytics configuration | `lib/analytics-config.ts` |
| Conversion events | `lib/track-conversion.ts` |
| Privacy notice | `app/privacy/page.tsx` |
| Owner-flow and redirect regression tests | `tests/bikes.test.mjs`, `tests/buck-flow.test.mjs`, `tests/legacy-redirects.test.mjs` |
| Meta destination handoff | `docs/meta-linking-handoff.md` |
| Release notes | `docs/releases/` |

## E-bike pricing and content

`data/bikes.ts` is the public website catalog. Keep the hub, homepage, model pages, structured data, and inquiry emails driven by this one file.

The July 13, 2026 review established Seven Day Living at **$1,499**. The current website prices are regression-tested. Owner-provided records directly support nine of the eleven current prices. Two prices currently come from the prior product catalog and still need direct owner reconfirmation:

- XTF 1.5 Carbon — $4,200
- 1.4 Carbon Sport — $4,000

Do not add strikethrough list prices, percent-off claims, financing claims, “in stock” badges, checkout links, or inventory quantities without a new, dated owner-approved source.

Product photos are stored locally in `public/images/e-bikes/`; do not reintroduce a dependency on an external storefront CDN.

## Conversion tracking

Email, phone, and test-ride actions are the real conversions. Page views, e-bike list views, and copy-email fallbacks are GA4-only and must never use the Google Ads lead action. Google and Hotjar scripts load only after analytics consent. The site does not currently load a Meta Pixel or Conversions API integration; Meta campaigns must be treated as Traffic/Landing Page Views unless separately approved measurement is added. Keep `components/tracking-consent.tsx` and `app/privacy/page.tsx` aligned when measurement changes.

## Seasonal content

The banner, location cards, footer, and JSON-LD read from `seasonalScheduleNotice` and each location’s `hours` in `data/locations.ts`. Update that file when the schedule changes.

## Release checks

GitHub Actions runs `pnpm check` for pull requests and pushes to `main`. A release is ready for Replit only after lint, strict TypeScript, unit tests, and the production build pass. After publishing, verify the custom domain, homepage, `/e-bikes`, all model routes, `/boot-fitting`, email links, phone links, mobile navigation, the Fantic wordmark asset, and both public-domain redirects: `/shop` → `/e-bikes` and `/shop/boots` → `/contact` (308, no localhost).

The July 15 Meta-ready design and redirect release is documented in `docs/releases/2026-07-15-meta-ready-fantic-pass.md`. The July 22 alpine redesign (design system, `/boot-fitting`, conversion and performance passes) is documented in `docs/releases/2026-07-22-alpine-redesign.md`.
