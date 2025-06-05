import type * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  href?: string
  className?: string
}

export function SimpleButton({
  className,
  variant = "default",
  size = "default",
  href,
  children,
  ...props
}: SimpleButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variantStyles = {
    default:
      "bg-primary text-primary-foreground shadow hover:bg-primary/90 active:translate-y-0.5 border border-primary",
    outline:
      "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground active:translate-y-0.5",
    secondary:
      "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80 active:translate-y-0.5 border border-secondary/20",
    ghost: "hover:bg-accent hover:text-accent-foreground active:translate-y-0.5",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 py-1.5 text-xs",
    lg: "h-11 rounded-md px-6 py-2.5 text-base",
    icon: "h-10 w-10 p-0",
  }

  const styles = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
