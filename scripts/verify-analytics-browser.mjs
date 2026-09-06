/* eslint-disable @typescript-eslint/no-unused-expressions */
// Browser integration audit; run against a production-mode local build (NEXT_PUBLIC_VERCEL_ENV=production):
// npx --package @playwright/cli playwright-cli -s=ob-analytics open http://localhost:3062
// npx --package @playwright/cli playwright-cli -s=ob-analytics run-code --filename scripts/verify-analytics-browser.mjs
// Uses real Google/Vercel loader code but intercepts collection requests. No synthetic leads reach providers.
async (page) => {
  const base = page.url().startsWith("http") ? await page.evaluate(() => location.origin) : "http://localhost:3062"
  const checks = []
  const requests = []
  const errors = []
  const assert = (condition, label) => {
    checks.push({ label, passed: Boolean(condition) })
    if (!condition) console.error(`FAIL ${label}`)
  }
  const optional = (url) => /google-analytics\.com|googletagmanager\.com|googleadservices\.com|doubleclick\.net|google\.com\/pagead|hotjar\.com|hotjar\.io|_vercel\/insights|va\.vercel/.test(url)
  page.on("pageerror", (error) => errors.push(error.message))
  await page.route("**/*", async (route) => {
    const request = route.request()
    const url = request.url()
    if (!optional(url)) return route.continue()
    requests.push({ url, body: request.postData(), method: request.method() })
    if (url.includes("/_vercel/insights/script.js")) {
      const response = await route.fetch({ url: "https://va.vercel-scripts.com/v1/script.js" })
      return route.fulfill({ response })
    }
    if (url.includes("googletagmanager.com/gtag/js")) return route.continue()
    // Suppress Hotjar recording and all vendor ingestion while retaining observable attempted requests.
    return route.fulfill({ status: 200, contentType: url.includes(".js") ? "application/javascript" : "text/plain", body: "" })
  })
  const commands = () => page.evaluate(() => (window.dataLayer || []).filter((item) => item && typeof item.length === "number").map((item) => Array.from(item)))
  const events = async (name) => (await commands()).filter((item) => item[0] === "event" && item[1] === name)
  await page.context().clearCookies()
  await page.addInitScript(() => {
    // Vercel intentionally skips automation; exercise its normal visitor code path.
    Object.defineProperty(navigator, "webdriver", { get: () => false })
    Object.defineProperty(navigator, "userAgent", { get: () => "Mozilla/5.0 Chrome/140.0.0.0 Safari/537.36" })
    if (!sessionStorage.getItem("analytics-audit-initialized")) {
      localStorage.clear()
      sessionStorage.setItem("analytics-audit-initialized", "1")
    }
  })
  await page.goto(base)
  await page.getByRole("dialog", { name: "Analytics cookie preferences" }).waitFor()
  await page.waitForTimeout(800)
  assert(requests.length === 0, "No optional analytics requests before consent")
  assert(await page.locator("#gtag-init").count() === 0, "No Google bootstrap before consent")
  await page.getByRole("button", { name: "Essential only", exact: true }).click()
  await page.reload()
  await page.waitForTimeout(800)
  assert(requests.length === 0, "Decline persists on reload with no optional requests")

  // Accept late on contact, rather than only accepting on initial home render.
  await page.goto(`${base}/contact?utm_source=qa-audit&email=private-example%40example.com#contact`)
  await page.getByRole("button", { name: "Cookie preferences", exact: true }).click()
  await page.getByRole("button", { name: "Allow analytics", exact: true }).click()
  await page.waitForFunction(() => typeof window.gtag === "function" && window.dataLayer?.some((item) => item[0] === "event" && item[1] === "page_view"))
  await page.waitForTimeout(2500)
  const initial = await events("page_view")
  assert(initial.length === 1, "Late consent sends exactly one initial GA page_view")
  assert((await events("contact_funnel")).length === 1, "Late contact consent emits contact_funnel once")
  assert(initial[0]?.[2]?.page_location === `${base}/contact?utm_source=qa-audit`, "GA location preserves safe UTM and removes arbitrary query/hash")
  assert(initial[0]?.[2]?.page_title === await page.title(), "Initial page_view contains actual document title")
  assert((await commands()).some((item) => item[0] === "config" && item[2]?.send_page_view === false), "Bundled bootstrap executes manual GA pageview configuration")
  assert(errors.length === 0, "Bundled scripts have no uncaught execution errors")
  const vercelLoads = () => requests.filter((request) => request.url.includes("/_vercel/insights/script.js")).length
  assert(vercelLoads() === 1, "Accepted consent loads Vercel script once")

  // Real Next.js links exercise SPA navigation; the document and dataLayer survive.
  await page.locator('a[href="/e-bikes"]:visible').first().click()
  await page.waitForURL(`${base}/e-bikes`)
  await page.waitForTimeout(1200)
  const listing = await events("page_view")
  assert(listing.length === 2, "SPA listing navigation sends one additional GA page_view")
  assert(listing[1]?.[2]?.page_title === await page.title(), "SPA listing view has updated title")
  assert(listing[1]?.[2]?.page_location === `${base}/e-bikes`, "SPA listing view has updated location")
  assert(listing[1]?.[2]?.page_referrer === `${base}/contact`, "SPA referrer is previous page without query")
  await page.locator('a[href="/e-bikes/xtf-1-5"]:visible').first().click()
  await page.waitForURL(`${base}/e-bikes/xtf-1-5`)
  await page.waitForTimeout(6500)
  const detail = await events("page_view")
  assert(detail.length === 3, "SPA detail navigation sends one additional GA page_view")
  assert(detail[2]?.[2]?.page_title === await page.title(), "SPA detail view has updated title")
  assert(detail[2]?.[2]?.page_referrer === `${base}/e-bikes`, "SPA detail referrer is listing")
  assert((await events("view_item")).length === 1, "Bike navigation emits view_item once")
  assert(vercelLoads() === 1, "Vercel loader stays single across SPA routes")
  const gaRequests = requests.filter((request) => /google-analytics\.com\/g\/collect/.test(request.url))
  const gaViews = await page.evaluate((captured) => captured.flatMap((request) => {
    const shared = new URL(request.url).searchParams
    const lines = request.body ? request.body.split("\n") : [""]
    return lines.map((line) => {
      const params = new URLSearchParams(shared)
      for (const [key, value] of new URLSearchParams(line.trim())) params.set(key, value)
      return params
    }).map((params) => ({ event: params.get("en"), destination: params.get("tid"), location: params.get("dl"), title: params.get("dt"), referrer: params.get("dr") }))
  }), gaRequests)
  const primaryViews = gaViews.filter((event) => event.event === "page_view" && event.destination === "G-BDFVXXMY5Z")
  assert(primaryViews.length === 3, "Real Google tag attempts exactly three primary-stream network page_view events")
  assert(gaViews.every((event) => event.destination === "G-BDFVXXMY5Z"), "Remote Google tag does not send to retired GA stream")
  assert(!gaViews.some((event) => event.event === "generate_lead"), "Passive page visits do not generate lead conversions")
  assert(gaViews.every((params) => !params.location?.includes("email=") && !params.location?.includes("#")), "Actual GA collection page URLs are sanitized")
  assert(gaViews.every((event) => !event.referrer?.includes("?") && !event.referrer?.includes("#")), "Actual GA collection referrers omit queries and fragments")
  assert(primaryViews.map((event) => event.location).join("|") === [`${base}/contact?utm_source=qa-audit`, `${base}/e-bikes`, `${base}/e-bikes/xtf-1-5`].join("|"), "Actual primary GA views follow the three visited routes")
  const vercelEvents = requests.filter((request) => /_vercel\/insights\/(view|event)/.test(request.url))
  assert(vercelEvents.length >= 1, "Real Vercel script attempts a collection request")
  assert(vercelEvents.every((request) => !request.body?.includes("private-example")), "Vercel payloads omit arbitrary query data")

  await page.getByRole("button", { name: "Cookie preferences", exact: true }).click()
  const beforeRevoke = requests.length
  await Promise.all([page.waitForEvent("load"), page.getByRole("button", { name: "Essential only", exact: true }).click()])
  await page.waitForTimeout(1200)
  assert(await page.locator("#gtag-init").count() === 0, "Revocation reload removes active Google bootstrap")
  assert(requests.length === beforeRevoke, "Revocation produces no additional optional requests")
  await page.locator('a[href="/contact"]:visible').first().click()
  await page.waitForURL(`${base}/contact`)
  await page.waitForTimeout(800)
  assert(requests.length === beforeRevoke, "Navigation after revocation sends no analytics")

  await page.goto(`${base}/e-bikes/xtf-1-5?utm_campaign=qa-audit&visitor=secret`)
  await page.getByRole("button", { name: "Cookie preferences", exact: true }).click()
  await page.getByRole("button", { name: "Allow analytics", exact: true }).click()
  await page.waitForFunction(() => window.dataLayer?.some((item) => item[0] === "event" && item[1] === "view_item"))
  assert((await events("view_item")).length === 1, "Late bike-detail consent emits view_item once")
  assert((await events("page_view")).length === 1, "Late bike-detail consent emits page_view once")
  const report = { checks, failures: checks.filter((check) => !check.passed), errors, gaEvents: gaViews, gaRawRequests: gaRequests, vercelRequests: vercelEvents.map((request) => ({ url: request.url, body: request.body })), optionalRequestCount: requests.length }
  console.log(JSON.stringify(report, null, 2))
  return report
}
