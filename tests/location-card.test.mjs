import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"
import * as jsxRuntime from "react/jsx-runtime"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

// Evaluate the component's actual JSX tree with visual dependencies stubbed.
// This catches valid TSX that accidentally embeds markup in a mailto URL.
test("both location cards link their displayed email to the actual recipient", async () => {
  const source = await readFile(new URL("../components/location-card.tsx", import.meta.url), "utf8")
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  })
  const { locations, seasonalScheduleNotice } = await loadTypescriptModule("../data/locations.ts", import.meta.url)
  const conversionCalls = []
  const exports = {}
  vm.runInNewContext(outputText, {
    exports,
    require(name) {
      if (name === "react/jsx-runtime") return jsxRuntime
      if (name === "@/data/locations") return { seasonalScheduleNotice }
      if (name === "@/lib/fitting-inquiry") return { fittingInquiryUrl: ({ email }) => `mailto:${email}?subject=Fitting` }
      if (name === "@/lib/track-conversion") return { trackConversion: (...args) => conversionCalls.push(args) }
      if (name === "@/lib/utils") return { cn: (...classes) => classes.join(" ") }
      return new Proxy({}, { get: (_, key) => key === "__esModule" ? true : String(key) })
    },
  })

  const findAnchors = (node) => {
    if (!node || typeof node !== "object") return []
    if (Array.isArray(node)) return node.flatMap(findAnchors)
    return [ ...(node.type === "a" ? [node] : []), ...findAnchors(node.props?.children) ]
  }

  for (const location of locations) {
    const anchors = findAnchors(exports.default({ location }))
    const emailLink = anchors.find((node) => node.props.children === location.contact.email)
    assert.ok(emailLink, `Missing email link for ${location.id}`)
    assert.equal(emailLink.props.href, `mailto:${location.contact.email}`)
    assert.equal(new URL(emailLink.props.href).pathname, location.contact.email)
    const before = conversionCalls.length
    emailLink.props.onClick()
    assert.equal(conversionCalls.length, before + 1)
    assert.equal(conversionCalls.at(-1)[0], "email_click")
  }
})
