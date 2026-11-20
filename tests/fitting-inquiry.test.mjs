import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const inquiry = await loadTypescriptModule("../lib/fitting-inquiry.ts", import.meta.url)
const { northLakeLocation, southLakeLocation } = await loadTypescriptModule("../data/locations.ts", import.meta.url)

test("default fitting inquiry emails the appointment inbox with a neutral greeting", () => {
  const parts = inquiry.fittingInquiryParts()
  assert.equal(parts.email, "Info@olympicbootworks.com")
  assert.equal(parts.email, northLakeLocation.contact.email)
  assert.equal(parts.subject, "Boot fitting appointment request")
  assert.match(parts.body, /^Hi Olympic Bootworks team,/)
  assert.doesNotMatch(parts.body, /Hi Buck/)

  const url = new URL(inquiry.fittingInquiryUrl())
  assert.equal(url.protocol, "mailto:")
  assert.equal(url.pathname, "Info@olympicbootworks.com")
  assert.equal(url.searchParams.get("subject"), parts.subject)
  assert.equal(url.searchParams.get("body"), parts.body)
})

test("South Lake fitting inquiries keep the South Lake inbox", () => {
  const parts = inquiry.fittingInquiryParts({
    email: southLakeLocation.contact.email,
    locationName: southLakeLocation.name,
  })
  assert.equal(parts.email, "SouthLake@Olympicbootworks.com")
  assert.match(parts.body, /Preferred location: South Lake Tahoe/)
  assert.match(parts.body, /^Hi Olympic Bootworks team,/)
})

test("fitting inquiries ask how the visitor found the shop", () => {
  for (const options of [undefined, { email: "SouthLake@Olympicbootworks.com", locationName: "South Lake Tahoe" }]) {
    assert.match(inquiry.fittingInquiryParts(options).body, /\nHow did you hear about us\?\n/)
  }
})
