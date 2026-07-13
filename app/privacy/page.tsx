import type { Metadata } from "next"
import Link from "next/link"
import { CookieSettingsButton } from "@/components/cookie-settings-button"

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Olympic Bootworks handles information when you use this website and its embedded online store.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Privacy notice</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated July 12, 2026</p>

      <div className="mt-10 space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Information you choose to provide</h2>
          <p className="mt-2">
            This marketing site does not operate a contact form or customer database. If you call or email a store, you
            provide information directly through your phone or email service so Olympic Bootworks can respond.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Online shop</h2>
          <p className="mt-2">
            The shop and checkout are provided by Ecwid/Lightspeed. Product browsing, cart, account, payment, shipping,
            and order information are handled by that service under its own privacy practices. Review{" "}
            <Link
              href="https://www.lightspeedhq.com/legal/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Lightspeed&apos;s privacy policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Optional analytics</h2>
          <p className="mt-2">
            With your permission, the site loads Google Analytics, Google Ads measurement, and Hotjar to measure page
            use and interactions. These services may process device, browser, approximate location, referral, and
            interaction information. They do not load until you choose “Allow analytics.”
          </p>
          <div className="mt-3">
            <CookieSettingsButton />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Embedded media and maps</h2>
          <p className="mt-2">
            Pages may embed content from Vimeo, YouTube, Google Maps, and social networks. Loading or interacting with
            those embeds can send request information to the provider. Video embeds use privacy-enhancing options where
            supported.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Your choices</h2>
          <p className="mt-2">
            You can accept or decline optional analytics at any time using Cookie preferences. The site also honors the
            browser Global Privacy Control and Do Not Track signals by defaulting optional analytics off.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p className="mt-2">
            For privacy questions, email{" "}
            <a className="text-primary underline underline-offset-2" href="mailto:buck@olympicbootworks.com">
              buck@olympicbootworks.com
            </a>{" "}
            or contact either store through the <Link className="text-primary underline underline-offset-2" href="/contact">contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
