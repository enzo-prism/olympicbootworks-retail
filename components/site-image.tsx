"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Shared blur-up placeholder: a 10x10 neutral light-gray/ice PNG.
 * Pass as `blurDataURL` (with `placeholder="blur"`) for string-path images.
 * SiteImage already falls back to this when `placeholder="blur"` is set
 * without an explicit `blurDataURL`.
 */
export const NEUTRAL_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAE0lEQVR42mN4+fYDHsQwKo0NAQD0ixVoNMdsbgAAAABJRU5ErkJggg=="

export type SiteImageProps = Omit<ImageProps, "src"> & {
  /** Image path or URL. Local paths are normalized to a single leading slash. */
  src: string | null | undefined
  /** Shown when `src` is missing or fails to load. */
  fallbackSrc?: string | null
}

/** Ensure local paths have exactly one leading slash; leave absolute URLs alone. */
function normalizeSrc(path: string): string {
  if (path.startsWith("http") || path.startsWith("data:") || path.startsWith("blob:")) {
    return path
  }
  return "/" + path.replace(/^\/+/, "")
}

/**
 * The site's single next/image wrapper.
 * - Optional `fallbackSrc` swapped in via `onError` when the primary source fails.
 * - If the fallback also fails (or no source is usable), renders a neutral
 *   "Image unavailable" box instead of a broken image.
 * - Leaves `quality` to the global default on purpose.
 */
export default function SiteImage({
  src,
  fallbackSrc,
  alt,
  className,
  style,
  placeholder,
  blurDataURL,
  onError,
  ...props
}: SiteImageProps) {
  const candidates: string[] = []
  if (src) candidates.push(normalizeSrc(src))
  if (fallbackSrc) {
    const normalizedFallback = normalizeSrc(fallbackSrc)
    if (!candidates.includes(normalizedFallback)) candidates.push(normalizedFallback)
  }

  // Failure count keyed to the current sources so it resets if `src` changes.
  const sourceKey = candidates.join("|")
  const [failure, setFailure] = useState({ key: sourceKey, count: 0 })
  const failedCount = failure.key === sourceKey ? failure.count : 0

  const activeSrc = candidates[failedCount]

  if (!activeSrc) {
    // No usable source: `src` was empty or every candidate failed to load.
    const { fill, width, height } = props
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-muted",
          fill && "absolute inset-0",
          className,
        )}
        style={fill ? style : { width: width ?? "100%", height: height ?? 300, ...style }}
      >
        <span className="text-xs text-muted-foreground">Image unavailable</span>
      </div>
    )
  }

  return (
    <Image
      {...props}
      src={activeSrc}
      alt={alt}
      className={className}
      style={style}
      placeholder={placeholder}
      blurDataURL={blurDataURL ?? (placeholder === "blur" ? NEUTRAL_BLUR : undefined)}
      onError={(event) => {
        setFailure((previous) => {
          const current = previous.key === sourceKey ? previous.count : 0
          return { key: sourceKey, count: Math.min(current + 1, candidates.length) }
        })
        onError?.(event)
      }}
    />
  )
}
