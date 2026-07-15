import assert from "node:assert/strict"
import test from "node:test"
import { readFile } from "node:fs/promises"

test("secondary GA4 stream uses Buck's verified measurement ID", async () => {
  const config = await readFile(
    new URL("../lib/analytics-config.ts", import.meta.url),
    "utf8",
  )

  assert.match(config, /G-NDRPCY4GV0/)
  assert.doesNotMatch(config, /G-NDRPCY4GVO/)
})
