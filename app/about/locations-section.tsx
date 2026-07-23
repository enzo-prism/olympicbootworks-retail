import Link from "next/link"
import ButtonIcon from "@/components/button-icon"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { locations, seasonalScheduleNotice } from "@/data/locations"
import LocationCardNoImage from "@/components/location-card-no-image"

export default function LocationsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/60">
      <div className="container mx-auto px-4">
        {/* Section Header - improved spacing */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5">
            <MapPin className="h-4 w-4 mr-2" />
            Visit Us
          </div>
          <h2 className="text-3xl font-bold mb-5">Feel the Difference</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're pushing your limits on the mountain, pounding the pavement, or simply seeking all-day
            comfort, your journey to a better foundation starts here. {seasonalScheduleNotice.summary}
          </p>
        </div>

        {/* Location Cards - improved spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {locations.map((location, index) => (
            <LocationCardNoImage key={location.id} location={location} colorScheme={index === 0 ? "blue" : "green"} />
          ))}
        </div>

        {/* Additional CTA - improved spacing */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-5">
            Planning a visit? Please request an appointment before coming in.
          </p>
          <Button asChild className="shadow-sm px-8">
            <Link href="/contact">
              <ButtonIcon label="Request an Appointment" href="/contact" />
              Request Appointment
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
