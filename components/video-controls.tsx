"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoControlsProps {
  vimeoId: string
}

export default function VideoControls({ vimeoId }: VideoControlsProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const togglePlay = () => {
    if (window.Vimeo?.Player) {
      try {
        const iframe = document.querySelector(`iframe[src*="${vimeoId}"]`) as HTMLIFrameElement
        if (iframe) {
          const player = new window.Vimeo.Player(iframe)
          if (isPlaying) {
            player.pause()
          } else {
            player.play()
          }
          setIsPlaying(!isPlaying)
        }
      } catch (error) {
        console.error("Error toggling play state:", error)
      }
    }
  }

  const toggleMute = () => {
    if (window.Vimeo?.Player) {
      try {
        const iframe = document.querySelector(`iframe[src*="${vimeoId}"]`) as HTMLIFrameElement
        if (iframe) {
          const player = new window.Vimeo.Player(iframe)
          player.setVolume(isMuted ? 1 : 0)
          setIsMuted(!isMuted)
        }
      } catch (error) {
        console.error("Error toggling mute state:", error)
      }
    }
  }

  return (
    <div
      className="absolute bottom-6 right-6 flex items-center gap-3 z-20"
      style={{ opacity: isHovering ? 1 : 0, transition: "opacity 300ms" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <button
        onClick={toggleMute}
        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  )
}
