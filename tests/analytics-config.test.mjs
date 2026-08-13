import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const KEEP_MEASUREMENT_ID = "G-BDFVXXMY5Z"
const REMOVED_BUCK_BROWN_MEASUREMENT_ID = "G-NDRPCY4GV0"

const config = await loadTypescriptModule("../lib/analytics-config.ts", import.meta.url)
const configSource = await readFile(new URL("../lib/analytics-config.ts", import.meta.url), "utf8")
const analyticsSource = await readFile(new URL("../components/analytics.tsx", import.meta.url), "utf8")
const gtagSource = await readFile(new URL("../lib/gtag.ts", import.meta.url), "utf8")

test("site sends to a single GA4 stream: property 508275630 / G-BDFVXXMY5Z", () => {
  assert.equal(config.GA4_PRIMARY_MEASUREMENT_ID, KEEP_MEASUREMENT_ID)
  assert.deepEqual([...config.GA4_MEASUREMENT_IDS], [KEEP_MEASUREMENT_ID])
  assert.equal("GA4_SECONDARY_MEASUREMENT_ID" in config, false)
})

test("Buck Brown GA4 stream G-NDRPCY4GV0 is not loaded or gtag-configured", () => {
  assert.equal(config.GA4_MEASUREMENT_IDS.includes(REMOVED_BUCK_BROWN_MEASUREMENT_ID), false)
  assert.doesNotMatch(configSource, /GA4_SECONDARY_MEASUREMENT_ID/)
  assert.doesNotMatch(analyticsSource, /G-NDRPCY4GV0/)
  assert.doesNotMatch(analyticsSource, /G-NDRPCY4GVO/)
  assert.match(gtagSource, /GA4_MEASUREMENT_IDS/)
})

test("Google Ads conversion tag is unchanged", () => {
  assert.equal(config.GOOGLE_ADS_ID, "AW-17608821238")
  assert.equal(config.GOOGLE_ADS_CONVERSION_SEND_TO, "AW-17608821238/ZWXjCI_f_aUbEPaTxcxB")
  assert.match(analyticsSource, /GOOGLE_ADS_ID/)
})
