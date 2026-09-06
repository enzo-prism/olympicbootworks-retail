import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const seo = await loadTypescriptModule("../lib/seo.ts", import.meta.url)
const { bikes } = await loadTypescriptModule("../data/bikes.ts", import.meta.url)

test("page metadata keeps canonical, Open Graph and Twitter specific to the same page", () => {
  for (const path of ["/", "/about", "/contact", "/privacy", "/gallery", "/pros", "/testimonials", "/e-bikes", "/boot-fitting"]) {
    const metadata = seo.pageMetadata({ title: `Page ${path}`, description: `Description ${path}`, path })
    assert.equal(metadata.alternates.canonical, `${seo.SITE_URL}${path}`)
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical)
    assert.equal(metadata.title.absolute, metadata.openGraph.title)
    assert.equal(metadata.twitter.title, metadata.openGraph.title)
    assert.equal(metadata.twitter.description, metadata.description)
    assert.deepEqual(metadata.twitter.images, metadata.openGraph.images)
  }
})

test("model shares use the correct product photo and do not inherit the homepage card", () => {
  for (const bike of bikes) {
    const metadata = seo.pageMetadata({ title: bike.name, description: bike.blurb, path: `/e-bikes/${bike.slug}`, image: bike.image })
    assert.equal(metadata.twitter.images[0].url, bike.image)
    const product = seo.productJsonLd(bike)
    assert.equal(product.offers.price, bike.price)
    assert.equal(product.offers.seller["@id"], seo.ORGANIZATION_ID)
    assert.equal(product["@id"], `${metadata.alternates.canonical}#product`)
    assert.equal("availability" in product.offers, false)
    assert.equal("itemCondition" in product.offers, false)
  }
})

test("JSON-LD cannot terminate its script element with untrusted content", () => {
  const value = { text: '</script><script>alert("x")</script>' }
  const serialized = seo.serializeJsonLd(value)
  assert.equal(serialized.includes("<"), false)
  assert.deepEqual(JSON.parse(serialized), value)
})

test("model breadcrumbs use ordered canonical URLs", () => {
  const breadcrumb = seo.breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fantic E-Bikes", path: "/e-bikes" }])
  assert.deepEqual(breadcrumb.itemListElement.map(item => item.position), [1, 2])
  assert.equal(breadcrumb.itemListElement[1].item, `${seo.SITE_URL}/e-bikes`)
})
