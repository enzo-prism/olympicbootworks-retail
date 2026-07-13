# Design & Growth Opportunities

Status as of July 2026, after the site overhaul and Buck-aligned e-bike inquiry upgrade.
Items are ordered by expected impact. See `README.md` for the owner-approved conversion
flow and how the e-bike data layer works.

## Done (July 2026)

- ~~Unify hero variants~~ — unused hero/video components (VimeoVideoHeroRobust,
  AdaptiveVideoHero, YouTubeVideoHero, etc.) were removed; the site now uses three
  purposeful heroes: `VimeoVideoHero` (video pages), `MinimalPageHero` (content pages),
  `ShopVideoHero` (shop).
- ~~Shop discoverability~~ — solved via the `/e-bikes` hub, a homepage featured-bikes
  row, and a bike-first `/shop` SEO layer with working category links.
- ~~Bike-description access~~ — all 11 catalog items have static, indexable
  `/e-bikes/[slug]` pages with plain-language descriptions and comparison guidance.
- ~~Owner-aligned inquiry path~~ — the homepage and bike cards now lead with e-bike
  descriptions and model-specific, prefilled email inquiries to Buck. Ecwid purchase
  links remain available only as a secondary option on model pages.
- ~~Inventory privacy~~ — the storefront can show general availability while exact
  inventory quantities remain disabled and scrubbed from the embedded shop.

## Open opportunities

### 1. Owner-dependent content confirmations (highest leverage, small effort)
- **Confirm model year and specifications for every physical bike.** Ecwid currently has
  empty product descriptions, so the site deliberately avoids unverified motor, battery,
  travel, component, range, size, and color claims. Once Buck confirms each SKU/model year,
  add verified specifications to `data/bikes.ts` and its model page.
- **Confirm fulfillment and visit policies.** Keep shipping prices, preparation promises,
  test-ride locations, warranty wording, and payment options general until Buck confirms the
  exact current terms.
- **Financing remains intentionally disabled.** If Buck later chooses to emphasize online
  checkout and enables a BNPL provider in Ecwid, set `financing.enabled: true` only after
  verifying that checkout can deliver the advertised option.
- **Reclaim `fanticbikewarehouse.com`** — still Google-indexed as "Official Fantic
  Dealer" with an Olympic Valley registrant, currently 404. If it's ours, 301 it to
  `/e-bikes`.
- **Fantic product/lifestyle photography** — the repo has zero bike photos; cards
  currently use Ecwid CDN product shots. Brand assets or a shop photoshoot would
  upgrade the hub hero and social images.

### 2. Local SEO for bikes
- Two geo landing pages: "E-Bike Shop Olympic Valley / Palisades Tahoe" and "E-Bike Shop
  South Lake Tahoe — Ski Run Blvd (near Heavenly)".
- Google Business Profile: add "Electric bike shop" category; citations on
  biketahoe.org, tahoe.com, TripOutside.
- Comparison/buyer-guide content (e.g. "Fantic XTF vs XMF vs XEF", "Fantic vs
  Specialized Turbo Levo") to capture brand-comparison shoppers nationally.

### 3. Mobile action rail
High-intent users want Email / Call / Explore Bikes reachable without the menu. Add a
mobile-only sticky rail (bottom, safe-area aware) with a model-aware Buck inquiry, Call,
and Explore Bikes. Keep Shop secondary, preserve the existing header, and tighten
`LocationBanner` spacing under 380px.

### 4. Hero polish
- `prefers-reduced-motion`: swap Vimeo background videos for a static poster.
- Add a required poster image to `VimeoVideoHero` to remove the black flash before the
  video loads (visible on slow connections and in crawlers).

### 5. Storefront upgrades (Ecwid Business plan)
Product filters (price, motor, battery Wh, travel) require Business/Unlimited plan plus
verified spec attributes on each product. Consider this only if Buck later wants to put
more emphasis on self-service online shopping; the current description-and-email flow is
the approved priority.
