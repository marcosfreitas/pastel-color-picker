import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../utils/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const buttonClasses = cn(
      "pcp-button",
      `pcp-button--variant-${variant}`,
      `pcp-button--size-${size === 'default' ? 'md' : size}`,
      className
    )
    
    return (
      <Comp
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children && <span className="pcp-button__content">{children}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button } 