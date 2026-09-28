import assert from "node:assert/strict"
import test from "node:test"
import nextConfig from "../next.config.mjs"

test("apex domain permanently redirects to the canonical www host, keeping the path", async () => {
  const redirects = await nextConfig.redirects()
  const apex = redirects.find((rule) =>
    rule.has?.some((condition) => condition.type === "host" && condition.value === "olympicbootworks.com"),
  )

  assert.ok(apex, "Missing apex-host redirect")
  assert.equal(apex.source, "/:path*")
  assert.equal(apex.destination, "https://www.olympicbootworks.com/:path*")
  assert.equal(apex.permanent, true)
})

test("responses do not advertise the framework", () => {
  assert.equal(nextConfig.poweredByHeader, false)
})
