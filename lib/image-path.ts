/**
 * Ensures image paths are properly formatted
 * This function handles both relative and absolute paths
 */
export function getImagePath(src: string): string {
  // If it's already an absolute URL or data URI, return as is
  if (src.startsWith("http") || src.startsWith("data:")) {
    return src
  }

  // Ensure path starts with a slash for local images
  return src.startsWith("/") ? src : `/${src}`
}
