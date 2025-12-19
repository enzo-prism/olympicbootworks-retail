import Image, { type ImageProps } from "next/image"
import { standardizePath } from "@/lib/image-utils"

type StandardImageProps = Omit<ImageProps, "src"> & {
  src: string | null | undefined
  fallbackSrc?: string | null | undefined
}

export default function StandardImage({ src, alt, fallbackSrc, ...props }: StandardImageProps) {
  const resolvedSrc = src || fallbackSrc || ""
  // Standardize the path
  const standardizedSrc = standardizePath(resolvedSrc)

  return <Image src={standardizedSrc || "/placeholder.png"} alt={alt} {...props} />
}
