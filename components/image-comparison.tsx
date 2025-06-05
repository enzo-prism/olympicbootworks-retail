"use client"

import type React from "react"

import { useState, useRef } from "react"
import { standardizePath } from "@/lib/image-utils"
import { cn } from "@/lib/utils"

interface ImageComparisonProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  width?: number
  height?: number
  className?: string
}

export default function ImageComparison({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  width = 600,
  height = 400,
  className,
}: ImageComparisonProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  // Standardize paths
  const standardizedBeforeSrc = standardizePath(beforeSrc)
  const standardizedAfterSrc = standardizePath(afterSrc)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    let clientX: number

    if ("touches" in e) {
      clientX = e.touches[0].clientX
    } else {
      clientX = e.clientX
    }

    const x = clientX - rect.left
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))

    setPosition(newPosition)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <div className="absolute inset-0">
        <img
          src={standardizedAfterSrc || "/placeholder.png"}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0" style={{ width: `${position}%`, overflow: "hidden" }}>
        <img
          src={standardizedBeforeSrc || "/placeholder.png"}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${width}px` }}
        />
      </div>

      <div className="absolute inset-y-0 w-1 bg-white cursor-ew-resize" style={{ left: `${position}%` }} />
    </div>
  )
}
