import {
  ArrowRight,
  Calendar,
  Clock,
  Home,
  Images,
  Mail,
  MapPin,
  PhoneCall,
  RefreshCw,
  RotateCcw,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ButtonIconProps = {
  label: string
  href?: string
  className?: string
}

export default function ButtonIcon({ label, href = "", className }: ButtonIconProps) {
  const text = label.toLowerCase()
  const target = href.toLowerCase()
  let Icon = ArrowRight

  if (text.includes("location") || text.includes("map") || text.includes("visit")) {
    Icon = MapPin
  } else if (text.includes("email") || target.includes("mailto:") || text.includes("inquire") || text.includes("contact")) {
    Icon = Mail
  } else if (text.includes("call") || text.includes("phone") || target.includes("tel:")) {
    Icon = PhoneCall
  } else if (text.includes("book") || text.includes("schedule") || text.includes("fitting") || text.includes("appointment")) {
    Icon = Calendar
  } else if (text.includes("shop") || text.includes("product") || text.includes("boot") || text.includes("equipment")) {
    Icon = ShoppingCart
  } else if (text.includes("hour")) {
    Icon = Clock
  } else if (text.includes("athlete") || text.includes("pro")) {
    Icon = Users
  } else if (text.includes("gallery") || text.includes("work")) {
    Icon = Images
  } else if (text.includes("service")) {
    Icon = Wrench
  } else if (text.includes("refresh")) {
    Icon = RefreshCw
  } else if (text.includes("try again")) {
    Icon = RotateCcw
  } else if (text.includes("home")) {
    Icon = Home
  }

  return <Icon className={cn("h-4 w-4 shrink-0", className)} aria-hidden="true" />
}
