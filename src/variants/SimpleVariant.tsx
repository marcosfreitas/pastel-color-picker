'use client';

import React from 'react';
import { Dialog, DialogTrigger } from '../components/ui/dialog';
import { Palette } from 'lucide-react';
import { cn } from '../utils/cn';
import { ColorValue } from '../types';
import { SimpleColorPickerDialog } from './SimpleColorPickerDialog';

interface SimpleVariantProps {
  localColor: ColorValue;
  handleColorChange: (color: ColorValue) => void;
  isPastel: boolean;
  showIcon: boolean;
  label?: string;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  className?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function SimpleVariant({
  localColor,
  handleColorChange,
  isPastel,
  showIcon,
  label,
  size,
  disabled,
  className,
  isOpen,
  setIsOpen
}: SimpleVariantProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const currentColorStyle = {
    backgroundColor: `rgba(${localColor.rgba.r}, ${localColor.rgba.g}, ${localColor.rgba.b}, ${localColor.rgba.a})`
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'color-picker-simple color-picker-button',
            'rounded-lg border-2 border-gray-200 hover:border-gray-300',
            'transition-all duration-200 flex items-center justify-center gap-2',
            'hover:scale-105 outline-none',
            `color-picker-simple--${size}`,
            label ? 'px-3 py-2 min-w-fit' : sizeClasses[size],
            disabled && 'opacity-50 cursor-not-allowed hover:scale-100 color-picker-simple--disabled',
            className
          )}
          style={label ? undefined : currentColorStyle}
          aria-label={`Simple color picker, current color: ${localColor.hexa}`}
        >
          {showIcon && <Palette className="w-4 h-4" />}
          {label && <span>{label}</span>}
        </button>
      </DialogTrigger>
      <SimpleColorPickerDialog
        color={localColor}
        onChange={handleColorChange}
        isPastel={isPastel}
      />
    </Dialog>
  );
} 