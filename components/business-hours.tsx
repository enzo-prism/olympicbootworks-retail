import { Clock } from "lucide-react"
import Link from "next/link"
import { seasonalScheduleNotice } from "@/data/locations"

interface BusinessHoursProps {
  hours: Array<{ day: string; hours: string }>
  className?: string
  showAppointmentLink?: boolean
}

export default function BusinessHours({ hours, className = "", showAppointmentLink = true }: BusinessHoursProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Current Availability</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {hours.map((item, index) => (
          <div key={index} className="contents">
            <div className="font-medium">{item.day}</div>
            <div className="text-muted-foreground">{item.hours}</div>
          </div>
        ))}
      </div>

      {showAppointmentLink && (
        <div className="text-sm text-primary">
          <p>{seasonalScheduleNotice.summerHoursStatus}. To request an appointment, please email us.</p>
          <Link href="/contact" className="text-primary hover:underline mt-1 inline-block">
            Request Appointment
          </Link>
        </div>
      )}
    </div>
  )
}
