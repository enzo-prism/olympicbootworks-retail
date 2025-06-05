import { Info } from "lucide-react"

interface VideoDescriptionProps {
  className?: string
}

export default function VideoDescription({ className }: VideoDescriptionProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 text-sm text-white/80 text-center max-w-md mx-auto ${className}`}
    >
      <Info className="h-4 w-4 flex-shrink-0" />
      <p>
        Featuring interviews with Travis Ganong (US Olympic Ski Team), Ralph Backstrom (2013 Freeride World Tour
        Champion), and Doug Stoup (CEO Ice Axe Expeditions)
      </p>
    </div>
  )
}
