import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./components/button-animations.css"
import "./components/carousel.css"
import "./components/mobile-nav.css"
import "./components/video-background.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import LocationBanner from "@/components/location-banner"
import ScrollToTop from "@/components/scroll-to-top"
import { TrackingConsent } from "@/components/tracking-consent"
import { Suspense } from "react"
import SeoJsonLd from "@/components/seo-jsonld"

// Using system sans-serif fonts instead of fetching Inter from Google

export const metadata: Metadata = {
  metadataBase: new URL("https://www.olympicbootworks.com"),
  title: {
    default: "Olympic Bootworks",
    template: "%s | Olympic Bootworks",
  },
  description:
    "Olympic Bootworks is a Lake Tahoe ski boot fitting and mountain bike shop specializing in custom footbeds, ZipFit liners, and Fantic e-bikes.",
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/images/olympic-bootworks-transparent-logo.png" }],
  },
  openGraph: {
    title: "Olympic Bootworks",
    description:
      "Olympic Bootworks is a Lake Tahoe ski boot fitting and mountain bike shop specializing in custom footbeds, ZipFit liners, and Fantic e-bikes.",
    url: "https://www.olympicbootworks.com",
    siteName: "Olympic Bootworks",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Olympic Bootworks - Precision Boot Fitting and Mountain Bikes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olympic Bootworks",
    description:
      "Olympic Bootworks is a Lake Tahoe ski boot fitting and mountain bike shop specializing in custom footbeds, ZipFit liners, and Fantic e-bikes.",
    images: ["/images/og-default.png"],
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SeoJsonLd />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            <div className="fixed top-0 left-0 right-0 z-50 flex flex-col header-container">
              <LocationBanner />
              <Suspense fallback={null}>
                <Navigation />
              </Suspense>
            </div>
            {/* The main content area with proper spacing for fixed header */}
            <main className="flex-1 pt-[calc(4rem+var(--banner-height,2.5rem))]">
              <Suspense fallback={null}>{children}</Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </ThemeProvider>

        <Suspense fallback={null}>
          <TrackingConsent />
        </Suspense>
      </body>
    </html>
  )
}
