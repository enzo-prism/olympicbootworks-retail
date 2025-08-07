import Link from "next/link"
import ImageGallery from "@/components/image-gallery"
import VimeoVideoHero from "@/components/vimeo-video-hero"
import MinimalHeroContent from "@/components/minimal-hero-content"
import { Button } from "@/components/ui/button"
import { ShopButton } from "@/components/ui/shop-button"
import NextImage from "@/components/next-image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look inside Olympic Bootworks and our community.",
  alternates: { canonical: "/gallery" },
}

export default function GalleryPage() {
  const galleryImages = [
    {
      src: "/images/fitting-process.jpg",
      alt: "Custom boot fitting process at Olympic Bootworks",
      caption: "Our expert boot fitting process ensures the perfect fit for your feet",
    },
    {
      src: "/images/olympic-helmet.jpg",
      alt: "Olympic Bootworks sticker on ski helmet",
      caption: "Olympic Bootworks on the slopes",
    },
    {
      src: "/images/pro-team.jpg",
      alt: "Founder Buck with the pro team customers",
      caption: "Our founder Buck with professional athletes who trust our services",
    },
    {
      src: "/images/buck-in-shop.jpg",
      alt: "Founder Buck Brown in the shop",
      caption: "Buck Brown showcasing our extensive boot selection",
    },
    {
      src: "/images/elite-skier.jpg",
      alt: "Elite skier customer interview inside the shop",
      caption: "Professional skiers trust Olympic Bootworks for their equipment needs",
    },
    {
      src: "/images/customers-on-slopes.jpg",
      alt: "Customers on slopes holding up Olympic Bootworks t-shirt",
      caption: "Happy customers representing Olympic Bootworks on the mountain",
    },
    {
      src: "/images/buck-with-boot.jpg",
      alt: "Founder Buck in the shop holding a ski boot",
      caption: "Buck examining boots to ensure quality and performance",
    },
    {
      src: "/images/buck-in-shop-2.jpg",
      alt: "Founder Buck in the shop with ski boots",
      caption: "Our founder showcasing our boot wall selection",
    },
    {
      src: "/images/shop-exterior.jpg",
      alt: "Front of Olympic Bootworks shop",
      caption: "Our shop in Olympic Valley, ready to serve you",
    },
    {
      src: "/images/fitting-process-2.jpg",
      alt: "Custom boot fitting process",
      caption: "Creating custom footbeds for optimal performance and comfort",
    },
    {
      src: "/images/travis-ganong.jpeg",
      alt: "Travis Ganong, Professional Ski Racer",
      caption: "World Cup ski racer Travis Ganong trusts Olympic Bootworks",
    },
    {
      src: "/images/pro-with-skis.jpeg",
      alt: "Professional skier with Olympic Bootworks",
      caption: "Our pros are equipped with the best gear for the mountain",
    },
    {
      src: "/images/olympic-bootworks-transparent-logo.png",
      alt: "Olympic Bootworks Logo",
      caption: "The iconic Olympic Bootworks logo",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Minimal, elegant hero */}
      <VimeoVideoHero
        videoId="1085840202"
        height="large"
        customContent={
          <MinimalHeroContent
            eyebrow="Inside the shop"
            title="Gallery"
            subtitle="People, process, and the mountains."
            actions={[
              { href: "#gallery", label: "Explore gallery", variant: "solid" },
              { href: "/contact", label: "Book a fitting", variant: "outline" },
            ]}
            logoHeight={52}
          />
        }
      />

      {/* Gallery Section */}
      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop & Customer Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through photos of our shop, team, and happy customers enjoying their Olympic Bootworks experience.
            </p>
          </div>

          <ImageGallery images={galleryImages} />
        </div>
      </section>

      {/* Boot Fitting Showcase */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Custom Boot Fitting</h2>
              <p className="text-muted-foreground mb-6">
                At Olympic Bootworks, we specialize in custom boot fitting to ensure maximum comfort and performance.
                Our expert technicians analyze your feet and skiing style to create a personalized fit that enhances
                your experience on the mountain.
              </p>
              <p className="text-muted-foreground mb-6">
                The boot fitting process includes custom footbeds, shell modifications, and precise adjustments to
                accommodate your unique foot shape. This attention to detail is what sets Olympic Bootworks apart and
                keeps our customers coming back season after season.
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span> Comprehensive foot analysis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span> Custom molded footbeds
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span> Shell modifications for proper width
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span> Liner molding for precise fit
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span> Follow-up adjustments as needed
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="shadow-sm">
                  <Link href="/contact">Schedule a Fitting</Link>
                </Button>
                <ShopButton href="/shop/boots" className="shadow-sm">
                  Shop Boots
                </ShopButton>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <NextImage
                  src="/images/fitting-process.jpg"
                  alt="Boot fitting process"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <NextImage
                  src="/images/fitting-process-2.jpg"
                  alt="Custom footbed molding"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updated Main Section */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="mt-4 text-muted-foreground">Photos from the shop and the mountains.</p>
      </main>
    </div>
  )
}
