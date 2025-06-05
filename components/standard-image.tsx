import Image, { type ImageProps } from "next/image"
import { standardizePath } from "@/lib/image-utils"

type StandardImageProps = Omit<ImageProps, "src"> & {
  src: string | null | undefined
}

export default function StandardImage({ src, alt, ...props }: StandardImageProps) {
  // Standardize the path
  const standardizedSrc = standardizePath(src || "")

  return <Image src={standardizedSrc || "/placeholder.png"} alt={alt} {...props} />
}
