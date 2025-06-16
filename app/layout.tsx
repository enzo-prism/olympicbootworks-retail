import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import "./shop/cart-widget.css"
import "./components/button-animations.css"
import "./components/carousel.css"
import "./components/mobile-nav.css"
import "./components/video-background.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import LocationBanner from "@/components/location-banner"
import ScrollToTop from "@/components/scroll-to-top"
import ImagePreloader from "@/components/image-preloader"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

// Using system sans-serif fonts instead of fetching Inter from Google

export const metadata: Metadata = {
  title: "Olympic Bootworks | Ski & Mountain Bike Shop",
  description: "Premier ski and mountain bike shop serving athletes of all levels",
  icons: {
    icon: [
      {
        url: "/images/olympic-bootworks-transparent-logo.png",
        href: "/images/olympic-bootworks-transparent-logo.png",
      },
    ],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No environment variable scripts needed */}
        <Script id="hotjar-tracking" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6435732,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ImagePreloader />
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

        {/* Load Vimeo API globally */}
        <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
        <Analytics />
      </body>
    </html>
  )
}
