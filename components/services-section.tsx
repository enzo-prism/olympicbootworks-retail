import type React from "react"
import Link from "next/link"
import { Bike, Footprints, ArrowRight, Zap, Award, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ServicesCarousel from "@/components/services-carousel"

interface ServiceItemProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

function ServiceItem({ icon, title, description, className }: ServiceItemProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-start p-6 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
        className,
      )}
    >
      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Performance-Driven Solutions</h2>
          <p className="text-muted-foreground">
            At Olympic Bootworks, we're dedicated to enhancing your performance through precision-engineered solutions
            that optimize comfort, control, and power transfer across all your outdoor pursuits and court sports like
            pickleball.
          </p>
        </div>

        {/* Mobile Carousel View - Only visible on mobile */}
        <div className="md:hidden">
          <ServicesCarousel />
        </div>

        {/* Desktop Grid View - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceItem
            icon={<Footprints className="h-6 w-6" />}
            title="Custom Boot Fitting"
            description="Our signature service employs advanced shell modification, liner molding, and personalized adjustments to create a truly custom fit that enhances performance and eliminates discomfort for skiers and snowboarders of all levels."
          />

          <ServiceItem
            icon={<Zap className="h-6 w-6" />}
            title="Heel-Loc Orthotics"
            description="Developed over decades of biomechanical research, our proprietary Heel-Loc orthotics support natural alignment and optimize power transfer for skiers, runners, golfers, and cyclists, delivering improved performance and reduced fatigue."
          />

          <ServiceItem
            icon={<Award className="h-6 w-6" />}
            title="ZipFit Liner Specialists"
            description="As the #1 worldwide dealer for ZipFit liners, we provide these premium cork-composite boot liners that mold to your feet over time, offering unparalleled comfort, performance, and durability for serious skiers and snowboarders."
          />

          <ServiceItem
            icon={<Heart className="h-6 w-6" />}
            title="Custom Footbeds"
            description="Our precision-crafted custom footbeds provide the foundation for optimal biomechanical alignment, reducing pain and enhancing endurance across various sports—from skiing to pickleball—while preventing common injuries like plantar fasciitis through proper support."
          />

          <ServiceItem
            icon={<Bike className="h-6 w-6" />}
            title="Fantic Electric Bikes"
            description="Experience the thrill of Italian-engineered Fantic electric bikes, combining cutting-edge technology with all-terrain versatility. From mountain trails to urban commutes, these premium e-bikes deliver power, range, and reliability."
          />
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary font-medium px-8 py-3 h-auto rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
