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
    assert.equal(consent.hasAnalyticsConsent(), true)
    assert.equal(consent.writeAnalyticsConsent("declined"), false)
    assert.equal(consent.hasAnalyticsConsent(), false)
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

 test("withdrawal overrides stale accepted storage when writing fails", () => {
  const previousWindow = globalThis.window
  globalThis.window = {
    location: { search: "" },
    localStorage: { getItem: () => "accepted", setItem() { throw new Error("quota") } },
  }
  try {
    assert.equal(consent.hasAnalyticsConsent(), true)
    assert.equal(consent.writeAnalyticsConsent("declined"), false)
    assert.equal(consent.hasAnalyticsConsent(), false)
    delete globalThis.window.__olympicAnalyticsConsent
    globalThis.window.location.search = "?_analytics_opt_out=1"
    assert.equal(consent.hasAnalyticsConsent(), false)
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})

test("session fallback preserves withdrawal across unmarked reloads", () => {
  const previousWindow = globalThis.window
  const session = new Map()
  globalThis.window = {
    location: { search: "" },
    localStorage: { getItem: () => "accepted", setItem() { throw new Error("quota") } },
    sessionStorage: { getItem: key => session.get(key), setItem: (key, value) => session.set(key, value) },
  }
  try {
    assert.equal(consent.writeAnalyticsConsent("declined"), true)
    delete globalThis.window.__olympicAnalyticsConsent
    assert.equal(consent.hasAnalyticsConsent(), false)
  } finally {
    if (previousWindow === undefined) delete globalThis.window
    else globalThis.window = previousWindow
  }
})
