# November 20, 2026: SEO and answer-engine entity pass

Follows the [September 6 audit](2026-09-06-seo-aeo.md). The public domain already served `main` (winter-hours release, #10), and the September fundamentals held: canonicals, unique titles, social metadata, sitemap, robots, product and breadcrumb schema. This pass covers what was left: entity clarity, thin local pages, hidden content and snippet length.

## Findings on the live site (before)

| Finding | Why it matters |
| --- | --- |
| Organization schema had no description, founder, founding date, contact points or link to its shops | Answer engines build a business "entity" from these; Buck Brown and the 1994 founding were visible on /about but not machine-readable |
| Shop schema lacked coordinates, map link, area served and services; Olympic Valley was named "North Lake Tahoe" while its page and address say Olympic Valley | Local results and "near me" answers lean on geo and consistent names |
| Shop description ran two sentences together without a period ("…adventures. Stocked and ready for ski season") | Sloppy text is quoted verbatim |
| Location pages were the thinnest indexable pages (~380 words, 2 H2s, no Q&A) | They are the pages that should rank for "ski boot fitting Olympic Valley / South Lake Tahoe" |
| Contact FAQ answered "What are the hours?" with "listed in the location cards above" | Not quotable on its own |
| /pros rendered only the active athlete tab in HTML | Six of eight athlete profiles were missing from crawled HTML |
| Homepage (197), boot-fitting (186) and every model page (185–211) descriptions exceeded ~160 characters; model pages shared a templated tail and omitted the price | Truncated snippets; price is the main thing a bike searcher wants |
| Gallery and Testimonials H1s were one generic word | Weak page topics |
| No plain-text summary for AI assistants (/llms.txt 404) | Cheap, data-driven, and read by some assistants and agents |

## Changes

- **One sitewide `@graph`** (`components/seo-jsonld.tsx`): WebSite, Organization (description, `foundingDate` 1994, founder, award, `knowsAbout`, `contactPoint` per shop, `subOrganization`), Person (Buck Brown, "Founder & Master Boot Fitter" as on /about), both SportingGoodsStores (geo, `hasMap`, `areaServed`, Fantic brand, fitting services as offers, existing dated hours) and the fitting Service, now defined once and referenced from /boot-fitting.
- **Shop data** (`data/locations.ts`): rooftop coordinates (OpenStreetMap address match, Nov 20, 2026) and the neighboring ski area (Palisades Tahoe, Heavenly Mountain Resort) as place names only; shared `directionsUrl` and `winterScheduleSummary`.
- **Location pages**: five self-contained "Quick answers" (where, hours, boots in stock, appointments, existing boots) from `data/shop-faqs.ts`, mirrored in `WebPage`/`FAQPage` schema, plus links to fitting and e-bikes. Each answer names the shop and phone so it stands alone when quoted.
- **Contact**: the hours answer states the winter schedule and both phone numbers.
- **/pros**: all athlete tabs render server-side (`forceMount`); inactive ones stay hidden until selected.
- **Descriptions**: home and fitting trimmed to ≤160; model pages use `bikeMetaDescription` ("Fantic XTF 1.5, $X at Olympic Bootworks in Lake Tahoe. …"), capped at 160.
- **H1s**: "Boot Fitting & Shop Gallery", "Customer Reviews & Testimonials".
- **/llms.txt**: generated at build from `data/locations.ts`, `data/bikes.ts` and `data/boot-fitting-faqs.ts`.
- **Checks**: `verify:seo` now fails on descriptions over 160 characters and on a missing or malformed /llms.txt; unit tests cover model descriptions and shop coordinates.

No hours, prices, stock, specifications, reviews, ratings or new claims were invented. The Olympic Valley street line still reads "Squaw Valley Road" pending Buck's confirmation.

## Validation

- `pnpm check`: lint, strict TypeScript, 49 tests, production build.
- Local production crawl: **3,356 checks across 22 sitemap pages, 0 failures**.
- South Lake Tahoe page at 320px: no horizontal overflow; Q&A readable.

## Follow-through (needs people, not code)

1. Sync Replit from `main` and republish, then run `pnpm verify:seo` against https://www.olympicbootworks.com.
2. Google Business Profile: confirm both shops have the same names, phones, winter hours, holiday closures and website links as the site (`/locations/olympic-valley` and `/locations/south-lake-tahoe`), and that the categories include ski shop / boot fitting. GBP is the largest local-ranking lever and is outside this repo.
3. Ask Buck: confirm "Olympic Valley Road" vs. "Squaw Valley Road" for NAP consistency; a typical fitting length and price range (the most-asked question the site cannot answer yet); boot brands carried (brand + "Tahoe" searches).
4. Ask happy customers for Google reviews (the review link is in `lib/google-business.ts`); review count and recency feed local rankings and AI recommendations.
5. Submit the sitemap in Search Console and Bing Webmaster Tools (Bing feeds ChatGPT search and Copilot) and watch the location pages' impressions.
