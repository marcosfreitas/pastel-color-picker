'use client';

import React from 'react';
import { cn } from '../utils/cn';

interface ColorBarProps {
  hue: number;
  saturation: number;
  lightness: number;
  className?: string;
}

export function ColorBar({ hue, saturation, lightness, className }: ColorBarProps) {
  // Calculate position on the bar (0-100%)
  // The bar goes: white (0%) → pure hue (50%) → black (100%)
  // We need to map saturation and lightness to this spectrum
  
  let position: number;
  
  if (lightness > 50) {
    // Light side: interpolate between white (0%) and pure hue (50%)
    // Higher lightness = closer to white (lower position)
    const lightnessFactor = (lightness - 50) / 50; // 0 to 1
    const saturationFactor = saturation / 100; // 0 to 1
    position = (1 - lightnessFactor) * saturationFactor * 50;
  } else {
    // Dark side: interpolate between pure hue (50%) and black (100%)
    // Lower lightness = closer to black (higher position)
    const darknessFactor = (50 - lightness) / 50; // 0 to 1
    const saturationFactor = saturation / 100; // 0 to 1
    position = 50 + (darknessFactor * saturationFactor * 50);
  }

  return (
    <div
      className={cn(
        'relative w-full h-4 rounded border shadow-inner',
        className
      )}
      style={{
        background: `linear-gradient(
          to right,
          white,
          hsl(${hue}, 100%, 50%),
          black
        )`
      }}
      aria-label={`Color spectrum for hue ${Math.round(hue)}°, current position at ${Math.round(position)}%`}
    >
      {/* Current color position indicator */}
      <div
        className="absolute top-0 w-0.5 h-full bg-white border border-gray-800 shadow-sm"
        style={{
          left: `${position}%`,
          transform: 'translateX(-50%)'
        }}
      />
      {/* Small circle indicator for better visibility */}
      <div
        className="absolute top-1/2 w-2 h-2 bg-white border border-gray-800 rounded-full shadow-sm"
        style={{
          left: `${position}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
} 