# Olympic Bootworks — olympicbootworks.com

Inquiry-first website for Olympic Bootworks, a Lake Tahoe ski-boot-fitting and Fantic e-bike shop with locations in Olympic Valley and South Lake Tahoe.

Deployment target: Replit Autoscale, configured in `.replit` and published from the Replit project.
Public domain: https://www.olympicbootworks.com.
GitHub `main` is the source of truth; republish from Replit after syncing `main`.

Vercel also builds `main` in project `v0-olympic-bootworks-cy` under `enzo-design-prisms-projects`, at https://v0-olympic-bootworks-cy.vercel.app. On September 6, 2026, both custom-domain DNS records still resolved to Replit/Google infrastructure (`34.111.179.208`), despite appearing in Vercel aliases. A successful Vercel release does not update that public endpoint. Verify DNS, response headers, and release content on the custom domain separately.

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
- Consent-gated GA4, Google Ads conversion measurement, Hotjar, and Vercel Web Analytics
- Replit Autoscale production hosting
- No database, CMS, online storefront, or checkout integration

## Design system

The July 2026 redesign established an "alpine boutique" system. Stay inside it:

- **Type**: Fraunces (display serif) for h1–h3 via a global rule; Inter for body. Both self-hosted through `next/font` in `app/layout.tsx`. Card-level h3s opt out with `font-sans tracking-normal`.
- **Color**: tokens only, defined in `app/globals.css` — glacial-blue `primary`, `ink` (deep alpine navy) for dark bands, ice/stone `secondary`/`muted` tints. No raw hex, no `bg-gray-*`. Fantic red is scoped to `.fantic-theme` on e-bike merchandising.
- **Patterns**: eyebrow labels are `text-xs font-semibold uppercase tracking-[0.22em] text-primary`; section rhythm is `py-16 md:py-24`; alternating bands use `bg-secondary/60`; closing CTAs use `bg-ink text-ink-foreground`.
- **Dark mode is intentionally not offered** — the layout forces the light theme and no `dark:` variants exist. Do not add them.
- **Images**: use `components/site-image.tsx` (blur-up placeholders + working error fallbacks). The homepage uses the art-directed static Tahoe hero in `components/tahoe-bike-hero.tsx`; its desktop and mobile WebP crops live in `public/images/fantic-tahoe/`. The Vimeo hero remains available for `/pros` and always needs a `posterSrc`.

### Mobile rules (owner decision, July 22, 2026)

