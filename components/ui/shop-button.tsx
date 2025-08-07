import * as React from "react"
import Link from "next/link"
import { ShoppingBag } from 'lucide-react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Update the shopButtonVariants to match our new button styling
const shopButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hero-button",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-primary/10",
        outline: "border border-primary/40 bg-transparent text-primary hover:bg-primary/10 shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm border border-secondary/10",
        ghost: "bg-transparent text-primary hover:bg-primary/10",
        // Updated: filled on-dark for maximum contrast on videos/images
        "on-dark":
          "bg-white text-gray-900 hover:bg-white/90 shadow-lg " +
          "focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        // Updated: outline on-dark with stronger border and translucent hover
        "outline-on-dark":
          "border border-white/70 bg-transparent text-white hover:bg-white/12 shadow-sm backdrop-blur-sm " +
          "focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "primary-accent":
          "bg-gradient-to-r from-primary to-primary-light text-primary-foreground hover:opacity-90 shadow-sm border border-primary/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 py-1.5 text-xs",
        lg: "h-12 rounded-md px-6 py-2.5 text-base",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ShopButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof shopButtonVariants> {
  href?: string
  icon?: boolean
  iconPosition?: "left" | "right"
  children: React.ReactNode
}

const ShopButton = React.forwardRef<HTMLButtonElement, ShopButtonProps>(
  ({ className, variant, size, fullWidth, href, icon = true, iconPosition = "left", children, ...props }, ref) => {
    // Create button content with icon
    const buttonContent = (
      <>
        {icon && iconPosition === "left" && <ShoppingBag className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />}
        {children}
        {icon && iconPosition === "right" && <ShoppingBag className="h-4 w-4 ml-2 flex-shrink-0" aria-hidden="true" />}
      </>
    )

    if (href) {
      // FIX: Don't use asChild for Link, render directly
      return (
        <Link href={href} className={cn(shopButtonVariants({ variant, size, fullWidth, className }))}>
          {buttonContent}
        </Link>
      )
    }

    return (
      <button className={cn(shopButtonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props}>
        {buttonContent}
      </button>
    )
  },
)
ShopButton.displayName = "ShopButton"

export { ShopButton, shopButtonVariants }
