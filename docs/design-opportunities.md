# Top 3 Design Opportunities

After analyzing the current codebase and UI patterns (Navigation + LocationBanner, Vimeo-based heroes, shadcn cards, Ecwid shop embed, and the Footer), here are the three best opportunities to improve design and outcomes.

1) Unify the “Hero” System for Clarity, Performance, and Accessibility
- What’s happening now
  - Multiple hero implementations exist (VimeoVideoHero, VimeoVideoHeroRobust, ShopVideoHero). Each renders text over third-party video iframes. This creates inconsistency in spacing, overlay, and text scales across pages and can feel heavy on mobile.
- Why it matters
  - Consistent typography, CTAs, and overlay treatment reduce cognitive load.
  - Fewer hero variants = less maintenance and fewer layout quirks. A leaner hero also improves perceived performance on mobile.
  - Accessibility: we should respect reduced motion and ensure legible contrast.
- Design approach
  - Create one AdaptiveVideoHero and use it site‑wide (including /shop). It should:
    - Support modes: { full, large, medium, small } heights; consistent vertical rhythm on all pages.
    - Accept poster (required), overlayStrength (0–100), and ctas (primary, secondary).
    - Respect “prefers-reduced-motion”: swap the video for the poster image automatically on users who prefer reduced motion.
    - Ensure text legibility with a gradient overlay and clamp-based responsive type scale.
  - Visual style
    - Bold headline (H1) with clear subhead, then a primary CTA and optional secondary CTA. Keep hero content centered on desktop and slightly top‑weighted on mobile to bring content above the fold.
- Implementation notes (quick wins)
  - Replace page-level VimeoVideoHero usages with AdaptiveVideoHero and pass the same copy you already have.
  - Add a required poster prop to remove flashes before the video loads.
  - Hide player chrome and ensure the video is muted, looped, and plays inline with no controls; pause on blur to save battery.
  - Add a consistent H1 in each page DOM (outside the iframe) for SEO and screen readers.
- Acceptance criteria
  - All pages render the same hero spacing and text sizes; lighthouse shows improved Cumulative Layout Shift; reduced-motion users see static posters.

2) Raise Shop Discoverability and Conversion Above the Fold
- What’s happening now
  - The shop loads a third‑party embed after the hero. There’s a helpful Fantic announcement block, but product discovery depends on categories rendered by the embed later.
- Why it matters
  - Users should see what they can buy immediately, even before the embed finishes. Early surfacing of categories and bestsellers increases engagement and reduces bounce on slow connections.
- Design approach
  - Add a pre-rendered “Shop Highlights” strip right under the hero:
    - Three to six compact cards linking to key categories (e.g., E-MTB, Trail, Enduro, Accessories).
    - A lightweight “Bestsellers” mini-grid (static curated SKUs or placeholders that deep link into embedded product browser filters).
  - Add trust UI near CTAs: “Authorized Fantic Dealer,” “Nationwide shipping $299,” and “8 years as a dealer.”
  - Provide a persistent bottom sheet CTA on mobile (sticky bar) with “Shop Bikes” and “Call” buttons.
- Implementation notes (quick wins)
  - Create a new component <ShopHighlights> with shadcn Cards; render on the server for instant display.
  - Keep current Ecwid embed as-is; just add static links that anchor users into the right filtered views.
  - Ensure skeletons are present for any async bits; prioritize meaningful content in first viewport.
- Acceptance criteria
  - Above-the-fold shows category cards + one curated row before embed; average time-to-first-interaction feels faster; click-through to categories increases.

3) Streamline Header and Mobile Actions for Task Completion
- What’s happening now
  - The header includes a LocationBanner and Navigation (fixed). On mobile, there’s a sheet menu and a phone icon; Shop CTA exists but competes with the hamburger and location controls. The LocationBanner adds vertical height which can hide content behind the fixed header on small devices.
- Why it matters
  - High-intent users want fast paths: Call, Book a fitting, Shop. On small screens, these should be always reachable without opening the menu.
- Design approach
  - Consolidate the top bar height on mobile; reduce padding in LocationBanner and ensure the main content offset matches its runtime height (already partially done).
  - Add a compact “Action Rail” on mobile (persistent at the bottom or under the hero) with:
    - Call North / Call South (detect preferred location from selector)
    - Book a Fitting
    - Shop
  - Make the active route state more visually distinct in the nav (thicker underline or pill).
- Implementation notes (quick wins)
  - Add a mobile-only <ActionRail> component with 3–4 prominent buttons; ensure safe-area inset support on iOS.
  - Tighten spacing classes in LocationBanner under 380px width; verify no overlap with fixed header.
  - Keep color use aligned to brand variables; avoid introducing more blues; reuse primary and muted scales for consistency.
- Acceptance criteria
  - Mobile users have one-tap access to top tasks; first-contentful interaction is improved; header no longer feels “stacked” or pushes content too far down.

---

Next steps (optional)
- I can implement the unified AdaptiveVideoHero and the ShopHighlights components, then add the mobile ActionRail. Each change is backward-compatible and can be toggled per page.
- Once the hero is unified, we can tune a single typography scale and spacing ramp for the whole site using Tailwind tokens and your existing CSS variables.
