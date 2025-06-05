import Link from "next/link"
import { Award, Ruler, Wrench, ShoppingBag, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProServiceCard from "@/components/pro-service-card"

export default function ProServicesSection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute left-0 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-0 top-3/4 h-64 w-64 translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary mb-4">
            Pro-Level Expertise
          </div>
          <h2 className="text-4xl font-bold mb-6">Services Trusted by Champions</h2>
          <p className="text-lg text-muted-foreground">
            The same expertise we provide to world-class athletes is available to you. Our professional services are
            designed to enhance performance for athletes of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProServiceCard
            icon={Ruler}
            title="Custom Boot Fitting"
            description="Our signature service uses the same techniques we apply for professional athletes. We analyze your foot structure, skiing style, and performance goals to create a truly custom fit."
            linkHref="/services/boot-fitting"
            linkText="Learn More"
            iconColor="text-blue-500"
            accentColor="from-blue-500/20 to-transparent"
          />

          <ProServiceCard
            icon={Wrench}
            title="Race Ski Tuning"
            description="Precision edge tuning and base preparation using the same techniques and materials we provide to World Cup athletes. Optimize your equipment for maximum performance."
            linkHref="/services/ski-tuning"
            linkText="Learn More"
            iconColor="text-purple-500"
            accentColor="from-purple-500/20 to-transparent"
          />

          <ProServiceCard
            icon={Award}
            title="Equipment Consultation"
            description="Work with our experts to select the perfect equipment for your specific needs. We'll help you build a complete setup that enhances your performance and enjoyment."
            linkHref="/services/consultation"
            linkText="Learn More"
            iconColor="text-emerald-500"
            accentColor="from-emerald-500/20 to-transparent"
          />

          <ProServiceCard
            icon={Zap}
            title="Performance Analysis"
            description="Using video analysis and pressure mapping technology, we can identify areas for improvement in your technique and equipment setup to maximize efficiency and power."
            linkHref="/services/performance-analysis"
            linkText="Learn More"
            iconColor="text-amber-500"
            accentColor="from-amber-500/20 to-transparent"
          />

          <ProServiceCard
            icon={Users}
            title="Pro Clinics & Workshops"
            description="Join our specialized clinics led by professional athletes and certified instructors to improve your skills and learn insider techniques for better performance."
            linkHref="/services/clinics"
            linkText="Learn More"
            iconColor="text-rose-500"
            accentColor="from-rose-500/20 to-transparent"
          />

          <div className="relative overflow-hidden rounded-xl border border-dashed border-primary/50 bg-card/50 p-6 flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Pro Equipment Shop</h3>
            <p className="mb-6 text-muted-foreground">
              Browse our selection of professional-grade equipment used by world-class athletes.
            </p>
            <Button asChild className="mt-auto">
              <Link href="/shop/pro-equipment">Shop Pro Equipment</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" variant="outline" className="gap-2 shadow-sm">
            <Link href="/services">
              View All Services
              <span className="ml-2 text-lg">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
