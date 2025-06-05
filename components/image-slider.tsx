"use client"

import { useState } from "react"
import StandardImage from "./standard-image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageSliderProps {
  images?: Array<{
    src: string
    alt: string
    width?: number
    height?: number
  }>
  className?: string
}

export default function ImageSlider({ images = [], className }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // If images is undefined or empty, render nothing or a placeholder
  if (!images || images.length === 0) {
    return (
      <div className={cn("relative", className)}>
        <p>No images to display</p>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <StandardImage
                src={image.src}
                alt={image.alt}
                width={image.width || 800}
                height={image.height || 500}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            onClick={goToPrevious}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            onClick={goToNext}
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn("w-2 h-2 rounded-full", index === currentIndex ? "bg-white" : "bg-white bg-opacity-50")}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
