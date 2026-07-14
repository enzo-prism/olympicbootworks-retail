# July 14, 2026 — Inquiry-first Fantic release

## Why this release exists

Buck Brown confirmed that Olympic Bootworks is not using online checkout for the current Fantic e-bike flow. The website now makes the intended path unambiguous: compare the current models and website prices, then contact Buck directly to confirm the exact bike and arrange the next step.

## Customer-facing changes

- Removed the public Lightspeed/Ecwid store, cart, account, and checkout experience.
- Replaced `/shop` with a static “How to Get Your Fantic E-Bike” guide and current-price directory.
- Standardized the journey around model details, Email Buck, Request a Test Ride, and Call Buck.
- Updated Seven Day Living to `$1,499` everywhere and removed the stale `$1,799` checkout value.
- Removed unconfirmed list-price, percentage-off, financing, and live-inventory claims.
- Added a three-step explanation: compare, ask Buck, then confirm the bike and handoff.
- Improved model inquiry emails with rider size, terrain, test-ride interest, and pickup/shipping location.

## Technical changes

- Removed all storefront runtime code, styles, types, deep links, analytics, and catalog-build coupling.
- Self-hosted the 11 e-bike product images under `public/images/e-bikes/`.
- Updated structured data to use absolute local image URLs without unverified availability status.
- Updated navigation, privacy, sitemap, analytics policy, tests, README, Replit guidance, and design notes.
- Kept `/shop/boots` as a legacy 308 redirect to `/contact`.

## Price review

Nine of the eleven current prices have direct support in Buck’s email history. Seven Day Living’s July 13 price is `$1,499`. Two prices still need direct owner reconfirmation, so the website calls them current website prices rather than owner-approved prices:

- XTF 1.5 Carbon — `$4,200`
- 1.4 Carbon Sport — `$4,000`

Do not reintroduce list prices, discount percentages, exact stock status, or technical specifications without a current owner-approved source.

## Verification

- `pnpm check`
- ESLint
- strict TypeScript
- 15 regression tests
- Next.js production build
- local HTTP checks for every public route, all 11 model pages, sitemap, robots, and product images
- rendered-content scans for stale store IDs, scripts, CDN URLs, checkout paths, and `$1,799`

Production hosting remains Replit Autoscale. GitHub `main` is the source of truth.
