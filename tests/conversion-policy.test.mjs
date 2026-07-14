import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const { isGa4OnlyConversion } = await loadTypescriptModule(
  "../lib/conversion-policy.ts",
  import.meta.url,
)

test("passive engagement never becomes a Google Ads conversion", () => {
  for (const type of ["bike_page_view", "contact_page_view"]) {
    assert.equal(isGa4OnlyConversion(type), true, `${type} must be GA4-only`)
  }
})

test("explicit leads remain eligible for Google Ads conversion tracking", () => {
  for (const type of ["email_click", "phone_click", "test_ride_request"]) {
    assert.equal(isGa4OnlyConversion(type), false, `${type} must remain a lead conversion`)
  }
})
