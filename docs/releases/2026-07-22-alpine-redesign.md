# July 22, 2026 — Alpine redesign, boot-fitting funnel, performance pass

Two commits on `main`: the alpine design-system redesign and a follow-up
performance/conversion/consistency round. All changes preserve the
inquiry-first model — no checkout, no cart, prefilled email remains the
primary conversion.

## Design system

- Fraunces (display serif) + Inter, self-hosted via `next/font`; global rule
  applies the display face to h1–h3.
- Alpine palette as tokens in `app/globals.css`: glacial-blue `primary`
  (`hsl(205 70% 31%)`), `ink` deep-navy for dark bands, ice/stone
  `secondary`/`muted` tints. Raw grays and hex values removed site-wide.
- One eyebrow-label pattern (`tracking-[0.22em]` uppercase), one section
  rhythm (`py-16 md:py-24`), shadcn Button everywhere.
- Dark mode removed on purpose: the layout sets `forcedTheme="light"` (guards
  visitors with stale `theme` localStorage) and no `dark:` variants remain.

## Pages

- Homepage rebuilt: video hero over a static poster, dual-path cards
  (e-bikes / boot fitting), Heel-Loc icons (emoji removed), stats row,
  ink closing band with two real links.
- New `/boot-fitting` landing page (nav "Boot Fitting" now points here);
  added to the sitemap.
- E-bikes hub + model pages restyled; model pages gained a sticky mobile
  "Email Buck about this bike" bar and a trust strip (authorized dealer +
  Google reviews link).
- About, contact, testimonials, pros, gallery, and the error/404 pages
  brought onto the system; template-era gradient cards and dead "View All"
  buttons removed from `/pros`.
- `/shop` now 308-redirects to `/e-bikes` (`app/shop/route.ts`), mirroring
  `/shop/boots` → `/contact`. Footer links updated; Testimonials linked.

## Conversion

- `lib/fitting-inquiry.ts`: prefilled boot-fitting inquiry template
  (location-aware), used by every fitting CTA and both contact cards.
- `CopyEmailButton` can copy the full composed inquiry (To/Subject/body) so
  webmail-only visitors keep the intake template; wired on contact, model
  pages, and the home hero.
- Mobile header is email-first; phone lives in the menu. Test-ride emails
  carry a prefilled body.

## Performance

- Vimeo hero player (~1.5MB) defers until window load + idle, preconnects
  on commit, pauses offscreen; `/` and `/pros` both have poster frames.
- One `SiteImage` component: blur-up placeholders, working `onError`
  fallback chain, YouTube `maxresdefault` → `hqdefault` guard. Replaced
  next-image/standard-image/enhanced-image.
- Optimizer `qualities` reduced to `[75]`; ~2MB of asset savings (PNG→JPG,
  sized logo, real apple-touch-icon); ~470 lines of dead CSS deleted.

## Accessibility

- Skip-to-content link, 44px carousel dots and banner dismiss, mobile
  carousel arrows, star-rating screen-reader text, contrast fixes on
  footer/privacy links, contact heading hierarchy, single sheet close
  button.

## Tests

`tests/buck-flow.test.mjs` updated to the new equivalents: headline permits
the non-breaking space, the Fantic band asserts `bg-ink`, and the `/shop`
test now asserts the 308 redirect (same pattern as `/shop/boots`).

## Post-publish verification

Follow README "Release checks": both 308 redirects, `/boot-fitting` 200,
model routes, inquiry links, wordmark asset, mobile navigation.
