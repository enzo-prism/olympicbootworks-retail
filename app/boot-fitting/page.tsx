import type { Metadata } from "next"
import Link from "next/link"
import { Award, Footprints, Ruler, Wrench } from "lucide-react"
import MinimalPageHero from "@/components/minimal-page-hero"
import HeelLocSection from "@/components/heel-loc-section"
import BootFittingCtas from "./boot-fitting-ctas"
import NextImage from "@/components/next-image"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"

export const metadata: Metadata = {
  title: "Custom Ski Boot Fitting in Lake Tahoe",
  description:
    "Olympic Bootworks offers expert ski boot fitting in Olympic Valley and South Lake Tahoe — biomechanical assessment, shell modification, Heel-Loc custom footbeds, and ZipFit liners.",
  alternates: { canonical: "/boot-fitting" },
  openGraph: {
    title: "Custom Ski Boot Fitting in Lake Tahoe | Olympic Bootworks",
    description:
      "Biomechanical assessment, shell modification, Heel-Loc custom footbeds, and ZipFit liners from Tahoe's boot-fitting specialists.",
    url: "https://www.olympicbootworks.com/boot-fitting",
    type: "website",
    images: ["/images/og-default.jpg"],
  },
}

const services = [
  {
    icon: Ruler,
    title: "Biomechanical Assessment",
    text: "Every fitting starts with your feet, ankles, and stance — not a boot box. We measure, watch you move, and diagnose before we recommend.",
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

const steps = [
  {
    title: "1. Request a fitting",
    text: "Email Buck with your location, dates, and what you ski. We fit by appointment at both Tahoe shops.",
  },
  {
    title: "2. Assess & fit",
    text: "In the shop we assess your biomechanics, select the right shell and liner, and build your custom footbeds.",
  },
  {
    title: "3. Refine until it's right",
    text: "Ski the boots, then come back for punches, grinds, and adjustments. The fit isn't done until you're skiing your best.",
  },
]

export default function BootFittingPage() {
  return (
    <div className="flex flex-col">
      <MinimalPageHero
        eyebrow="Olympic Valley · South Lake Tahoe"
        title="Custom Ski Boot Fitting"
        description="A boot built around your feet — biomechanical assessment, precise shell work, Heel-Loc custom footbeds, and ZipFit liners from the shop Tahoe's strongest skiers trust."
        actions={[
          { href: fittingInquiryUrl(), label: "Request a Fitting" },
          { href: "/contact", label: "Hours & Locations", variant: "secondary" },
        ]}
      />

      {/* Editorial intro */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[480px] rounded-lg overflow-hidden">
              <NextImage
                src="/images/buck-with-boot.jpg"
                alt="Buck Brown working on a ski boot in the shop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
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
                approaches every fitting as a diagnosis: your feet, your stance, your skiing, and
                only then the hardware.
              </p>
              <p className="text-muted-foreground mb-8">
                That&apos;s why our work doesn&apos;t stop when you walk out the door. Ski the boots,
                tell us what you feel, and we&apos;ll keep refining the shell, liner, and footbeds
                until the boot disappears and the skiing is all that&apos;s left.
              </p>
              <dl className="grid grid-cols-3 gap-4 border-y py-5">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Research</dt>
                  <dd className="mt-1 text-2xl font-display font-semibold text-foreground">20+ yrs</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Tahoe shops</dt>
                  <dd className="mt-1 text-2xl font-display font-semibold text-foreground">2</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Fit for</dt>
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
            <h2 className="text-3xl md:text-4xl font-semibold">By appointment, built around you</h2>
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

      {/* Closing CTA */}
      <section className="py-16 md:py-24 bg-ink text-ink-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60 mb-4">
            By appointment at both shops
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-5">Ski a boot built for you.</h2>
          <p className="max-w-xl mx-auto mb-10 text-white/80">
            Email Buck with your dates and what you ski — he&apos;ll set up your fitting at Olympic
            Valley or South Lake Tahoe.
          </p>
          <BootFittingCtas />
        </div>
      </section>
    </div>
  )
}
