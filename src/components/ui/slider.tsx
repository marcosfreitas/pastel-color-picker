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
      className={cn("pcp-slider", className)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn("pcp-slider__track", spectrum?.trackClassName)}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn("pcp-slider__range", spectrum?.rangeClassName)}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn("pcp-slider__thumb", spectrum?.thumbClassName)}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider } 