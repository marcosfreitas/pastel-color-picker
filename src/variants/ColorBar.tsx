'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '../utils/cn';

interface ColorBarProps {
  hue: number;
  saturation: number;
  lightness: number;
  alpha?: number;
  onChange?: (saturation: number, lightness: number) => void;
  className?: string;
}

export function ColorBar({ hue, saturation, lightness, alpha = 1, onChange, className }: ColorBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper function to convert saturation/lightness to position (0-100%)
  // The bar represents: white (0%) → pure hue (50%) → black (100%)
  const satLightToPosition = useCallback((sat: number, light: number): number => {
    if (light >= 50) {
      // Light side: interpolate between white (0%) and pure hue (50%)
      // At light=100, sat=0 → position=0 (white)
      // At light=50, sat=100 → position=50 (pure hue)
      if (sat === 0) return 0; // Pure white
      const lightFactor = (100 - light) / 50; // 0 to 1 as we go from light=100 to light=50
      const satFactor = sat / 100; // 0 to 1
      return lightFactor * satFactor * 50;
    } else {
      // Dark side: interpolate between pure hue (50%) and black (100%)  
      // At light=50, sat=100 → position=50 (pure hue)
      // At light=0, sat=100 → position=100 (black)
      if (sat === 0) return 0; // Desaturated colors stay on the white side
      const darkFactor = (50 - light) / 50; // 0 to 1 as we go from light=50 to light=0
      const satFactor = sat / 100; // 0 to 1
      return 50 + (darkFactor * satFactor * 50);
    }
  }, []);

  // Helper function to convert position (0-100%) to saturation/lightness
  const positionToSatLight = useCallback((position: number): [number, number] => {
    if (position <= 50) {
      // Left side: white to pure hue
      if (position === 0) return [0, 100]; // Pure white
      const factor = position / 50; // 0 to 1
      const newSaturation = Math.round(factor * 100);
      const newLightness = Math.round(100 - (factor * 50));
      return [newSaturation, newLightness];
    } else {
      // Right side: pure hue to black
      const factor = (position - 50) / 50; // 0 to 1
      const newSaturation = 100;
      const newLightness = Math.round(50 - (factor * 50));
      return [newSaturation, newLightness];
    }
  }, []);

  const position = satLightToPosition(saturation, lightness);

  const handleInteraction = useCallback((event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!barRef.current || !onChange) return;

    const rect = barRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0]?.clientX : event.clientX;

    if (!clientX) return;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = (x / rect.width) * 100; // 0 to 100

    const [newSaturation, newLightness] = positionToSatLight(percentage);
    onChange(newSaturation, newLightness);
  }, [onChange, positionToSatLight]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (!onChange || !handleRef.current) return;
    
    // Only start dragging if the click is on the handle (circle indicator)
    const target = event.target as HTMLElement;
    if (!handleRef.current.contains(target)) return;
    
    setIsDragging(true);
    handleInteraction(event);
  }, [handleInteraction, onChange]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || !onChange) return;
    handleInteraction(event);
  }, [isDragging, handleInteraction, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (!onChange || !handleRef.current) return;
    
    // Only start dragging if the touch is on the handle (circle indicator)
    const target = event.target as HTMLElement;
    if (!handleRef.current.contains(target)) return;
    
    setIsDragging(true);
    handleInteraction(event);
  }, [handleInteraction, onChange]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isDragging || !onChange) return;
    event.preventDefault();
    handleInteraction(event);
  }, [isDragging, handleInteraction, onChange]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging && onChange) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd, onChange]);

  // Create the gradient with alpha
  const gradientWithAlpha = `linear-gradient(
    to right,
    rgba(255, 255, 255, ${alpha}),
    hsla(${hue}, 100%, 50%, ${alpha}),
    rgba(0, 0, 0, ${alpha})
  )`;

  // Checkered pattern for transparency - always present
  const checkerPattern = `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checkerboard' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect x='0' y='0' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='0' y='10' width='10' height='10' fill='%23e0e0e0'/%3e%3crect x='10' y='0' width='10' height='10' fill='%23e0e0e0'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23checkerboard)'/%3e%3c/svg%3e")`;

  return (
    <div
      ref={barRef}
      className={cn(
        'relative w-full h-2 rounded border shadow-inner',
        className
      )}
      style={{
        background: `${gradientWithAlpha}, ${checkerPattern}`
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role={onChange ? "slider" : undefined}
      aria-label={onChange ? `Color spectrum for hue ${Math.round(hue)}°, current position at ${Math.round(position)}%` : `Color spectrum for hue ${Math.round(hue)}°, current position at ${Math.round(position)}%`}
      tabIndex={onChange ? 0 : undefined}
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
        ref={handleRef}
        className={cn(
          "absolute top-1/2 w-4 h-4 bg-white border border-gray-800 rounded-full shadow-sm",
          onChange && "cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
        )}
        style={{
          left: `${position}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
} 