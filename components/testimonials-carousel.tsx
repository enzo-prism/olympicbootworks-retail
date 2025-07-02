"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import EnhancedTestimonialCard from "@/components/enhanced-testimonial-card"
import { testimonials } from "@/data/testimonials"

export default function TestimonialsCarousel() {
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

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
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentTestimonials = testimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTestimonials.map((testimonial, index) => (
          <EnhancedTestimonialCard
            key={index}
            name={testimonial.name}
            role={testimonial.role}
            content={testimonial.content}
            rating={testimonial.rating}
            className="h-full"
          />
        ))}
      </div>

      {/* Navigation controls */}
      <div className="flex justify-center items-center mt-8 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevPage}
          className="rounded-full"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentPage === index ? "bg-primary w-4" : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          className="rounded-full"
          aria-label="Next testimonials"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
