"use client"

import Link from "next/link"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import { ShopButton } from "@/components/ui/shop-button"
import { Button } from "@/components/ui/button"
import ServicesSection from "@/components/services-section"
import HeelLocSection from "@/components/heel-loc-section"
import { Calendar, Zap, Mail } from "lucide-react" // Added Mail icon
import HeroButtonsNew from "@/components/hero-buttons-new"
import SimpleYouTubeEmbed from "@/components/simple-youtube-embed"
import NextImage from "@/components/next-image"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Full-Width Vimeo Background */}
      <VimeoVideoHero
        title="Olympic Bootworks"
        subtitle="Performance Solutions for Skiers, Cyclists, Pickleball & Tennis Players, Golfers, and Outdoor Enthusiasts"
        videoId="1096995547"
        height="small"
        className="full-width-hero"
      >
        <HeroButtonsNew className="mt-8" />
      </VimeoVideoHero>

      {/* Services Section */}
      <ServicesSection />

      {/* Heel-Loc Technology Section */}
      <HeelLocSection />

      {/* Fantic Bikes CTA Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Authorized Fantic E-Bike Dealer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            We are proud to be an authorized Fantic dealer, offering the largest inventory in the USA! Email us any
            questions about these very special bikes, as we have been Fantic dealers for 8 years!
          </p>
          <Button asChild size="lg" className="shadow-md">
            <a href="mailto:buck@olympicbootworks.com">
              <Mail className="mr-2 h-5 w-5" /> Email Us About Fantic Bikes
            </a>
          </Button>
        </div>
      </section>

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
                that delivers exceptional power transfer, comfort, and control. As the #1 worldwide dealer for ZipFit
                liners, we offer these premium cork-composite liners that continue to adapt to your feet over time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="shadow-sm">
                  <Link href="/contact">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule a Fitting
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
            <h2 className="text-3xl font-bold mb-4">Professional Athletes Trust Heel-Loc Technology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Watch how Buck Brown's revolutionary Heel-Loc technology helps pros perform at their best
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SimpleYouTubeEmbed
              videoId="n4r3VUYUGW0"
              title="Professional Athletes Trust Heel-Loc Technology"
              className="rounded-lg shadow-lg border"
            />

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                This video features professional athletes who rely on the Heel-Loc technology developed by our founder
                Buck Brown. Learn why Olympic medalists, World Champions, and global explorers choose Olympic Bootworks.
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
            Whether you're carving down alpine slopes, dominating the pickleball court, exploring mountain trails, or
            seeking relief from everyday discomfort, our performance-driven solutions help you move with greater
            efficiency, power, and comfort. Visit Olympic Bootworks today and experience the difference that proper
            alignment and custom fitting can make in your active life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <ShopButton href="/shop" variant="on-dark" size="lg" className="shadow-sm" iconPosition="left">
              Shop Now
            </ShopButton>
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
