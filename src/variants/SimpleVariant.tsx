'use client';

import { ReactNode } from 'react';
import { Dialog, DialogTrigger } from '../components/ui/dialog';
import { cn } from '../utils/cn';
import { ColorPickerDialogProps, ColorPickerVariantProps } from '../types';
import { SimpleColorPickerDialog } from './SimpleColorPickerDialog';

interface SimpleVariantProps extends ColorPickerDialogProps, Omit<ColorPickerVariantProps, 'variant'> {
  // Variant-specific properties not from ColorPickerDialogProps or ColorPickerVariantProps
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function SimpleVariant({
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
  children,
  
  // Variant-specific props
  isOpen,
  setIsOpen
}: SimpleVariantProps) {
  // Guard against undefined defaultColor
  if (!defaultColor) {
    return null;
  }

  const currentColorStyle = {
    backgroundColor: `rgba(${defaultColor.rgba.r}, ${defaultColor.rgba.g}, ${defaultColor.rgba.b}, ${defaultColor.rgba.a})`
  };

  const simpleClasses = cn(
    'pcp-simple',
    `pcp-simple--size-${size}`,
    disabled && 'pcp-simple--disabled',
    className
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={simpleClasses}
          style={(label || children) ? undefined : currentColorStyle}
          aria-label={`Simple color picker, current color: ${defaultColor.hexa}`}
        >
          {(label || children) ? (
            <div className="pcp-simple__content">
              {children}
              {label && <span>{label}</span>}
            </div>
          ) : null}
        </button>
      </DialogTrigger>
      <SimpleColorPickerDialog
        title={title}
        defaultColor={defaultColor}
        presets={presets}
        colorMode={colorMode}
        showColorArea={showColorArea}
        hideSliders={hideSliders}
        showPresets={showPresets}
        showHue={showHue}
        showSaturation={showSaturation}
        showLightness={showLightness}
        showAlpha={showAlpha}
        showRandomButton={showRandomButton}
        onColorChange={onColorChange}
        onPresetClick={onPresetClick}
        onRandomColor={onRandomColor}
        onHueChange={onHueChange}
        onSaturationChange={onSaturationChange}
        onLightnessChange={onLightnessChange}
        onAlphaChange={onAlphaChange}
      />
    </Dialog>
  );
} 