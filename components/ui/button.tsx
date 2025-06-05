import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-primary/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm border border-destructive/10",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm border border-secondary/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Updated variants for specific contexts
        "outline-on-dark": "border border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 shadow-sm",
        "outline-on-light": "border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 shadow-sm",
        gradient:
          "bg-gradient-to-r from-primary to-primary-light text-primary-foreground hover:opacity-90 shadow-sm border border-primary/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 py-1.5 text-xs",
        lg: "h-11 rounded-md px-6 py-2.5 text-base",
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
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, icon, iconPosition = "left", children, ...props }, ref) => {
    // FIX: Handle the Slot component correctly to avoid React.Children.only() error
    if (asChild) {
      // When using Slot, we need a single child element
      return (
        <Slot className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }

    // Regular button case with icon support
    return (
      <button className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props}>
        {icon && iconPosition === "left" && <span className="mr-2 inline-flex">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2 inline-flex">{icon}</span>}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
