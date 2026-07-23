"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Home, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error)
  }, [error])

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">Unexpected error</p>
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          We&apos;re sorry, but something went wrong. Please try again or return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={reset} className="shadow-sm">
            <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
            Try again
          </Button>
          <Button asChild variant="outline" className="shadow-sm">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" aria-hidden="true" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
