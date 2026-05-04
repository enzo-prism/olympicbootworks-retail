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
    console.error("Shop page error:", error)
  }, [error])

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-8">We're sorry, but we encountered an error while loading the shop.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={reset} size="lg">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="h-4 w-4" aria-hidden="true" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
