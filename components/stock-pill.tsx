import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * "In stock / ready" badge with a live dot. Backed by Buck's general stock
 * message in data/locations.ts — never use it for specific models or sizes.
 */
export default function StockPill({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode
  onDark?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full text-xs font-semibold",
        onDark
          ? "border border-white/20 bg-white/10 px-3 py-1.5 uppercase tracking-[0.18em] text-white backdrop-blur-sm"
          : "border border-stock/25 bg-stock/10 px-3 py-1 text-stock",
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-stock-light opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-stock-light" />
      </span>
      {children}
    </span>
  )
}
