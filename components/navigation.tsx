"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Bike,
  ChevronDown,
  ChevronUp,
  Footprints,
  Info,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { locations } from "@/data/locations"
import { trackConversion } from "@/lib/track-conversion"

type NavLinkProps = React.ComponentProps<typeof Link> & {
  isMobile?: boolean
  isActive?: boolean
  icon?: LucideIcon
}

// Custom Link component that scrolls to top and handles mobile menu closing
const NavLink = ({
  href,
  className,
  children,
  onClick,
  isMobile = false,
  isActive = false,
  icon: Icon,
  ...props
}: NavLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Execute any passed onClick handler
    if (onClick) onClick(e)

    // Small timeout to ensure the navigation happens first
    if (typeof href !== "string" || !href.includes("#")) {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 10)
    }
  }

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors relative whitespace-nowrap",
        isMobile
          ? "text-lg py-3 pl-4 pr-1 w-full flex items-center gap-3"
          : "inline-flex items-center gap-1.5 py-2 text-sm font-medium hover:text-primary",
        isActive ? "text-primary font-semibold" : "text-muted-foreground",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {Icon ? (
        <Icon
          className={cn(
            "shrink-0",
            isMobile ? "h-5 w-5" : "hidden lg:block h-4 w-4",
            isActive ? "text-primary" : "text-muted-foreground",
          )}
          aria-hidden="true"
        />
      ) : null}
      {children}
      {isActive && (
        <span
          className={cn(
            "absolute bg-primary",
            isMobile ? "left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full" : "bottom-0 left-0 w-full h-0.5",
          )}
        />
      )}
    </Link>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/e-bikes", label: "E-Bikes & Prices", icon: Bike },
    { href: "/boot-fitting", label: "Boot Fitting", icon: Footprints },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Locations & Contact", icon: PhoneCall },
  ]

  const isLinkActive = (href: string) =>
    href === "/e-bikes" ? pathname.startsWith("/e-bikes") : href === pathname

  // Toggle section expansion in mobile menu
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <header
      className={cn(
        "w-full bg-background border-b border-border z-50 transition-all duration-300 h-16",
        scrolled ? "shadow-md" : "shadow-sm",
      )}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 py-2" aria-label="Olympic Bootworks Home">
          <div className="relative h-10 w-10 overflow-hidden">
            <Image
              src="/images/logo-small.png"
              alt="Olympic Bootworks Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <span className="font-bold text-base xs:text-xl">Olympic Bootworks</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} icon={link.icon} isActive={isLinkActive(link.href)}>
              {link.label}
            </NavLink>
          ))}

          <Button asChild size="sm" className="ml-2">
            <a
              href="mailto:buck@olympicbootworks.com?subject=Olympic%20Bootworks%20Question"
              onClick={() => trackConversion("email_click", { location: "desktop_navigation" })}
            >
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Email Buck
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation — email is the primary conversion, so it owns the
            persistent header slot; phone lives in the menu's Locations section. */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href="mailto:buck@olympicbootworks.com?subject=Olympic%20Bootworks%20Question"
            onClick={() => trackConversion("email_click", { location: "mobile_header" })}
            className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
            aria-label="Email Olympic Bootworks"
          >
            <Mail className="h-5 w-5 text-primary" />
          </a>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shadow-sm rounded-full h-10 w-10 flex items-center justify-center"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-sm p-0 overflow-y-auto"
            >
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Browse Olympic Bootworks pages, locations, and contact options.
              </SheetDescription>
              <div className="sticky top-0 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm z-10 border-b">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden">
                    <Image
                      src="/images/logo-small.png"
                      alt="Olympic Bootworks Logo"
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-lg">Olympic Bootworks</span>
                </div>
                <SheetClose className="rounded-full h-11 w-11 flex items-center justify-center hover:bg-secondary">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </div>

              <div className="flex flex-col p-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    icon={link.icon}
                    isMobile={true}
                    isActive={isLinkActive(link.href)}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}

                {/* Locations Section */}
                <div className="mt-2 border-t pt-4">
                  <button
                    className="flex items-center justify-between w-full py-3 pl-4 pr-1 text-lg font-medium"
                    onClick={() => toggleSection("locations")}
                    aria-expanded={expandedSection === "locations"}
                  >
                    <span className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                      Our Locations
                    </span>
                    {expandedSection === "locations" ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>

                  {expandedSection === "locations" && (
                    <div className="pl-4 py-2 space-y-4 animate-in slide-in-from-right-5 duration-200">
                      {locations.map((location) => (
                        <div key={location.id} className="space-y-1">
                          <h3 className="font-medium">{location.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {location.address.city}, {location.address.state}
                          </p>
                          <a
                            href={`tel:${location.contact.phone.replace(/[^0-9]/g, "")}`}
                            onClick={() =>
                              trackConversion("phone_click", {
                                location: `mobile_navigation_${location.id}`,
                              })
                            }
                            className="text-sm text-primary flex items-center gap-1 py-2.5"
                          >
                            <Phone className="h-3 w-3" />
                            {location.contact.phone}
                          </a>
                        </div>
                      ))}
                      <Link
                        href="/contact"
                        className="text-primary hover:underline text-sm inline-block py-2 mt-1"
                        onClick={() => setIsOpen(false)}
                      >
                        View Details & Map
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t flex flex-col gap-3">
                  <Button asChild size="lg" className="h-12 w-full">
                    <a
                      href="mailto:buck@olympicbootworks.com?subject=Olympic%20Bootworks%20Question"
                      onClick={() => {
                        setIsOpen(false)
                        trackConversion("email_click", { location: "mobile_navigation" })
                      }}
                    >
                      <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                      Email Buck
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 w-full">
                    <a
                      href="tel:+15305810747"
                      onClick={() => {
                        setIsOpen(false)
                        trackConversion("phone_click", { location: "mobile_navigation" })
                      }}
                    >
                      <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                      Call the shop
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
