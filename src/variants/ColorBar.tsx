'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '../utils/cn';

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
  const barRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Cache bounding rect to avoid expensive recalculations during drag
  const rectRef = useRef<DOMRect | null>(null);

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

  const position = satValueToPosition(saturation, lightness);

  const handleInteraction = useCallback((event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!barRef.current || !onChange) return;

    // Use cached rect during drag, recalculate only when needed
    const rect = rectRef.current || barRef.current.getBoundingClientRect();
    if (!rectRef.current) {
      rectRef.current = rect;
    }

    const clientX = 'touches' in event ? event.touches[0]?.clientX : event.clientX;

    if (!clientX) return;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = (x / rect.width) * 100; // 0 to 100

    const [newSaturation, newValue] = positionToSatValue(percentage);
    
    // Always call onChange immediately for smooth dragging
    onChange(newSaturation, newValue);
  }, [onChange, positionToSatValue]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (!onChange) return;
    
    // Cache the bounding rect at drag start
    if (barRef.current) {
      rectRef.current = barRef.current.getBoundingClientRect();
    }
    
    // Allow clicking anywhere on the bar, not just the thumb
    setIsDragging(true);
    onDragStart?.();
    handleInteraction(event);
  }, [handleInteraction, onChange, onDragStart]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || !onChange) return;
    handleInteraction(event);
  }, [isDragging, handleInteraction, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Clear cached rect when drag ends
    rectRef.current = null;
    onDragEnd?.();
  }, [onDragEnd]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (!onChange) return;
    
    // Allow touching anywhere on the bar, not just the thumb
    setIsDragging(true);
    onDragStart?.();
    handleInteraction(event);
  }, [handleInteraction, onChange, onDragStart]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isDragging || !onChange) return;
    event.preventDefault();
    handleInteraction(event);
  }, [isDragging, handleInteraction, onChange]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    onDragEnd?.();
  }, [onDragEnd]);

  // Keyboard navigation support
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!onChange) return;

    const step = event.shiftKey ? 10 : 1; // larger steps with Shift
    let newPosition = position;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newPosition = Math.max(0, position - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newPosition = Math.min(100, position + step);
        break;
      case 'Home':
        event.preventDefault();
        newPosition = 0;
        break;
      case 'End':
        event.preventDefault();
        newPosition = 100;
        break;
      case 'PageDown':
        event.preventDefault();
        newPosition = Math.max(0, position - 10);
        break;
      case 'PageUp':
        event.preventDefault();
        newPosition = Math.min(100, position + 10);
        break;
      default:
        return; // Don't handle other keys
    }

    const [newSaturation, newValue] = positionToSatValue(newPosition);
    onChange(newSaturation, newValue);
  }, [onChange, position, positionToSatValue]);

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
        'pcp-color-bar',
        className
      )}
      style={{
        background: `${gradientWithAlpha}, ${checkerPattern}`
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      role={onChange ? "slider" : undefined}
      aria-label={onChange ? `Color spectrum for hue ${Math.round(hue)}°, current position at ${Math.round(position)}%. Use arrow keys to adjust, Shift for larger steps.` : `Color spectrum for hue ${Math.round(hue)}°, current position at ${Math.round(position)}%`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-valuetext={`Position ${Math.round(position)}%, saturation ${Math.round(saturation)}%, lightness ${Math.round(lightness)}%`}
      aria-orientation="horizontal"
      tabIndex={onChange ? 0 : undefined}
    >
      {/* Current color position indicator */}
      <div
        className="pcp-color-bar__indicator"
        style={{
          left: `${position}%`
        }}
      />
      {/* Draggable thumb for better visibility and interaction */}
      <div
        ref={handleRef}
        className={cn(
          "pcp-color-bar__thumb",
          onChange && "pcp-color-bar__thumb--interactive"
        )}
        style={{
          left: `${position}%`
        }}
      />
    </div>
  );
} 