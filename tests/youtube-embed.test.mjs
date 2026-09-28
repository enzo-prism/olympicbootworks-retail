import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("click-to-play YouTube embed uses the privacy-enhanced domain and keeps sound on", async () => {
  const source = await readFile(new URL("../components/simple-youtube-embed.tsx", import.meta.url), "utf8")
  assert.match(source, /https:\/\/www\.youtube-nocookie\.com\/embed\//)
  assert.doesNotMatch(source, /mute=1/)
})