- Pinch-zoom is locked (`viewport` export in `app/layout.tsx`: `maximumScale: 1, userScalable: false`) so a zoom-out can never strand the layout. Because iOS can still force-zoom for accessibility, the layout itself must stay overflow-free: **nothing may lay out wider than the viewport at 320px**. The known traps are `whitespace-nowrap` buttons with long labels (Button's base class is nowrap — add `whitespace-normal h-auto` for long marketing labels), email addresses without `break-all`, flex rows without `flex-wrap`, and per-page carousel dots (use a counter on mobile).
- The location banner renders as a single tappable line on mobile (`bannerPrimaryShort` in `data/locations.ts`); the full schedule row is `md:` and up.
- Stacked CTA pairs use `w-full sm:w-auto` inside a `max-w-xs sm:max-w-none` wrapper so mobile buttons align to equal widths.
- The hero uses `svh`-based height minus the fixed header (`--banner-height`), never raw `100vh`.

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
| Fantic Tahoe lifestyle photography | `public/images/fantic-tahoe/` |
| E-bike hub and model pages | `app/e-bikes/` |
| Boot-fitting landing page | `app/boot-fitting/` |
| Fitting inquiry template (mailto + copy fallback) | `lib/fitting-inquiry.ts` |
| Legacy `/shop` 308 redirect | `app/shop/route.ts` |
| Model inquiry CTA | `components/bike-inquiry-button.tsx` |
| Sticky mobile bike inquiry bar | `components/bike-sticky-inquiry-bar.tsx` |
| Shared image component | `components/site-image.tsx` |
| Metadata and structured data | `lib/seo.ts`, `components/seo-jsonld.tsx`, page components |
| Deployed crawl regression audit | `scripts/verify-seo.mjs` (`pnpm verify:seo --base-url URL`) |
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

Trina's July 2026 Tahoe/Olympic Valley lifestyle photography is stored as optimized,
metadata-stripped WebP derivatives in `public/images/fantic-tahoe/`. Keep model cutouts
for product accuracy and use these lifestyle images for local context. The homepage
hero has separate desktop and mobile crops; preserve that art direction when replacing it.

## Conversion tracking

Email, phone, and test-ride actions are the real conversions. Page views, e-bike list views, and copy-email fallbacks are GA4-only and must never use the Google Ads lead action. Google, Hotjar, and Vercel Web Analytics load only after analytics consent. Development and Vercel preview builds do not mount tracking scripts. Vercel Analytics is enabled on Vercel production builds only; Replit does not provide its first-party collection endpoint. The site does not currently load a Meta Pixel or Conversions API integration; Meta campaigns must be treated as Traffic/Landing Page Views unless separately approved measurement is added. Keep `components/tracking-consent.tsx` and `app/privacy/page.tsx` aligned when measurement changes.

## Seasonal content

The banner, location cards, footer, and JSON-LD read from `seasonalScheduleNotice` and each location’s `hours` in `data/locations.ts`. Update that file when the schedule changes.

## Release checks

GitHub Actions runs `pnpm check` for pull requests and pushes to `main`. A release is ready for Replit only after lint, strict TypeScript, unit tests, and the production build pass. After publishing, verify the custom domain, homepage, `/e-bikes`, all model routes, `/boot-fitting`, email links, phone links, mobile navigation, the Fantic wordmark asset, and both public-domain redirects: `/shop` → `/e-bikes` and `/shop/boots` → `/contact` (308, no localhost).

The July 15 Meta-ready design and redirect release is documented in `docs/releases/2026-07-15-meta-ready-fantic-pass.md`. The July 22 alpine redesign (design system, `/boot-fitting`, conversion and performance passes) is documented in `docs/releases/2026-07-22-alpine-redesign.md`. The July 24 Trina photography integration is documented in `docs/releases/2026-07-24-trina-fantic-photo-refresh.md`.

## SEO and answer-engine maintenance

- Give every indexable page its own title, description, canonical, Open Graph and Twitter metadata. Canonicals use `https://www.olympicbootworks.com`, including on previews.
- Keep important answers and links in initial HTML. Use visible questions about the actual fitting and inquiry process; avoid creating duplicate town pages or unverified expert claims.
- Keep business identity, addresses, phones, seasonal status, and schema aligned with their shared data. Appointment-only periods must not produce invented opening times.
- Product prices remain catalog-driven. Do not infer availability, condition, shipping terms, reviews, or return policies to fill structured-data fields.
- Sitemap entries include canonical pages only. Omit modification dates unless backed by actual content edits; never replace every date at build time.
- Wildcard crawler access allows search engines and AI search crawlers. Search access and model-training permissions are separate decisions. No special AI file or schema guarantees citations.
- Google retired FAQ rich results in May 2026. Useful visible answers are maintained for customers, with no promise of FAQ search enhancements.
- Run `pnpm check`, start the built app, then run `pnpm verify:seo --base-url http://localhost:3000`. Repeat the crawl against the deployed endpoint. Review mobile pages and inquiry links in a browser.
- Search Console, Bing Webmaster Tools, and Google Business Profile are external follow-through: check indexing, citations, and listing consistency there; a code release alone does not establish ranking gains.

See [September 6 SEO/AEO audit](docs/releases/2026-09-06-seo-aeo.md) for scope, evidence, and hosting follow-through.

The [September 6 analytics audit](docs/releases/2026-09-06-analytics.md) records the verified GA4 stream, saved history-pageview setting, Vercel enablement, event contract, consent behavior and deployment boundary.
