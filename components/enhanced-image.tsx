import StandardImage from "./standard-image"
import type { ImageProps } from "next/image"

export interface EnhancedImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined
}

export default function EnhancedImage(props: EnhancedImageProps) {
  return <StandardImage {...props} />
}
