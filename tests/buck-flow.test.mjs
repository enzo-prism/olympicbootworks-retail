import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")

test("homepage leads e-bike visitors into Buck's requested flow", async () => {
  const home = await read("components/home-client.tsx")
  assert.match(home, /Fantic E-Bikes in Lake Tahoe/)
  assert.match(home, /href="\/e-bikes"/)
  assert.match(home, /Email Buck/)
  assert.match(home, /Italian Made Freedom/)
  assert.match(home, /CopyEmailButton/)
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
  assert.doesNotMatch(detail, /shopUrl|checkoutPrice|ShoppingCart|secondary online purchase/)
})

test("legacy shop route is a static, inquiry-first buying guide", async () => {
  const shop = await read("app/shop/page.tsx")
  assert.match(shop, /How to Get Your Fantic E-Bike/)
  assert.match(shop, /There is no online checkout/)
  assert.match(shop, /BikeInquiryButton bike=\{bike\}/)
  assert.match(shop, /See models & prices/)
  assert.doesNotMatch(shop, /Ecwid|Lightspeed|my-store-|script\.js|cart/)
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
})
