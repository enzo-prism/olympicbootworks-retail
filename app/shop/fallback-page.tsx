import Link from "next/link"
import Image from "next/image"
import { ShopButton } from "@/components/ui/shop-button"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"

export default function ShopFallbackPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Shop Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Our Shop</h1>
          <p className="text-muted-foreground mb-8">Browse our selection of premium ski and mountain bike equipment</p>

          <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800">
              Our online shop is currently experiencing technical difficulties. Please use one of the alternative
              options below.
            </p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">North Lake Tahoe Store</h2>
            <p className="text-muted-foreground mb-4">
              Visit our flagship store in Olympic Valley or contact us directly for product inquiries.
            </p>

            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+15305810747" className="text-primary hover:underline">
                (530) 581-0747
              </a>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:info@olympicbootworks.com" className="text-primary hover:underline">
                info@olympicbootworks.com
              </a>
            </div>

            <Button asChild className="w-full">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">South Lake Tahoe Store</h2>
            <p className="text-muted-foreground mb-4">
              Visit our South Lake Tahoe location or contact us directly for product inquiries.
            </p>

            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+15306004056" className="text-primary hover:underline">
                (530) 600-4056
              </a>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:SouthLake@Olympicbootworks.com" className="text-primary hover:underline">
                SouthLake@Olympicbootworks.com
              </a>
            </div>

            <Button asChild className="w-full">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Categories</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Ski Equipment",
                image: "/ski-equipment-display.png",
                link: "/contact",
              },
              {
                title: "Bike Equipment",
                image: "/mountain-bike-display.png",
                link: "/contact",
              },
              {
                title: "Boots & Footwear",
                image: "/colorful-ski-boot-display.png",
                link: "/contact",
              },
              {
                title: "Apparel",
                image: "/technical-apparel-display.png",
                link: "/contact",
              },
            ].map((category, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden shadow-md group">
                <div className="aspect-square relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="w-full">
                      <h3 className="text-white font-bold text-lg mb-2">{category.title}</h3>
                      <ShopButton href={category.link} variant="on-dark" size="sm">
                        Inquire
                      </ShopButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is ready to help you find the perfect equipment for your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/gallery">View Our Gallery</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
