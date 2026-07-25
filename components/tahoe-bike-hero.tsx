import type { ReactNode } from "react"

type TahoeBikeHeroProps = {
  children: ReactNode
}

export default function TahoeBikeHero({ children }: TahoeBikeHeroProps) {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem-var(--banner-height,2.5rem))] w-full items-center justify-center overflow-hidden bg-ink">
      <picture className="absolute inset-0">
        <source
          media="(max-width: 767px)"
          srcSet="/images/fantic-tahoe/fantic-lake-tahoe-hero-mobile.webp"
        />
        {/* The two crops are already responsive, stripped, compressed WebP assets. */}
        <img
          src="/images/fantic-tahoe/fantic-lake-tahoe-hero.webp"
          alt="Fantic e-mountain bikes overlooking Lake Tahoe"
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,12,18,0.28)_0%,rgba(5,12,18,0.48)_38%,rgba(5,12,18,0.82)_100%)] md:bg-[linear-gradient(90deg,rgba(5,12,18,0.78)_0%,rgba(5,12,18,0.55)_45%,rgba(5,12,18,0.3)_100%)]" />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-4rem-var(--banner-height,2.5rem))] items-center px-4 py-20">
        {children}
      </div>
    </section>
  )
}
