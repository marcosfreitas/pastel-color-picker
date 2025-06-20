'use client';

import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { ColorValue } from '../types';
import { hslToRgb, hsvToRgb, rgbToHex } from '../utils/colorUtils';
import { ColorBar } from './ColorBar';

interface SimpleColorPickerDialogProps {
  color: ColorValue;
  onChange: (color: ColorValue) => void;
  isPastel: boolean;
  hideSliders?: boolean;
  showAlpha: boolean;
  onAlphaChange: (alpha: number[]) => void;
}

export function SimpleColorPickerDialog({
  color,
  onChange,
  isPastel: _isPastel,
  hideSliders = false,
  showAlpha,
  onAlphaChange
}: SimpleColorPickerDialogProps) {
  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Choose Color</DialogTitle>
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

        {/* Color Reference Bar */}
        <div className="space-y-2">
          <Label>Color</Label>
          <ColorBar 
            hue={color.hsva.h} 
            saturation={color.hsva.s} 
            lightness={color.hsva.v}
            alpha={color.rgba.a}
            onChange={(saturation, value) => {
              const [r, g, b] = hsvToRgb(color.hsva.h, saturation, value);
              const hex = rgbToHex(r, g, b);
              const newColor: ColorValue = {
                hexa: hex,
                rgba: { r, g, b, a: color.rgba.a },
                hsva: { ...color.hsva, s: saturation, v: value }
              };
              onChange(newColor);
            }}
          />
        </div>

        {/* Color Controls */}
        {(!hideSliders || showAlpha) && (
          <div className="space-y-4">
            {/* Hue Control Only */}
            {!hideSliders && (
              <div className="space-y-2">
                <Label>Hue</Label>
                <div className="relative">
                  <Slider
                    value={[color.hsva.h]}
                    onValueChange={(value) => {
                      const hue = value[0];
                      // Preserve current saturation and lightness, only change hue
                      const saturation = color.hsva.s;
                      const lightness = color.hsva.v;
                      const [r, g, b] = hslToRgb(hue, saturation, lightness);
                      const hex = rgbToHex(r, g, b);
                      const newColor: ColorValue = {
                        hexa: hex,
                        rgba: { r, g, b, a: color.rgba.a },
                        hsva: { h: hue, s: saturation, v: lightness, a: color.rgba.a }
                      };
                      onChange(newColor);
                    }}
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
            )}

            {/* Alpha Control */}
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
      </div>
    </DialogContent>
  );
} 