import assert from "node:assert/strict"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const { GET, HEAD } = await loadTypescriptModule("../app/shop/boots/route.ts", import.meta.url)

for (const [method, handler] of [
  ["GET", GET],
  ["HEAD", HEAD],
]) {
  test(`/shop/boots ${method} permanently redirects to public /contact`, async () => {
    const response = handler()

    assert.equal(response.status, 308)
    assert.equal(response.headers.get("location"), "https://www.olympicbootworks.com/contact")
    assert.doesNotMatch(response.headers.get("location"), /localhost|127\.0\.0\.1|attacker\.example/)
    assert.equal(await response.text(), "")
  })
}
