#!/usr/bin/env node
/** Audit the server-rendered SEO contract against a local, preview, or production deployment.
 * Usage: node scripts/verify-seo.mjs --base-url http://localhost:5000
 * Preview protection, if enabled: VERCEL_AUTOMATION_BYPASS_SECRET=... node scripts/verify-seo.mjs ...
 * Production canonical URLs deliberately stay production URLs when auditing previews.
 */
const args = process.argv.slice(2)
const baseIndex = args.indexOf("--base-url")
const base = new URL(baseIndex >= 0 ? args[baseIndex + 1] : "https://www.olympicbootworks.com")
const canonicalOrigin = "https://www.olympicbootworks.com"
const failures = []
let checks = 0
const check = (condition, message) => {
  checks++
  if (!condition) failures.push(message)
}
const decode = (value) => value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x[\da-f]+|#\d+);/gi, (entity) => {
  const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&#39;": "'" }
  if (named[entity]) return named[entity]
  return String.fromCodePoint(Number.parseInt(entity.slice(entity[2]?.toLowerCase() === "x" ? 3 : 2, -1), entity[2]?.toLowerCase() === "x" ? 16 : 10))
})
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3])]))
const normalize = (url) => `${url.origin}${url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "")}`
const headers = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  ? { "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET }
  : {}
const request = (path, options = {}) => fetch(new URL(path, base), { headers, signal: AbortSignal.timeout(30_000), redirect: "manual", ...options })
const walk = (value, visit) => {
  if (!value || typeof value !== "object") return
  if (!Array.isArray(value)) visit(value)
  for (const child of Object.values(value)) walk(child, visit)
}

try {
  const sitemap = await request("/sitemap.xml")
  check(sitemap.status === 200, `sitemap.xml returned ${sitemap.status}`)
  const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(decode(match[1])))
  check(urls.length >= 9, `Sitemap must include the main pages; found ${urls.length} URLs`)
  check(new Set(urls.map(String)).size === urls.length, "Sitemap contains duplicate URLs")
  const pages = new Map()
  const titles = new Map()
  const descriptions = new Map()
  const assets = new Set()
  for (const url of urls) {
    check(url.origin === canonicalOrigin, `Sitemap has a noncanonical origin: ${url}`)
    const response = await request(url.pathname)
    const html = await response.text()
    const documentHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    check(response.status === 200, `${url.pathname}: HTTP ${response.status}`)
    check(!/noindex/i.test(response.headers.get("x-robots-tag") ?? ""), `${url.pathname}: X-Robots-Tag blocks indexing`)
    const metadata = [...documentHtml.matchAll(/<meta\b[^>]*>/gi)].map((match) => attrs(match[0]))
    const meta = (name) => metadata.find((item) => item.name === name || item.property === name)?.content
    check(!/noindex/i.test(meta("robots") ?? ""), `${url.pathname}: robots meta blocks indexing`)
    const canonical = [...documentHtml.matchAll(/<link\b[^>]*>/gi)].map((match) => attrs(match[0])).filter((item) => item.rel === "canonical")
    check(canonical.length === 1 && normalize(new URL(canonical[0].href, base)) === normalize(url), `${url.pathname}: missing or incorrect self canonical`)
    const pageTitles = [...documentHtml.matchAll(/<title>([\s\S]*?)<\/title>/gi)]
    const title = decode(pageTitles[0]?.[1] ?? "").trim()
    const description = meta("description")?.trim()
    check(pageTitles.length === 1 && title.length > 0, `${url.pathname}: expected one nonempty title`)
    check(Boolean(description), `${url.pathname}: missing description`)
    check(!titles.has(title), `${url.pathname}: title duplicates ${titles.get(title)}`)
    check(!descriptions.has(description), `${url.pathname}: description duplicates ${descriptions.get(description)}`)
    titles.set(title, url.pathname)
    descriptions.set(description, url.pathname)
    check([...documentHtml.matchAll(/<h1\b/gi)].length === 1, `${url.pathname}: expected exactly one server-rendered H1`)
    for (const name of ["og:title", "og:description", "og:url", "og:image", "twitter:title", "twitter:description", "twitter:image", "twitter:card"]) {
      check(Boolean(meta(name)), `${url.pathname}: missing ${name}`)
    }
    check(meta("og:title") === title && meta("twitter:title") === title, `${url.pathname}: social titles differ from page title`)
    check(meta("og:description") === description && meta("twitter:description") === description, `${url.pathname}: social descriptions differ from page description`)
    check(meta("og:url") && normalize(new URL(meta("og:url"), base)) === normalize(url), `${url.pathname}: social URL is not self canonical`)
    for (const name of ["og:image", "twitter:image"]) {
      if (meta(name)) assets.add(new URL(meta(name), base).pathname)
    }
    const structured = []
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (attrs(match[1]).type !== "application/ld+json") continue
      try { structured.push(JSON.parse(match[2])) } catch { check(false, `${url.pathname}: invalid JSON-LD`) }
    }
    check(structured.length > 0, `${url.pathname}: missing server-rendered JSON-LD`)
    const definitions = new Set()
    const references = []
    for (const item of structured) walk(item, (node) => {
      if (node["@id"] && Object.keys(node).some((key) => key !== "@id")) definitions.add(node["@id"])
      if (node["@id"] && Object.keys(node).length === 1) references.push(node["@id"])
      check(!("availability" in node), `${url.pathname}: unverified product availability is present`)
    })
    for (const reference of references) check(definitions.has(reference), `${url.pathname}: unresolved JSON-LD entity ${reference}`)
    check(definitions.has(`${canonicalOrigin}/#organization`), `${url.pathname}: missing organization entity`)
    check(definitions.has(`${canonicalOrigin}/#website`), `${url.pathname}: missing website entity`)
    const ids = new Set([...documentHtml.matchAll(/\bid="([^"]+)"/g)].map((match) => decode(match[1])))
    const links = [...documentHtml.matchAll(/<a\b[^>]*>/gi)].map((match) => attrs(match[0]).href).filter(Boolean).map((href) => new URL(href, url)).filter((link) => link.origin === canonicalOrigin || link.origin === base.origin)
    pages.set(url.pathname.replace(/\/$/, "") || "/", { ids, links })
    console.log(`Audited ${url.pathname}`)
  }
  const otherLinks = new Set()
  for (const [path, page] of pages) for (const link of page.links) {
    const target = pages.get(link.pathname.replace(/\/$/, "") || "/")
    if (target && link.hash) check(target.ids.has(decodeURIComponent(link.hash.slice(1))), `${path}: broken fragment ${link.pathname}${link.hash}`)
    if (!target) otherLinks.add(link.pathname)
  }
  for (const path of new Set([...assets, ...otherLinks])) {
    const response = await request(path, { method: "HEAD" })
    check(response.status >= 200 && response.status < 400, `Linked resource ${path}: HTTP ${response.status}`)
  }
  const robots = await request("/robots.txt")
  const robotsText = await robots.text()
  check(robots.status === 200, `robots.txt: HTTP ${robots.status}`)
  check(/User-Agent:\s*\*[\s\S]*?Allow:\s*\/\s*(?:\r?\n|$)/i.test(robotsText) && !/^Disallow:\s*\/\s*$/im.test(robotsText), "robots.txt must allow search crawling")
  check(robotsText.includes(`${canonicalOrigin}/sitemap.xml`), "robots.txt missing canonical sitemap")
  if (!args.includes("--skip-redirects")) for (const [path, target] of [["/shop", "/e-bikes"], ["/shop/boots", "/contact"]]) {
    for (const query of ["", "?utm_source=seo-audit&returnTo=https%3A%2F%2Fexample.com"]) for (const method of ["GET", "HEAD"]) {
      const response = await request(`${path}${query}`, { method })
      check(response.status === 308, `${method} ${path}${query}: expected permanent 308, got ${response.status}`)
      check(response.headers.get("location") === `${canonicalOrigin}${target}`, `${method} ${path}: redirect must use fixed canonical destination without incoming query`)
    }
  }
  for (const path of ["/seo-audit-nonexistent-page", "/e-bikes/seo-audit-nonexistent-bike"]) {
    const response = await request(path)
    check(response.status === 404, `${path}: expected true HTTP 404, got ${response.status}`)
  }
  console.log(`\n${checks} checks across ${pages.size} sitemap pages on ${base.origin}; ${failures.length} failures.`)
  if (failures.length) {
    console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"))
    process.exitCode = 1
  }
} catch (error) {
  console.error(`SEO audit could not complete: ${error.message}`)
  process.exitCode = 1
}
