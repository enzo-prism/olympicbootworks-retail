# July 24, 2026 — Trina Fantic photography refresh

This release integrates Trina's Tahoe and Olympic Valley Fantic photography into the
current inquiry-first website. It replaces the unreliable homepage Vimeo background
with a fast, art-directed photo hero while preserving the existing bike and boot-fitting
conversion paths.

## Asset review

- Reviewed the full 270-photo delivery and removed renamed duplicates from consideration.
- Rejected a visually strong panorama after finding a stitching defect.
- Committed only four optimized, metadata-stripped WebP derivatives rather than raw originals.
- Added useful alt text describing the bikes, activity, and Tahoe location.

## Placements

- Homepage hero: three Fantic e-mountain bikes overlooking Lake Tahoe.
  - Dedicated 2400×1350 desktop crop.
  - Dedicated 1200×2133 mobile crop.
- Homepage e-bike path card: two riders on red Fantic Issimo e-bikes in Tahoe.
- `/e-bikes`: new Olympic Valley editorial section featuring red and white Issimo bikes
  with Palisades Tahoe behind them.

## Implementation

- Added `components/tahoe-bike-hero.tsx` for responsive `<picture>` art direction.
- Removed the Vimeo player from the homepage, eliminating the live restricted-content
  error and mobile loading spinner. `components/vimeo-video-hero.tsx` remains in use by `/pros`.
- Stored the new derivatives in `public/images/fantic-tahoe/`.
- Preserved the existing inquiry-first CTAs, analytics events, model cutouts, and pricing flow.

## Verification

- `pnpm check`: lint, strict TypeScript, 19 tests, and production build passed.
- Desktop and mobile visual checks passed for `/` and `/e-bikes`.
- Both pages had zero broken images and no horizontal overflow at 390px.
- Independent final review found no material correctness, accessibility, performance,
  responsive-layout, or visual issues.
