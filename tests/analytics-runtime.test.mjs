import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"
import vm from "node:vm"
import ts from "typescript"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const urls = await loadTypescriptModule("../lib/analytics-url.ts", import.meta.url)
const source = await readFile(new URL("../lib/gtag.ts", import.meta.url), "utf8")
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText

function harness() {
  let consent = true
  let pending
  const events = []
  const window = { location: { origin: "https://www.olympicbootworks.com", href: "https://www.olympicbootworks.com/contact?email=private@example.com" } }
  const document = { title: "Contact", referrer: "https://example.com/source?email=private@example.com#private" }
  const exports = {}
  vm.runInNewContext(compiled, {
    exports, window, document, URL, console,
    setTimeout: callback => { pending = callback; return 1 },
    clearTimeout: () => { pending = undefined },
    require: name => name.endsWith("analytics-url") ? urls : name.endsWith("analytics-config") ? { GA4_MEASUREMENT_IDS: ["G-BDFVXXMY5Z"] } : { hasAnalyticsConsent: () => consent },
  })
  return { exports, window, document, events, ready: () => { window.gtag = (...args) => events.push(args) }, tick: () => pending?.(), revoke: () => { consent = false }, grant: () => { consent = true } }
}

test("analytics URLs preserve attribution but remove personal query fields and fragments", () => {
  const value = urls.sanitizeAnalyticsUrl("https://www.olympicbootworks.com/e-bikes?utm_source=google&utm_medium=cpc&gclid=abc-123&email=private@example.com&message=hello#private")
  assert.equal(value, "https://www.olympicbootworks.com/e-bikes?utm_source=google&utm_medium=cpc&gclid=abc-123")
  assert.equal(urls.sanitizeAnalyticsUrl("https://example.com?utm_campaign=private%40example.com"), "https://example.com/")
  assert.equal(urls.sanitizeAnalyticsReferrer("https://example.com/page?email=private#secret"), "https://example.com/page")
  assert.equal(urls.sanitizeAnalyticsUrl("mailto:private@example.com"), "")
})

test("a queued pageview captures its original route/title and is deduplicated only after queueing", () => {
  const h = harness()
  h.exports.sendGa4PageView("/contact?email=private@example.com")
  h.window.location.href = "https://www.olympicbootworks.com/e-bikes"
  h.document.title = "Bikes"
  h.ready(); h.tick()
  const first = h.events.find(args => args[1] === "page_view")
  assert.equal(first[2].page_location, "https://www.olympicbootworks.com/contact")
  assert.equal(first[2].page_title, "Contact")
  assert.equal(first[2].page_referrer, "https://example.com/source")
  h.exports.sendGa4PageView("/contact")
  assert.equal(h.events.filter(args => args[1] === "page_view").length, 1)
  h.exports.sendGa4PageView("/e-bikes")
  const second = h.events.filter(args => args[1] === "page_view")[1]
  assert.equal(second[2].page_referrer, "https://www.olympicbootworks.com/contact")
})

test("pending tracking is cancelled on consent withdrawal or route cleanup", () => {
  const revoked = harness()
  revoked.exports.sendGa4Event("generate_lead")
  revoked.revoke(); revoked.ready(); revoked.tick()
  assert.equal(revoked.events.length, 0)
  const navigated = harness()
  const cancel = navigated.exports.sendGa4PageView("/contact")
  cancel(); navigated.ready(); navigated.tick()
  assert.equal(navigated.events.length, 0)
  assert.equal(navigated.window.__olympicBootworksLastPageView, undefined)
})


test("late consent emits passive context once per queued unique page view", () => {
  const h = harness()
  let callbacks = 0
  h.revoke(); h.ready()
  h.exports.sendGa4PageView("/contact", () => callbacks++)
  assert.equal(callbacks, 0)
  h.grant()
  h.exports.sendGa4PageView("/contact", () => callbacks++)
  h.exports.sendGa4PageView("/contact?email=private@example.com", () => callbacks++)
  assert.equal(callbacks, 1)
  h.exports.sendGa4PageView("/e-bikes", () => callbacks++)
  h.exports.sendGa4PageView("/contact", () => callbacks++)
  assert.equal(callbacks, 3)
})

test("passive page events use catalog data and never become Ads conversions", async () => {
  const { analyticsPageEvent } = await loadTypescriptModule("../lib/analytics-page-events.ts", import.meta.url)
  const { bikes } = await loadTypescriptModule("../data/bikes.ts", import.meta.url)
  assert.equal(analyticsPageEvent("/contact", bikes).name, "contact_funnel")
  assert.equal(analyticsPageEvent("/e-bikes", bikes).name, "view_item_list")
  assert.equal(analyticsPageEvent("/e-bikes/missing-model", bikes), null)
  for (const bike of bikes) {
    const event = analyticsPageEvent(`/e-bikes/${bike.slug}`, bikes)
    assert.equal(event.name, "view_item")
    assert.equal(event.params.value, bike.price)
    assert.equal(event.params.currency, "USD")
    assert.equal(event.params.items[0].item_id, bike.slug)
    assert.equal(event.params.items[0].item_name, `Fantic ${bike.name}`)
  }
})


test("SPA item and lead events retain the current page's virtual referrer", () => {
  const h = harness()
  h.document.referrer = "https://www.google.com/search?q=ski+boots"
  h.window.location.href = "https://www.olympicbootworks.com/"
  h.ready()
  h.exports.sendGa4PageView("/")
  const homeView = h.events.find(args => args[1] === "page_view")
  assert.equal(homeView[2].page_referrer, "https://www.google.com/search")
  h.window.location.href = "https://www.olympicbootworks.com/e-bikes/xtf-1-5"
  h.exports.sendGa4PageView("/e-bikes/xtf-1-5", () => h.exports.sendGa4Event("view_item"))
  h.exports.sendGa4Event("generate_lead")
  const bikeEvents = h.events.filter(args => args[0] === "event").slice(1)
  assert.deepEqual(bikeEvents.map(args => args[1]), ["page_view", "view_item", "generate_lead"])
  for (const event of bikeEvents) {
    assert.equal(event[2].page_referrer, "https://www.olympicbootworks.com/")
    assert.equal(event[2].page_location, "https://www.olympicbootworks.com/e-bikes/xtf-1-5")
  }
})
