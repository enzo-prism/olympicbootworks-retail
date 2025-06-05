import StandardImage from "./standard-image"
import type { ImageProps } from "next/image"

interface ReliableImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined
}

export default function ReliableImage(props: ReliableImageProps) {
  return <StandardImage {...props} />
}
