import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const { leadCategory } = await loadTypescriptModule("../lib/lead-category.ts", import.meta.url)

test("bike models, test rides and e-bike surfaces are e-bike leads", () => {
  assert.equal(leadCategory("email_click", { location: "ebike_xtf-1-5", contentId: "xtf-1-5" }), "ebikes")
  assert.equal(leadCategory("test_ride_request", { location: "olympic-valley" }), "ebikes")
  assert.equal(leadCategory("email_click", { location: "ebikes_lineup" }), "ebikes")
  assert.equal(leadCategory("email_click", { location: "page_hero_e-bikes" }), "ebikes")
  assert.equal(leadCategory("email_copy", { location: "page_hero_e-bikes_email_copy" }), "ebikes")
})

test("fitting CTAs and default email links are boot-fitting leads", () => {
  assert.equal(leadCategory("email_click", { location: "home_hero_fitting" }), "boot_fitting")
  assert.equal(leadCategory("phone_click", { location: "boot_fitting_stock_olympic-valley" }), "boot_fitting")
  assert.equal(leadCategory("email_click", { location: "home_heel_loc" }), "boot_fitting")
  assert.equal(leadCategory("email_click", { location: "home_shops_south-lake-tahoe" }), "boot_fitting")
})

test("shop calls and directions without context are general; explicit categories win", () => {
  assert.equal(leadCategory("phone_click", { location: "home_closing_olympic-valley" }), "general")
  assert.equal(leadCategory("directions_click", { location: "contact_card_olympic-valley" }), "general")
  assert.equal(leadCategory("email_click", { location: "mobile_navigation", category: "general" }), "general")
  assert.equal(leadCategory("phone_click", { location: "olympic-valley", category: "ebikes" }), "ebikes")
})
