# October 26, 2026: Boots-first, stocked and ready

Buck emailed (“Boot time!”): the website needs to focus on boots, still include bikes, and highlight being stocked and ready to go.

## First pass (commit 1ea160c, pushed to `main`)

Swapped the homepage headline and hero to boots and moved Boot Fitting ahead of E-Bikes in navigation. The rest of the page, the banner and the seasonal data still described a summer, appointment-only shop.

## Redesign (branch `boots-stocked-redesign`)

- **Homepage** rebuilt around the stock message: split hero with the stocked boot wall and Buck at work, “In stock for the 2026–27 season” signal, Book a Boot Fitting / Visit a Shop CTAs; proof strip (USA TODAY 10Best, World Cup athletes, Heel-Loc, both shops); “Walk in. Get fit. Go ski.” three-step process; fit services; boot-led testimonials; pros + Heel-Loc video; both shops with tap-to-call and directions; compact Fantic e-bike section with current prices; closing CTA with both phone numbers. The generic services carousel, duplicate path chooser and scroll cue were removed.
- **Ski-season data**: `data/locations.ts` now carries the stock message instead of the summer schedule, so the banner, location cards, footer, contact FAQs and JSON-LD all say the shops are stocked. No hours are invented; visitors are asked to call ahead.
- **Banner** is an ink strip with the in-stock dot linking to the homepage shop section.
- **Navigation/footer**: “Ski Boots & Fitting” first, desktop CTA is “Book a Fitting” (prefilled fitting email); “Request Appointment” labels became “Book a Fitting”.
- **/boot-fitting** opens with an in-stock section and adds a “Does Olympic Bootworks sell ski boots?” answer (also in FAQPage JSON-LD).
- **/shop/boots** now 308-redirects to `/boot-fitting` instead of `/contact`.
- New `stock` color token and `StockPill` component; tests cover the stock copy, the absence of invented hours, section order and the redirect.

## Follow-through

- Get Buck’s winter hours for both shops, then replace `sharedStoreHours`.
- Address still reads “Squaw Valley Road” (renamed Olympic Valley Road in 2022); confirm with Buck before changing NAP data.
- Replit must sync `main` and republish for the public domain; verify the homepage, `/boot-fitting`, `/shop/boots` → `/boot-fitting`, and phone/email links afterward.
