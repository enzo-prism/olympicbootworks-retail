/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  {
    key: "Content-Security-Policy",
    value: "object-src 'none'; base-uri 'self'; frame-ancestors 'self'; upgrade-insecure-requests",
  },
]

const nextConfig = {
  poweredByHeader: false,
  images: {
    qualities: [75],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Privacy-enhanced YouTube embed poster images
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      {
        // The apex domain otherwise serves a duplicate copy of the site. Query
        // strings (UTM/click IDs) pass through to the destination.
        source: "/:path*",
        has: [{ type: "host", value: "olympicbootworks.com" }],
        destination: "https://www.olympicbootworks.com/:path*",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
