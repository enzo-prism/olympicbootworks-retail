import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const catalog = await loadTypescriptModule("../data/bikes.ts", import.meta.url)

const expectedPrices = new Map([
  ["xtf-1-5", 2499],
  ["xtf-1-5-carbon", 4200],
  ["xmf-1-7", 3799],
  ["xmf-1-7-carbon-sport", 4900],
  ["1-4-carbon-sport", 4000],
  ["xef-1-9-factory", 5900],
  ["xef-1-9-race", 5100],
  ["xxf-2-0-race", 4900],
  ["issimo-urban", 1499],
  ["seven-day-living", 1499],
  ["tx2-scooter", 299],
])

test("bike catalog has unique routes, current prices, and local product assets", () => {
  const slugs = catalog.bikes.map((bike) => bike.slug)
  assert.equal(new Set(slugs).size, slugs.length)
  assert.equal(catalog.bikes.length, expectedPrices.size)

  for (const bike of catalog.bikes) {
    assert.equal(bike.price, expectedPrices.get(bike.slug), `${bike.name} price drifted`)
    assert.match(bike.image, /^\/images\/e-bikes\/[a-z0-9-]+\.jpg$/)
    assert.match(bike.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.equal(catalog.bikeDetailUrl(bike), `/e-bikes/${bike.slug}`)
    assert.ok(bike.overview.length >= 100, `${bike.name} needs a useful plain-language overview`)
    assert.ok(bike.goodFor.length >= 3, `${bike.name} needs comparison guidance`)
  }
})

test("public bike data contains no cart, checkout, storefront, or stale inventory fields", () => {
  for (const bike of catalog.bikes) {
    for (const key of ["id", "shopUrl", "checkoutPrice", "compareAtPrice", "inStock"]) {
      assert.equal(key in bike, false, `${bike.name} must not expose ${key}`)
    }
  }
})

test("Seven Day uses Buck and Trina's latest price", () => {
  const sevenDay = catalog.bikes.find((bike) => bike.slug === "seven-day-living")
  assert.equal(sevenDay.price, 1499)
})

test("every bike inquiry starts a useful, model-specific email to Buck", () => {
  for (const bike of catalog.bikes) {
    const url = new URL(catalog.bikeInquiryUrl(bike))
    assert.equal(url.protocol, "mailto:")
    assert.equal(url.pathname, "buck@olympicbootworks.com")
    assert.match(url.searchParams.get("subject") ?? "", new RegExp(`Fantic ${bike.name}`))
    const body = url.searchParams.get("body") ?? ""
    assert.match(body, new RegExp(`Fantic ${bike.name}`))
    assert.match(body, /availability/i)
    assert.match(body, /height \/ usual bike size/i)
    assert.match(body, /test-ride interest/i)
    assert.match(body, /shipping ZIP/i)
    assert.doesNotMatch(body, /undefined|\[object Object\]/)
  }
})

test("catalog summaries are derived from the published model list", () => {
  const eBikes = catalog.bikes.filter((bike) => bike.family !== "scooter")
  assert.ok(eBikes.length > 0)
  assert.equal(catalog.cheapestBikePrice, Math.min(...eBikes.map((bike) => bike.price)))
  assert.ok(catalog.featuredBikes.every((bike) => bike.featured))
})
