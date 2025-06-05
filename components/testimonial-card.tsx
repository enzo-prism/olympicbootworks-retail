import EnhancedImage from "@/components/enhanced-image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  name: string
  role?: string
  content: string
  rating: number
  imageSrc?: string
  className?: string
}

export default function TestimonialCard({ name, role, content, rating, imageSrc, className }: TestimonialCardProps) {
  return (
    <div className={cn("p-6 rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="flex items-center gap-4 mb-4">
        {imageSrc ? (
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <EnhancedImage
              src={imageSrc}
              alt={name}
              fill
              className="object-cover"
              fallbackSrc={`/placeholder.svg?height=48&width=48&query=${encodeURIComponent(name.charAt(0))}`}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary font-semibold">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-semibold">{name}</h4>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      </div>

      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn("h-4 w-4", i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300")} />
        ))}
      </div>

      <p className="text-muted-foreground">{content}</p>
    </div>
  )
}
