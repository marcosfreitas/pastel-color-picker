'use client';

import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Shuffle } from 'lucide-react';
import { ColorValue, ColorPickerDialogProps } from '../types';
import { hexToColorValue, hsvToRgb, rgbToHex } from '../utils/colorUtils';
import { ColorArea } from './ColorArea';
import { ColorBar } from './ColorBar';


export function ColorPickerDialog({
  title,
  defaultColor,
  presets,
  colorMode,
  showColorArea,
  showPresets,
  hideSliders,
  showHue,
  showSaturation,
  showLightness,
  showAlpha,
  showRandomButton,
  onPresetClick,
  onColorChange,
  onHueChange,
  onSaturationChange,
  onLightnessChange,
  onAlphaChange
}: ColorPickerDialogProps) {
  // Track which control is currently being dragged
  const [dragStates, setDragStates] = useState({
    colorBar: false,
    colorArea: false,
    hue: false,
    saturation: false,
    lightness: false,
    alpha: false
  });

  if (!defaultColor || !presets) {
    console.error('defaultColor and presets are required. Are you using the ColorPickerDialog directly instead of the ColorPicker component?');
    return null;
  }

  const handleColorAreaChange = (saturation: number, value: number, random: boolean = false) => {
    // Only update if individual sliders are not being dragged
    if (!dragStates.hue && !dragStates.saturation && !dragStates.lightness && !dragStates.alpha) {
      const [r, g, b] = hsvToRgb(defaultColor.hsva.h, saturation, value);
      const hex = rgbToHex(r, g, b);
      const newColor: ColorValue = {
        hexa: hex,
        rgba: { r, g, b, a: defaultColor.rgba.a },
        hsva: { ...defaultColor.hsva, s: saturation, v: value }
      };
      onColorChange(newColor, random);
    }
  };

  // Enhanced slider handlers with drag state tracking
  const createSliderHandler = (sliderType: keyof typeof dragStates, originalHandler?: (values: number[]) => void) => {
    return {
      onValueChange: (values: number[]) => {
        // Always call the original handler for immediate updates
        originalHandler?.(values);
      },
      onValueCommit: (_values: number[]) => {
        // Mark slider as not dragging when commit happens
        setDragStates(prev => ({ ...prev, [sliderType]: false }));
      },
      // We'll handle drag start via onPointerDown since Slider doesn't have onDragStart
      onPointerDown: () => {
        setDragStates(prev => ({ ...prev, [sliderType]: true }));
      }
    };
  };

  const hueSliderHandlers = createSliderHandler('hue', onHueChange);
  const saturationSliderHandlers = createSliderHandler('saturation', onSaturationChange);
  const lightnessSliderHandlers = createSliderHandler('lightness', onLightnessChange);
  const alphaSliderHandlers = createSliderHandler('alpha', onAlphaChange);

  // Comprehensive preset handler that triggers all necessary callbacks
  const handlePresetClick = (preset: string) => {
    const colorValue = hexToColorValue(preset, defaultColor.rgba.a);
    
    // Trigger all individual slider callbacks to ensure parent component updates
    onHueChange?.([colorValue.hsva.h]);
    onSaturationChange?.([colorValue.hsva.s]);
    onLightnessChange?.([colorValue.hsva.v]);
    onAlphaChange?.([Math.round(colorValue.rgba.a * 100)]);
    
    // Trigger the main color change callback
    onColorChange(colorValue);
    
    // Trigger the preset click callback
    onPresetClick?.(colorValue);
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
    <DialogContent className="pcp-dialog__content" aria-describedby="color-picker-dialog-description">
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
              onDragStart={() => setDragStates(prev => ({ ...prev, colorArea: true }))}
              onDragEnd={() => setDragStates(prev => ({ ...prev, colorArea: false }))}
            />
          ) : (
            <ColorBar 
              hue={defaultColor.hsva.h} 
              saturation={defaultColor.hsva.s} 
              lightness={defaultColor.hsva.v}
              alpha={defaultColor.rgba.a}
              onChange={handleColorAreaChange}
              onDragStart={() => setDragStates(prev => ({ ...prev, colorBar: true }))}
              onDragEnd={() => setDragStates(prev => ({ ...prev, colorBar: false }))}
            />
          )}
        </div>

        {/* Color Controls */}
        {(!hideSliders) && (
          <div className="pcp-color-picker__sliders">
            {showHue && (
              <div className="pcp-color-picker__slider-group">
                <span className="pcp-color-picker__label">Hue</span>
                <div className="pcp-slider pcp-slider--hue">
                  <Slider
                    value={[defaultColor.hsva.h]}
                    onValueChange={hueSliderHandlers.onValueChange}
                    onValueCommit={hueSliderHandlers.onValueCommit}
                    onPointerDown={hueSliderHandlers.onPointerDown}
                    max={360}
                    step={1}
                    className="pcp-slider__track"
                  />
                </div>
              </div>
            )}

            {showSaturation && (
              <div className="pcp-color-picker__slider-group">
                <span className="pcp-color-picker__label">Saturation</span>
                <div className="pcp-slider pcp-slider--saturation">
                  <Slider
                    value={[defaultColor.hsva.s]}
                    onValueChange={saturationSliderHandlers.onValueChange}
                    onValueCommit={saturationSliderHandlers.onValueCommit}
                    onPointerDown={saturationSliderHandlers.onPointerDown}
                    max={100}
                    step={1}
                    className="pcp-slider__track"
                    style={{
                      '--pcp-current-hue': defaultColor.hsva.h.toString()
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            )}

            {showLightness && (
              <div className="pcp-color-picker__slider-group">
                <span className="pcp-color-picker__label">Lightness</span>
                <div className="pcp-slider pcp-slider--lightness">
                  <Slider
                    value={[defaultColor.hsva.v]}
                    onValueChange={lightnessSliderHandlers.onValueChange}
                    onValueCommit={lightnessSliderHandlers.onValueCommit}
                    onPointerDown={lightnessSliderHandlers.onPointerDown}
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
                    onValueChange={alphaSliderHandlers.onValueChange}
                    onValueCommit={alphaSliderHandlers.onValueCommit}
                    onPointerDown={alphaSliderHandlers.onPointerDown}
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

        {showRandomButton && (
          <>
            <div className="pcp-color-picker__separator"></div>
            <div className="pcp-color-picker__actions pcp-random">
              <Button
                type="button"
                variant="outline"
                onClick={() => onColorChange(defaultColor, true)}
              >
                <Shuffle className="pcp-random__icon" />
                Random {colorMode === 'pastel' ? 'Pastel' : 'Color'}
              </Button>
            </div>
          </>
        )}

        {/* Preset Colors */}
        {showPresets && presets.length > 0 && (
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
                    onClick={() => handlePresetClick(preset)}
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