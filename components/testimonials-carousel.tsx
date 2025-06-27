"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import EnhancedTestimonialCard from "@/components/enhanced-testimonial-card"
import { testimonials } from "@/data/testimonials"

export default function TestimonialsCarousel() {
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  // Define minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Recalculate current page when items per page changes
  useEffect(() => {
    const newTotalPages = Math.ceil(testimonials.length / itemsPerPage)
    if (currentPage >= newTotalPages) {
      setCurrentPage(newTotalPages - 1)
    }
  }, [itemsPerPage, currentPage])

  const nextPage = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentPage((prev) => (prev + 1) % totalPages)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevPage = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Handle touch events for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextPage()
    } else if (isRightSwipe) {
      prevPage()
    }
  }

  const currentTestimonials = testimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="relative">
      {/* Touch-enabled container for mobile */}
      <div
        className="relative overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={slideRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-300 ease-in-out"
        >
          {currentTestimonials.map((testimonial, index) => (
            <EnhancedTestimonialCard
              key={`${currentPage}-${index}`}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              className="h-full"
            />
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex justify-center items-center mt-8 md:mt-12 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevPage}
          className="rounded-full h-10 w-10 md:h-12 md:w-12 shadow-sm bg-background/80 backdrop-blur-sm"
          aria-label="Previous testimonials"
          disabled={isAnimating}
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={cn(
                "w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 touch-manipulation",
                currentPage === index 
                  ? "bg-primary scale-110 shadow-sm" 
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              )}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          className="rounded-full h-10 w-10 md:h-12 md:w-12 shadow-sm bg-background/80 backdrop-blur-sm"
          aria-label="Next testimonials"
          disabled={isAnimating}
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-4 md:mt-6 overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>

      {/* Swipe Instructions - only shown on mobile when there are multiple pages */}
      {totalPages > 1 && (
        <div className="text-center text-xs text-muted-foreground mt-3 md:hidden">
          Swipe left or right to see more testimonials
        </div>
      )}
    </div>
  )
}
