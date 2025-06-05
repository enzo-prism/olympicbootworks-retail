import type { EnhancedImageProps } from "@/components/enhanced-image"

/**
 * Converts EnhancedImage props to BasicImage props
 * This helps with migrating from the old system to the new one
 */
export function convertToBasicImageProps(props: EnhancedImageProps) {
  const { src, alt, className, fill, width, height, fallbackSrc, ...rest } = props

  return {
    src: src || fallbackSrc || "/static-heel-loc-image.png",
    alt,
    className,
    width: fill ? "100%" : width,
    height: fill ? "100%" : height,
    style: fill ? { position: "absolute", inset: 0 } : {},
  }
}
