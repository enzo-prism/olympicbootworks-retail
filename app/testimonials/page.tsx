import Link from "next/link"
import ButtonIcon from "@/components/button-icon"
import { Button } from "@/components/ui/button"
import { ShopButton } from "@/components/ui/shop-button"
import EnhancedTestimonialCard from "@/components/enhanced-testimonial-card"
import { testimonials } from "@/data/testimonials"
import MinimalPageHero from "@/components/minimal-page-hero"
import { GoogleGIcon } from "@/components/google-g-icon"
import { GoogleReviewButton } from "@/components/google-review-button"
import { GOOGLE_BUSINESS_REVIEW_URL } from "@/lib/google-business"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials",
  description:
    "Read Olympic Bootworks customer reviews from skiers, riders, pickleball players, and athletes who found better comfort and performance.",
  alternates: { canonical: "/testimonials" },
}

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col">
      <MinimalPageHero
        eyebrow="Real results"
        title="Testimonials"
        description="Stories from skiers, riders, and athletes who came in looking for comfort and left with a better foundation."
        actions={[
          {
            href: GOOGLE_BUSINESS_REVIEW_URL,
            label: "Leave a Google review",
            variant: "secondary",
            external: true,
            leadingIcon: <GoogleGIcon className="h-[1.15rem] w-[0.8rem]" />,
          },
          { href: "/contact", label: "Book a fitting" },
          { href: "/shop", label: "Shop products", variant: "secondary" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold">Customer stories</h2>
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
            <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
              <GoogleReviewButton size="lg" analyticsItemId="google_review_testimonials_footer" />
              <Button asChild size="lg" className="shadow-sm">
                <Link href="/contact">
                  <ButtonIcon label="Book a Fitting" href="/contact" />
                  Book a Fitting
                </Link>
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
