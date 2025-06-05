"use client"

import { useState } from "react"
import StandardImage from "./standard-image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface AdvancedImageGalleryProps {
  images?: Array<{
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
  }>
  className?: string
}

export default function AdvancedImageGallery({ images = [], className }: AdvancedImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  // If images is undefined or empty, render nothing or a placeholder
  if (!images || images.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <p>No images to display</p>
      </div>
    )
  }

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
    setIsZoomed(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsZoomed(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    setIsZoomed(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    setIsZoomed(false)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="cursor-pointer overflow-hidden rounded" onClick={() => openModal(index)}>
            <div className="relative group">
              <StandardImage
                src={image.src}
                alt={image.alt}
                width={image.width || 300}
                height={image.height || 200}
                className="w-full h-auto object-cover transition-transform hover:scale-105"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.caption}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button className="absolute top-4 right-4 text-white" onClick={closeModal}>
            <X size={24} />
          </button>

          <button className="absolute top-4 left-4 text-white" onClick={toggleZoom}>
            <ZoomIn size={24} />
          </button>

          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white" onClick={goToPrevious}>
            <ChevronLeft size={24} />
          </button>

          <div
            className={cn(
              "max-w-4xl max-h-[80vh] transition-transform duration-300",
              isZoomed ? "cursor-zoom-out scale-150" : "cursor-zoom-in",
            )}
            onClick={toggleZoom}
          >
            <StandardImage
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={images[currentIndex].width || 1200}
              height={images[currentIndex].height || 800}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {images[currentIndex].caption && (
              <div className="bg-black bg-opacity-50 text-white p-2 text-center">{images[currentIndex].caption}</div>
            )}
          </div>

          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white" onClick={goToNext}>
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
