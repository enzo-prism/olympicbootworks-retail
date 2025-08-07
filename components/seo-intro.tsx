import { cn } from "@/lib/utils"

type SeoIntroProps = {
  title?: string
  description: string
  bullets?: string[]
  as?: "h1" | "h2"
  className?: string
}

/**
 * Server-rendered intro copy to improve crawlable text without changing the visual design.
 * Keep it brief and semantic; avoid heavy markup to maximize text:HTML ratio.
 */
export default function SeoIntro({
  title,
  description,
  bullets = [],
  as = "h2",
  className,
}: SeoIntroProps) {
  const Heading = as
  return (
    <section
      className={cn(
        "container mx-auto px-4 py-6 text-sm text-muted-foreground",
        className
      )}
      aria-label="Page introduction"
    >
      {title ? (
        <Heading className="mb-2 text-base font-semibold text-foreground">
          {title}
        </Heading>
      ) : null}
      <p className="mb-3">{description}</p>
      {bullets.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
