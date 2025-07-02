'use client';

import React, { useCallback, useMemo } from 'react';
import { cn } from '../utils/cn';
import { Slider } from '../components/ui/slider';

interface ColorBarProps {
  hue: number;
  saturation: number;
  lightness: number; // This is actually HSV Value/brightness, keeping same prop name for compatibility
  alpha?: number;
  onChange?: (saturation: number, lightness: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  className?: string;
}

export function ColorBar({ hue, saturation, lightness, alpha = 1, onChange, onDragStart, onDragEnd, className }: ColorBarProps) {
  
  // Helper function to convert saturation/value to position (0-100%)
  // The bar represents: white (0%) → pure hue (50%) → black (100%)
  // For HSV: when V=100 and S=0, we get white; when V=100 and S=100, we get pure hue; when V=0, we get black
  const satValueToPosition = useCallback((sat: number, value: number): number => {
    // For HSV color space:
    // - Pure white: S=0, V=100 → position 0%
    // - Pure hue: S=100, V=100 → position 50%
    // - Pure black: V=0 (any S) → position 100%
    
    if (value === 0) return 100; // Pure black
    if (sat === 0) return 0; // White/gray
    
    // Calculate position based on saturation and value
    // When value is high (bright), position depends more on saturation
    // When value is low (dark), position shifts toward black (100%)
    
    const valueFactor = value / 100; // 0 to 1
    const satFactor = sat / 100; // 0 to 1
    
    // Position calculation for HSV color bar
    // 0% = white, 50% = pure hue, 100% = black
    if (valueFactor >= 0.5) {
      // Bright side: interpolate between white and pure hue
      const position = satFactor * 50;
      return position;
    } else {
      // Dark side: interpolate between pure hue and black
      const normalizedValue = valueFactor * 2; // 0 to 1 when value is 0 to 50
      const huePosition = satFactor * 50; // Position of pure hue
      const blackPosition = 100; // Position of black
      return huePosition + (1 - normalizedValue) * (blackPosition - huePosition);
    }
  }, []);

  // Helper function to convert position (0-100%) to saturation/value
  const positionToSatValue = useCallback((position: number): [number, number] => {
    if (position <= 50) {
      // Left side: white to pure hue
      if (position === 0) return [0, 100]; // Pure white (S=0, V=100)
      const factor = position / 50; // 0 to 1
      const newSaturation = Math.round(factor * 100);
      const newValue = 100; // Full brightness on the left side
      return [newSaturation, newValue];
    } else {
      // Right side: pure hue to black
      const factor = (position - 50) / 50; // 0 to 1
      const newSaturation = 100; // Full saturation
      const newValue = Math.round(100 - (factor * 100)); // Decreasing brightness toward black
      return [newSaturation, newValue];
    }
  }, []);

  // Current position based on saturation and lightness
  const currentPosition = useMemo(() => 
    satValueToPosition(saturation, lightness), 
    [saturation, lightness, satValueToPosition]
  );

  // Handle slider value changes
  const handleValueChange = useCallback((values: number[]) => {
    if (!onChange) return;
    
    const position = values[0];
    const [newSaturation, newValue] = positionToSatValue(position);
    onChange(newSaturation, newValue);
  }, [onChange, positionToSatValue]);

  // Handle slider value commit (drag end)
  const handleValueCommit = useCallback((values: number[]) => {
    if (onChange) {
      const position = values[0];
      const [newSaturation, newValue] = positionToSatValue(position);
      onChange(newSaturation, newValue);
    }
    onDragEnd?.();
  }, [onChange, onDragEnd, positionToSatValue]);

  // Create color gradient for the bar background
  const colorGradient = useMemo(() => {
    const baseColor = `hsl(${hue}, 100%, 50%)`;
    return `linear-gradient(to right, 
      white 0%, 
      ${baseColor} 50%, 
      black 100%
    )`;
  }, [hue]);

  // checkerboard pattern for alpha transparency
  const checkerPattern = `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checkerboard' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect x='0' y='0' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='0' y='10' width='10' height='10' fill='%23e0e0e0'/%3e%3crect x='10' y='0' width='10' height='10' fill='%23e0e0e0'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23checkerboard)'/%3e%3c/svg%3e")`; 
  // Combine gradient with alpha support
  const gradientWithAlpha = alpha < 1 
    ? `linear-gradient(to right, 
        hsla(${hue}, 0%, 100%, ${alpha}) 0%, 
        hsla(${hue}, 100%, 50%, ${alpha}) 50%, 
        hsla(${hue}, 100%, 0%, ${alpha}) 100%
      )`
    : colorGradient;

  const finalBackground = alpha < 1 
    ? `${gradientWithAlpha}, ${checkerPattern}`
    : colorGradient;

  return (
    <div
      className={cn('pcp-color-bar', className)}
      style={{
        background: finalBackground
      }}
    >
      <Slider
        value={[currentPosition]}
        onValueChange={handleValueChange}
        onPointerDown={onDragStart}
        onValueCommit={handleValueCommit}
        min={0}
        max={100}
        step={0.1}
        className="pcp-color-bar__slider"
        spectrum={{
          trackClassName: "pcp-color-bar__track",
          rangeClassName: "pcp-color-bar__range", 
          thumbClassName: "pcp-color-bar__thumb--slider"
        }}
        aria-label={`Color spectrum for hue ${Math.round(hue)}°, current position at ${Math.round(currentPosition)}%. Use arrow keys to adjust, Shift for larger steps.`}
        aria-valuetext={`Position ${Math.round(currentPosition)}%, saturation ${Math.round(saturation)}%, lightness ${Math.round(lightness)}%`}
        aria-orientation="horizontal"
      />
    </div>
  );
} 