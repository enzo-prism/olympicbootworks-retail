import { pageMetadata, SITE_URL, ORGANIZATION_ID, WEBSITE_ID, serializeJsonLd } from "@/lib/seo"
import Link from "next/link"
import { Award, Check, Footprints, Ruler, Wrench } from "lucide-react"
import MinimalPageHero from "@/components/minimal-page-hero"
import HeelLocSection from "@/components/heel-loc-section"
import BootFittingCtas from "./boot-fitting-ctas"
import SiteImage from "@/components/site-image"
import StockPill from "@/components/stock-pill"
import { locations, phoneHref, seasonalScheduleNotice } from "@/data/locations"
import { bootFittingFaqs } from "@/data/boot-fitting-faqs"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"

export const metadata = pageMetadata({
  title: "Ski Boots & Custom Boot Fitting in Lake Tahoe",
  description: "Ski boots in stock and expert boot fitting at Olympic Bootworks in Olympic Valley and South Lake Tahoe: biomechanical assessment, shell work, Heel-Loc custom footbeds, and ZipFit liners.",
  path: "/boot-fitting",
})

const services = [
  {
    icon: Ruler,
    title: "Biomechanical Assessment",
    text: "Every fitting starts with your feet, ankles, and stance — not a boot box. We measure, watch you move, and assess your fit before we recommend.",
  },
  {
    icon: Wrench,
    title: "Shell & Liner Work",
    text: "Precise shell punches, grinds, and personalized liner molding until the boot matches your foot — and we keep refining after you ski it.",
  },
  {
    icon: Footprints,
    title: "Heel-Loc Custom Footbeds",
    text: "Our proprietary unweighted casting method builds an orthotic foundation for alignment, comfort, and efficient power transfer.",
  },
  {
    icon: Award,
    title: "ZipFit Liner Specialists",
    text: "Premium cork-composite liners that keep adapting to your feet over time — a precise option for serious skiers and snowboarders.",
  },
]

const stockPoints = [
  "New ski boots on the wall at Olympic Valley and South Lake Tahoe",
  "Footbeds, shell work, and liner fitting for every pair we sell",
  "Bring them back after you ski. We keep adjusting until they're right",
]

const steps = [
  {
    title: "1. Book your fitting",
    text: "Email or call either shop with your dates and what you ski. Both shops are stocked, so we can fit you in new boots or work on the pair you own.",
  },
  {
    title: "2. Assess & fit",
    text: "In the shop we assess your biomechanics, shell-check you in boots off our wall, and build your custom footbeds.",
  },
  {
    title: "3. Refine until it's right",
    text: "Ski the boots, then come back for punches, grinds, and adjustments. The fit isn't done until you're skiing your best.",
  },
]

const bootFittingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/boot-fitting#service`,
      name: "Custom ski boot fitting",
      serviceType: "Ski boot fitting",
      url: `${SITE_URL}/boot-fitting`,
      description: "Ski boot fitting, shell and liner adjustments, Heel-Loc custom footbeds, and ZipFit liners in Olympic Valley and South Lake Tahoe.",
      provider: { "@id": ORGANIZATION_ID },
      areaServed: ["Olympic Valley", "South Lake Tahoe", "Lake Tahoe"],
      availableChannel: ["olympic-valley", "south-lake-tahoe"].map((id) => ({
        "@type": "ServiceChannel",
        serviceLocation: { "@id": `${SITE_URL}/#${id}` },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/boot-fitting#webpage`,
      url: `${SITE_URL}/boot-fitting`,
      name: "Ski Boots & Custom Boot Fitting in Lake Tahoe",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${SITE_URL}/boot-fitting#service` },
      mainEntity: bootFittingFaqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
}

export default function BootFittingPage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(bootFittingJsonLd) }} />
      <MinimalPageHero
        eyebrow="Ski season 2026–27 · Boots in stock"
        title="Ski Boots & Custom Boot Fitting"
        description="Both Tahoe shops are stocked and ready. Pick your boot off the wall and we'll build it around your feet with biomechanical assessment, precise shell work, Heel-Loc custom footbeds, and ZipFit liners."
        actions={[
          { href: fittingInquiryUrl(), label: "Book a Fitting" },
          { href: "/contact", label: "Hours & Locations", variant: "secondary" },
        ]}
      />

      {/* In stock — Buck's Oct 26, 2026 request */}
      <section id="in-stock" className="scroll-mt-28 border-b bg-secondary/60 py-16 md:py-20">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-lg">
            <SiteImage
              src="/ski-boot-fitting-station.jpg"
              alt="A wall of new ski boots above the fitting benches at Olympic Bootworks"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <StockPill>{seasonalScheduleNotice.bannerPrimary}</StockPill>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">Stocked and ready to fit</h2>
            <p className="mt-4 text-muted-foreground">
              We don&apos;t sell boots off a size chart. We start with your feet, shell-check you in the right
              boots from our wall, and fit them before you leave, so you&apos;re ready for the mountain.
            </p>
            <ul className="mt-6 grid gap-3">
              {stockPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-stock" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              {seasonalScheduleNotice.hoursStatus}:{" "}
              {locations.map((location, index) => (
                <span key={location.id}>
                  {index > 0 && " · "}
                  {location.address.city}{" "}
                  <a
                    href={phoneHref(location.contact.phone)}
                    className="whitespace-nowrap font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {location.contact.phone}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Editorial intro */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[480px] rounded-lg overflow-hidden">
              <SiteImage
                src="/images/buck-with-boot.jpg"
                alt="Buck Brown working on a ski boot in the shop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"></div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
                The craft
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Fit is the foundation of skiing
              </h2>
              <p className="text-muted-foreground mb-6">
                Most boot problems aren&apos;t boot problems — they&apos;re fit problems. Founded by
                Buck Brown after twenty-plus years of biomechanical research, Olympic Bootworks
                starts every fitting with your feet, your stance, your skiing, and
                only then the hardware.
              </p>
              <p className="text-muted-foreground mb-8">
                That&apos;s why our work doesn&apos;t stop when you walk out the door. Ski the boots,
                tell us what you feel, and we&apos;ll keep refining the shell, liner, and footbeds
                until the boot disappears and the skiing is all that&apos;s left.
              </p>
              <dl className="grid grid-cols-3 gap-2 sm:gap-4 border-y py-5">
                <div>
                  <dt className="text-[11px] sm:text-xs uppercase tracking-wide sm:tracking-wider text-muted-foreground">Research</dt>
                  <dd className="mt-1 text-2xl font-display font-semibold text-foreground">20+ yrs</dd>
                </div>
                <div>
                  <dt className="text-[11px] sm:text-xs uppercase tracking-wide sm:tracking-wider text-muted-foreground">Tahoe shops</dt>
                  <dd className="mt-1 text-2xl font-display font-semibold text-foreground">2</dd>
                </div>
                <div>
                  <dt className="text-[11px] sm:text-xs uppercase tracking-wide sm:tracking-wider text-muted-foreground">Fit for</dt>
                  <dd className="mt-1 text-2xl font-display font-semibold text-foreground">Pros</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-secondary/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              What we do
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">Every fitting service, under one roof</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="rounded-lg border bg-card p-6">
                <div className="mb-4 inline-block rounded-full bg-primary/10 p-3 text-primary">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-sans tracking-normal font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">Built around you, start to finish</h2>
          </div>
          <ol className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <li key={step.title} className="rounded-lg border bg-card p-6">
                <span className="font-sans font-bold text-foreground">{step.title}</span>
                <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Heel-Loc technology */}
      <HeelLocSection />

      {/* Pull quote */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-2xl md:text-3xl font-medium leading-snug text-foreground">
              &ldquo;Cinderella! The shoe finally fits! The most knowledgeable, friendly,
              professional, welcoming boot shop around&hellip; Seriously life changing!&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              Annie Edinger &middot; Google review
              <span className="mx-2">&middot;</span>
              <Link href="/testimonials" className="font-medium text-primary underline-offset-4 hover:underline">
                Read more customer stories
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/60" aria-labelledby="fitting-questions">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 id="fitting-questions" className="scroll-mt-36 text-3xl md:text-4xl font-semibold mb-8">Ski boot fitting questions</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {bootFittingFaqs.map((faq) => (
              <div key={faq.question} className="rounded-lg border bg-card p-6">
                <h3 className="font-sans tracking-normal text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-muted-foreground">
            <Link href="/contact" className="font-medium text-primary underline underline-offset-4">Find shop addresses, phone numbers, and the current schedule</Link>
            {" · "}
            <Link href="/about" className="font-medium text-primary underline underline-offset-4">Meet founder and boot fitter Buck Brown</Link>
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 md:py-24 bg-ink text-ink-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60 mb-4">
            Stocked at both Tahoe shops
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-5">Ski a boot built for you.</h2>
          <p className="max-w-xl mx-auto mb-10 text-white/80">
            The boot wall is stocked. Email Buck with your dates and what you ski, and he&apos;ll set up
            your fitting at Olympic Valley or South Lake Tahoe.
          </p>
          <BootFittingCtas />
        </div>
      </section>
    </div>
  )
}
