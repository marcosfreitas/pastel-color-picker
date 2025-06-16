'use client';

import React from 'react';
import { Dialog, DialogTrigger } from '../components/ui/dialog';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '../utils/cn';
import { ColorValue } from '../types';
import { ColorPickerDialog } from './ColorPickerDialog';

interface CirclesVariantProps {
  localColor: ColorValue;
  handleColorChange: (color: ColorValue) => void;
  handlePresetSelect: (hex: string) => void;
  showPresets: boolean;
  presets: string[];
  showAlpha: boolean;
  showColorArea: boolean;
  isPastel: boolean;
  onRandomColor: () => void;
  onHueChange: (hue: number[]) => void;
  onSaturationChange: (saturation: number[]) => void;
  onLightnessChange: (lightness: number[]) => void;
  onAlphaChange: (alpha: number[]) => void;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  className?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function CirclesVariant({
  localColor,
  handleColorChange,
  handlePresetSelect,
  showPresets,
  presets,
  showAlpha,
  showColorArea,
  isPastel,
  onRandomColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onAlphaChange,
  size,
  disabled,
  className,
  isOpen,
  setIsOpen
}: CirclesVariantProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn(
      'color-picker-circles flex items-center gap-2',
      `color-picker-circles--${size}`,
      disabled && 'color-picker-circles--disabled',
      className
    )}>
      {presets.slice(0, 4).map((color, index) => {
        const isSelected = localColor.hexa.toLowerCase() === color.toLowerCase();
        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            className={cn(
              'color-picker-circle rounded-full border-2 transition-all duration-200',
              'hover:scale-110 outline-none',
              sizeClasses[size],
              isSelected 
                ? 'border-black shadow-md scale-105' 
                : 'border-transparent hover:border-gray-300',
              disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
            )}
            style={{ backgroundColor: color }}
            onClick={() => handlePresetSelect(color)}
            aria-label={`Select color ${color}`}
          />
        );
      })}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'color-picker-more-button rounded-full border-2 border-dashed transition-all duration-200',
              'border-gray-300 hover:border-gray-400 hover:scale-110',
              'flex items-center justify-center bg-gray-50 hover:bg-gray-100',
              'outline-none',
              sizeClasses[size],
              disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
            )}
            aria-label="Open color picker dialog"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </DialogTrigger>
        <ColorPickerDialog
          color={localColor}
          onChange={handleColorChange}
          presets={showPresets ? presets : []}
          showAlpha={showAlpha}
          showColorArea={showColorArea}
          isPastel={isPastel}
          onRandomColor={onRandomColor}
          onHueChange={onHueChange}
          onSaturationChange={onSaturationChange}
          onLightnessChange={onLightnessChange}
          onAlphaChange={onAlphaChange}
        />
      </Dialog>
    </div>
  );
} 