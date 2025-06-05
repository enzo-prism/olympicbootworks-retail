/**
 * Generates a data URL for a blurhash placeholder
 * This is a simplified version that creates a color gradient based on the hash
 *
 * @param hash A string to generate the color from
 * @returns A data URL for a gradient background
 */
export function generatePlaceholderFromHash(hash: string): string {
  // Generate colors from the hash
  const getColor = (index: number): string => {
    const value = hash.charCodeAt(index % hash.length) % 256
    return `${value}`
  }

  const r1 = getColor(0)
  const g1 = getColor(1)
  const b1 = getColor(2)
  const r2 = getColor(3)
  const g2 = getColor(4)
  const b2 = getColor(5)

  // Create an SVG with a gradient
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgb(${r1},${g1},${b1})" stop-opacity="0.5" />
          <stop offset="100%" stop-color="rgb(${r2},${g2},${b2})" stop-opacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#g)" />
    </svg>
  `

  // Convert to base64
  const base64 = btoa(svg)
  return `data:image/svg+xml;base64,${base64}`
}

/**
 * Generates a simple color hash from a string
 *
 * @param str Input string
 * @returns A hash value
 */
export function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, "0")
}

/**
 * Generates a blurhash placeholder for an image URL
 *
 * @param url Image URL
 * @returns A data URL for a placeholder
 */
export function getBlurhashPlaceholder(url: string): string {
  if (!url) return ""
  const hash = simpleHash(url)
  return generatePlaceholderFromHash(hash)
}
