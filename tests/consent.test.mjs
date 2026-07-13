import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const consent = await loadTypescriptModule("../lib/consent.ts", import.meta.url)

test("analytics consent never breaks essential links when localStorage is blocked", () => {
  const previousWindow = globalThis.window
  globalThis.window = {
    localStorage: {
      getItem() { throw new Error("blocked") },
      setItem() { throw new Error("blocked") },
    },
  }

  try {
    assert.equal(consent.readAnalyticsConsent(), null)
    assert.equal(consent.hasAnalyticsConsent(), false)
    assert.equal(consent.writeAnalyticsConsent("accepted"), false)
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})
