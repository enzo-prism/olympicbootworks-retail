import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  linkHref?: string
  linkText?: string
  className?: string
  iconColor?: string
  accentColor?: string
}

export default function ProServiceCard({
  icon: Icon,
  title,
  description,
  linkHref,
  linkText,
  className,
  iconColor = "text-primary",
  accentColor = "from-primary/20 to-transparent",
}: ProServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        className,
      )}
    >
      {/* Accent gradient */}
      <div className={cn("absolute inset-0 left-0 top-0 h-1 w-full bg-gradient-to-r", accentColor)} />

      {/* Icon with background */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-background to-muted p-3">
        <Icon className={cn("h-8 w-8", iconColor)} />
      </div>

      {/* Content */}
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="mb-6 text-muted-foreground">{description}</p>

      {/* Link */}
      {linkHref && linkText && (
        <div className="mt-auto">
          <Button asChild variant="outline" size="sm" className="group-hover:bg-primary/5">
            <Link href={linkHref}>{linkText}</Link>
          </Button>
        </div>
      )}

      {/* Decorative corner accent */}
      <div className="absolute bottom-0 right-0 h-16 w-16 translate-x-8 translate-y-8 rounded-full bg-muted/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}
