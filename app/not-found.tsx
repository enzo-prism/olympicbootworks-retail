import type { Metadata } from "next"
import Link from "next/link"
import { Home, Bike, Footprints } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The Olympic Bootworks page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AppNotFound() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">404 error</p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Page not found</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved, or the link is out of
          date.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="shadow-sm">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" aria-hidden="true" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="shadow-sm">
            <Link href="/e-bikes">
              <Bike className="h-4 w-4 mr-2" aria-hidden="true" />
              Explore E-Bikes
            </Link>
          </Button>
          <Button asChild variant="outline" className="shadow-sm">
            <Link href="/boot-fitting">
              <Footprints className="h-4 w-4 mr-2" aria-hidden="true" />
              Boot Fitting
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
