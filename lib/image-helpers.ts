/**
 * Utility functions for handling images
 */

/**
 * Checks if an image exists at the given path
 * @param src The image source path
 * @returns A promise that resolves to true if the image exists, false otherwise
 */
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false)
      return
    }

    // For data URLs or external URLs, assume they exist
    if (src.startsWith("data:") || src.startsWith("http")) {
      resolve(true)
      return
    }

    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

/**
 * Generates a placeholder image URL with the given text
 * @param text The text to display on the placeholder
 * @param width The width of the placeholder
 * @param height The height of the placeholder
 * @returns A placeholder image URL
 */
export function getPlaceholderImage(text: string, width = 600, height = 400): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(text)}`
}

/**
 * Gets an image source with a fallback
 * @param primarySrc The primary image source
 * @param fallbackSrc The fallback image source
 * @param fallbackText Text to use for generating a placeholder if both sources fail
 * @returns The appropriate image source
 */
export async function getImageWithFallback(
  primarySrc: string,
  fallbackSrc: string,
  fallbackText: string,
): Promise<string> {
  // Check if primary source exists
  const primaryExists = await checkImageExists(primarySrc)
  if (primaryExists) return primarySrc

  // Check if fallback source exists
  const fallbackExists = await checkImageExists(fallbackSrc)
  if (fallbackExists) return fallbackSrc

  // Return placeholder as last resort
  return getPlaceholderImage(fallbackText)
}
