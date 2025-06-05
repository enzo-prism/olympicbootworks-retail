"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ChevronUp, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShopButton } from "@/components/ui/shop-button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import LocationSelector from "@/components/location-selector"
import { cn } from "@/lib/utils"
import { locations } from "@/data/locations"

// Add this new CartWidget component
const CartWidget = () => {
  useEffect(() => {
    // Only initialize if Ecwid isn't already initialized
    if (window.Ecwid && !window._xnext_initialization_scripts_loaded) {
      window.Ecwid.init()
    }
  }, [])

  return (
    <div className="ec-cart-widget relative flex items-center">
      {/* This div will be replaced by the Ecwid cart widget */}
    </div>
  )
}

// Custom Link component that scrolls to top and handles mobile menu closing
const NavLink = ({ href, className, children, onClick, isMobile = false, isActive = false, ...props }) => {
  const handleClick = (e) => {
    // Execute any passed onClick handler
    if (onClick) onClick(e)

    // Small timeout to ensure the navigation happens first
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 10)
  }

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors relative",
        isMobile ? "text-lg py-3 px-1 w-full flex items-center" : "text-sm font-medium hover:text-primary",
        isActive ? "text-primary font-semibold" : "text-muted-foreground",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
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
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

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

  // Handle orientation changes
  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape")
    }

    // Check initial orientation
    checkOrientation()

    window.addEventListener("resize", checkOrientation)
    return () => window.removeEventListener("resize", checkOrientation)
  }, [])

  // Add this useEffect to load the Ecwid script if it's not already loaded
  useEffect(() => {
    if (!document.querySelector('script[src*="app.business.shop/script.js"]')) {
      const script = document.createElement("script")
      script.src = "https://app.business.shop/script.js?115212795&data_platform=code&data_date=2025-04-30"
      script.setAttribute("data-cfasync", "false")
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Updated navLinks array with Shop and Testimonials
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pros", label: "Pros" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ]

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
              src="/images/olympic-bootworks-transparent-logo.png"
              alt="Olympic Bootworks Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-xl hidden xs:block">Olympic Bootworks</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} isActive={pathname === link.href}>
              {link.label}
            </NavLink>
          ))}

          <LocationSelector compact />
          <ShopButton href="/shop" variant="default" size="sm" className="ml-2 shadow-sm">
            Shop
          </ShopButton>
          <CartWidget />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:+15305810747"
            className="mr-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Call Olympic Bootworks"
          >
            <Phone className="h-5 w-5 text-primary" />
          </a>
          <CartWidget />
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
              className={cn("w-full sm:max-w-sm p-0 overflow-y-auto", orientation === "landscape" ? "pt-12" : "pt-16")}
            >
              <div className="sticky top-0 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm z-10 border-b">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden">
                    <Image
                      src="/images/olympic-bootworks-transparent-logo.png"
                      alt="Olympic Bootworks Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-lg">Olympic Bootworks</span>
                </div>
                <SheetClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </div>

              <div className="flex flex-col p-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    isMobile={true}
                    isActive={pathname === link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}

                {/* Locations Section */}
                <div className="mt-2 border-t pt-4">
                  <button
                    className="flex items-center justify-between w-full py-3 text-lg font-medium"
                    onClick={() => toggleSection("locations")}
                    aria-expanded={expandedSection === "locations"}
                  >
                    <span>Our Locations</span>
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
                            className="text-sm text-primary flex items-center gap-1 py-1"
                          >
                            <Phone className="h-3 w-3" />
                            {location.contact.phone}
                          </a>
                        </div>
                      ))}
                      <Link
                        href="/contact"
                        className="text-primary hover:underline text-sm block mt-2"
                        onClick={() => setIsOpen(false)}
                      >
                        View Details & Map
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <ShopButton
                    href="/shop"
                    fullWidth
                    className="shadow-sm h-12 text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    Shop Now
                  </ShopButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
