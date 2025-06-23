'use client';

import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Shuffle } from 'lucide-react';
import { ColorMode, ColorValue } from '../types';
import { hexToColorValue, hsvToRgb, rgbToHex } from '../utils/colorUtils';
import { ColorArea } from './ColorArea';
import { ColorBar } from './ColorBar';
import { ColorPickerDialogProps } from '../types';

const defaultColorValue: ColorValue = {
  hexa: '#000000',
  rgba: { r: 0, g: 0, b: 0, a: 1 },
  hsva: { h: 0, s: 0, v: 0, a: 1 }
};

export function ColorPickerDialog({
  title = 'Color Picker',
  defaultColor = defaultColorValue,
  onColorChange,
  presets,
  showAlpha,
  colorMode = ColorMode.PASTEL,
  showColorArea = false,
  showPresets = true,
  showHue = true,
  showSaturation = true,
  showLightness = true,
  hideSliders = false,
  showRandomButton = true,
  onPresetClick,
  onRandomColor,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onAlphaChange
}: ColorPickerDialogProps) {
  const handleColorAreaChange = (saturation: number, value: number) => {
    const [r, g, b] = hsvToRgb(defaultColor.hsva.h, saturation, value);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: defaultColor.rgba.a },
      hsva: { ...defaultColor.hsva, s: saturation, v: value }
    };
    onColorChange(newColor);
  };

  // Create the gradient with alpha
  const gradientWithAlpha = `linear-gradient(
    to right,
    rgba(255, 255, 255, ${defaultColor.rgba.a}),
    hsla(${defaultColor.hsva.h}, 100%, 50%, ${defaultColor.rgba.a}),
    rgba(0, 0, 0, ${defaultColor.rgba.a})
  )`;

  // Checkered pattern for transparency - always present
  const checkerPattern = `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checkerboard' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect x='0' y='0' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='0' y='10' width='10' height='10' fill='%23e0e0e0'/%3e%3crect x='10' y='0' width='10' height='10' fill='%23e0e0e0'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23checkerboard)'/%3e%3c/svg%3e")`;

  return (
    <DialogContent className="pcp-dialog__content">
      <DialogHeader className="pcp-dialog__header">
        <DialogTitle className="pcp-dialog__title">{title}</DialogTitle>
      </DialogHeader>
      
      <div className="pcp-color-picker__controls">
        {/* Current Color Preview */}
        <div className="pcp-color-picker__preview-container">
          <div
            className="pcp-color-picker__preview"
            style={{
              backgroundColor: `rgba(${defaultColor.rgba.r}, ${defaultColor.rgba.g}, ${defaultColor.rgba.b}, ${defaultColor.rgba.a})`,
              width: '4rem',
              height: '4rem'
            }}
          />
          <div className="pcp-color-picker__info">
            <div className="pcp-color-picker__badge">
              {defaultColor.hexa}
            </div>
            <div className="pcp-color-picker__value">
              RGB({defaultColor.rgba.r}, {defaultColor.rgba.g}, {defaultColor.rgba.b})
              {showAlpha && `, A: ${Math.round(defaultColor.rgba.a * 100)}%`}
            </div>
          </div>
        </div>

        {/* Color Reference */}
        <div className="pcp-color-picker__slider-group">
          <span className="pcp-color-picker__label">Color</span>
          {showColorArea ? (
            <ColorArea
              hue={defaultColor.hsva.h}
              saturation={defaultColor.hsva.s}
              lightness={defaultColor.hsva.v}
              alpha={defaultColor.rgba.a}
              onChange={handleColorAreaChange}
            />
          ) : (
            <ColorBar 
              hue={defaultColor.hsva.h} 
              saturation={defaultColor.hsva.s} 
              lightness={defaultColor.hsva.v}
              alpha={defaultColor.rgba.a}
              onChange={handleColorAreaChange}
            />
          )}
        </div>

        {/* Color Controls */}
        {(!hideSliders) && (
          <div className="pcp-color-picker__sliders">
            {!hideSliders && (
              <>
                <div className="pcp-color-picker__slider-group">
                  <span className="pcp-color-picker__label">Hue</span>
                  <div className="pcp-slider pcp-slider--hue">
                    <Slider
                      value={[defaultColor.hsva.h]}
                      onValueChange={onHueChange}
                      max={360}
                      step={1}
                      className="pcp-slider__track"
                    />
                  </div>
                </div>

                <div className="pcp-color-picker__slider-group">
                  <span className="pcp-color-picker__label">Saturation</span>
                  <div className="pcp-slider pcp-slider--saturation">
                    <Slider
                      value={[defaultColor.hsva.s]}
                      onValueChange={onSaturationChange}
                      max={100}
                      step={1}
                      className="pcp-slider__track"
                      style={{
                        '--pcp-current-hue': defaultColor.hsva.h.toString()
                      } as React.CSSProperties}
                    />
                  </div>
                </div>

                <div className="pcp-color-picker__slider-group">
                  <span className="pcp-color-picker__label">Lightness</span>
                  <div className="pcp-slider pcp-slider--lightness">
                    <Slider
                      value={[defaultColor.hsva.v]}
                      onValueChange={onLightnessChange}
                      max={100}
                      step={1}
                      className="pcp-slider__track"
                      style={{
                        '--pcp-current-hue': defaultColor.hsva.h.toString(),
                        '--pcp-current-saturation': `${defaultColor.hsva.s}%`
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              </>
            )}

            {showAlpha && (
              <div className="pcp-color-picker__slider-group">
                <span className="pcp-color-picker__label">Opacity</span>
                <div className="pcp-slider pcp-slider--alpha"
                  style={{
                    background: `${gradientWithAlpha}, ${checkerPattern}`
                  }}
                >
                  <Slider
                    value={[Math.round(defaultColor.rgba.a * 100)]}
                    onValueChange={onAlphaChange}
                    max={100}
                    step={1}
                    className="pcp-slider__track"
                    style={{
                      '--pcp-current-color': `rgb(${defaultColor.rgba.r}, ${defaultColor.rgba.g}, ${defaultColor.rgba.b})`,
                      '--pcp-current-alpha': defaultColor.rgba.a.toString()
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pcp-color-picker__separator"></div>

        {/* Actions */}
        <div className="pcp-color-picker__actions">
          <Button
            type="button"
            variant="outline"
            onClick={onRandomColor}
          >
            <Shuffle />
            Random {colorMode === 'pastel' ? 'Pastel' : 'Color'}
          </Button>
        </div>

        {/* Preset Colors */}
        {presets.length > 0 && (
          <>
            <div className="pcp-color-picker__separator"></div>
            <div className="pcp-color-picker__slider-group">
              <span className="pcp-color-picker__label">Preset Colors</span>
              <div className="pcp-color-picker__presets">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    className="pcp-color-picker__preset"
                    style={{ backgroundColor: preset }}
                    onClick={() => {
                      const colorValue = hexToColorValue(preset, defaultColor.rgba.a);
                      onColorChange(colorValue);
                    }}
                    aria-label={`Select preset color ${preset}`}
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