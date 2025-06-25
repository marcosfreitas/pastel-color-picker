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

  const handleInteraction = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0]?.clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0]?.clientY : event.clientY;

    if (!clientX || !clientY) return;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const newSaturation = Math.round((x / rect.width) * 100);
    const newLightness = Math.round(100 - (y / rect.height) * 100);

    onChange(newSaturation, newLightness);
  }, [onChange]);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
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
    onDragEnd?.();
  }, [onDragEnd]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
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
    onDragEnd?.();
  }, [onDragEnd]);

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
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Calculate cursor position based on current saturation and lightness
  const cursorX = (saturation / 100) * 100;
  const cursorY = (100 - lightness) / 100 * 100;

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
      role="slider"
      aria-label="Color area for selecting saturation and lightness"
      tabIndex={0}
    >
      {/* Cursor */}
      <div
        className="pcp-color-area__cursor"
        style={{
          left: `${cursorX}%`,
          top: `${cursorY}%`
        }}
      />
    </div>
  );
} 