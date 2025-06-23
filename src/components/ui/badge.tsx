import { cn } from "../../utils/cn"
import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const badgeClasses = cn(
    "pcp-badge",
    `pcp-badge--variant-${variant}`,
    className
  );
  
  return (
    <div 
      className={badgeClasses}
      {...props} 
    />
  )
}

export { Badge } 