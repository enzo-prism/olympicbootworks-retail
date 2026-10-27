"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Award,
  Bike,
  Check,
  Footprints,
  MapPin,
  Mail,
  Mountain,
  Phone,
  Trophy,
  Wrench,
} from "lucide-react"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import SimpleYouTubeEmbed from "@/components/simple-youtube-embed"
import SiteImage, { NEUTRAL_BLUR } from "@/components/site-image"
import StockPill from "@/components/stock-pill"
import { HeroPrimaryCTA, HeroSecondaryCTA } from "@/components/hero-cta"
import { Button } from "@/components/ui/button"
import { sendGa4Event } from "@/lib/gtag"
import { trackConversion } from "@/lib/track-conversion"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"
import { featuredBikes, bikeDetailUrl, cheapestBikePrice, formatPrice, familyLabels } from "@/data/bikes"
import { locations, seasonalScheduleNotice, type LocationData } from "@/data/locations"

const USA_TODAY_10BEST_URL =
  "https://10best.usatoday.com/awards/olympic-bootworks-olympic-valley-california/"

const telHref = (phone: string) => `tel:+1${phone.replace(/[^0-9]/g, "")}`

const heroPoints = [
  "Ski boots on the wall at both Tahoe shops",
  "Heel-Loc custom footbeds made in-house",
  "Adjustments until the fit is right",
]

const steps = [
  {
    number: "01",
    title: "Start with your feet",
    text: "We measure, watch you stand and flex, and shell-check you in boots straight off our stocked wall, so the boot matches your foot instead of the size on the box.",
    image: "/images/buck-in-shop-2.jpg",
    alt: "The Olympic Bootworks boot wall and fitting floor",
  },
  {
    number: "02",
    title: "Build the fit",
    text: "Heel-Loc footbeds cast with your foot unweighted, shell punches and grinds, liner molding, and ZipFit liners when they help.",
    image: "/images/fitting-process.jpg",
    alt: "Buck Brown shaping a custom footbed for a customer",
  },
  {
    number: "03",
    title: "Ski it, then fine-tune",
    text: "Take them up the hill, then bring them back. We're minutes from the lifts and keep adjusting until you stop thinking about your boots.",
    image: "/images/customers-on-slopes.jpg",
    alt: "Olympic Bootworks customers at the base of the mountain",
  },
]

const fitServices = [
  {
    icon: Wrench,
    title: "Shell & liner work",
    text: "Punches, grinds, and liner molding for pressure points, width, and heel hold.",
  },
  {
    icon: Award,
    title: "ZipFit liners",
    text: "Cork-composite liners that keep adapting to your feet over the season.",
  },
  {
    icon: Footprints,
    title: "Help with boots you own",
    text: "Bring in your current boots and we'll tell you honestly whether they can be made to fit.",
  },
]

function SectionEyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.22em] text-primary ${className}`}>{children}</p>
  )
}

function ShopCard({ location }: { location: LocationData }) {
  const { address, contact } = location
  const fullAddress = `${address.line1}, ${address.city}, ${address.state} ${address.zip}`

  return (
    <div className="flex flex-col rounded-xl border bg-card p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-semibold">{location.name}</h3>
        <StockPill>Boots in stock</StockPill>
      </div>
      <p className="mt-4 flex items-start gap-2 text-muted-foreground">
        <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          {address.line1}
          <br />
          {address.city}, {address.state} {address.zip}
        </span>
      </p>
      <p className="mt-2 pl-6 text-sm text-muted-foreground">{seasonalScheduleNotice.hoursStatus}.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button asChild size="lg" className="h-auto w-full whitespace-normal py-3">
          <a
            href={telHref(contact.phone)}
            onClick={() => trackConversion("phone_click", { location: `home_shops_${location.id}` })}
          >
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            {contact.phone}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-auto w-full whitespace-normal py-3">
          <a href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`} target="_blank" rel="noopener noreferrer">
            <MapPin className="mr-2 h-4 w-4" aria-hidden="true" />
            Directions
          </a>
        </Button>
      </div>
      {contact.email && (
        <a
          href={fittingInquiryUrl({ email: contact.email, locationName: location.name })}
          onClick={() => trackConversion("email_click", { location: `home_shops_${location.id}` })}
          className="mt-4 inline-flex items-center gap-2 self-start text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          Email to book a fitting here
        </a>
      )}
    </div>
  )
}

