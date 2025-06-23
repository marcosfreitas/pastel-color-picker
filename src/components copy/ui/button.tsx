import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../utils/cn"

const buttonVariants = {
  variant: {
    default: "pcp-bg-primary pcp-text-primary-foreground pcp-shadow-sm hover:pcp-bg-primary/90 hover:pcp-shadow-md pcp-transition-all",
    destructive: "pcp-bg-destructive pcp-text-destructive-foreground pcp-shadow-sm hover:pcp-bg-destructive/90 hover:pcp-shadow-md pcp-transition-all",
    outline: "pcp-border pcp-border-input pcp-bg-background pcp-shadow-sm hover:pcp-bg-accent hover:pcp-text-accent-foreground hover:pcp-shadow-md pcp-transition-all",
    secondary: "pcp-bg-secondary pcp-text-secondary-foreground pcp-shadow-sm hover:pcp-bg-secondary/80 hover:pcp-shadow-md pcp-transition-all",
    ghost: "hover:pcp-bg-accent hover:pcp-text-accent-foreground pcp-transition-all",
    link: "pcp-text-primary pcp-underline-offset-4 hover:pcp-underline pcp-transition-all",
  },
  size: {
    default: "pcp-h-10 pcp-px-4 pcp-py-2",
    sm: "pcp-h-9 pcp-rounded-md pcp-px-3",
    md: "pcp-h-11 pcp-rounded-md pcp-px-8",
    icon: "pcp-h-10 pcp-w-10",
  },
}

function getVariantClasses(variant: string, size: string) {
  const variantClass = buttonVariants.variant[variant as keyof typeof buttonVariants.variant] || buttonVariants.variant.default
  const sizeClass = buttonVariants.size[size as keyof typeof buttonVariants.size] || buttonVariants.size.default
  return `pcp-inline-flex pcp-items-center pcp-justify-center pcp-whitespace-nowrap pcp-rounded-lg pcp-text-sm pcp-font-medium pcp-ring-offset-background pcp-transition-all pcp-duration-200 focus-visible:pcp-outline-none focus-visible:pcp-ring-2 focus-visible:pcp-ring-ring focus-visible:pcp-ring-offset-2 disabled:pcp-pointer-events-none disabled:pcp-opacity-50 ${variantClass} ${sizeClass}`
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(getVariantClasses(variant, size), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 