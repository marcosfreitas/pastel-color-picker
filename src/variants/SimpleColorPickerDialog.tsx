'use client';

import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { ColorValue, ColorPickerDialogProps } from '../types';
import { hslToRgb, hsvToRgb, rgbToHex } from '../utils/colorUtils';
import { ColorBar } from './ColorBar';

interface SimpleColorPickerDialogProps extends ColorPickerDialogProps {
  // Legacy props for backward compatibility
  color?: ColorValue;
  onChange?: (color: ColorValue) => void;
  isPastel?: boolean;
}

export function SimpleColorPickerDialog({
  // ColorPickerDialogProps
  title = 'Choose Color',
  defaultColor,
  presets = [],
  colorMode,
  showColorArea,
  hideSliders = false,
  showPresets,
  showHue,
  showSaturation,
  showLightness,
  showAlpha = false,
  showRandomButton,
  onColorChange,
  onPresetClick,
  onRandomColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onAlphaChange,
  
  // Legacy props for backward compatibility
  color,
  onChange,
  isPastel
}: SimpleColorPickerDialogProps) {
  // Use unified props with fallback to legacy props
  const currentColor = defaultColor || color;
  const handleColorChange = onColorChange || onChange;
  const handleAlphaChange = onAlphaChange;
  
  if (!currentColor || !handleColorChange) {
    return null;
  }

  return (
    <DialogContent className="pcp-sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      
      <div className="pcp-space-y-6">
        {/* Current Color Preview */}
        <div className="pcp-flex pcp-items-center pcp-gap-4">
          <div
            className="pcp-w-16 pcp-h-16 pcp-rounded-lg pcp-border pcp-shadow-inner"
            style={{
              backgroundColor: `rgba(${currentColor.rgba.r}, ${currentColor.rgba.g}, ${currentColor.rgba.b}, ${currentColor.rgba.a})`
            }}
          />
          <div className="pcp-space-y-1">
            <Badge variant="secondary" className="pcp-font-mono pcp-text-xs">
              {currentColor.hexa}
            </Badge>
            <div className="pcp-text-sm pcp-text-muted-foreground">
              RGB({currentColor.rgba.r}, {currentColor.rgba.g}, {currentColor.rgba.b})
              {showAlpha && `, A: ${Math.round(currentColor.rgba.a * 100)}%`}
            </div>
          </div>
        </div>

        {/* Color Reference Bar */}
        <div className="pcp-space-y-2">
          <span className="pcp-label">Color</span>
          <ColorBar 
            hue={currentColor.hsva.h} 
            saturation={currentColor.hsva.s} 
            lightness={currentColor.hsva.v}
            alpha={currentColor.rgba.a}
            onChange={(saturation, value) => {
              const [r, g, b] = hsvToRgb(currentColor.hsva.h, saturation, value);
              const hex = rgbToHex(r, g, b);
              const newColor: ColorValue = {
                hexa: hex,
                rgba: { r, g, b, a: currentColor.rgba.a },
                hsva: { ...currentColor.hsva, s: saturation, v: value }
              };
              handleColorChange(newColor);
            }}
          />
        </div>

        {/* Color Controls */}
        {(!hideSliders || showAlpha) && (
          <div className="pcp-space-y-4">
            {/* Hue Control Only */}
            {!hideSliders && (
              <div className="pcp-space-y-2">
                <span className="pcp-label">Hue</span>
                <div className="pcp-relative">
                  <Slider
                    value={[currentColor.hsva.h]}
                    onValueChange={(value) => {
                      const hue = value[0];
                      // Preserve current saturation and lightness, only change hue
                      const saturation = currentColor.hsva.s;
                      const lightness = currentColor.hsva.v;
                      const [r, g, b] = hslToRgb(hue, saturation, lightness);
                      const hex = rgbToHex(r, g, b);
                      const newColor: ColorValue = {
                        hexa: hex,
                        rgba: { r, g, b, a: currentColor.rgba.a },
                        hsva: { h: hue, s: saturation, v: lightness, a: currentColor.rgba.a }
                      };
                      handleColorChange(newColor);
                    }}
                    max={360}
                    step={1}
                    className="pcp-w-full"
                    spectrum={{
                      trackClassName: '!pcp-bg-transparent'
                    }}
                  />
                  <div className="pcp-absolute pcp-inset-0 pcp--z-10 pcp-slider--hue" />
                </div>
              </div>
            )}

            {/* Alpha Control */}
            {showAlpha && handleAlphaChange && (
              <div className="pcp-space-y-2">
                <span className="pcp-label">Opacity</span>
                <div className="pcp-relative">
                  <Slider
                    value={[Math.round(currentColor.rgba.a * 100)]}
                    onValueChange={handleAlphaChange}
                    max={100}
                    step={1}
                    className="pcp-w-full"
                    spectrum={{
                      trackClassName: '!pcp-bg-transparent'
                    }}
                  />
                  <div 
                    className="pcp-absolute pcp-inset-0 pcp--z-10 pcp-slider--alpha"
                    style={{
                      '--pcp-current-color': `rgb(${currentColor.rgba.r}, ${currentColor.rgba.g}, ${currentColor.rgba.b})`,
                      '--pcp-current-alpha': currentColor.rgba.a.toString()
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DialogContent>
  );
} 