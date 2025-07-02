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
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
              Proprietary Technology
            </div>
            <h2 className="text-3xl font-bold mb-4">Heel-Loc Technology</h2>
            <p className="text-muted-foreground mb-6">
              Developed by Buck Brown over twenty years of biomechanical research, Heel-Loc technology represents the
              pinnacle of orthotic design for performance athletes and everyday comfort seekers.
            </p>
            <p className="text-muted-foreground mb-6">
              Unlike standard insoles, Heel-Loc orthotics are crafted using our proprietary unweighted casting method
              that captures your foot's natural alignment. This revolutionary approach ensures optimal skeletal
              positioning, maximizing power transfer while reducing fatigue and preventing injury.
            </p>

            {/* Main benefits - keeping Lucide icons here for consistency with other sections if desired, or could also be emojis */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border">
                <span className="text-3xl mb-2" role="img" aria-label="Footprints">
                  👣
                </span>
                <h3 className="font-semibold">Optimal Alignment</h3>
                <p className="text-xs text-muted-foreground">Supports natural biomechanics</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border">
                <span className="text-3xl mb-2" role="img" aria-label="Zap">
                  ⚡
                </span>
                <h3 className="font-semibold">Enhanced Performance</h3>
                <p className="text-xs text-muted-foreground">Maximizes power transfer</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border">
                <span className="text-3xl mb-2" role="img" aria-label="Shield">
                  🛡️
                </span>
                <h3 className="font-semibold">Injury Prevention</h3>
                <p className="text-xs text-muted-foreground">Reduces strain and fatigue</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-foreground">Proven Benefits For Athletes In:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-5 mb-6">
              {sports.map((sport, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-3 rounded-lg bg-background hover:bg-muted/50 border transition-colors"
                >
                  <span className="text-3xl mb-1.5" role="img" aria-label={sport.name}>
                    {sport.emoji}
                  </span>
                  <p className="text-sm font-medium text-foreground">{sport.name}</p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mb-6">
              Olympic Bootworks is the go-to for Olympic medalists, World Champion big mountain athletes, pickleball
              enthusiasts, and renowned global explorers who demand the absolute best in performance and comfort across
              skiing, cycling, running, pickleball, and golf.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="shadow-sm">
                <Link href="/contact">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book a Custom Fitting
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md">
              <DirectImage
                src="/images/fitting-process-2.jpg"
                alt="Heel-Loc custom footbed technology"
                className="w-full h-full object-cover"
                fallbackSrc="/placeholder.png?text=Heel-Loc+Technology"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h3 className="font-bold text-primary">Heel-Loc Technology</h3>
                  <p className="text-sm text-foreground">The foundation for optimal performance</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/10 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-primary/10 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
