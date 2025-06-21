'use client';

import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Shuffle } from 'lucide-react';
import { ColorValue } from '../types';
import { hexToColorValue, hsvToRgb, rgbToHex } from '../utils/colorUtils';
import { ColorArea } from './ColorArea';
import { ColorBar } from './ColorBar';

interface ColorPickerDialogProps {
  color: ColorValue;
  onChange: (color: ColorValue) => void;
  presets: string[];
  showAlpha: boolean;
  isPastel: boolean;
  showColorArea?: boolean;
  hideSliders?: boolean;
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
  hideSliders = false,
  onRandomColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onAlphaChange
}: ColorPickerDialogProps) {
  const handleColorAreaChange = (saturation: number, value: number) => {
    const [r, g, b] = hsvToRgb(color.hsva.h, saturation, value);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: color.rgba.a },
      hsva: { ...color.hsva, s: saturation, v: value }
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
              alpha={color.rgba.a}
              onChange={handleColorAreaChange}
            />
          ) : (
            <ColorBar 
              hue={color.hsva.h} 
              saturation={color.hsva.s} 
              lightness={color.hsva.v}
              alpha={color.rgba.a}
              onChange={handleColorAreaChange}
            />
          )}
        </div>

        {/* Color Controls */}
        {(!hideSliders || showAlpha) && (
          <div className="space-y-4">
            {!hideSliders && (
              <>
                <div className="space-y-2">
                  <Label>Hue</Label>
                  <div className="relative">
                    <Slider
                      value={[color.hsva.h]}
                      onValueChange={onHueChange}
                      max={360}
                      step={1}
                      className="w-full"
                      spectrum={{
                        trackClassName: '!bg-transparent'
                      }}
                    />
                    <div className="absolute inset-0 -z-10 pcp-slider--hue" />
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
                      className="absolute inset-0 -z-10 pcp-slider--saturation"
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
                      className="absolute inset-0 -z-10 pcp-slider--lightness"
                      style={{
                        '--current-hue': `hsl(${color.hsva.h}, 100%, 50%)`
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              </>
            )}

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
                    className="absolute inset-0 -z-10 pcp-slider--alpha"
                    style={{
                      '--current-color': `rgb(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b})`,
                      '--current-alpha': color.rgba.a.toString()
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            )}
          </div>
        )}

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
                    className="w-8 h-8 rounded border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
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