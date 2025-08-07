import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShopButton } from "@/components/ui/shop-button"
import EnhancedTestimonialCard from "@/components/enhanced-testimonial-card"
import { testimonials } from "@/data/testimonials"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import MinimalHeroContent from "@/components/minimal-hero-content"
import VimeoApiScript from "@/components/vimeo-api-script"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What our customers say about Olympic Bootworks.",
  alternates: { canonical: "/testimonials" },
}

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col">
      {/* Load Vimeo API */}
      <VimeoApiScript />

      {/* Minimal, elegant hero */}
      <VimeoVideoHero
        videoId="1085840202"
        height="large"
        customContent={
          <MinimalHeroContent
            eyebrow="Real results"
            title="Testimonials"
            subtitle="Comfort, performance, and support."
            actions={[
              { href: "/contact", label: "Book a fitting", variant: "solid" },
              { href: "/shop", label: "Shop products", variant: "shop" },
            ]}
            logoHeight={52}
          />
        }
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <p className="mt-4 text-muted-foreground">Real stories from real riders and skiers.</p>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <EnhancedTestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
                imageSrc={testimonial.imageSrc}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Ready to experience the Olympic Bootworks difference for yourself?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="shadow-sm">
                <Link href="/contact">Book a Fitting</Link>
              </Button>
              <ShopButton href="/shop" className="shadow-sm" size="lg">
                Shop Our Products
              </ShopButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
