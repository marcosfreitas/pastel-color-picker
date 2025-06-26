'use client';

import { Dialog, DialogTrigger } from '../components/ui/dialog';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '../utils/cn';
import { ColorPickerDialogProps, ColorPickerVariantProps } from '../types';
import { ColorPickerDialog } from './ColorPickerDialog';
import { hexToColorValue } from '../utils/colorUtils';
import { Button } from '../components/ui/button';

interface CirclesVariantProps extends ColorPickerDialogProps, Omit<ColorPickerVariantProps, 'variant'> {
  // Variant-specific properties not from ColorPickerDialogProps or ColorPickerVariantProps
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function CirclesVariant({
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
  label: _label,
  className,
  children: _children,
  
  // Variant-specific props
  isOpen,
  setIsOpen
}: CirclesVariantProps) {
  if (!defaultColor || !presets) {
    console.error('defaultColor and presets properties are required.');
    return null;
  }

  const containerClasses = cn(
    'pcp-circles',
    `pcp-circles--size-${size}`,
    disabled && 'pcp-circles--disabled',
    className
  );

  // Create display presets and determine selection logic
  const getDisplayPresetsAndSelection = () => {
    const firstThreePresets = presets.slice(0, 3);
    const normalizeColor = (colorStr: string | undefined) => {
      if (!colorStr) return '';
      return colorStr.replace('#', '').toLowerCase();
    };
    const selectedColorNormalized = normalizeColor(defaultColor.hexa);
    
    // Check if selected color matches any of the first 3 presets
    const matchingPresetIndex = firstThreePresets.findIndex(preset => 
      normalizeColor(preset) === selectedColorNormalized
    );
    
    let displayPresets;
    let selectedIndex;
    
    if (matchingPresetIndex !== -1) {
      // Selected color is one of the first 3 presets
      displayPresets = [...firstThreePresets, presets[3] || firstThreePresets[0]];
      selectedIndex = matchingPresetIndex;
    } else {
      // Selected color is not in first 3, put it in 4th position
      displayPresets = [...firstThreePresets, defaultColor.hexa || '#000000'];
      selectedIndex = 3;
    }
    
    return { displayPresets, selectedIndex };
  };

  const { displayPresets, selectedIndex } = getDisplayPresetsAndSelection();

  return (
    <div className={containerClasses}>
      {displayPresets.map((color, index) => {
        const isSelected = index === selectedIndex;

        const circleClasses = cn(
          'pcp-circles__circle',
          isSelected && 'pcp-circles__circle--selected',
          disabled && 'pcp-circles__circle--disabled'
        );
        
        return (
          <Button
            key={index}
            type="button"
            disabled={disabled}
            className={circleClasses}
            style={{ backgroundColor: color }}
            onClick={() => {
              if (onPresetClick) {
                const colorValue = hexToColorValue(color, defaultColor.rgba.a);
                onPresetClick(colorValue);
              }
            }}
            aria-label={`Select color ${color}`}
          />
        );
      })}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            disabled={disabled}
            className={cn(
              'pcp-circles__more-button',
              disabled && 'pcp-circles__more-button--disabled'
            )}
            aria-label="Open color picker dialog"
          >
            <MoreHorizontal />
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
    </div>
  );
} 