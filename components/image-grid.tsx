import StandardImage from "./standard-image"
import { cn } from "@/lib/utils"

interface ImageGridProps {
  images?: Array<{
    src: string
    alt: string
    width?: number
    height?: number
  }>
  columns?: number
  gap?: number
  className?: string
}

export default function ImageGrid({ images = [], columns = 3, gap = 4, className }: ImageGridProps) {
  // If images is undefined or empty, render nothing or a placeholder
  if (!images || images.length === 0) {
    return (
      <div className={cn("grid", className)}>
        <p>No images to display</p>
      </div>
    )
  }

  return (
    <div className={cn("grid", `grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns}`, `gap-${gap}`, className)}>
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded">
          <StandardImage
            src={image.src}
            alt={image.alt}
            width={image.width || 300}
            height={image.height || 200}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  )
}
