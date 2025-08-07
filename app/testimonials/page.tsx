import Link from "next/link"
import { Button } from "@/components/ui/button"
import EnhancedTestimonialCard from "@/components/enhanced-testimonial-card"
import { testimonials } from "@/data/testimonials"
import VimeoVideoHero from "@/components/vimeo-video-hero"
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

      {/* Hero Section with Vimeo Background */}
      <VimeoVideoHero
        title="Customer Testimonials"
        subtitle="Read what our customers have to say about their experiences with Olympic Bootworks"
        videoId="1085840202"
        height="small"
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
              <Button asChild variant="outline" size="lg" className="shadow-sm">
                <Link href="/shop">Shop Our Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
