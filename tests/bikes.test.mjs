import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const catalog = await loadTypescriptModule("../data/bikes.ts", import.meta.url)

test("bike catalog has unique Ecwid IDs and valid sale data", () => {
  const ids = catalog.bikes.map((bike) => bike.id)
  const slugs = catalog.bikes.map((bike) => bike.slug)
  assert.equal(new Set(ids).size, ids.length)
  assert.equal(new Set(slugs).size, slugs.length)

  for (const bike of catalog.bikes) {
    assert.ok(bike.id > 0, `${bike.name} must have an Ecwid ID`)
    assert.ok(bike.price > 0, `${bike.name} must have a positive price`)
    if (bike.checkoutPrice !== undefined) {
      assert.ok(bike.checkoutPrice > 0, `${bike.name} checkout override must be positive`)
    }
    assert.ok(bike.compareAtPrice > bike.price, `${bike.name} must have a real sale price`)
    assert.ok(bike.shopUrl.endsWith(`/p/${bike.id}`), `${bike.name} link must include its Ecwid ID`)
    assert.match(bike.image, /^https:\/\/d2j6dbq0eux0bg\.cloudfront\.net\//)
    assert.match(bike.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.equal(catalog.bikeDetailUrl(bike), `/e-bikes/${bike.slug}`)
    assert.ok(bike.overview.length >= 100, `${bike.name} needs a useful plain-language overview`)
    assert.ok(bike.goodFor.length >= 3, `${bike.name} needs comparison guidance`)
  }
})

test("Seven Day uses Buck's latest approved price while Ecwid catches up", () => {
  const sevenDay = catalog.bikes.find((bike) => bike.slug === "seven-day-living")
  assert.equal(sevenDay.price, 1499)
  assert.equal(sevenDay.checkoutPrice, 1799)
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
    assert.match(body, /sizing/i)
    assert.doesNotMatch(body, /undefined|\[object Object\]/)
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
