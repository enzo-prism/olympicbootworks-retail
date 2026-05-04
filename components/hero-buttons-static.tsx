import { Bike, Info } from "lucide-react"

export default function HeroButtonsStatic() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="/shop"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 py-3 bg-white text-black hover:bg-gray-100 transition-colors"
      >
        <Bike className="mr-2 h-4 w-4" aria-hidden="true" />
        Shop eBikes
      </a>
      <a
        href="/about"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 py-3 bg-transparent border border-white text-white hover:bg-white/10 transition-colors"
      >
        <Info className="mr-2 h-4 w-4" aria-hidden="true" />
        About Us
      </a>
    </div>
  )
}
