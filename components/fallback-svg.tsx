interface FallbackSVGProps {
  width?: number
  height?: number
  text?: string
  backgroundColor?: string
  textColor?: string
  className?: string
}

export default function FallbackSVG({
  width = 300,
  height = 200,
  text = "Image",
  backgroundColor = "#f3f4f6",
  textColor = "#6b7280",
  className,
}: FallbackSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width={width} height={height} fill={backgroundColor} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        fontSize="16"
        fontFamily="system-ui, sans-serif"
      >
        {text}
      </text>
    </svg>
  )
}
