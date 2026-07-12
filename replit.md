# Olympic Bootworks - Replit Configuration

## Overview

Olympic Bootworks is a Next.js website for a Lake Tahoe ski-boot-fitting and Fantic e-bike shop with two locations (Olympic Valley flagship + South Lake Tahoe). Custom boot fitting (proprietary Heel-Loc technology, ZipFit liners), athlete profiles, and an embedded Ecwid/Lightspeed storefront on `/shop`.

**See `README.md` for the canonical project documentation** (stack, file map, seasonal-content workflow, conversion tracking). This file only records Replit-specific details and preferences.

## User Preferences

Preferred communication style: Simple, everyday language.

## Replit specifics

- Dev server runs on port 5000 (`pnpm dev`).
- Package manager: pnpm.

## Key facts (keep in sync with code — the code is the source of truth)

- Framework: Next.js 16 (App Router) + React 19 + TypeScript. Tailwind CSS 3 + shadcn/ui.
- No database or CMS. Content lives in `data/locations.ts`, `data/testimonials.ts`, and page components.
- Contact emails: North Lake `buck@olympicbootworks.com`, South Lake `SouthLake@Olympicbootworks.com`. No contact forms — email/phone links are the conversion actions.
- Hours and the seasonal notice live in `data/locations.ts` (`seasonalScheduleNotice`, per-location `hours`). Summer 2026: both locations open by appointment; regular hours resume in fall.
- Analytics: GA4 dual streams (`G-BDFVXXMY5Z`, `G-NDRPCY4GVO`) + Google Ads conversions (`AW-17608821238`), configured in `lib/analytics-config.ts` (env-overridable). Hotjar in `app/layout.tsx`.
- Images use standard `next/image` with optimization enabled (`next.config.mjs`). The old multi-wrapper "StandardImage" system was removed.
- Video: Vimeo Player API background heroes + YouTube embeds; IDs are hardcoded in components.
- E-commerce: Ecwid/Lightspeed embed in `app/shop/shop-client.tsx` (store id 115212795); it hardens against third-party script errors and scrubs exact stock counts from the UI.
- E-bikes: `/e-bikes` hub + homepage featured row render from `data/bikes.ts`, which mirrors the Ecwid catalog (prices, stock, deep links) and must be updated whenever the store changes. `financing.enabled` there stays `false` until a BNPL provider is live in the Ecwid admin. See README "E-bike merchandising".
