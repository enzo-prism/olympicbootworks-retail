import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ButtonOnDarkProps extends ButtonProps {}

const ButtonOnDark = React.forwardRef<HTMLButtonElement, ButtonOnDarkProps>(
  ({ className, variant = "outline-on-dark", ...props }, ref) => {
    return (
      <Button
        className={cn("backdrop-blur-sm shadow-md border border-white/30", className)}
        variant={variant}
        ref={ref}
        {...props}
      />
    )
  },
)
ButtonOnDark.displayName = "ButtonOnDark"

export { ButtonOnDark }