export default function HomeClient() {
  return (
    <div className="flex flex-col">
      {/* Hero — Buck's Oct 26, 2026 request: boots first, stocked and ready to go */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary-light)/0.35),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="container relative mx-auto grid items-center gap-12 px-4 py-12 md:py-16 lg:min-h-[calc(100svh-4rem-var(--banner-height,2.5rem))] lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="flex flex-col items-start">
            <StockPill onDark>In stock for 2026–27</StockPill>
            <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
              Ski boots in stock.
              <span className="mt-1 block italic text-white/70">Fit and ready to go.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg md:leading-8">
              Both Tahoe shops are stocked and ready to get you on the mountain. Pick your boot off the wall, get it
              custom fit by the crew behind Heel-Loc, and go ski.
            </p>
            <ul className="mt-6 grid gap-2.5 text-sm text-white/90 md:text-base">
              {heroPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-stock-light" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
              <HeroPrimaryCTA
                href={fittingInquiryUrl()}
                icon={<Footprints aria-hidden="true" />}
                className="w-full sm:w-auto"
                onClick={() => trackConversion("email_click", { location: "home_hero_fitting" })}
              >
                Book a Boot Fitting
              </HeroPrimaryCTA>
              <HeroSecondaryCTA href="#shops" icon={<MapPin aria-hidden="true" />} className="w-full sm:w-auto">
                Visit a Shop
              </HeroSecondaryCTA>
            </div>
            <Link
              href="/e-bikes"
              onClick={() => sendGa4Event("select_content", { content_type: "home_path", item_id: "ebikes_hero" })}
              className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm text-white/70 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <Bike className="h-4 w-4 shrink-0" aria-hidden="true" />
              Also here: Fantic e-bikes
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>

          {/* The stocked boot wall, with Buck at work inset */}
          <div className="relative mx-auto w-full max-w-xl sm:pb-8 lg:max-w-none">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
              <SiteImage
                src="/ski-boot-fitting-station.jpg"
                alt="A wall of new ski boots above the fitting benches at Olympic Bootworks"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute bottom-0 left-0 hidden w-[36%] overflow-hidden rounded-xl shadow-2xl ring-4 ring-ink sm:block lg:-left-8">
              <div className="relative aspect-square">
                <SiteImage
                  src="/images/buck-with-boot.jpg"
                  alt="Founder Buck Brown working on a customer's ski boot"
                  fill
                  sizes="240px"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={NEUTRAL_BLUR}
                />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-3 py-2 text-foreground shadow-lg backdrop-blur-sm sm:bottom-auto sm:right-4 sm:top-4 sm:px-4 sm:py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stock">Ready to fit</p>
              <p className="mt-0.5 text-sm font-semibold">Olympic Valley &amp; South Lake</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section aria-label="Why Tahoe skiers choose Olympic Bootworks" className="border-b bg-background">
        <div className="container mx-auto grid grid-cols-1 divide-y px-4 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          <a href={USA_TODAY_10BEST_URL} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 py-5 lg:pr-6">
            <Award className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                USA TODAY 10Best Readers&apos; Choice 2025
              </span>
              <span className="mt-0.5 block font-semibold group-hover:text-primary group-hover:underline">
                Runner-up: Best Ski Shop
              </span>
            </span>
          </a>
          <Link href="/pros" className="group flex items-start gap-3 py-5 lg:px-6">
            <Trophy className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Trusted on the World Cup
              </span>
              <span className="mt-0.5 block font-semibold group-hover:text-primary group-hover:underline">
                Fitting Tahoe&apos;s pro racers
              </span>
            </span>
          </Link>
          <Link href="/boot-fitting" className="group flex items-start gap-3 py-5 lg:px-6">
            <Footprints className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Developed by Buck Brown
              </span>
              <span className="mt-0.5 block font-semibold group-hover:text-primary group-hover:underline">
                Heel-Loc custom footbeds
              </span>
            </span>
          </Link>
          <a href="#shops" className="group flex items-start gap-3 py-5 lg:pl-6">
            <Mountain className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Two shops, both stocked
              </span>
              <span className="mt-0.5 block font-semibold group-hover:text-primary group-hover:underline">
                Olympic Valley &amp; South Lake Tahoe
              </span>
            </span>
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <SectionEyebrow className="mb-3">Custom Boot Fitting</SectionEyebrow>
            <h2 className="text-3xl font-semibold md:text-5xl">Walk in. Get fit. Go ski.</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Buying boots here isn&apos;t picking a box off a shelf. Every pair comes with a fitting built around
              your feet, your stance, and how you ski.
            </p>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="group overflow-hidden rounded-xl border bg-card">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-[4/3]">
                  <SiteImage
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    placeholder="blur"
                    blurDataURL={NEUTRAL_BLUR}
                  />
                </div>
                <div className="p-6">
                  <span className="font-display text-sm font-semibold text-primary">{step.number}</span>
                  <h3 className="mt-1 font-sans text-xl font-semibold tracking-normal">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-10 flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={fittingInquiryUrl()} onClick={() => trackConversion("email_click", { location: "home_how_it_works" })}>
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Book a Boot Fitting
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/boot-fitting">
                How our fitting works
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What goes into the fit */}
      <section className="bg-secondary/60 py-16 md:py-24">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-2">
          <Link
            href="/boot-fitting"
            className="group relative flex min-h-[440px] items-end overflow-hidden rounded-xl bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:row-span-3 lg:min-h-[560px]"
          >
            <SiteImage
              src="/images/fitting-process-2.jpg"
              alt="A skier on the unweighted casting stand for Heel-Loc custom footbeds"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-[1.03]"
              placeholder="blur"
              blurDataURL={NEUTRAL_BLUR}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" aria-hidden="true" />
            <div className="relative z-10 p-6 text-white md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Proprietary technology</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Heel-Loc custom footbeds</h2>
              <p className="mt-3 max-w-md text-white/85">
                Buck Brown spent more than twenty years refining Heel-Loc. Your foot is cast unweighted, so the
                footbed supports its natural shape for alignment, comfort, and power transfer.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                Explore boot fitting
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
          {fitServices.map((service) => (
            <div key={service.title} className="flex gap-5 rounded-xl border bg-card p-6 md:p-8">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-sans text-xl font-semibold tracking-normal">{service.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <SectionEyebrow className="mb-3">From the community</SectionEyebrow>
            <h2 className="text-3xl font-semibold md:text-5xl">&ldquo;The shoe finally fits.&rdquo;</h2>
            <p className="mt-4 text-muted-foreground">What Tahoe skiers say after a fitting at Olympic Bootworks.</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Pros + Heel-Loc video */}
      <section className="bg-ink py-16 text-ink-foreground md:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Fit for the World Cup</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">The same fit the pros ski on.</h2>
            <p className="mt-5 text-white/80 md:text-lg">
              World Cup racers like Travis Ganong and Bryce Bennett trust Olympic Bootworks with their boots. Every
              customer gets the same process, the same tools, and the same attention to detail.
            </p>
            <Button asChild variant="outline-on-dark" size="lg" className="mt-8 w-full sm:w-auto">
              <Link href="/pros">
                <Trophy className="mr-2 h-5 w-5" aria-hidden="true" />
                Meet our athletes
              </Link>
            </Button>
          </div>
          <div>
            <SimpleYouTubeEmbed
              videoId="n4r3VUYUGW0"
              title="Heel-Loc Technology in Action"
              className="rounded-xl shadow-2xl ring-1 ring-white/10"
            />
            <p className="mt-3 text-sm text-white/60">
              Watch: athletes on the Heel-Loc technology developed by Olympic Bootworks founder Buck Brown.
            </p>
          </div>
        </div>
      </section>

      {/* Both shops */}
      <section id="shops" className="scroll-mt-28 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <SectionEyebrow className="mb-3">{seasonalScheduleNotice.label}</SectionEyebrow>
            <h2 className="text-3xl font-semibold md:text-5xl">Two Tahoe shops, both stocked.</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">{seasonalScheduleNotice.summary}</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {locations.map((location) => (
              <ShopCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      {/* Fantic e-bikes — still offered, now secondary to boots */}
      {featuredBikes.length > 0 && (
        <section id="e-bikes" className="fantic-theme scroll-mt-24 bg-secondary/60 py-16 md:py-24">
          <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-ink">
              <SiteImage
                src="/images/fantic-tahoe/fantic-issimos-olympic-valley.webp"
                alt="Red and white Fantic Issimo e-bikes parked in Olympic Valley"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={NEUTRAL_BLUR}
              />
            </div>
            <div>
              <SectionEyebrow className="mb-3">Also at Olympic Bootworks &middot; Italian Made Freedom</SectionEyebrow>
              <h2 className="text-3xl font-semibold md:text-4xl">Fantic e-bikes</h2>
              <p className="mt-4 text-muted-foreground">
                Italian-built e-mountain and urban e-bikes for Tahoe&apos;s other season. Compare current prices
                online, then email Buck about availability and test rides.
              </p>
              <ul className="mt-6 divide-y rounded-xl border bg-card">
                {featuredBikes.map((bike) => (
                  <li key={bike.slug}>
                    <Link
                      href={bikeDetailUrl(bike)}
                      onClick={() => sendGa4Event("select_content", { content_type: "home_bike_row", item_id: bike.slug })}
                      className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-secondary/60"
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold group-hover:text-primary">Fantic {bike.name}</span>
                        <span className="block text-sm text-muted-foreground">{familyLabels[bike.family]}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2 font-semibold">
                        {formatPrice(bike.price)}
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/e-bikes">
                    <Bike className="mr-2 h-5 w-5" aria-hidden="true" />
                    {cheapestBikePrice ? `All models from ${formatPrice(cheapestBikePrice)}` : "See all models & prices"}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link href="/e-bikes#test-ride">Request a test ride</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-ink py-16 text-ink-foreground md:py-24">
        <SiteImage src="/images/shop-exterior.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 to-ink" aria-hidden="true" />
        <div className="container relative mx-auto px-4 text-center">
          <StockPill onDark>Stocked &amp; ready</StockPill>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold md:text-6xl">Your next boots are on the wall.</h2>
          <p className="mx-auto mb-10 mt-5 max-w-xl text-white/80 md:text-lg">
            Email Buck to book a fitting, or call either shop and come in. We&apos;ll get you skiing in boots that
            actually fit.
          </p>
          <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
            <Button asChild variant="on-dark" size="lg" className="w-full sm:w-auto">
              <a href={fittingInquiryUrl()} onClick={() => trackConversion("email_click", { location: "home_closing_fitting" })}>
                <Footprints className="mr-2 h-5 w-5" aria-hidden="true" />
                Book a Boot Fitting
              </a>
            </Button>
            {locations.map((location) => (
              <Button key={location.id} asChild variant="outline-on-dark" size="lg" className="w-full sm:w-auto">
                <a
                  href={telHref(location.contact.phone)}
                  onClick={() => trackConversion("phone_click", { location: `home_closing_${location.id}` })}
                >
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Call {location.address.city}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
