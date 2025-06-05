import { cn } from "@/lib/utils"

interface ImageSkeletonProps {
  width?: number | string
  height?: number | string
  className?: string
}

export default function ImageSkeleton({ width = "100%", height = "100%", className }: ImageSkeletonProps) {
  return (
    <div className={cn("animate-pulse bg-gray-200 rounded", className)} style={{ width, height }} aria-hidden="true" />
  )
}
