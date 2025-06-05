import StandardImage from "./standard-image"

interface BasicImageProps {
  src: string | null | undefined
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function BasicImage({ src, alt, width, height, className }: BasicImageProps) {
  return <StandardImage src={src} alt={alt} width={width} height={height} className={className} />
}
