# Design & Growth Opportunities

Status as of July 2026, after the site overhaul and e-bike sales push. Items are ordered
by expected impact. See `README.md` for how the e-bike data layer works.

## Done (July 2026)

- ~~Unify hero variants~~ — unused hero/video components (VimeoVideoHeroRobust,
  AdaptiveVideoHero, YouTubeVideoHero, etc.) were removed; the site now uses three
  purposeful heroes: `VimeoVideoHero` (video pages), `MinimalPageHero` (content pages),
  `ShopVideoHero` (shop).
- ~~Shop discoverability~~ — solved via the `/e-bikes` hub (server-rendered model grid
  with prices and store deep links), a homepage featured-bikes row, and a bike-first
  `/shop` SEO layer with working category links and a trust strip.
- ~~Dead-end bike CTAs~~ — every bike surface now routes to `/e-bikes`, the store, or a
  tracked test-ride request instead of a bare mailto.

## Open opportunities

### 1. Owner-dependent unlocks for the e-bike push (highest leverage, small effort)
- **Enable Klarna** (or another BNPL) in the Ecwid admin, then set
  `financing.enabled: true` in `data/bikes.ts` to turn on "from $X/mo" pricing on every
  bike card. Monthly framing is the single biggest conversion lever at $2–6k tickets.
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
High-intent users want Call / Book / Shop reachable without the menu. Add a mobile-only
sticky rail (bottom, safe-area aware) with Call (location-aware), Book a Fitting/Test
Ride, and Shop. Keep the existing header; tighten `LocationBanner` spacing under 380px.

### 4. Hero polish
- `prefers-reduced-motion`: swap Vimeo background videos for a static poster.
- Add a required poster image to `VimeoVideoHero` to remove the black flash before the
  video loads (visible on slow connections and in crawlers).

### 5. Storefront upgrades (Ecwid Business plan)
Product filters (price, motor, battery Wh, travel) require Business/Unlimited plan plus
spec attributes on each product. Worth it once bike traffic grows; the `/e-bikes` hub
covers browsing needs until then.
