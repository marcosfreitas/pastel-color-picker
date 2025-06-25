import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "../../utils/cn"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => {
    const separatorClasses = cn(
      "pcp-separator",
      `pcp-separator--${orientation}`,
      className
    );

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={separatorClasses}
        {...props}
      />
    );
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator } 