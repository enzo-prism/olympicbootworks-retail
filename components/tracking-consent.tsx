"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Script from "next/script"
import { Analytics } from "@/components/analytics"
import { VercelAnalytics } from "@/components/vercel-analytics"
import { AnalyticsRouteListener } from "@/components/analytics-route-listener"
import {
  ANALYTICS_OPT_OUT_PARAM,
  readAnalyticsConsent,
  writeAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/consent"

export const OPEN_COOKIE_SETTINGS_EVENT = "olympic-bootworks:open-cookie-settings"

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean
  }
}

function hasPrivacySignal() {
  return navigator.globalPrivacyControl === true || navigator.doNotTrack === "1"
}

export function TrackingConsent() {
  const [consent, setConsent] = useState<AnalyticsConsent>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const stored = readAnalyticsConsent()
    if (stored) {
      setConsent(stored)
      return
    }

    if (hasPrivacySignal()) {
      writeAnalyticsConsent("declined")
      setConsent("declined")
      return
    }

    setShowPrompt(true)
  }, [])

  useEffect(() => {
    const openSettings = () => setShowPrompt(true)
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings)
  }, [])

  const choose = (choice: Exclude<AnalyticsConsent, null>) => {
    const hadLoadedAnalytics = consent === "accepted"
    const persisted = writeAnalyticsConsent(choice)
    setConsent(choice)
    setShowPrompt(false)

    if (hadLoadedAnalytics && choice === "declined") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied", ad_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
      })
      if (persisted) {
        window.location.reload()
      } else {
        // Fully unload third-party scripts without restoring a stale stored acceptance.
        const url = new URL(window.location.href)
        url.searchParams.set(ANALYTICS_OPT_OUT_PARAM, "1")
        window.location.replace(url.href)
      }
    }
  }

  return (
    <>
      {consent === "accepted" && process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" && (
        <>
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
          <AnalyticsRouteListener />
          <Analytics />
          <VercelAnalytics />
        </>
      )}

      {showPrompt && (
        <section
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-xl border bg-background p-5 shadow-2xl sm:flex sm:items-center sm:gap-6"
          role="dialog"
          aria-label="Analytics cookie preferences"
          aria-live="polite"
        >
          <div className="flex-1">
            <h2 className="font-semibold">Your privacy choices</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We use optional Google Analytics, Google Ads, Hotjar, and cookieless Vercel Analytics to understand site use and improve the experience.
              Essential site features work without them. Read our{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                privacy notice
              </Link>
              .
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:min-w-48">
            <button
              type="button"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              onClick={() => choose("accepted")}
            >
              Allow analytics
            </button>
            <button
              type="button"
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
              onClick={() => choose("declined")}
            >
              Essential only
            </button>
          </div>
        </section>
      )}
    </>
  )
}
