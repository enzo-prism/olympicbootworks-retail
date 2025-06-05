import StandardImage from "./standard-image"
import { cn } from "@/lib/utils"

interface ResponsiveHeroImageProps {
  mobileSrc: string
  tabletSrc?: string
  desktopSrc: string
  alt: string
  className?: string
}

export default function ResponsiveHeroImage({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  alt,
  className,
}: ResponsiveHeroImageProps) {
  // Use the desktop image as the default
  return (
    <div className={cn("relative", className)}>
      {/* Desktop Image (default) */}
      <div className="hidden md:block">
        <StandardImage src={desktopSrc} alt={alt} fill className="object-cover" sizes="100vw" priority />
      </div>

      {/* Tablet Image */}
      {tabletSrc && (
        <div className="hidden sm:block md:hidden">
          <StandardImage src={tabletSrc} alt={alt} fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      {/* Mobile Image */}
      <div className="block sm:hidden">
        <StandardImage src={mobileSrc} alt={alt} fill className="object-cover" sizes="100vw" priority />
      </div>
    </div>
  )
}
