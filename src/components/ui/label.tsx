import * as React from "react"
import { cn } from "../../utils/cn"
import * as LabelPrimitive from "@radix-ui/react-label"

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("pcp-label", className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label } 