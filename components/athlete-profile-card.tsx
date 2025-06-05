import Link from "next/link"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import EnhancedImage from "@/components/enhanced-image"

interface AchievementBadge {
  label: string
}

interface AthleteProfileCardProps {
  name: string
  title: string
  description: string
  achievements: AchievementBadge[]
  shopLink: string
  shopLabel: string
  gradientColors: string
  className?: string
  imageSrc?: string
}

export default function AthleteProfileCard({
  name,
  title,
  description,
  achievements,
  shopLink,
  shopLabel,
  gradientColors,
  className,
  imageSrc,
}: AthleteProfileCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg overflow-hidden relative",
        className,
      )}
      style={{ background: gradientColors }}
    >
      {imageSrc && (
        <div className="absolute inset-0 z-0 opacity-20">
          <EnhancedImage
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            fallbackSrc="/diverse-group-athletes.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
      )}

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        <p className="text-white/80 font-medium mb-4">{title}</p>

        <p className="text-white/90 mb-4 text-sm">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {achievements.map((badge, index) => (
            <Badge key={index} variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              {badge.label}
            </Badge>
          ))}
        </div>

        <Button asChild size="sm" className="gap-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
          <Link href={shopLink}>
            <Calendar className="h-3 w-3" />
            {shopLabel}
          </Link>
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 -ml-10 -mb-10"></div>
    </div>
  )
}
