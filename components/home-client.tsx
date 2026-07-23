"use client"

import Link from "next/link"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import { Button } from "@/components/ui/button"
import ServicesSection from "@/components/services-section"
import HeelLocSection from "@/components/heel-loc-section"
import { ArrowRight, Bike, Calendar, ChevronDown, Footprints, Mail } from 'lucide-react'
import SimpleYouTubeEmbed from "@/components/simple-youtube-embed"
import SiteImage, { NEUTRAL_BLUR } from "@/components/site-image"
import BikeCard from "@/components/bike-card"
import { HeroPrimaryCTA, HeroSecondaryCTA } from "@/components/hero-cta"
import CopyEmailButton from "@/components/copy-email-button"
import { sendGa4Event } from "@/lib/gtag"
import { trackConversion } from "@/lib/track-conversion"
import { featuredBikes } from "@/data/bikes"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"

export default function HomeClient() {
  return (
    <div className="flex flex-col">
      {/* Hero — full-bleed video over a static poster, bike-led with both paths reachable */}
      <VimeoVideoHero
        videoId="1096995547"
        height="full"
        overlayOpacity={0.9}
        posterSrc="/images/elite-skier.jpg"
        customContent={
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/80 md:text-sm">
              Olympic Valley&ensp;&middot;&ensp;South Lake Tahoe
            </p>

            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-display font-semibold tracking-tight leading-[1.02] drop-shadow-lg">
              Fantic E-Bikes in Lake&nbsp;Tahoe
            </h1>
            <p className="mt-4 text-white/85 text-base md:text-lg max-w-xl mx-auto drop-shadow">
              Compare current models and prices, then email Buck for personal help choosing,
              sizing, and test riding the right bike.
            </p>

            {/* Primary actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <HeroPrimaryCTA
                href="/e-bikes"
                icon={<Bike className="h-5 w-5" aria-hidden="true" />}
                onClick={() =>
                  sendGa4Event("select_content", { content_type: "hero_cta", item_id: "explore_ebikes" })
                }
              >
                Explore Fantic E-Bikes
              </HeroPrimaryCTA>
              <HeroSecondaryCTA
                href="mailto:buck@olympicbootworks.com?subject=Fantic%20E-Bike%20Question"
                icon={<Mail className="h-5 w-5" aria-hidden="true" />}
                onClick={() => trackConversion("email_click", { location: "home_hero_ebikes" })}
              >
                Email Buck
              </HeroSecondaryCTA>
            </div>
            <CopyEmailButton
              email="buck@olympicbootworks.com"
              subject="Fantic E-Bike Question"
              body={"Hi Buck,\n\nI have a question about your Fantic e-bikes.\n\nWhat I'd like to know:\n\nThank you."}
              className="mt-4 text-sm text-white/85"
              emailClassName="font-semibold text-white"
              buttonClassName="text-white"
              trackingLocation="home_hero_email_copy"
            />
            <a
              href={fittingInquiryUrl()}
              onClick={() => trackConversion("email_click", { location: "home_hero_fitting" })}
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/85 underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
            >
              <Footprints className="h-4 w-4" aria-hidden="true" />
              Here to ski? Request a custom boot fitting
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        }
      />

      {/* Scroll cue */}
      <div className="-mt-10 mb-6 flex justify-center">
        <div className="flex items-center gap-2 text-white bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs">Scroll</span>
        </div>
      </div>

      {/* Dual-path chooser — answers both audiences immediately below the fold */}
      <section aria-label="Choose your path" className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Link
              href="/e-bikes"
              onClick={() =>
                sendGa4Event("select_content", { content_type: "home_path", item_id: "ebikes" })
              }
              className="group relative flex min-h-[220px] items-end overflow-hidden rounded-lg border bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <SiteImage
                src="/images/e-bikes/xmf-1-7.jpg"
                alt="Fantic XMF 1.7 e-bike"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03]"
                placeholder="blur"
                blurDataURL={NEUTRAL_BLUR}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="relative z-10 p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                  Fantic &middot; Italian made
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-white">
                  E-Bikes &amp; Prices
                </h2>
                <p className="mt-1.5 max-w-sm text-sm text-white/80">
                  Compare the current lineup, then email Buck about availability and test rides.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  See the lineup
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>

            <Link
              href="/boot-fitting"
              onClick={() =>
                sendGa4Event("select_content", { content_type: "home_path", item_id: "boot_fitting" })
              }
              className="group relative flex min-h-[220px] items-end overflow-hidden rounded-lg border bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <SiteImage
                src="/images/buck-with-boot.jpg"
                alt="Buck Brown fitting a ski boot"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03]"
                placeholder="blur"
                blurDataURL={NEUTRAL_BLUR}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="relative z-10 p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                  Since day one
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-white">
                  Custom Boot Fitting
                </h2>
                <p className="mt-1.5 max-w-sm text-sm text-white/80">
                  Heel-Loc footbeds, ZipFit liners, and shell work built around your feet.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Explore fitting services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Current Fantic e-bike models and prices */}
      {featuredBikes.length > 0 && (
      <section id="e-bikes" className="fantic-theme scroll-mt-24 py-16 md:py-24 bg-secondary/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              Fantic &middot; Italian Made Freedom
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Current Fantic E-Bike Prices</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare the current lineup in plain language, then email Buck for personal help with
              sizing, availability, test rides, pickup, and shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {featuredBikes.map((bike) => (
              <BikeCard key={bike.slug} bike={bike} surface="home_featured" />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/e-bikes">
                <Bike className="mr-2 h-5 w-5" aria-hidden="true" />
                See all models &amp; pricing
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/e-bikes#test-ride">
                <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                Request a test ride
              </Link>
            </Button>
          </div>
        </div>
      </section>
      )}

      {/* Services Section */}
      <ServicesSection />

      {/* Heel-Loc Technology Section */}
      <HeelLocSection />

      {/* Custom Boot Fitting Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* aspect-[4/5] matches the photo's intrinsic 740x925 ratio so it renders uncropped */}
            <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto lg:mx-0 rounded-lg overflow-hidden">
              <SiteImage
                src="/images/fitting-process.jpg"
                alt="Buck fitting a customer's foot on the casting stand in the Olympic Valley shop"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
                placeholder="blur"
                blurDataURL={NEUTRAL_BLUR}
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
                Expert craftsmanship
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Custom Boot Fitting</h2>
              <p className="text-muted-foreground mb-6">
                Our comprehensive boot fitting process begins with a detailed biomechanical assessment of your feet,
                ankles, and stance. Using this analysis, we select the optimal shell and liner combination for your
                unique physiology and performance goals.
              </p>
              <p className="text-muted-foreground mb-8">
                Through precise shell modifications, custom footbeds, and personalized liner molding, we create a boot
                designed to support comfort and control. We also fit premium ZipFit cork-composite liners that continue
                to adapt to your feet over time.
              </p>

              <dl className="mb-8 grid grid-cols-3 gap-4 border-y py-5">
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

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a
                    href={fittingInquiryUrl()}
                    onClick={() => trackConversion("email_click", { location: "home_fitting_section" })}
                  >
                    <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                    Request a Fitting
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">
                    <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                    Hours &amp; locations
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary/60">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              From the community
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">What Our Customers Say</h2>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              Watch
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Heel-Loc Technology in Action</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear how athletes use the Heel-Loc technology developed by Buck Brown.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SimpleYouTubeEmbed
              videoId="n4r3VUYUGW0"
              title="Heel-Loc Technology in Action"
              className="rounded-lg shadow-lg border"
            />

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                This video features athletes discussing the Heel-Loc technology developed by Olympic Bootworks founder
                Buck Brown.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 md:py-24 bg-ink text-ink-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60 mb-4">
            Olympic Valley &middot; South Lake Tahoe
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-5">Move at your best.</h2>
          <p className="max-w-xl mx-auto mb-10 text-white/80">
            Ride an Italian-built Fantic, or ski a boot built around your feet. Either way, it
            starts with a conversation with Buck.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="on-dark" size="lg">
              <Link href="/e-bikes">
                <Bike className="h-5 w-5 mr-2" aria-hidden="true" />
                Explore Fantic E-Bikes
              </Link>
            </Button>
            <Button asChild variant="outline-on-dark" size="lg" className="backdrop-blur-sm">
              <a
                href={fittingInquiryUrl()}
                onClick={() => trackConversion("email_click", { location: "home_closing_fitting" })}
              >
                <Footprints className="h-5 w-5 mr-2" aria-hidden="true" />
                Request a Boot Fitting
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
