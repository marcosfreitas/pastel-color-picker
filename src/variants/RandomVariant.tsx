'use client';

import React, { ReactNode } from 'react';
import { Button } from '../components/ui/button';
import { cn } from '../utils/cn';
import { ColorPickerDialogProps, ColorPickerVariantProps } from '../types';
import { Shuffle } from 'lucide-react';

interface RandomVariantProps extends ColorPickerDialogProps, Omit<ColorPickerVariantProps, 'variant'> {
  // No additional variant-specific properties needed
}

export function RandomVariant({
  // ColorPickerDialogProps
  title,
  defaultColor,
  presets,
  colorMode,
  showColorArea,
  hideSliders,
  showPresets,
  showHue,
  showSaturation,
  showLightness,
  showAlpha,
  showRandomButton,
  onColorChange,
  onPresetClick,
  onRandomColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onAlphaChange,
  
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
      onClick={onRandomColor}
      style={{
        borderBottom: `4px solid ${borderColor}`
      }}
      aria-label={`Generate random ${colorMode === 'pastel' ? 'pastel' : 'vibrant'} color`}
    >
      {children || <Shuffle />}
      {label && <span className="pcp-random__label">{label}</span>}
    </Button>
  );
} 