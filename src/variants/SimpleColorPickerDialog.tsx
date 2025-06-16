'use client';

import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { cn } from '../utils/cn';
import { ColorValue } from '../types';
import { hslToRgb, rgbToHex } from '../utils/colorUtils';
import { ColorBar } from './ColorBar';
import styles from '../ColorPicker.module.css';

interface SimpleColorPickerDialogProps {
  color: ColorValue;
  onChange: (color: ColorValue) => void;
  isPastel: boolean;
}

export function SimpleColorPickerDialog({
  color,
  onChange,
  isPastel // eslint-disable-line @typescript-eslint/no-unused-vars
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
          />
        </div>

        {/* Hue Control Only */}
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
            />
            <div className={cn("absolute inset-0 -z-10", styles.hueSlider)} />
          </div>
        </div>
      </div>
    </DialogContent>
  );
} 