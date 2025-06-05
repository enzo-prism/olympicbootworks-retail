// Type definitions for Vimeo Player API
interface Window {
  Vimeo?: {
    Player: new (element: HTMLElement | string, options?: VimeoPlayerOptions) => VimeoPlayer
  }
  onVimeoApiReady?: () => void
}

interface VimeoPlayerOptions {
  id?: string | number
  url?: string
  autopause?: boolean
  autoplay?: boolean
  background?: boolean
  byline?: boolean
  color?: string
  controls?: boolean
  dnt?: boolean
  height?: number
  loop?: boolean
  maxheight?: number
  maxwidth?: number
  muted?: boolean
  playsinline?: boolean
  portrait?: boolean
  responsive?: boolean
  speed?: boolean
  title?: boolean
  transparent?: boolean
  width?: number
}

interface VimeoPlayer {
  destroy(): void
  disableTextTrack(): Promise<void>
  enableTextTrack(language: string, kind?: string): Promise<VimeoTextTrack>
  getAutopause(): Promise<boolean>
  getBuffered(): Promise<number[]>
  getChapters(): Promise<VimeoChapter[]>
  getColor(): Promise<string>
  getCuePoints(): Promise<VimeoCuePoint[]>
  getCurrentTime(): Promise<number>
  getDuration(): Promise<number>
  getEnded(): Promise<boolean>
  getLoop(): Promise<boolean>
  getMuted(): Promise<boolean>
  getPaused(): Promise<boolean>
  getPlaybackRate(): Promise<number>
  getPlayed(): Promise<number[]>
  getSeekable(): Promise<number[]>
  getSeeking(): Promise<boolean>
  getTextTracks(): Promise<VimeoTextTrack[]>
  getVideoEmbedCode(): Promise<string>
  getVideoId(): Promise<string>
  getVideoTitle(): Promise<string>
  getVideoWidth(): Promise<number>
  getVideoHeight(): Promise<number>
  getVideoUrl(): Promise<string>
  getVolume(): Promise<number>
  pause(): Promise<void>
  play(): Promise<void>
  setAutopause(autopause: boolean): Promise<boolean>
  setColor(color: string): Promise<string>
  setCurrentTime(seconds: number): Promise<number>
  setLoop(loop: boolean): Promise<boolean>
  setMuted(muted: boolean): Promise<boolean>
  setPlaybackRate(playbackRate: number): Promise<number>
  setVolume(volume: number): Promise<number>
  unload(): Promise<void>
  on(event: string, callback: (data: any) => void): void
  off(event: string, callback?: (data: any) => void): void
}

interface VimeoTextTrack {
  language: string
  kind: string
  label: string
  mode?: string
}

interface VimeoChapter {
  startTime: number
  title: string
  index: number
}

interface VimeoCuePoint {
  time: number
  data: any
  id: string
}
