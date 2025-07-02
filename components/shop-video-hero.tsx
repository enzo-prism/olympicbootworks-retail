interface ShopVideoHeroProps {
  videoId: string
  title: string
  subtitle: string
}

export default function ShopVideoHero({ videoId, title, subtitle }: ShopVideoHeroProps) {
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`

  return (
    <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
      {/* Video Iframe */}
      <iframe
        src={vimeoUrl}
        title="Shop background video"
        className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen={false}
        frameBorder="0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">{title}</h1>
        <p className="text-base md:text-lg lg:text-xl text-neutral-200 max-w-2xl">{subtitle}</p>
      </div>
    </div>
  )
}
