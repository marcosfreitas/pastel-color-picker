'use client';


import { Dialog, DialogTrigger } from '../components/ui/dialog';
import { cn } from '../utils/cn';
import { ColorPickerDialogProps, ColorPickerVariantProps } from '../types';
import { ColorPickerDialog } from './ColorPickerDialog';
import { Button } from '../components/ui/button';

interface ButtonVariantProps extends ColorPickerDialogProps, Omit<ColorPickerVariantProps, 'variant'> {
  // Variant-specific properties not from ColorPickerDialogProps or ColorPickerVariantProps
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function ButtonVariant({
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
}: ButtonVariantProps) {
  if (!defaultColor || !presets) {
    console.error('defaultColor and presets properties are required.');
    return null;
  }

  const currentColorStyle = {
    backgroundColor: `rgba(${defaultColor.rgba.r}, ${defaultColor.rgba.g}, ${defaultColor.rgba.b}, ${defaultColor.rgba.a})`
  };

  const buttonClasses = cn(
    'pcp-button pcp-button--color-picker',
    `pcp-button--size-${size}`,
    (label || children) && 'pcp-button__content',
    disabled && 'pcp-button--disabled',
    className
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={buttonClasses}
          style={(label || children) ? undefined : currentColorStyle}
          aria-label={`Color picker, current color: ${defaultColor.hexa}`}
        >
          {children && <span className="pcp-button__content">{children}</span>}
          {label && <span className="pcp-button__content">{label}</span>}
        </Button>
      </DialogTrigger>
      <ColorPickerDialog
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
        onHueChange={onHueChange}
        onSaturationChange={onSaturationChange}
        onLightnessChange={onLightnessChange}
        onAlphaChange={onAlphaChange}
      />
    </Dialog>
  );
} 