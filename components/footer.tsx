import Link from "next/link"
import Image from "next/image"
import { ShopButton } from "@/components/ui/shop-button"
import { Facebook, Instagram, Star } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image
                  src="/images/olympic-bootworks-transparent-logo.png"
                  alt="Olympic Bootworks Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-bold">Olympic Bootworks</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Premier ski and mountain bike shop serving athletes of all levels since 1985.
            </p>
            <ShopButton href="/shop" size="sm" className="shadow-sm">
              Shop Now
            </ShopButton>
            <div className="flex items-center space-x-4 mt-6">
              <Link
                href="https://www.facebook.com/olympicbootworks/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/olympicbootworks/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.yelp.com/biz/olympic-bootworks-squaw-valley"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Check us out on Yelp"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Star className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-primary hover:text-primary font-semibold text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pros" className="text-muted-foreground hover:text-primary text-sm">
                  Pros
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* North Lake Tahoe Location */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold">North Lake Tahoe</h3>
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">Flagship Store</p>
              <p className="text-sm text-muted-foreground">1602 Squaw Valley Road, Box 3514</p>
              <p className="text-sm text-muted-foreground">Olympic Valley, CA 96146</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Call:</span> (530) 581-0747
              </p>
              <Link href="/contact" className="text-sm text-primary hover:underline">
                View Hours & Map
              </Link>
            </div>
          </div>

          {/* South Lake Tahoe Location */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-lg font-bold">South Lake Tahoe</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">1235 Ski Run Blvd.</p>
              <p className="text-sm text-muted-foreground">South Lake Tahoe, CA 96150</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Call:</span> (530) 600-4056
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Email:</span> buck@olympicbootworks.com
              </p>
              <Link href="/contact" className="text-sm text-primary hover:underline">
                View Hours & Map
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Olympic Bootworks. All rights reserved.</p>
          <div className="mt-2">
            <Link
              href="https://www.design-prism.com/?utm_source=olympicbootworks&utm_medium=referral&utm_campaign=olympicbootworks_2025-07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors"
            >
              website design
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
