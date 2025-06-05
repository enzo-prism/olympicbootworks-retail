import StandardImage from "./standard-image"
import type { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface LazyImageProps extends Omit<ImageProps, "src" | "onLoad"> {
  src: string | null | undefined
  threshold?: number
  fadeIn?: boolean
  placeholderColor?: string
  containerClassName?: string
}

export default function LazyImage({ src, fadeIn = true, className, loading = "lazy", ...props }: LazyImageProps) {
  return (
    <StandardImage
      src={src || "/placeholder.png"}
      className={cn(fadeIn && "transition-opacity duration-500", className)}
      loading={loading}
      {...props}
    />
  )
}
