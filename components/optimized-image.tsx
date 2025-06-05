import StandardImage from "./standard-image"
import type { ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "src" | "quality"> {
  src: string | null | undefined
  quality?: "low" | "medium" | "high" | "auto" | number
}

export default function OptimizedImage({ quality = "auto", ...props }: OptimizedImageProps) {
  // Convert quality to number
  let qualityValue: number

  switch (quality) {
    case "low":
      qualityValue = 60
      break
    case "medium":
      qualityValue = 80
      break
    case "high":
      qualityValue = 90
      break
    case "auto":
      qualityValue = 75 // Default for auto
      break
    default:
      qualityValue = typeof quality === "number" ? quality : 75
  }

  return <StandardImage quality={qualityValue} {...props} />
}
