"use client"

import { useState, useRef } from "react"
import { Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface YouTubeVideoSectionProps {
  videoId: string
  title: string
  subtitle?: string
  description?: string
}

export default function YouTubeVideoSection({
  videoId,
  title,
  subtitle,
  description = "Watch our video to learn more about Olympic Bootworks and our custom boot fitting process.",
}: YouTubeVideoSectionProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const openFullscreen = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border">
            {/* Standard YouTube Embed */}
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>

            {/* Fullscreen button overlay */}
            <div className="absolute bottom-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={openFullscreen}
                className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                aria-label="Open in YouTube"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
