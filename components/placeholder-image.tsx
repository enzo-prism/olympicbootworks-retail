import StandardImage from "./standard-image"

interface PlaceholderImageProps {
  width?: number
  height?: number
  text?: string
  className?: string
}

export default function PlaceholderImage({
  width = 300,
  height = 200,
  text = "Image",
  className,
}: PlaceholderImageProps) {
  const placeholderUrl = `/placeholder.png?text=${encodeURIComponent(text)}`

  return <StandardImage src={placeholderUrl} alt={text} width={width} height={height} className={className} />
}
