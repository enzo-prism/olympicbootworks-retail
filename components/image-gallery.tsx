"use client"

import { useEffect, useId, useRef, useState } from "react"
import SiteImage, { NEUTRAL_BLUR } from "./site-image"

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const captionId = useId()

  const openLightbox = (image: GalleryImage, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  useEffect(() => {
    if (!selectedImage) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeLightbox()
        return
      }

      if (event.key !== "Tab" || !dialogRef.current) return
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus()
    }
  }, [selectedImage])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            type="button"
            key={index}
            className="border rounded-lg overflow-hidden cursor-pointer text-left transition-transform hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={(event) => openLightbox(image, event.currentTarget)}
            aria-label={`Open image: ${image.alt}`}
            aria-haspopup="dialog"
          >
            <div className="relative h-64">
              <SiteImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                // No blur-up behind transparent logos; photographs get the neutral blur
                placeholder={image.src.endsWith(".png") ? "empty" : "blur"}
                blurDataURL={NEUTRAL_BLUR}
              />
            </div>
            {image.caption && (
              <div className="p-3 text-sm text-center text-muted-foreground">{image.caption}</div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox()
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${selectedImage.alt}`}
          aria-describedby={selectedImage.caption ? captionId : undefined}
          ref={dialogRef}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <div className="relative h-full">
              <SiteImage
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="object-contain max-h-[80vh] mx-auto"
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            {selectedImage.caption && <div id={captionId} className="text-white text-center mt-4">{selectedImage.caption}</div>}
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={closeLightbox}
              aria-label="Close image preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
