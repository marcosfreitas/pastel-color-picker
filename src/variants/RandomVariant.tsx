'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { Shuffle } from 'lucide-react';
import { cn } from '../utils/cn';
import { ColorValue } from '../types';

interface RandomVariantProps {
  localColor: ColorValue;
  handleRandomColor: () => void;
  isPastel: boolean;
  label?: string;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  className?: string;
}

export function RandomVariant({
  localColor,
  handleRandomColor,
  isPastel,
  label,
  size,
  disabled,
  className
}: RandomVariantProps) {
  const borderColor = localColor.hexa || '#000000';
  
  return (
    <Button
      type="button"
      className={cn(
        'color-picker-random relative',
        `color-picker-random--${size}`,
        disabled && 'color-picker-random--disabled',
        className
      )}
      variant="outline"
      size={size === 'md' ? 'default' : size}
      disabled={disabled}
      onClick={handleRandomColor}
      style={{
        borderBottom: `4px solid ${borderColor}`
      }}
      aria-label={`Generate random ${isPastel ? 'pastel' : 'vibrant'} color`}
    >
      <Shuffle className="w-4 h-4" />
      {label && <span className="ml-2">{label}</span>}
    </Button>
  );
} 