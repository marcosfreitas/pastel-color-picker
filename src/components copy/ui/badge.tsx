import { cn } from "../../utils/cn"
import * as React from "react"

const badgeVariants = {
  variant: {
    default: "pcp-border-transparent pcp-bg-primary pcp-text-primary-foreground hover:pcp-bg-primary/80",
    secondary: "pcp-border-transparent pcp-bg-secondary pcp-text-secondary-foreground hover:pcp-bg-secondary/80",
    destructive: "pcp-border-transparent pcp-bg-destructive pcp-text-destructive-foreground hover:pcp-bg-destructive/80",
    outline: "pcp-text-foreground",
  },
}

function getVariantClasses(variant: string) {
  return badgeVariants.variant[variant as keyof typeof badgeVariants.variant] || badgeVariants.variant.default
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        "pcp-inline-flex pcp-items-center pcp-rounded-full pcp-border pcp-px-2.5 pcp-py-0.5 pcp-text-xs pcp-font-semibold pcp-transition-colors focus:pcp-outline-none focus:pcp-ring-2 focus:pcp-ring-ring focus:pcp-ring-offset-2",
        getVariantClasses(variant),
        className
      )} 
      {...props} 
    />
  )
}

export { Badge } 