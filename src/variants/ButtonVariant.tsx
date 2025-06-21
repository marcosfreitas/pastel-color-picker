'use client';

import { ReactNode } from 'react';
import { Dialog, DialogTrigger } from '../components/ui/dialog';
import { cn } from '../utils/cn';
import { ColorValue } from '../types';
import { ColorPickerDialog } from './ColorPickerDialog';

interface ButtonVariantProps {
  localColor: ColorValue;
  handleColorChange: (color: ColorValue) => void;
  showPresets: boolean;
  presets: string[];
  showAlpha: boolean;
  showColorArea: boolean;
  isPastel: boolean;
  hideSliders?: boolean;
  onRandomColor: () => void;
  onHueChange: (hue: number[]) => void;
  onSaturationChange: (saturation: number[]) => void;
  onLightnessChange: (lightness: number[]) => void;
  onAlphaChange: (alpha: number[]) => void;
  label?: string;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  className?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children?: ReactNode;
}

export function ButtonVariant({
  localColor,
  handleColorChange,
  showPresets,
  presets,
  showAlpha,
  showColorArea,
  isPastel,
  hideSliders,
  onRandomColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onAlphaChange,
  label,
  size,
  disabled,
  className,
  isOpen,
  setIsOpen,
  children
}: ButtonVariantProps) {
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
            'color-picker-button color-picker-default',
            'bg-background text-foreground',
            'rounded-lg border-2 border-gray-200 hover:border-gray-300',
            'transition-all duration-200 flex items-center justify-center gap-2',
            'hover:scale-105 outline-none',
            `color-picker-button--${size}`,
            (label || children) ? 'px-3 py-2 min-w-fit' : sizeClasses[size],
            disabled && 'opacity-50 cursor-not-allowed hover:scale-100 color-picker-button--disabled',
            className
          )}
          style={(label || children) ? undefined : currentColorStyle}
          aria-label={`Color picker, current color: ${localColor.hexa}`}
        >
          {children}
          {label && <span>{label}</span>}
        </button>
      </DialogTrigger>
      <ColorPickerDialog
        color={localColor}
        onChange={handleColorChange}
        presets={showPresets ? presets : []}
        showAlpha={showAlpha}
        showColorArea={showColorArea}
        isPastel={isPastel}
        hideSliders={hideSliders}
        onRandomColor={onRandomColor}
        onHueChange={onHueChange}
        onSaturationChange={onSaturationChange}
        onLightnessChange={onLightnessChange}
        onAlphaChange={onAlphaChange}
      />
    </Dialog>
  );
} 