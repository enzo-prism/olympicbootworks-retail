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
  assert.doesNotMatch(home, /item_id: "shop_now"/)
})

test("bike cards prioritize descriptions and model-specific email", async () => {
  const card = await read("components/bike-card.tsx")
  assert.match(card, /bikeDetailUrl\(bike\)/)
  assert.match(card, /View bike details/)
  assert.match(card, /bikeInquiryUrl\(bike\)/)
  assert.match(card, /Email about this bike/)
  assert.doesNotMatch(card, /View &amp; Buy/)
  assert.doesNotMatch(card, /href=\{bike\.shopUrl\}/)
})

test("model detail page keeps matching checkout secondary and blocks price mismatches", async () => {
  const detail = await read("app/e-bikes/[slug]/page.tsx")
  assert.match(detail, /Ask Buck about this bike/)
  assert.match(detail, /BikeInquiryButton/)
  assert.match(detail, /View secondary online purchase options/)
  assert.match(detail, /href=\{bike\.shopUrl\}/)
  assert.match(detail, /bike\.checkoutPrice === undefined \|\| bike\.checkoutPrice === bike\.price/)
  assert.match(detail, /Online checkout is being updated/)
  assert.match(detail, /CopyEmailButton/)
})

test("hero email and phone actions use native anchors", async () => {
  const heroCta = await read("components/hero-cta.tsx")
  const minimalHero = await read("components/minimal-page-hero.tsx")
  assert.match(heroCta, /href\.startsWith\("mailto:"\)/)
  assert.match(heroCta, /<a href=\{href\}/)
  assert.match(minimalHero, /action\.href\.startsWith\("mailto:"\)/)
  assert.match(minimalHero, /<a href=\{action\.href\}/)
})

test("shop warns visitors when an owner-approved price is ahead of Ecwid checkout", async () => {
  const shop = await read("app/shop/shop-client.tsx")
  assert.match(shop, /pendingPriceUpdates/)
  assert.match(shop, /Please do not use the/)
  assert.match(shop, /Email Buck for the/)
})

test("copy fallback selects the email when clipboard access is blocked", async () => {
  const fallback = await read("components/copy-email-button.tsx")
  assert.match(fallback, /emailRef\.current\?\.focus\(\)/)
  assert.match(fallback, /emailRef\.current\?\.select\(\)/)
  assert.match(fallback, /role="status"/)
})

test("exact storefront stock quantities remain disabled", async () => {
  const shop = await read("app/shop/shop-client.tsx")
  assert.match(shop, /product_details_show_number_of_items_in_stock = false/)
})
