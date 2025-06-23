import * as React from "react"
import { cn } from "../../utils/cn"
import * as SliderPrimitive from "@radix-ui/react-slider"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  spectrum,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  spectrum?: {
    trackClassName?: string;
    rangeClassName?: string;
    thumbClassName?: string;
  };
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "pcp-relative pcp-flex pcp-w-full pcp-touch-none pcp-items-center pcp-select-none data-[disabled]:pcp-opacity-50 data-[orientation=vertical]:pcp-h-full data-[orientation=vertical]:pcp-min-h-44 data-[orientation=vertical]:pcp-w-auto data-[orientation=vertical]:pcp-flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "pcp-bg-muted pcp-relative pcp-grow pcp-overflow-hidden pcp-rounded-full data-[orientation=horizontal]:pcp-h-1.5 data-[orientation=horizontal]:pcp-w-full data-[orientation=vertical]:pcp-h-full data-[orientation=vertical]:pcp-w-1.5",
          spectrum?.trackClassName
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "pcp-bg-primary pcp-absolute data-[orientation=horizontal]:pcp-h-full data-[orientation=vertical]:pcp-w-full",
            spectrum?.rangeClassName
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "pcp-border-primary pcp-bg-background pcp-ring-ring/50 pcp-block pcp-size-4 pcp-shrink-0 pcp-rounded-full pcp-border pcp-shadow-sm pcp-transition-[color,box-shadow] hover:pcp-ring-4 focus-visible:pcp-ring-4 focus-visible:pcp-outline-hidden disabled:pcp-pointer-events-none disabled:pcp-opacity-50",
            spectrum?.thumbClassName
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider } 