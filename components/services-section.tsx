import type React from "react"
import Link from "next/link"
import { Bike, Footprints, Zap, Award, Heart } from "lucide-react"
import ButtonIcon from "@/components/button-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ServicesCarousel from "@/components/services-carousel"

interface ServiceItemProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
  className?: string
}

function ServiceItem({ icon, title, description, href, className }: ServiceItemProps) {
  const content = (
    <>
      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </>
  )
  const itemClass = cn(
    "group flex flex-col items-start p-6 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
    className,
  )

  if (href) {
    return (
      <Link href={href} className={itemClass}>
        {content}
      </Link>
    )
  }

  return <div className={itemClass}>{content}</div>
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
            description="Our signature service uses shell modification, liner molding, and personalized adjustments to create a custom fit designed to support comfort and confident skiing."
          />

          <ServiceItem
            icon={<Zap className="h-6 w-6" />}
            title="Heel-Loc Orthotics"
            description="Our proprietary Heel-Loc orthotics are designed to support natural alignment and efficient power transfer for skiers and other active customers."
          />

          <ServiceItem
            icon={<Award className="h-6 w-6" />}
            title="ZipFit Liner Specialists"
            description="We fit premium ZipFit cork-composite liners that adapt over time and can provide a precise, supportive option for serious skiers and snowboarders."
          />

          <ServiceItem
            icon={<Heart className="h-6 w-6" />}
            title="Custom Footbeds"
            description="Our custom footbeds are designed to support alignment, comfort, and a stable foundation across skiing and other active pursuits."
          />

          <ServiceItem
            icon={<Bike className="h-6 w-6" />}
            title="Fantic Electric Bikes"
            description="Experience the thrill of Italian-engineered Fantic electric bikes, combining cutting-edge technology with all-terrain versatility. From mountain trails to urban commutes, these premium e-bikes deliver power, range, and reliability."
            href="/e-bikes"
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
              <ButtonIcon label="Contact Us" href="/contact" />
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
