import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShopButton } from "@/components/ui/shop-button"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import { Award, Footprints, Heart, ShieldCheck, Zap, UserCheck, Trophy, Package, Clock } from 'lucide-react'
import FeatureCard from "@/components/feature-card"
import LocationsSection from "@/app/about/locations-section"
import VimeoApiScript from "@/components/vimeo-api-script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Olympic Bootworks, our history, and our commitment to expert boot fitting and bikes.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Olympic Bootworks",
    description: "Learn about Olympic Bootworks, our history, and our commitment to expert boot fitting and bikes.",
    url: "https://www.olympicbootworks.com/about",
    type: "article",
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Load Vimeo API */}
      <VimeoApiScript />

      {/* Hero Section with Vimeo Background */}
      <VimeoVideoHero
        title="About Olympic Bootworks"
        subtitle="Your Foundation for Performance and Comfort"
        videoId="1085840202"
        height="small"
      />
      <noscript>
        <section className="container mx-auto px-4 py-6 text-sm">
          <p>
            Olympic Bootworks was founded in 1985 by Buck Brown. We specialize in precision ski boot fitting, custom footbeds, and ZipFit liners that improve alignment, comfort, and performance.
          </p>
        </section>
      </noscript>

      {/* Introduction Section */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">About Olympic Bootworks</h1>
        <p className="mt-4 text-muted-foreground">
          We’ve been fitting ski boots and building great riding experiences since 1985.
        </p>
      </main>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-md order-2 lg:order-1">
              <Image
                src="/images/buck-in-shop.jpg"
                alt="Founder Buck Brown in the Olympic Bootworks shop"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h3 className="font-bold text-primary">Buck Brown</h3>
                  <p className="text-sm text-foreground">Founder & Master Boot Fitter</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
                Our Story
              </div>
              <h2 className="text-3xl font-bold mb-4">Rooted in Expertise</h2>
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
                <Link href="/contact">Visit Our Locations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
              Our Philosophy
            </div>
            <h2 className="text-3xl font-bold mb-4">Precision, Alignment, Potential</h2>
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
              <h3 className="text-xl font-semibold mb-2">Individual Assessment</h3>
              <p className="text-muted-foreground">
                Understanding your unique foot shape, biomechanics, and specific needs, whether for sport or daily life.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-block">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unweighted Alignment</h3>
              <p className="text-muted-foreground">
                Ensuring your skeletal and muscular systems are fully balanced before creating your custom fit.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-block">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Craftsmanship</h3>
              <p className="text-muted-foreground">
                Precisely molding footbeds and modifying boot shells and liners to create a seamless interface that
                supports, stabilizes, and empowers.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-primary/5 rounded-lg p-8 border border-primary/20">
            <h3 className="text-xl font-bold mb-4 text-center">The Result?</h3>
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
                <h4 className="font-semibold mb-1">Pain Relief</h4>
                <p className="text-sm text-muted-foreground">Corrective positioning that alleviates discomfort</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">Injury Prevention</h4>
                <p className="text-sm text-muted-foreground">Proper alignment to prevent common injuries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond the Slopes Section - Redesigned without images/icons */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
              Beyond the Slopes
            </div>
            <h2 className="text-3xl font-bold mb-4">Multisport Mastery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              While our heritage lies in crafting the ultimate fit for elite skiers and snowboarders, our expertise
              benefits athletes across disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skiers & Snowboarders */}
            <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              <div className="p-6 border border-t-0 rounded-b-lg">
                <h3 className="text-xl font-bold mb-2">Skiers & Snowboarders</h3>
                <p className="text-sm text-muted-foreground">
                  From weekend warriors to professionals seeking the winning edge
                </p>
              </div>
            </div>

            {/* Cyclists */}
            <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-24 bg-gradient-to-r from-green-600 to-green-400"></div>
              <div className="p-6 border border-t-0 rounded-b-lg">
                <h3 className="text-xl font-bold mb-2">Cyclists</h3>
                <p className="text-sm text-muted-foreground">Enhancing power transfer and endurance on road or trail</p>
              </div>
            </div>

            {/* Runners */}
            <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-24 bg-gradient-to-r from-red-600 to-red-400"></div>
              <div className="p-6 border border-t-0 rounded-b-lg">
                <h3 className="text-xl font-bold mb-2">Runners</h3>
                <p className="text-sm text-muted-foreground">
                  Improving form, reducing impact, and preventing common injuries
                </p>
              </div>
            </div>

            {/* Golfers */}
            <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-24 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
              <div className="p-6 border border-t-0 rounded-b-lg">
                <h3 className="text-xl font-bold mb-2">Golfers</h3>
                <p className="text-sm text-muted-foreground">Providing a stable base for a more consistent swing</p>
              </div>
            </div>

            {/* Everyday Comfort */}
            <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-24 bg-gradient-to-r from-amber-600 to-amber-400"></div>
              <div className="p-6 border border-t-0 rounded-b-lg">
                <h3 className="text-xl font-bold mb-2">Everyday Comfort</h3>
                <p className="text-sm text-muted-foreground">
                  Offering relief from foot, knee, or leg pain through custom footbeds
                </p>
              </div>
            </div>

            {/* Elite Athletes */}
            <div className="rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-24 bg-gradient-to-r from-purple-600 to-purple-400"></div>
              <div className="p-6 border border-t-0 rounded-b-lg">
                <h3 className="text-xl font-bold mb-2">Elite Athletes</h3>
                <p className="text-sm text-muted-foreground">Trusted by Olympic medalists and World Cup champions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl font-bold mb-4">Olympic Bootworks Advantage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What sets us apart and why athletes and comfort-seekers trust us with their performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Pioneering Technology"
              description="Benefit from the proven results of our exclusive Heel-loc system, developed and refined over decades."
              icon={Zap}
              className="hover:-translate-y-1 transition-transform duration-300"
            />

            <FeatureCard
              title="Unrivaled Expertise"
              description="Leverage Buck Brown's decades of experience and our team's deep knowledge of biomechanics."
              icon={UserCheck}
              className="hover:-translate-y-1 transition-transform duration-300"
            />

            <FeatureCard
              title="Truly Custom Solutions"
              description="Receive a fit tailored specifically to your unique foot shape, biomechanics, and performance needs."
              icon={Footprints}
              className="hover:-translate-y-1 transition-transform duration-300"
            />

            <FeatureCard
              title="Elite Trust"
              description="Join the ranks of world-class athletes who rely on our expertise for their competitive edge."
              icon={Trophy}
              className="hover:-translate-y-1 transition-transform duration-300"
            />

            <FeatureCard
              title="Top-Tier Products"
              description="Access the best gear, including being the #1 Worldwide Dealer for ZipFit Liners."
              icon={Package}
              className="hover:-translate-y-1 transition-transform duration-300"
            />

            <FeatureCard
              title="Lasting Support"
              description="Enjoy complimentary fitting adjustments for the lifetime of your boots or shoes purchased here."
              icon={Clock}
              className="hover:-translate-y-1 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Locations Section - Now using our new image-free component */}
      <LocationsSection />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Olympic Bootworks Difference</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Ready to transform your performance and comfort? Book a fitting session or visit our shop to learn how our
            custom solutions can elevate your experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ShopButton href="/shop" size="lg" variant="on-dark" className="shadow-sm">
              Shop Our Products
            </ShopButton>
            <Button size="lg" variant="outline-on-dark" asChild className="backdrop-blur-sm shadow-sm">
              <Link href="/contact">Book a Fitting</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
