import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")

test("homepage leads with stocked ski boots while preserving the bike inquiry flow", async () => {
  const home = await read("components/home-client.tsx")
  assert.match(home, /Ski boots in stock\./)
  assert.match(home, /Fit and ready to go\./)
  assert.match(home, /stocked and ready/)
  assert.match(home, /fittingInquiryUrl\(\)/)
  assert.ok(home.indexOf("Custom Boot Fitting") < home.indexOf("Fantic e-bikes</h2>"))
  assert.ok(home.indexOf('id="shops"') < home.indexOf('id="e-bikes"'))
  assert.match(home, /href="\/e-bikes"/)
  assert.match(home, /email Buck/)
  assert.match(home, /Italian Made Freedom/)
  assert.match(home, /USA TODAY 10Best Readers/)
  assert.match(home, /Runner-up: Best Ski Shop/)
  assert.match(home, /10best\.usatoday\.com\/awards\/olympic-bootworks-olympic-valley-california/)
  assert.doesNotMatch(home, /Shop Now|ShoppingCart|item_id: "shop_now"/)
})

test("ski-season stock message stays general; pre-winter hours apply before the Tahoe cutoff", async () => {
  const { seasonalScheduleNotice, locations, openingHoursSpecification, shopSchedule, tahoeDate } = await loadTypescriptModule(
    "../data/locations.ts",
    import.meta.url,
  )
  const copy = Object.values(seasonalScheduleNotice).join(" ")
  assert.match(copy, /stocked/i)
  assert.match(copy, /ski boots/i)
  assert.doesNotMatch(copy, /summer|resume in the fall/i)

  const olympicValley = locations.find((location) => location.id === "olympic-valley")
  const southLake = locations.find((location) => location.id === "south-lake-tahoe")
  assert.ok(olympicValley)
  assert.ok(southLake)
  const before = tahoeDate(new Date("2026-11-21T07:59:59.999Z"))
  assert.equal(before, "2026-11-20")
  const north = shopSchedule(olympicValley, before)
  const south = shopSchedule(southLake, before)
  assert.match(north.notice, /Starting Saturday, Nov 21/)
  assert.equal(north.notice, south.notice)
  assert.equal(north.summary, "Open Wednesday–Sunday, 10 AM–3 PM")
  assert.equal(olympicValley.contact.email, "Info@olympicbootworks.com")
  assert.equal(south.summary, "Call ahead to confirm today's hours")
  assert.equal(southLake.contact.email, "SouthLake@Olympicbootworks.com")

  const closedDays = north.hours.filter((entry) => entry.hours.toLowerCase() === "closed").map((entry) => entry.day)
  assert.deepEqual(closedDays, ["Monday", "Tuesday"])
  const openDays = north.hours.filter((entry) => entry.hours === "10 AM–3 PM").map((entry) => entry.day)
  assert.deepEqual(openDays, ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])

  const spec = openingHoursSpecification(north.hours)
  assert.equal(spec.length, 5)
  assert.ok(spec.every((entry) => entry.opens === "10:00" && entry.closes === "15:00"))
  assert.deepEqual(
    spec.map((entry) => entry.dayOfWeek),
    [
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
      "https://schema.org/Saturday",
      "https://schema.org/Sunday",
    ],
  )
  assert.equal(openingHoursSpecification(south.hours).length, 0)

  for (const entry of south.hours) {
    assert.doesNotMatch(entry.hours, /\d{1,2}(?::(\d{2}))?\s*(?:AM|PM)/i, "South Lake Tahoe hours remain unconfirmed")
  }
})

test("both shops switch at local midnight, split weekdays and close on the two holidays", async () => {
  const { locations, shopSchedule, tahoeDate, shopHoursSchema } = await loadTypescriptModule("../data/locations.ts", import.meta.url)
  const start = tahoeDate(new Date("2026-11-21T08:00:00.000Z"))
  assert.equal(start, "2026-11-21")
  for (const location of locations) {
    const { hours, summary, notice } = shopSchedule(location, start)
    assert.match(summary, /Open daily, 8 AM–5 PM/)
    assert.match(summary, /Closed weekdays from 10 AM to 12:30 PM for Skiesta/)
    assert.match(notice, /Thanksgiving Day .*Christmas Day/)
    assert.equal(hours.length, 7)
    for (const { day, hours: ranges } of hours) {
      assert.equal(ranges, ["Saturday", "Sunday"].includes(day) ? "8 AM–5 PM" : "8 AM–10 AM, 12:30 PM–5 PM")
    }
    const schema = shopHoursSchema(location)
    assert.equal(schema.openingHoursSpecification.filter((r) => r.validThrough === "2026-11-20").length, location.flagship ? 5 : 0)
    const winter = schema.openingHoursSpecification.filter((r) => r.validFrom === start)
    assert.deepEqual(winter.filter((r) => r.dayOfWeek.endsWith("Monday")).map((r) => [r.opens, r.closes]), [["08:00","10:00"],["12:30","17:00"]])
    assert.equal(winter.filter((r) => r.opens === "08:00" && r.closes === "17:00").length, 2)
    for (const [date, name] of [["2026-11-26", "Thanksgiving Day"], ["2026-12-25", "Christmas Day"]]) {
      assert.equal(shopSchedule(location, date).summary, "Closed today for " + name)
      assert.ok(schema.specialOpeningHoursSpecification.some((r) => r.validFrom === date && r.validThrough === date && r.opens === "00:00" && r.closes === "00:00"))
    }
    assert.equal(shopSchedule(location, "2026-12-26").summary, summary)
  }
})

test("boot page leads with the in-stock section and answers whether boots are sold", async () => {
  const page = await read("app/boot-fitting/page.tsx")
  const faqs = await read("data/boot-fitting-faqs.ts")
  assert.match(page, /id="in-stock"/)
  assert.ok(page.indexOf('id="in-stock"') < page.indexOf("Editorial intro"))
  assert.match(faqs, /Does Olympic Bootworks sell ski boots\?/)
  assert.match(faqs, /does not list specific models or sizes/)
})

test("bike cards prioritize descriptions, current prices, and model-specific email", async () => {
  const card = await read("components/bike-card.tsx")
  assert.match(card, /bikeDetailUrl\(bike\)/)
  assert.match(card, /View bike details/)
  assert.match(card, /bikeInquiryUrl\(bike\)/)
  assert.match(card, /Ask Buck about this bike/)
  assert.match(card, /Current price:/)
  assert.doesNotMatch(card, /shopUrl|checkoutPrice|compareAtPrice|ShoppingCart/)
})

test("model detail page explains the direct inquiry and purchase process", async () => {
  const detail = await read("app/e-bikes/[slug]/page.tsx")
  assert.match(detail, /Ask Buck about this bike/)
  assert.match(detail, /How to get this bike/)
  assert.match(detail, /Olympic Bootworks does not use online checkout/)
  assert.match(detail, /Contact Buck to confirm availability/)
  assert.match(detail, /CopyEmailButton/)
  assert.match(detail, /BikeCallButton/)
  assert.match(detail, /className="mt-5 w-full lg:hidden"/)
  assert.doesNotMatch(detail, /https:\/\/schema\.org\/LimitedAvailability/)
  assert.doesNotMatch(detail, /https:\/\/schema\.org\/NewCondition/)
  assert.doesNotMatch(detail, /shopUrl|checkoutPrice|ShoppingCart|secondary online purchase/)
})

test("e-bike hub avoids unsupported stock and condition claims", async () => {
  const page = await read("app/e-bikes/page.tsx")
  assert.doesNotMatch(page, /https:\/\/schema\.org\/LimitedAvailability/)
  assert.doesNotMatch(page, /https:\/\/schema\.org\/NewCondition/)
})

test("legacy shop route permanently redirects to the canonical e-bikes hub", async () => {
  const { GET, HEAD } = await loadTypescriptModule("../app/shop/route.ts", import.meta.url)

  for (const handler of [GET, HEAD]) {
    const response = handler()
    assert.equal(response.status, 308)
    assert.equal(response.headers.get("location"), "https://www.olympicbootworks.com/e-bikes")
    assert.doesNotMatch(response.headers.get("location"), /localhost|127\.0\.0\.1/)
    assert.equal(await response.text(), "")
  }
})

test("footer fitting CTA is tracked like the other fitting mailtos", async () => {
  const footer = await read("components/footer.tsx")
  const button = await read("components/footer-fitting-button.tsx")
  assert.match(footer, /<FooterFittingButton \/>/)
  assert.match(button, /fittingInquiryUrl\(\)/)
  assert.match(button, /trackConversion\("email_click", \{ location: "footer_fitting", shopId: shop\?\.id \}\)/)
})

test("global navigation has no cart or shop-now path", async () => {
  const navigation = await read("components/navigation.tsx")
  assert.match(navigation, /Ski Boots & Fitting/)
  assert.match(navigation, /Book a Fitting/)
  assert.ok(navigation.indexOf("Ski Boots & Fitting") < navigation.indexOf("E-Bikes & Prices"))
  assert.match(navigation, /Email Buck/)
  assert.doesNotMatch(navigation, /CartLink|ShoppingBag|ShopButton|Shop Now|#!\/~\/cart/)
})

test("hero email and phone actions use native anchors", async () => {
  const heroCta = await read("components/hero-cta.tsx")
  const minimalHero = await read("components/minimal-page-hero.tsx")
  assert.match(heroCta, /href\.startsWith\("mailto:"\)/)
  assert.match(heroCta, /<a href=\{href\}/)
  assert.match(minimalHero, /action\.href\.startsWith\("mailto:"\)/)
  assert.match(minimalHero, /<a href=\{action\.href\}/)
})

test("copy fallback selects the email when clipboard access is blocked", async () => {
  const fallback = await read("components/copy-email-button.tsx")
  assert.match(fallback, /emailRef\.current\?\.focus\(\)/)
  assert.match(fallback, /emailRef\.current\?\.select\(\)/)
  assert.match(fallback, /role="status"/)
  assert.match(fallback, /trackConversion\("email_copy"/)
})

test("e-bike process band uses the supplied Fantic logo on black", async () => {
  const page = await read("app/e-bikes/ebikes-client.tsx")
  const logo = await readFile(new URL("../public/images/brands/fantic-wordmark.jpg", import.meta.url))

  assert.match(page, /src="\/images\/brands\/fantic-wordmark\.jpg"/)
  assert.match(page, /alt="Fantic"/)
  // The intro band sits on the ink (deep alpine navy) token, not raw hex or primary.
  assert.match(page, /bg-ink py-12 md:py-16 text-white/)
  assert.doesNotMatch(page, /bg-\[#020107\]|bg-primary py-10 text-primary-foreground/)
  assert.ok(logo.byteLength > 20_000, "Fantic logo should contain the supplied wordmark")
  assert.ok(logo.byteLength < 100_000, "Fantic logo should remain web-optimized")
})
