import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react" // Keep Calendar for the button
import DirectImage from "@/components/direct-image"

export default function HeelLocSection() {
  // Define sports with their corresponding emojis
  const sports = [
    { emoji: "⛷️", name: "Skiing" },
    { emoji: "🚴", name: "Cycling" },
    { emoji: "🏃", name: "Running" },
    { emoji: "🏅", name: "Pickleball" }, // Using Sports Medal as a general sport/achievement emoji
    { emoji: "⛳", name: "Golf" },
    { emoji: "🎾", name: "Tennis" },
    { emoji: "⛰️", name: "Hiking" },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4 md:mb-6">
              Proprietary Technology
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight">Heel-Loc Technology</h2>
            <p className="text-muted-foreground mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
              Developed by Buck Brown over twenty years of biomechanical research, Heel-Loc technology represents the
              pinnacle of orthotic design for performance athletes and everyday comfort seekers.
            </p>
            <p className="text-muted-foreground mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              Unlike standard insoles, Heel-Loc orthotics are crafted using our proprietary unweighted casting method
              that captures your foot's natural alignment. This revolutionary approach ensures optimal skeletal
              positioning, maximizing power transfer while reducing fatigue and preventing injury.
            </p>

            {/* Main benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg bg-card border shadow-sm">
                <span className="text-3xl md:text-4xl mb-2 md:mb-3" role="img" aria-label="Footprints">
                  👣
                </span>
                <h3 className="font-semibold text-base md:text-lg">Optimal Alignment</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Supports natural biomechanics</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg bg-card border shadow-sm">
                <span className="text-3xl md:text-4xl mb-2 md:mb-3" role="img" aria-label="Zap">
                  ⚡
                </span>
                <h3 className="font-semibold text-base md:text-lg">Enhanced Performance</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Maximizes power transfer</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg bg-card border shadow-sm">
                <span className="text-3xl md:text-4xl mb-2 md:mb-3" role="img" aria-label="Shield">
                  🛡️
                </span>
                <h3 className="font-semibold text-base md:text-lg">Injury Prevention</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Reduces strain and fatigue</p>
              </div>
            </div>

            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mt-6 md:mt-8 mb-4 md:mb-6 text-foreground">Proven Benefits For Athletes In:</h3>
            
            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="mb-6 md:mb-8">
              {/* Mobile horizontal scroll */}
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory touch-pan-x md:hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {sports.map((sport, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-3 rounded-lg bg-background hover:bg-muted/50 border transition-colors min-w-[80px] snap-center"
                  >
                    <span className="text-2xl mb-1.5" role="img" aria-label={sport.name}>
                      {sport.emoji}
                    </span>
                    <p className="text-xs font-medium text-foreground whitespace-nowrap">{sport.name}</p>
                  </div>
                ))}
              </div>
              
              {/* Desktop grid */}
              <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {sports.map((sport, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 lg:p-5 rounded-lg bg-background hover:bg-muted/50 border transition-colors shadow-sm"
                  >
                    <span className="text-3xl lg:text-4xl mb-2" role="img" aria-label={sport.name}>
                      {sport.emoji}
                    </span>
                    <p className="text-sm lg:text-base font-medium text-foreground">{sport.name}</p>
                  </div>
                ))}
              </div>
              
              {/* Mobile scroll hint */}
              <div className="text-center text-xs text-muted-foreground mt-2 md:hidden">
                Scroll to see all sports
              </div>
            </div>

            <p className="text-muted-foreground mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              Olympic Bootworks is the go-to for Olympic medalists, World Champion big mountain athletes, pickleball
              enthusiasts, and renowned global explorers who demand the absolute best in performance and comfort across
              skiing, cycling, running, pickleball, and golf.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="shadow-sm h-12 md:h-14 px-6 md:px-8 text-base">
                <Link href="/contact">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book a Custom Fitting
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative h-[300px] md:h-[400px] lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
              <DirectImage
                src="/images/fitting-process-2.jpg"
                alt="Heel-Loc custom footbed technology"
                className="w-full h-full object-cover"
                fallbackSrc="/placeholder.png?text=Heel-Loc+Technology"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:p-6">
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-lg">
                  <h3 className="font-bold text-primary text-base md:text-lg">Heel-Loc Technology</h3>
                  <p className="text-sm md:text-base text-foreground">The foundation for optimal performance</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-16 w-16 md:h-24 md:w-24 rounded-full bg-primary/10 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary/10 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
