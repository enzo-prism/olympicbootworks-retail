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
- `/shop` is a static “How to Get a Bike” page, not an online store.
- There are no cart, account, checkout, Ecwid, or Lightspeed runtime dependencies.
- Primary conversion: prefilled email to `buck@olympicbootworks.com`.
- Do not publish exact stock counts, unverified availability, or inferred technical specifications.
- Hours and seasonal notices live in `data/locations.ts`.
- Analytics is consent-gated in `components/tracking-consent.tsx`.

Before publishing, run `pnpm check`. After publishing, verify the custom domain and all inquiry links.
