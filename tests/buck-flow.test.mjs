import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")

test("homepage leads e-bike visitors into Buck's requested flow", async () => {
  const home = await read("components/home-client.tsx")
  // The headline uses a non-breaking space to keep "Lake Tahoe" on one line.
  assert.match(home, /Fantic E-Bikes in Lake(?:&nbsp;|\s)Tahoe/)
  assert.match(home, /href="\/e-bikes"/)
  assert.match(home, /Email Buck/)
  assert.match(home, /Italian Made Freedom/)
  assert.match(home, /CopyEmailButton/)
  assert.match(home, /USA TODAY 10Best Readers/)
  assert.match(home, /Runner-up: Best Ski Shop/)
  assert.match(home, /10best\.usatoday\.com\/awards\/olympic-bootworks-olympic-valley-california/)
  assert.doesNotMatch(home, /Shop Now|ShoppingCart|item_id: "shop_now"/)
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
  const { loadTypescriptModule } = await import("./load-typescript-module.mjs")
  const { GET, HEAD } = await loadTypescriptModule("../app/shop/route.ts", import.meta.url)

  for (const handler of [GET, HEAD]) {
    const response = handler()
    assert.equal(response.status, 308)
    assert.equal(response.headers.get("location"), "https://www.olympicbootworks.com/e-bikes")
    assert.doesNotMatch(response.headers.get("location"), /localhost|127\.0\.0\.1/)
    assert.equal(await response.text(), "")
  }
})

test("global navigation has no cart or shop-now path", async () => {
  const navigation = await read("components/navigation.tsx")
  assert.match(navigation, /E-Bikes & Prices/)
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
