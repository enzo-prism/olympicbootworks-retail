# September 6, 2026 analytics configuration

## Verified destinations

- GA4 account `371065764`, property `508275630` (Olympic Bootworks Website), web stream `12280511247`, measurement ID `G-BDFVXXMY5Z`.
- Time zone America/Los_Angeles; reporting currency USD.
- The duplicate Buck Brown stream `G-NDRPCY4GV0` remains absent from source. A real network audit exposed a second remotely connected legacy destination `G-36WRRLZB2B` on property `493377728`. Reassigned it from primary Google tag `GT-P3FDSWRH` to an isolated tag named `Olympic Bootworks legacy GA4 - detached`, which was not installed in the site. Saved tag readback and downloaded Google loader now show only `G-BDFVXXMY5Z` as the primary tag destination. Historical properties were not deleted and unrelated shared tags were not changed.
- The GA4 API showed recent page views and lead events from both public hostnames. This proves pre-release collection, not validation of the new implementation.
- `generate_lead` is enabled as a GA4 key event; verified in Admin.
- Google Ads retains its existing separate tag/action `AW-17608821238/ZWXjCI_f_aUbEPaTxcxB`. GA4 currently has no linked Ads account; direct Ads conversion tagging does not depend on that link. No Ads account or bidding changes were made.
- Vercel project `v0-olympic-bootworks-cy`: enabled Web Analytics on the existing included plan. Added `@vercel/analytics/next` version 2.0.1 integration. No Analytics Plus upgrade or Speed Insights subscription was enabled.

## Corrections

- GA Enhanced Measurement had browser-history pageviews enabled while the application manually sent them. Disabled that setting and read back the saved unchecked state. Keep page-load measurement available; the application config uses `send_page_view: false` and owns pageviews.
- The primary Google tag also had a remotely configured `generate_lead` rule matching `/contact` pageviews. Disabled that rule by changing its source event to the unused `obw_disabled_contact_page_rule`, preserving its configuration reversibly. Real email/phone/test-ride actions remain the only intended lead triggers.
- GA bootstrap precedes external tag loading. Capture virtual page URL/title when navigation happens, maintain previous-page referrers, cancel stale retries, and deduplicate only after queueing.
- Google basic consent mode explicitly reports the analytics/measurement choice; advertising user-data and personalization remain denied because the banner does not request those permissions. Consent withdrawal updates Google before unloading all trackers.
- Retry callbacks check consent again. If persistent storage is blocked, a per-tab session-storage fallback preserves the choice across navigation and reload; an in-memory fallback keeps the UI and tracking decision aligned if both are blocked. If a decline cannot be persisted, a reload with `_analytics_opt_out=1` prevents stale acceptance from reloading scripts; the marker is excluded from analytics URLs.
- Optional scripts remain consent-gated. Development and Vercel previews do not mount tracking scripts. Vercel collection is limited to Vercel production builds because Replit does not expose the first-party collection endpoint.
- URL sanitation removes unrecognized query keys, fragments and credentials while retaining valid allowlisted UTM/click identifiers. Do not place visitor personal information in campaign labels.
- Passive contact/catalog events now follow the accepted pageview instead of running once before consent. Product pages emit `view_item` with catalog model/category/price.
- Corrected malformed contact-card mailto URLs, added missing About-page phone tracking, and included model/surface attribution on bike-card email events.
- Vercel tracks consented pageviews and contact actions independently of Google tag readiness. Custom actions use at most two properties (`surface`, optional `model`) supported by the included plan.
- Privacy notice and consent copy now disclose Vercel Analytics.

Registered three event-scoped GA4 custom dimensions for reporting: `lead_source`, `contact_method`, and `content_id`. They apply prospectively; registration does not backfill historical custom-dimension reports.

## Event contract

| Trigger | GA4 | Vercel | Google Ads |
| --- | --- | --- | --- |
| Consented page/SPA navigation | `page_view` | pageview | No lead conversion |
| Contact page | `contact_funnel` | pageview | No |
| E-bike catalog | `view_item_list` | pageview | No |
| Model detail | `view_item` | pageview | No |
| Email / phone | `generate_lead` with contact method, placement and available model | `email_click` / `phone_click` | Existing action |
| Test-ride inquiry | `generate_lead`, lead_type `bike_test_ride` | `test_ride_request` | Existing action |
| Copy inquiry | `contact`, contact_method `email_copy` | `email_copy` | No |

An email/phone click measures inquiry intent, not a confirmed received inquiry or purchase. Test runs intercept lead collection to avoid fabricated production conversions.

## Verification and operational boundary

`pnpm check` passed with 35 tests and the production build. The SEO crawl passed 1,000 assertions across 20 pages. The real-loader browser audit passed 32 of 32 checks with zero runtime errors: three primary-stream GA pageviews, three sanitized Vercel views, no passive leads, and verified consent withdrawal. All audit ingestion was intercepted.

For the browser regression audit, build with `NEXT_PUBLIC_VERCEL_ENV=production pnpm build`, start the production app, then use the Playwright CLI instructions in `scripts/verify-analytics-browser.mjs`. The audit uses real vendor loader code and intercepts collection requests. It catches unexpected GA destinations and passive-page lead rules as well as consent, navigation, attribution and Vercel collection defects.

Run `pnpm check`, production browser consent/navigation checks, and `pnpm verify:seo --base-url URL`. Inspect actual Google collection and Vercel first-party responses after deployment; allow report-processing time before judging dashboard totals.

The public domain still points to Replit (`34.111.179.208`, Google Frontend), while the verified Vercel production alias is `https://v0-olympic-bootworks-cy.vercel.app`. Publishing to Vercel does not update the custom-domain application. The GA4 stream setting applies immediately to both hosts; code changes require Replit sync/publish or a domain cutover to Vercel. No DNS migration has been authorized in this session.

## References

- [Google consent mode](https://developers.google.com/tag-platform/security/guides/consent)
- [Google manual pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Google single-page application measurement](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications)
- [Vercel Analytics setup](https://vercel.com/docs/analytics/quickstart)
- [Vercel Analytics configuration](https://vercel.com/docs/analytics/package)
