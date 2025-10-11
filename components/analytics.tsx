"use client"

import Script from "next/script"

export function Analytics() {
  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-BDFVXXMY5Z" />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BDFVXXMY5Z');
            gtag('config', 'AW-17608821238');
          `,
        }}
      />
    </>
  )
}
