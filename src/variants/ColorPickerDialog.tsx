'use client';

import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Shuffle } from 'lucide-react';
import { cn } from '../utils/cn';
import { ColorValue } from '../types';
import { hexToColorValue, hslToRgb, rgbToHex } from '../utils/colorUtils';
import { ColorArea } from './ColorArea';
import { ColorBar } from './ColorBar';
import styles from '../ColorPicker.module.css';

interface ColorPickerDialogProps {
  color: ColorValue;
  onChange: (color: ColorValue) => void;
  presets: string[];
  showAlpha: boolean;
  isPastel: boolean;
  showColorArea?: boolean;
  onRandomColor: () => void;
  onHueChange: (hue: number[]) => void;
  onSaturationChange: (saturation: number[]) => void;
  onLightnessChange: (lightness: number[]) => void;
  onAlphaChange: (alpha: number[]) => void;
}

export function ColorPickerDialog({
  color,
  onChange,
  presets,
  showAlpha,
  isPastel,
  showColorArea = false,
  onRandomColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onAlphaChange
}: ColorPickerDialogProps) {
  const handleColorAreaChange = (saturation: number, lightness: number) => {
    const [r, g, b] = hslToRgb(color.hsva.h, saturation, lightness);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: color.rgba.a },
      hsva: { ...color.hsva, s: saturation, v: lightness }
    };
    onChange(newColor);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Color Picker</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Current Color Preview */}
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-lg border shadow-inner"
            style={{
              backgroundColor: `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`
            }}
          />
          <div className="space-y-1">
            <Badge variant="secondary" className="font-mono text-xs">
              {color.hexa}
            </Badge>
            <div className="text-sm text-muted-foreground">
              RGB({color.rgba.r}, {color.rgba.g}, {color.rgba.b})
              {showAlpha && `, A: ${Math.round(color.rgba.a * 100)}%`}
            </div>
          </div>
        </div>

        {/* Color Reference */}
        <div className="space-y-2">
          <Label>Color</Label>
          {showColorArea ? (
            <ColorArea
              hue={color.hsva.h}
              saturation={color.hsva.s}
              lightness={color.hsva.v}
              onChange={handleColorAreaChange}
            />
          ) : (
            <ColorBar 
              hue={color.hsva.h} 
              saturation={color.hsva.s} 
              lightness={color.hsva.v} 
            />
          )}
        </div>

        {/* Color Controls */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Hue</Label>
            <div className="relative">
              <Slider
                value={[color.hsva.h]}
                onValueChange={onHueChange}
                max={360}
                step={1}
                className="w-full"
              />
              <div className={cn("absolute inset-0 -z-10", styles.hueSlider)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Saturation</Label>
            <div className="relative">
              <Slider
                value={[color.hsva.s]}
                onValueChange={onSaturationChange}
                max={100}
                step={1}
                className="w-full"
              />
              <div 
                className={cn("absolute inset-0 -z-10", styles.saturationSlider)}
                style={{
                  '--current-hue': `hsl(${color.hsva.h}, 100%, 50%)`
                } as React.CSSProperties}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Lightness</Label>
            <div className="relative">
              <Slider
                value={[color.hsva.v]}
                onValueChange={onLightnessChange}
                max={100}
                step={1}
                className="w-full"
              />
              <div 
                className={cn("absolute inset-0 -z-10", styles.lightnessSlider)}
                style={{
                  '--current-hue': `hsl(${color.hsva.h}, 100%, 50%)`
                } as React.CSSProperties}
              />
            </div>
          </div>

          {showAlpha && (
            <div className="space-y-2">
              <Label>Opacity</Label>
              <div className="relative">
                <Slider
                  value={[Math.round(color.rgba.a * 100)]}
                  onValueChange={onAlphaChange}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div 
                  className={cn("absolute inset-0 -z-10", styles.alphaSlider)}
                  style={{
                    '--current-color': `rgb(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b})`
                  } as React.CSSProperties}
                />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={onRandomColor}
            className="flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Random {isPastel ? 'Pastel' : 'Color'}
          </Button>
        </div>

        {/* Preset Colors */}
        {presets.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label>Preset Colors</Label>
              <div className="grid grid-cols-8 gap-2">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-8 h-8 rounded border-2 border-transparent hover:border-gray-300 transition-colors"
                    style={{ backgroundColor: preset }}
                    onClick={() => {
                      const colorValue = hexToColorValue(preset, color.rgba.a);
                      onChange(colorValue);
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DialogContent>
  );
} 