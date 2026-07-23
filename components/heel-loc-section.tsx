"use client"

import { Button } from "@/components/ui/button"
import {
  Activity,
  Bike,
  CircleDot,
  Flag,
  Footprints,
  Mail,
  Mountain,
  MountainSnow,
  ShieldCheck,
  Trophy,
  Zap,
} from "lucide-react"
import SiteImage, { NEUTRAL_BLUR } from "@/components/site-image"
import { fittingInquiryUrl } from "@/lib/fitting-inquiry"
import { trackConversion } from "@/lib/track-conversion"

const sports = [
  { icon: MountainSnow, name: "Skiing" },
  { icon: Bike, name: "Cycling" },
  { icon: Activity, name: "Running" },
  { icon: Trophy, name: "Pickleball" },
  { icon: Flag, name: "Golf" },
  { icon: CircleDot, name: "Tennis" },
  { icon: Mountain, name: "Hiking" },
]

const benefits = [
  {
    icon: Footprints,
    title: "Optimal Alignment",
    description: "Supports natural biomechanics",
  },
  {
    icon: Zap,
    title: "Enhanced Performance",
    description: "Maximizes power transfer",
  },
  {
    icon: ShieldCheck,
    title: "Supportive Foundation",
    description: "Built around your individual fit",
  },
]

export default function HeelLocSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-3">
              Proprietary technology
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Heel-Loc Technology</h2>
            <p className="text-muted-foreground mb-6">
              Developed by Buck Brown over twenty years of biomechanical research, Heel-Loc technology represents a
              personalized orthotic approach for performance athletes and everyday comfort seekers.
            </p>
            <p className="text-muted-foreground mb-6">
              Unlike standard insoles, Heel-Loc orthotics are crafted using our proprietary unweighted casting method
              that captures the foot in an unweighted position. The goal is a supportive foundation for alignment,
              comfort, and efficient movement.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col items-center text-center p-4 rounded-lg bg-card border">
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-sans font-semibold tracking-normal">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>

            <h3 className="font-sans text-xl font-semibold tracking-normal mt-6 mb-4 text-foreground">
              Proven Benefits For Athletes In:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-5 mb-6">
              {sports.map((sport) => (
                <div
                  key={sport.name}
                  className="flex flex-col items-center text-center p-3 rounded-lg bg-card hover:bg-accent/50 border transition-colors last:col-span-2 sm:last:col-span-1"
                >
                  <sport.icon className="mb-1.5 h-6 w-6 text-primary" aria-hidden="true" />
                  <p className="text-sm font-medium text-foreground">{sport.name}</p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mb-6">
              Olympic Bootworks works with competitive athletes, mountain professionals, and active customers who value
              a precise, personalized fit across skiing and other sports.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <a
                  href={fittingInquiryUrl()}
                  onClick={() => trackConversion("email_click", { location: "home_heel_loc" })}
                >
                  <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                  Book a Custom Fitting
                </a>
              </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <SiteImage
                src="/images/fitting-process-2.jpg"
                alt="Heel-Loc custom footbed technology"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={NEUTRAL_BLUR}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent flex items-end p-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h3 className="font-sans font-bold tracking-normal text-primary">Heel-Loc Technology</h3>
                  <p className="text-sm text-foreground">The foundation for optimal performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
