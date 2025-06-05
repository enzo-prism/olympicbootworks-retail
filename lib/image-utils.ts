/**
 * Standardizes an image path to ensure it's properly formatted with a single leading slash.
 * @param path The image path to standardize
 * @returns A properly formatted image path
 */
export function standardizePath(path: string): string {
  if (!path) return "/placeholder.png"
  if (path.startsWith("http") || path.startsWith("data:")) return path
  return "/" + path.replace(/^\/+/, "")
}

/**
 * Generates a set of sizes for responsive images.
 * @param options An object containing the sizes for different screen widths.
 * @returns A string containing the sizes attribute for the image.
 */
export function generateSizes(options: {
  mobile: string
  tablet: string
  desktop: string
  default: string
}): string {
  return `(max-width: 640px) ${options.mobile}, (max-width: 1024px) ${options.tablet}, ${options.desktop}`
}

/**
 * Checks if an image exists at the given URL by attempting to load it.
 * @param url The URL of the image to check.
 * @returns A promise that resolves to true if the image exists, and false otherwise.
 */
export function imageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false)
      return
    }

    const img = new Image()
    img.crossOrigin = "anonymous" // Add this to avoid CORS issues
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

/**
 * Alias for imageExists for backward compatibility
 */
export const isImageValid = imageExists

/**
 * Ensures a valid image path for Next.js Image component
 * @param src The source path or URL
 * @returns A properly formatted image path
 */
export function getNextImageSrc(src: string | null | undefined): string {
  if (!src) return "/placeholder.png"

  // If it's already an absolute URL, return as is
  if (src.startsWith("http") || src.startsWith("data:")) {
    return src
  }

  // Ensure path starts with a slash for local images
  return src.startsWith("/") ? src : `/${src}`
}
