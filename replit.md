# Olympic Bootworks — Replit Configuration

## Overview

Olympic Bootworks is a Next.js inquiry-first website for a Lake Tahoe ski-boot-fitting and Fantic e-bike shop. It does not run an online storefront or checkout. Visitors compare e-bike descriptions and current website prices, then email or call the shop.

See `README.md` for the canonical project and content guidance. This file records Replit-specific details.

## Replit specifics

- Development: `pnpm dev` on port 5000.
- Production: Replit Autoscale with `pnpm build` and `pnpm start`.
- Runtime: Replit `nodejs-22`; the app supports Node.js 20.19 or newer.
- Package manager: pnpm.
- Do not add a `packageManager` field to `package.json`. Replit’s pre-build packager can fail before the application build begins.

## Important source-of-truth rules

- GitHub `main` is the code source of truth. Sync Replit from GitHub before publishing.
- E-bike names, current website prices, descriptions, and image paths live in `data/bikes.ts`.
- E-bike images are self-hosted in `public/images/e-bikes/`.
- Trina's optimized Tahoe/Olympic Valley lifestyle images are self-hosted in
  `public/images/fantic-tahoe/`; the homepage hero uses separate desktop and mobile crops.
- `/shop` permanently redirects (308) to `/e-bikes`; the canonical bike journey lives on the hub and model pages.
- `/boot-fitting` is the boot-fitting landing page; fitting CTAs use the prefilled template in `lib/fitting-inquiry.ts`.
- There are no cart, account, checkout, Ecwid, or Lightspeed runtime dependencies.
- Primary conversion: prefilled email to `buck@olympicbootworks.com`.
- Do not publish exact stock counts, unverified availability, or inferred technical specifications.
- Hours and seasonal notices live in `data/locations.ts`.
- Analytics is consent-gated in `components/tracking-consent.tsx`.
- Meta destination URLs and campaign constraints are documented in `docs/meta-linking-handoff.md`.

Before publishing, run `pnpm check`. After publishing, verify the custom domain and all inquiry links. Confirm the homepage Tahoe hero loads its desktop and mobile crops, the `/e-bikes` Olympic Valley image loads, `/shop` redirects to `https://www.olympicbootworks.com/e-bikes`, `/shop/boots` redirects to `https://www.olympicbootworks.com/contact` (both 308, without `localhost`), `/boot-fitting` returns 200, the Fantic wordmark loads from `/images/brands/fantic-wordmark.jpg`, and the Seven Day Living page returns 200 with its query string preserved.
