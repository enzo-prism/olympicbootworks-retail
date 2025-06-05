import StandardImage from "./standard-image"
import type { ImageProps } from "next/image"

interface CoreImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined
}

export default function CoreImage(props: CoreImageProps) {
  return <StandardImage {...props} />
}
