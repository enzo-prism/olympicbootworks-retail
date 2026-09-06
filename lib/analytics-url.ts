/** Keep campaign attribution, never arbitrary query fields or fragments. */
export function sanitizeAnalyticsUrl(value: string, base?: string): string {
  try {
    const url = new URL(value, base)
    if (url.protocol !== "http:" && url.protocol !== "https:") return ""
    const attributionKeys = new Set([
      "utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term", "utm_content",
      "gclid", "dclid", "gbraid", "wbraid", "msclkid", "fbclid",
    ])
    const safeQuery = new URLSearchParams()
    for (const [key, entry] of url.searchParams) {
      // Campaign values should be labels/IDs, never emails, URLs, or free-form visitor data.
      if (attributionKeys.has(key) && /^[a-zA-Z0-9 _.-]{1,200}$/.test(entry)) safeQuery.set(key, entry)
    }
    url.username = ""
    url.password = ""
    url.search = safeQuery.toString()
    url.hash = ""
    return url.href
  } catch {
    return ""
  }
}

export function sanitizeAnalyticsReferrer(value: string): string {
  try {
    const url = new URL(value)
    if (url.protocol !== "http:" && url.protocol !== "https:") return ""
    url.username = ""
    url.password = ""
    url.search = ""
    url.hash = ""
    return url.href
  } catch {
    return ""
  }
}
