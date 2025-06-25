'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { cn } from '../utils/cn';
import { ColorPickerDialogProps, ColorPickerVariantProps } from '../types';
import { Shuffle } from 'lucide-react';

interface RandomVariantProps extends Pick<ColorPickerDialogProps, 'presets' | 'defaultColor' | 'colorMode' | 'onColorChange'>, Omit<ColorPickerVariantProps, 'variant'> {
  // No additional variant-specific properties needed
}

export function RandomVariant({
  // ColorPickerDialogProps
  defaultColor,
  presets: _presets,
  colorMode,
  onColorChange,
  
  // ColorPickerVariantProps (excluding variant)
  size,
  disabled,
  label,
  className,
  children
}: RandomVariantProps) {
  // Guard against undefined defaultColor
  if (!defaultColor) {
    return null;
  }

  const borderColor = defaultColor.hexa || '#000000';
  
  const randomClasses = cn(
    'pcp-random',
    disabled && 'pcp-random--disabled',
    className
  );
  
  return (
    <Button
      type="button"
      className={randomClasses}
      variant="outline"
      size={size === 'md' ? 'default' : size}
      disabled={disabled}
      onClick={() => onColorChange(defaultColor, true)}
      style={{
        borderBottom: `4px solid ${borderColor}`
      }}
      aria-label={`Generate random ${colorMode === 'pastel' ? 'pastel' : 'vibrant'} color`}
    >
      {children || <Shuffle className="pcp-random__icon" />}
      {label && <span className="pcp-random__label">{label}</span>}
    </Button>
  );
} 