// Type definitions for YouTube Player API
interface YT {
  Player: {
    new (
      elementId: string,
      options: {
        videoId: string
        playerVars?: {
          autoplay?: 0 | 1
          controls?: 0 | 1
          disablekb?: 0 | 1
          fs?: 0 | 1
          iv_load_policy?: 1 | 3
          loop?: 0 | 1
          modestbranding?: 0 | 1
          playsinline?: 0 | 1
          rel?: 0 | 1
          showinfo?: 0 | 1
          mute?: 0 | 1
          playlist?: string
        }
        events?: {
          onReady?: (event: { target: YT.Player }) => void
          onStateChange?: (event: { data: number; target: YT.Player }) => void
          onError?: (event: { data: number }) => void
        }
      },
    ): YT.Player
    prototype: YT.Player
  }
  PlayerState: {
    UNSTARTED: -1
    ENDED: 0
    PLAYING: 1
    PAUSED: 2
    BUFFERING: 3
    CUED: 5
  }
  Player: YT.Player
}

interface YT {
  Player: {
    prototype: YT.Player
  }
}

namespace YT {
  interface Player {
    playVideo(): void
    pauseVideo(): void
    stopVideo(): void
    seekTo(seconds: number, allowSeekAhead: boolean): void
    clearVideo(): void
    mute(): void
    unMute(): void
    isMuted(): boolean
    setVolume(volume: number): void
    getVolume(): number
    setSize(width: number, height: number): object
    getPlayerState(): number
    getCurrentTime(): number
    getDuration(): number
    getVideoUrl(): string
    getVideoEmbedCode(): string
    destroy(): void
  }
}

interface Window {
  YT?: YT
  onYouTubeIframeAPIReady?: () => void
}
