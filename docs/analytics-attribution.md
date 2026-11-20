# Traffic-source attribution

How to see which channels bring new visitors and leads. Code-side measurement is described in
[the September analytics audit](releases/2026-09-06-analytics.md); this file covers the links and
account settings that sit outside the code.

## What the site sends (November 20, 2026)

Every `generate_lead`, `contact` (email copy) and `directions_click` event carries:

| Parameter | Values | Meaning |
| --- | --- | --- |
| `lead_category` | `boot_fitting`, `ebikes`, `general` | What the visitor was asking about (`lib/lead-category.ts`) |
| `shop_id` | `olympic-valley`, `south-lake-tahoe` | Shop the click goes to, when known |
| `lead_source` | e.g. `home_hero_fitting`, `ebike_xtf-1-5` | Button or link that was clicked |
| `contact_method` | `email`, `phone`, `email_copy` | How they reached out |

Every prefilled inquiry email (fitting, bike model, test ride) ends with **"How did you hear about
us?"** so the shop sees the source of each real inquiry, including people who never accepted
analytics. Ask walk-ins the same question and keep a simple tally per month.

## Tagged links to use

The site keeps `utm_*` values made of letters, numbers, spaces, `_`, `.` and `-` (see
`lib/analytics-url.ts`). Use them exactly; change only the campaign part.

| Where the link lives | URL |
| --- | --- |
| Google Business Profile, Olympic Valley: website | `https://www.olympicbootworks.com/locations/olympic-valley?utm_source=google&utm_medium=organic&utm_campaign=gbp_olympic_valley` |
| Google Business Profile, South Lake Tahoe: website | `https://www.olympicbootworks.com/locations/south-lake-tahoe?utm_source=google&utm_medium=organic&utm_campaign=gbp_south_lake_tahoe` |
| Google Business Profile: appointment link (either shop) | `https://www.olympicbootworks.com/boot-fitting?utm_source=google&utm_medium=organic&utm_campaign=gbp_appointment` |
| Instagram bio | `https://www.olympicbootworks.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Facebook page | `https://www.olympicbootworks.com/?utm_source=facebook&utm_medium=social&utm_campaign=page` |
| Staff email signatures | `https://www.olympicbootworks.com/?utm_source=email_signature&utm_medium=email&utm_campaign=staff` |
| In-store QR code (per shop) | `https://www.olympicbootworks.com/boot-fitting?utm_source=qr&utm_medium=offline&utm_campaign=counter_olympic_valley` |
| Meta ads | Follow [the Meta handoff](meta-linking-handoff.md): `utm_source=meta&utm_medium=paid_social&utm_campaign=<campaign>&utm_content=<ad>` |

Business Profile links keep `utm_medium=organic` so GA4 still files them under Organic Search;
the campaign name separates them from ordinary Google results. Don't tag links between pages of
this site; that overwrites the visitor's real source.

## GA4 and Google account settings (one-time, in the Google UIs)

Status as of November 20, 2026 (property 508275630):

1. **Custom dimensions** (Admin → Custom definitions, scope *Event*): `lead_category` created
   Nov 20, 2026; `shop_id` existed since Nov 3. (`lead_source`, `contact_method`, `content_id`
   already existed.) They apply from creation onward; nothing is backfilled. **Done.**
2. **Key event**: `directions_click` is a key event (Admin → Events), the best web signal for a
   walk-in. Do not import it into Google Ads as a conversion. **Done.**
3. **AI assistants channel**: channel group **"Default + AI assistants"** (a copy of the default
   group, not primary) has a channel *AI assistants* placed just above *Referral*: Source
   partially matches regex
   `chatgpt\.com|openai|perplexity|gemini\.google|bard\.google|copilot\.microsoft|claude\.ai|you\.com`.
   GA4's own predefined *AI Assistant* channel stays below it and catches anything the regex
   misses. Pick the group in Traffic acquisition's channel dropdown. Channel groups also apply
   to past data. **Done.**
4. **Search Console link**: domain property `olympicbootworks.com` linked to the web stream
   since Jan 7, 2026. **Done.**
5. **Google Ads link** (Admin → Product links → Google Ads) for the account that owns
   `AW-17608821238`, so paid campaigns and their leads appear in GA4. **Open:** that account is
   not among the Ads accounts the Design Prism login can manage. Whoever owns it links it, or
   uses "Request access to other Google Ads accounts" with its customer ID.
6. **Bing Webmaster Tools**: verify the site and submit `https://www.olympicbootworks.com/sitemap.xml`
   (Bing feeds ChatGPT search and Copilot).

## Monthly read

- GA4 → Reports → Acquisition → Traffic acquisition, by session source/medium and campaign: new
  users and key events per channel.
- Explore → Free form: rows `Session source / medium`, columns `lead_category`, value *Event
  count* filtered to `generate_lead` → boot-fitting leads by source.
- Google Business Profile → Performance (each shop): calls, direction requests, website clicks.
- The inquiry-email and walk-in "How did you hear about us?" tally.

GA4 only counts visitors who accept analytics in the consent banner, so its totals are a sample,
not the whole audience. Compare channels by share, not absolute counts.
