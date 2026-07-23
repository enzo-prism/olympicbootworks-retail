import type React from "react"
import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
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

// Self-hosted at build time via next/font — no runtime Google requests, zero CLS.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
})

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
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
        url: "/images/og-default.jpg",
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
    images: ["/images/og-default.jpg"],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <SeoJsonLd />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
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
            <main id="main" className="flex-1 pt-[calc(4rem+var(--banner-height,2.5rem))]">
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
