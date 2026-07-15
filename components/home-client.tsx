"use client"

import Link from "next/link"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import { Button } from "@/components/ui/button"
import ServicesSection from "@/components/services-section"
import HeelLocSection from "@/components/heel-loc-section"
import { Bike, Calendar, Zap, ChevronDown, Mail } from 'lucide-react'
import SimpleYouTubeEmbed from "@/components/simple-youtube-embed"
import NextImage from "@/components/next-image"
import BikeCard from "@/components/bike-card"
import { HeroPrimaryCTA, HeroSecondaryCTA } from "@/components/hero-cta"
import CopyEmailButton from "@/components/copy-email-button"
import { sendGa4Event } from "@/lib/gtag"
import { trackConversion } from "@/lib/track-conversion"
import { featuredBikes } from "@/data/bikes"

export default function HomeClient() {
  return (
    <div className="flex flex-col">
      {/* Minimal, elegant hero with full-bleed video background */}
      <VimeoVideoHero
        videoId="1096995547"
        height="full"
        overlayOpacity={0.65}
        className="full-width-hero"
        customContent={
          <div className="flex flex-col items-center justify-center text-center">
            {/* Subtle frosted badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full frosted-glass px-4 py-1.5 text-white/90 text-xs md:text-sm border border-white/20 shadow-sm">
              <span>Fantic</span>
              <span className="opacity-60">{'•'}</span>
              <span>Italian Made Freedom</span>
            </div>

            {/* Brand mark */}
            <div className="mb-4">
              <NextImage
                src="/images/olympic-bootworks-transparent-logo.png"
                alt="Olympic Bootworks logo"
                className="h-12 md:h-14 w-auto opacity-95"
                width={240}
                height={56}
                priority
                style={{ width: "auto" }}
              />
            </div>

            {/* Tight headline and subheadline */}
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] drop-shadow-lg">
              Fantic E-Bikes in Lake Tahoe
            </h1>
            <p className="mt-3 text-white/85 text-base md:text-lg max-w-xl mx-auto drop-shadow">
              Compare current models, read clear descriptions, and email Buck for personal help choosing the right bike.
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
              className="mt-4 text-sm text-white/85"
              emailClassName="font-semibold text-white"
              buttonClassName="text-white"
              trackingLocation="home_hero_email_copy"
            />
          </div>
        }
      />

      {/* Scroll cue */}
      <div className="-mt-10 mb-6 flex justify-center">
        <div className="flex items-center gap-2 text-white/70 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 border border-white/15">
          <ChevronDown className="h-4 w-4" />
          <span className="text-xs">Scroll</span>
        </div>
      </div>

      {/* Current Fantic e-bike models and prices */}
      {featuredBikes.length > 0 && (
      <section id="e-bikes" className="fantic-theme scroll-mt-24 py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              Fantic • Italian Made Freedom
            </p>
            <h2 className="text-3xl font-bold mb-4">Current Fantic E-Bike Prices</h2>
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
            <Button asChild size="lg" className="shadow-md">
              <Link href="/e-bikes">
                <Bike className="mr-2 h-5 w-5" aria-hidden="true" />
                See all models &amp; pricing
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-sm">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md">
              <NextImage
                src="/images/fitting-process.jpg"
                alt="Custom Boot Fitting Process"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div>
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
                Expert Craftsmanship
              </div>
              <h2 className="text-3xl font-bold mb-4">Custom Boot Fitting</h2>
              <p className="text-muted-foreground mb-6">
                Our comprehensive boot fitting process begins with a detailed biomechanical assessment of your feet,
                ankles, and stance. Using this analysis, we select the optimal shell and liner combination for your
                unique physiology and performance goals.
              </p>
              <p className="text-muted-foreground mb-6">
                Through precise shell modifications, custom footbeds, and personalized liner molding, we create a boot
                designed to support comfort and control. We also fit premium ZipFit cork-composite liners that continue
                to adapt to your feet over time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="shadow-sm">
                  <Link href="/contact">
                    <Calendar className="h-4 w-4 mr-2" />
                    Request a Fitting
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Heel-Loc Technology in Action</h2>
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Move at Your Best</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you&apos;re carving down alpine slopes, dominating the pickleball court, exploring mountain trails,
            or seeking relief from everyday discomfort, our performance-driven solutions help you move with greater
            efficiency, power, and comfort. Visit Olympic Bootworks today and experience the difference that proper
            alignment and custom fitting can make in your active life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="on-dark" size="lg" className="shadow-sm">
              <Link href="/e-bikes">Explore Fantic E-Bikes</Link>
            </Button>
            <Button
              variant="outline-on-dark"
              size="lg"
              className="backdrop-blur-sm shadow-sm"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Zap className="h-5 w-5 mr-2" />
              View Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
