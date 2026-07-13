"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Footprints, Zap, Award, Heart, Bike, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ServiceItem {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
}

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isUserPaused, setIsUserPaused] = useState(false)
  const [isInteractionPaused, setIsInteractionPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)
  const slideRef = useRef<HTMLDivElement>(null)

  // Define minimum swipe distance (in px)
  const minSwipeDistance = 50

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)
    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  const services: ServiceItem[] = [
    {
      icon: <Footprints className="h-6 w-6" />,
      title: "Custom Boot Fitting",
      description:
        "Our signature service employs advanced shell modification, liner molding, and personalized adjustments to create a truly custom fit that enhances performance and eliminates discomfort for skiers and snowboarders of all levels.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Heel-Loc Orthotics",
      description:
        "Developed over decades of biomechanical research, our proprietary Heel-Loc orthotics support natural alignment and optimize power transfer for skiers, runners, golfers, and cyclists, delivering improved performance and reduced fatigue.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "ZipFit Liner Specialists",
      description:
        "As the #1 worldwide dealer for ZipFit liners, we provide these premium cork-composite boot liners that mold to your feet over time, offering unparalleled comfort, performance, and durability for serious skiers and snowboarders.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Custom Footbeds",
      description:
        "Our precision-crafted custom footbeds provide the foundation for optimal biomechanical alignment, reducing pain and enhancing endurance across various sports—from skiing to pickleball—while preventing common injuries through proper support.",
    },
    {
      icon: <Bike className="h-6 w-6" />,
      title: "Fantic Electric Bikes",
      description:
        "Experience the thrill of Italian-engineered Fantic electric bikes, combining cutting-edge technology with all-terrain versatility. From mountain trails to urban commutes, these premium e-bikes deliver power, range, and reliability.",
      href: "/e-bikes",
    },
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length)
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
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isUserPaused || isInteractionPaused || prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % services.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isInteractionPaused, isUserPaused, prefersReducedMotion, services.length])

  return (
    <div
      className="relative w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Olympic Bootworks services"
      onMouseEnter={() => setIsInteractionPaused(true)}
      onMouseLeave={() => setIsInteractionPaused(false)}
      onFocusCapture={() => setIsInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsInteractionPaused(false)
      }}
    >
      {/* Mobile Carousel */}
      <div
        className="relative w-full overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={slideRef}
          id="services-carousel-track"
          className={cn("flex ease-in-out", prefersReducedMotion ? "transition-none" : "transition-transform duration-300")}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          aria-live={isUserPaused || prefersReducedMotion ? "polite" : "off"}
        >
          {services.map((service, index) => {
            const card = (
              <div className="bg-card border rounded-lg p-6 shadow-sm h-full flex flex-col">
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary inline-block self-start">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm flex-grow">{service.description}</p>
              </div>
            )
            return (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4 py-6"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${services.length}: ${service.title}`}
                aria-hidden={index !== currentIndex}
                inert={index !== currentIndex}
              >
                {service.href ? <Link href={service.href}>{card}</Link> : card}
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hidden md:flex"
        onClick={prevSlide}
        aria-controls="services-carousel-track"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full shadow-md hidden md:flex"
        onClick={nextSlide}
        aria-controls="services-carousel-track"
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>

      {/* Pagination Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index ? "bg-primary w-6" : "bg-gray-300 dark:bg-gray-600",
            )}
            onClick={() => {
              setCurrentIndex(index)
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index ? "true" : undefined}
            aria-controls="services-carousel-track"
          />
        ))}
      </div>

      {!prefersReducedMotion && <div className="mt-3 flex justify-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsUserPaused((paused) => !paused)}
          aria-controls="services-carousel-track"
          aria-label={isUserPaused ? "Resume automatic slide rotation" : "Pause automatic slide rotation"}
          className="gap-2"
        >
          {isUserPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          {isUserPaused ? "Resume slides" : "Pause slides"}
        </Button>
      </div>}

      {/* Swipe Instructions - only shown on first load on mobile */}
      <div className="text-center text-xs text-muted-foreground mt-2 md:hidden">
        Swipe left or right to see more services
      </div>
    </div>
  )
}
