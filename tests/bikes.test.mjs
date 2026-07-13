import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const catalog = await loadTypescriptModule("../data/bikes.ts", import.meta.url)

test("bike catalog has unique Ecwid IDs and valid sale data", () => {
  const ids = catalog.bikes.map((bike) => bike.id)
  assert.equal(new Set(ids).size, ids.length)

  for (const bike of catalog.bikes) {
    assert.ok(bike.id > 0, `${bike.name} must have an Ecwid ID`)
    assert.ok(bike.price > 0, `${bike.name} must have a positive price`)
    assert.ok(bike.compareAtPrice > bike.price, `${bike.name} must have a real sale price`)
    assert.ok(bike.shopUrl.endsWith(`/p/${bike.id}`), `${bike.name} link must include its Ecwid ID`)
    assert.match(bike.image, /^https:\/\/d2j6dbq0eux0bg\.cloudfront\.net\//)
  }
})

test("sale claims are derived only from purchasable e-bikes", () => {
  const eligible = catalog.bikes.filter((bike) => bike.inStock && bike.family !== "scooter")
  assert.ok(eligible.length > 0)
  assert.equal(catalog.cheapestBikePrice, Math.min(...eligible.map((bike) => bike.price)))
  assert.equal(catalog.maxSavingsPct, Math.max(...eligible.map(catalog.savingsPct)))
  assert.ok(catalog.featuredBikes.every((bike) => bike.featured && bike.inStock))
})

test("financing stays hidden until checkout support is explicitly enabled", () => {
  assert.equal(catalog.financing.enabled, false)
})
