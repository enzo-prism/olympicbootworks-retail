# July 15, 2026 — Meta-ready Fantic design and redirect release

## Purpose

This release prepares the verified Fantic pages for Trina's Meta destination linking and closes the promised design and redirect follow-up. Meta campaign activation remains paused until the production readback is complete and Trina receives the final green light.

## Customer-facing changes

- Added the supplied Fantic wordmark to the e-bike process band on a restrained black background.
- Added a prominent mobile Email Buck action directly below each model's name and price.
- Kept the inquiry-first path: compare, email or call Buck, then confirm the exact bike and handoff.
- Repaired `/shop/boots` so its permanent redirect uses the public production origin rather than `localhost`.

## Measurement and reliability changes

- Corrected the secondary GA4 measurement ID to Buck's verified `G-NDRPCY4GV0` value.
- Added product context to model-specific email and phone intent events.
- Added GA4-only measurement for copy-email fallback use without inflating the Google Ads lead conversion.
- Added phone tracking to the mobile header and mobile location menu.
- Updated the consent prompt to accurately name Google Analytics, Google Ads, and Hotjar.
- Added regression coverage for the exact analytics ID, Fantic asset, mobile CTA, copy-email measurement, and legacy redirect.

## Meta handoff boundary

The direct Seven Day destination is `https://www.olympicbootworks.com/e-bikes/seven-day-living`. Lineup-wide creative may use `https://www.olympicbootworks.com/e-bikes`.

No Meta Pixel or Conversions API integration is installed. This release supports Traffic/Landing Page Views linking with Trina's UTMs; it does not support Meta website-lead optimization or Meta-attributed lead reporting. See `docs/meta-linking-handoff.md`.

## Verification requirements

- `pnpm check`
- GitHub Actions pass for the release commit on `main`
- Replit Autoscale republish from the same `main` commit
- Public custom-domain route, redirect, Fantic asset, price, CTA, mobile, and UTM readback

Production proof is recorded separately after the Replit deployment so this release note never confuses local readiness with live state.
