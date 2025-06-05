import StandardImage from "./standard-image"
import { cn } from "@/lib/utils"

interface ImageWithCaptionProps {
  src: string
  alt: string
  caption: string
  width?: number
  height?: number
  className?: string
  captionClassName?: string
}

export default function ImageWithCaption({
  src,
  alt,
  caption,
  width,
  height,
  className,
  captionClassName,
}: ImageWithCaptionProps) {
  return (
    <figure className="relative">
      <StandardImage src={src} alt={alt} width={width} height={height} className={className} />
      <figcaption className={cn("text-sm text-gray-500 mt-2", captionClassName)}>{caption}</figcaption>
    </figure>
  )
}
