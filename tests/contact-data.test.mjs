import assert from "node:assert/strict"
import { readdir, readFile } from "node:fs/promises"
import test from "node:test"
import { loadTypescriptModule } from "./load-typescript-module.mjs"

const { locations, formatCityLine, formatStreetAddress, phoneHref } = await loadTypescriptModule(
  "../data/locations.ts",
  import.meta.url,
)

test("phone links use E.164 for the displayed US numbers", () => {
  assert.equal(phoneHref("(530) 581-0747"), "tel:+15305810747")
  assert.equal(phoneHref("(530) 600-4056"), "tel:+15306004056")
})

test("address formatters produce the displayed store lines", () => {
  const south = locations.find((location) => location.id === "south-lake-tahoe")
  assert.equal(formatStreetAddress(south.address), "1235 Ski Run Blvd.")
  assert.equal(formatCityLine(south.address), "South Lake Tahoe, CA 96150")
})

// An address or phone change must happen in one place so the footer, contact
// page, call buttons, and JSON-LD cannot drift apart.
test("store addresses and phone numbers are only defined in data/locations.ts", async () => {
  const root = new URL("../", import.meta.url)
  const files = []
  for (const dir of ["app", "components", "lib"]) {
    for (const entry of await readdir(new URL(dir, root), { recursive: true })) {
      if (/\.tsx?$/.test(entry)) files.push(`${dir}/${entry}`)
    }
  }
  const needles = locations.flatMap((location) => [
    location.address.line1,
    location.contact.phone,
    location.contact.phone.replace(/\D/g, ""),
  ])

  assert.ok(files.length > 20, "Expected to scan the app source")
  for (const file of files) {
    const source = await readFile(new URL(file, root), "utf8")
    for (const needle of needles) {
      assert.ok(!source.includes(needle), `${file} hard-codes "${needle}"; read it from data/locations.ts`)
    }
  }
})
