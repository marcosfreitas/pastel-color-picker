'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '../utils/cn';

interface ColorAreaProps {
  hue: number;
  saturation: number;
  lightness: number;
  alpha?: number;
  onChange: (saturation: number, lightness: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  className?: string;
}

export function ColorArea({
  hue,
  saturation,
  lightness,
  alpha = 1,
  onChange,
  onDragStart,
  onDragEnd,
  className
}: ColorAreaProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Cache bounding rect to avoid expensive recalculations during drag
  const rectRef = useRef<DOMRect | null>(null);

  const handleInteraction = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return;

    // Use cached rect during drag, recalculate only when needed
    const rect = rectRef.current || canvasRef.current.getBoundingClientRect();
    if (!rectRef.current) {
      rectRef.current = rect;
    }

    const clientX = 'touches' in event ? event.touches[0]?.clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0]?.clientY : event.clientY;

    if (!clientX || !clientY) return;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const newSaturation = Math.round((x / rect.width) * 100);
    const newLightness = Math.round(100 - (y / rect.height) * 100);

    // Always call onChange immediately for smooth dragging
    onChange(newSaturation, newLightness);
  }, [onChange]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    // Cache the bounding rect at drag start
    if (canvasRef.current) {
      rectRef.current = canvasRef.current.getBoundingClientRect();
    }
    setIsDragging(true);
    onDragStart?.();
    handleInteraction(event);
  }, [handleInteraction, onDragStart]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleInteraction(event as any);
  }, [isDragging, handleInteraction]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Clear cached rect when drag ends
    rectRef.current = null;
    onDragEnd?.();
  }, [onDragEnd]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    // Cache the bounding rect at drag start
    if (canvasRef.current) {
      rectRef.current = canvasRef.current.getBoundingClientRect();
    }
    setIsDragging(true);
    onDragStart?.();
    handleInteraction(event);
  }, [handleInteraction, onDragStart]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isDragging) return;
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleInteraction(event as any);
  }, [isDragging, handleInteraction]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    // Clear cached rect when drag ends
    rectRef.current = null;
    onDragEnd?.();
  }, [onDragEnd]);

  // Keyboard navigation support for 2D color area
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 5; // Larger steps with Shift
    let newSaturation = saturation;
    let newLightness = lightness;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newSaturation = Math.max(0, saturation - step);
        break;
      case 'ArrowRight':
        event.preventDefault();
        newSaturation = Math.min(100, saturation + step);
        break;
      case 'ArrowUp':
        event.preventDefault();
        newLightness = Math.min(100, lightness + step);
        break;
      case 'ArrowDown':
        event.preventDefault();
        newLightness = Math.max(0, lightness - step);
        break;
      case 'Home':
        event.preventDefault();
        newSaturation = 0;
        newLightness = 100; // Top-left: white
        break;
      case 'End':
        event.preventDefault();
        newSaturation = 100;
        newLightness = 0; // Bottom-right: black
        break;
      case 'PageUp':
        event.preventDefault();
        newSaturation = 100;
        newLightness = 100; // Top-right: pure hue
        break;
      case 'PageDown':
        event.preventDefault();
        newSaturation = 0;
        newLightness = 0; // Bottom-left: black
        break;
      default:
        return; // Don't handle other keys
    }

    onChange(newSaturation, newLightness);
  }, [onChange, saturation, lightness]);

  // Optimize useEffect dependencies to prevent frequent re-registration
  useEffect(() => {
    if (isDragging) {
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
  }, [isDragging]); // Removed handler dependencies to prevent re-registration

  // Calculate cursor position based on current saturation and lightness (memoized)
  const cursorPosition = React.useMemo(() => ({
    x: (saturation / 100) * 100,
    y: (100 - lightness) / 100 * 100
  }), [saturation, lightness]);

  // Checkered pattern for transparency - always present
  const checkerPattern = `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checkerboard' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect x='0' y='0' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='0' y='10' width='10' height='10' fill='%23e0e0e0'/%3e%3crect x='10' y='0' width='10' height='10' fill='%23e0e0e0'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23checkerboard)'/%3e%3c/svg%3e")`;

  // Create the gradient with alpha
  const gradientWithAlpha = `
    linear-gradient(to top, rgba(0, 0, 0, ${alpha}), transparent),
    linear-gradient(to right, rgba(255, 255, 255, ${alpha}), hsla(${hue}, 100%, 50%, ${alpha}))
  `;

  return (
    <div
      ref={canvasRef}
      className={cn(
        'pcp-color-area',
        isDragging && 'pcp-color-area--dragging',
        className
      )}
      style={{
        background: `${gradientWithAlpha}, ${checkerPattern}`
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-label="2D color area for selecting saturation and lightness. Use arrow keys to navigate."
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round((saturation + lightness) / 2)}
      aria-valuetext={`Saturation ${Math.round(saturation)}%, Lightness ${Math.round(lightness)}%`}
      aria-describedby="color-area-instructions"
      tabIndex={0}
    >
      {/* Cursor */}
      <div
        className="pcp-color-area__cursor"
        style={{
          left: `${cursorPosition.x}%`,
          top: `${cursorPosition.y}%`
        }}
      />
    </div>
  );
} 