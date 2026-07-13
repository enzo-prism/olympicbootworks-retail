import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")

test("homepage leads e-bike visitors into Buck's requested flow", async () => {
  const home = await read("components/home-client.tsx")
  assert.match(home, /Fantic E-Bikes in Lake Tahoe/)
  assert.match(home, /href="\/e-bikes"/)
  assert.match(home, /Email Buck/)
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

test("model detail page keeps checkout secondary", async () => {
  const detail = await read("app/e-bikes/[slug]/page.tsx")
  assert.match(detail, /Ask Buck about this bike/)
  assert.match(detail, /BikeInquiryButton/)
  assert.match(detail, /View secondary online purchase options/)
  assert.match(detail, /href=\{bike\.shopUrl\}/)
})

test("exact storefront stock quantities remain disabled", async () => {
  const shop = await read("app/shop/shop-client.tsx")
  assert.match(shop, /product_details_show_number_of_items_in_stock = false/)
})
