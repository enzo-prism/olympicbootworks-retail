"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"

interface NextImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  fill?: boolean
  style?: React.CSSProperties
}

export default function NextImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  fill = false,
  style,
}: NextImageProps) {
  const [isError, setIsError] = useState(false)

  // Handle null or undefined src
  if (!src) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width || "100%", height: height || 300, ...style }}
      >
        <span className="text-gray-400">Image not available</span>
      </div>
    )
  }

  // Handle external URLs
  const isExternal = src.startsWith("http") || src.startsWith("data:")

  // Ensure local paths start with a slash
  const imageSrc = !isExternal && !src.startsWith("/") ? `/${src}` : src

  // Use a placeholder for error state
  if (isError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width: width || "100%", height: height || 300, ...style }}
      >
        <span className="text-gray-500">Image failed to load</span>
      </div>
    )
  }

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={fill ? undefined : width || 1200}
      height={fill ? undefined : height || 800}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
      fill={fill}
      style={style}
      onError={() => setIsError(true)}
    />
  )
}
