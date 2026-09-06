import SiteImage from "@/components/site-image"
import Link from "next/link"
import ButtonIcon from "@/components/button-icon"
import { Button } from "@/components/ui/button"
import MinimalPageHero from "@/components/minimal-page-hero"
import { Award, Footprints, Heart, ShieldCheck, Zap, Clock } from 'lucide-react'
import LocationsSection from "@/app/about/locations-section"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "About Our Tahoe Boot Fitting Shop",
  description: "Learn the Olympic Bootworks story, from Buck Brown's Heel-Loc technology to two Lake Tahoe locations serving skiers, riders, and athletes.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <MinimalPageHero
        eyebrow="Lake Tahoe • Since 1994"
        title="About Olympic Bootworks"
        description="Founded by boot fitter Buck Brown, Olympic Bootworks offers custom ski boot fitting and Fantic e-bikes in Olympic Valley and South Lake Tahoe."
        actions={[
          { href: "/contact", label: "Visit our locations" },
          { href: "/e-bikes", label: "Explore Fantic e-bikes", variant: "secondary" },
        ]}
      />

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-secondary/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden order-2 lg:order-1">
              <SiteImage
                src="/images/buck-in-shop.jpg"
                alt="Founder Buck Brown in the Olympic Bootworks shop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h3 className="font-sans tracking-normal font-bold text-primary">Buck Brown</h3>
                  <p className="text-sm text-foreground">Founder & Master Boot Fitter</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
                Our story
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Rooted in Expertise</h2>
              <p className="text-muted-foreground mb-6">
                Olympic Bootworks was founded by Buck Brown, whose relentless pursuit of the perfect fit has spanned
                decades. Frustrated by the limitations of off-the-shelf solutions, Buck dedicated himself to
                understanding the intricate relationship between foot mechanics, alignment, and athletic output.
              </p>
              <p className="text-muted-foreground mb-6">
                This journey led to the development of the revolutionary Heel-loc Technology, a proprietary system
                refined over twenty years that forms the cornerstone of our fitting process.
              </p>
              <p className="text-muted-foreground mb-6">
                From our flagship store in Olympic Valley, we've become the trusted resource for elite athletes and
                discerning enthusiasts alike. Recognizing the need for our specialized services further south, we
                proudly opened our second location on Ski Run Blvd in South Lake Tahoe.
              </p>
              <Button asChild className="shadow-sm">
                <Link href="/contact">
                  <ButtonIcon label="Visit Our Locations" href="/contact" />
                  Visit Our Locations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              Our philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Precision, Alignment, Potential</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe that true performance and lasting comfort start from the ground up. Our philosophy centers on
              achieving optimal body alignment through a meticulously customized foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-block">
                <Footprints className="h-6 w-6" />
              </div>
              <h3 className="font-sans tracking-normal text-xl font-semibold mb-2">Individual Assessment</h3>
              <p className="text-muted-foreground">
                Understanding your unique foot shape, biomechanics, and specific needs, whether for sport or daily life.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-block">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-sans tracking-normal text-xl font-semibold mb-2">Unweighted Alignment</h3>
              <p className="text-muted-foreground">
                Using an unweighted casting process to shape a footbed around your individual foot position.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-block">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-sans tracking-normal text-xl font-semibold mb-2">Custom Craftsmanship</h3>
              <p className="text-muted-foreground">
                Precisely molding footbeds and modifying boot shells and liners to create a seamless interface that
                supports, stabilizes, and empowers.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-primary/5 rounded-lg p-8 border border-primary/20">
            <h3 className="font-sans tracking-normal text-xl font-bold mb-4 text-center">The Result?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Maximum Performance</h4>
                <p className="text-sm text-muted-foreground">Optimal positioning for power and control</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Reduced Fatigue</h4>
                <p className="text-sm text-muted-foreground">Less foot and leg fatigue during activity</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Fit Refinement</h4>
                <p className="text-sm text-muted-foreground">Shell and liner adjustments based on your feedback</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Individual Support</h4>
                <p className="text-sm text-muted-foreground">Personalized support for alignment and comfort</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/60">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Two ways to get ready for Tahoe</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-sans tracking-normal text-xl font-semibold mb-3">
                <Link href="/boot-fitting" className="text-primary underline underline-offset-4">Custom ski boot fitting</Link>
              </h3>
              <p className="text-muted-foreground">Explore the fitting process, shell and liner work, Heel-Loc custom footbeds, and ZipFit liners. Request a fitting at Olympic Valley or South Lake Tahoe.</p>
            </div>
            <div>
              <h3 className="font-sans tracking-normal text-xl font-semibold mb-3">
                <Link href="/e-bikes" className="text-primary underline underline-offset-4">Fantic e-bikes</Link>
              </h3>
              <p className="text-muted-foreground">Compare mountain and urban models and website prices from an authorized Fantic dealer. Buck can confirm the exact bike, available sizes, test rides, and pickup or shipping options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <LocationsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-ink text-ink-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-5">Experience the Olympic Bootworks Difference</h2>
          <p className="max-w-2xl mx-auto mb-10 text-white/80">
            Ready to transform your performance and comfort? Request a fitting appointment or visit our shop to learn how our
            custom solutions can elevate your experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto">
            <Button asChild size="lg" variant="on-dark" className="w-full sm:w-auto">
              <Link href="/boot-fitting">
                <ButtonIcon label="Custom Boot Fitting" href="/boot-fitting" />
                Custom Boot Fitting
              </Link>
            </Button>
            <Button size="lg" variant="outline-on-dark" asChild className="backdrop-blur-sm w-full sm:w-auto">
              <Link href="/e-bikes">Explore Fantic E-Bikes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
