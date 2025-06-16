'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '../utils/cn';

interface ColorAreaProps {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (saturation: number, lightness: number) => void;
  className?: string;
}

export function ColorArea({
  hue,
  saturation,
  lightness,
  onChange,
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
    handleInteraction(event);
  }, [handleInteraction]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging) return;
    handleInteraction(event as any);
  }, [isDragging, handleInteraction]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    setIsDragging(true);
    handleInteraction(event);
  }, [handleInteraction]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isDragging) return;
    event.preventDefault();
    handleInteraction(event as any);
  }, [isDragging, handleInteraction]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

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

  return (
    <div
      ref={canvasRef}
      className={cn(
        'relative w-full h-48 rounded-lg border cursor-crosshair overflow-hidden',
        className
      )}
      style={{
        background: `
          linear-gradient(to top, black, transparent),
          linear-gradient(to right, white, hsl(${hue}, 100%, 50%))
        `
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-label="Color area for selecting saturation and lightness"
      tabIndex={0}
    >
      {/* Cursor */}
      <div
        className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${cursorX}%`,
          top: `${cursorY}%`,
          boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
        }}
      />
    </div>
  );
} 