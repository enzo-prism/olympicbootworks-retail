# Olympic Bootworks Image System

This document outlines the image system used in the Olympic Bootworks website.

## Components

### CoreImage

`CoreImage` is the primary component for displaying images. It uses Next.js Image optimization while providing reliable fallbacks.

\`\`\`jsx
import CoreImage from "@/components/core-image"

<CoreImage
  src="/images/example.jpg"
  alt="Example Image"
  width={800}
  height={600}
  className="rounded-lg"
  priority={true}
  fallbackSrc="/custom-fallback.svg"
/>
\`\`\`

### DirectImage

`DirectImage` uses the standard HTML `<img>` tag for maximum compatibility. Use this when Next.js Image optimization is causing issues.

\`\`\`jsx
import DirectImage from "@/components/direct-image"

<DirectImage
  src="/images/example.jpg"
  alt="Example Image"
  width="100%"
  height="auto"
  className="rounded-lg"
  fallbackSrc="/custom-fallback.svg"
/>
\`\`\`

### FallbackSVG

`FallbackSVG` generates an SVG placeholder directly in the component, without requiring external files.

\`\`\`jsx
import FallbackSVG from "@/components/fallback-svg"

<FallbackSVG
  text="Custom Text"
  width={800}
  height={600}
  className="rounded-lg"
/>
\`\`\`

## Utilities

### standardizePath

Standardizes image paths across the application.

\`\`\`js
import { standardizePath } from "@/lib/image-utils"

const path = standardizePath("/images/example.jpg")
\`\`\`

### getFallbackPath

Generates a fallback image path based on the original path.

\`\`\`js
import { getFallbackPath } from "@/lib/image-utils"

const fallbackPath = getFallbackPath("/images/example.jpg", "Example")
\`\`\`

### imageExists

Checks if an image exists at the given path.

\`\`\`js
import { imageExists } from "@/lib/image-utils"

const exists = await imageExists("/images/example.jpg")
\`\`\`

## Best Practices

1. **Use CoreImage for most cases**: This component provides the best balance of optimization and reliability.

2. **Provide meaningful alt text**: Always include descriptive alt text for accessibility.

3. **Use appropriate dimensions**: Specify the correct dimensions to avoid layout shifts.

4. **Use priority for above-the-fold images**: This improves loading performance for critical images.

5. **Use DirectImage for troubleshooting**: If you're having issues with Next.js Image, try DirectImage.

6. **Use the debug page**: Visit `/debug` to diagnose image issues.

## Image Paths

All images should be stored in the following directories:

- `/images/` - For content images
- `/public/` - For static assets

## Troubleshooting

If images are not displaying:

1. Check the image path using the Image Audit Tool on the debug page
2. Verify that the image file exists in the correct location
3. Try using DirectImage instead of CoreImage
4. Check the browser console for errors
5. Verify that the Next.js configuration includes the correct domains

Let's check if we're using any environment variables in our reliable image component:
