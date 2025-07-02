'use client';

import React, { useState, useCallback } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Shuffle } from 'lucide-react';
import { ColorValue, ColorPickerDialogProps, ColorModeEnum } from '../types';
import { hexToColorValue, hsvToRgb, rgbToHex } from '../utils/colorUtils';
import { ColorArea } from './ColorArea';
import { ColorBar } from './ColorBar';
import { constrainToColorMode, shouldApplyColorModeConstraints, COLOR_MODE_CONFIG } from '../utils/colorModeConfig';


export function ColorPickerDialog({
  title,
  defaultColor,
  presets,
  colorMode,
  showColorBar,
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
    colorArea: false,
    colorBar: false,
    hue: false,
    saturation: false,
    lightness: false,
    alpha: false
  });

  // Live region for screen reader announcements
  const [announcement, setAnnouncement] = useState('');

  // Utility function to get color name from hue
  const getColorName = useCallback((hue: number): string => {
    const colorNames = [
      { range: [0, 15], name: 'red' },
      { range: [15, 45], name: 'orange' },
      { range: [45, 75], name: 'yellow' },
      { range: [75, 105], name: 'yellow-green' },
      { range: [105, 135], name: 'green' },
      { range: [135, 165], name: 'blue-green' },
      { range: [165, 195], name: 'cyan' },
      { range: [195, 225], name: 'blue' },
      { range: [225, 255], name: 'purple' },
      { range: [255, 285], name: 'magenta' },
      { range: [285, 315], name: 'pink' },
      { range: [315, 345], name: 'red-pink' },
      { range: [345, 360], name: 'red' }
    ];
    
    const colorName = colorNames.find(color => 
      hue >= color.range[0] && hue < color.range[1]
    );
    
    return colorName ? colorName.name : 'unknown';
  }, []);

  // color announcement
  const announceColorChange = useCallback((color: ColorValue, context: string = '') => {
    const colorName = getColorName(color.hsva.h);
    const saturationLevel = color.hsva.s > 75 ? 'vibrant' : color.hsva.s > 25 ? 'moderate' : 'muted';
    const lightnessLevel = color.hsva.v > 75 ? 'light' : color.hsva.v > 25 ? 'medium' : 'dark';
    
    setAnnouncement(
      `${context} Color changed to ${saturationLevel} ${lightnessLevel} ${colorName}. ` +
      `Hex value ${color.hexa}. ` +
      `RGB ${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}${showAlpha ? `, Alpha ${Math.round(color.rgba.a * 100)}%` : ''}.`
    );
  }, [showAlpha, getColorName]);

  if (!defaultColor || !presets) {
    console.error('defaultColor and presets are required. Are you using the ColorPickerDialog directly instead of the ColorPicker component?');
    return null;
  }

  const handleHueChange = useCallback((hue: number[]) => {
    let newSaturation = defaultColor.hsva.s;
    let newValue = defaultColor.hsva.v;

    // Apply constraints if sliders are hidden and color mode is not NORMAL
    if (shouldApplyColorModeConstraints(colorMode, showSaturation, showLightness)) {
      const constrained = constrainToColorMode(newSaturation, newValue, colorMode);
      newSaturation = constrained.saturation;
      newValue = constrained.value;
    }

    const [r, g, b] = hsvToRgb(hue[0], newSaturation, newValue);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: defaultColor.rgba.a },
      hsva: { h: hue[0], s: newSaturation, v: newValue, a: defaultColor.hsva.a }
    };

    onColorChange(newColor);
    onHueChange?.(hue);
  }, [defaultColor, colorMode, showSaturation, showLightness, onColorChange, onHueChange]);

  const handleColorAreaChange = (saturation: number, value: number, random: boolean = false) => {
    // 🛡️ PROTECTION: Only update if NO individual sliders are being dragged
    //if (!dragStates.hue && !dragStates.saturation && !dragStates.lightness && !dragStates.alpha) {
      let finalSaturation = saturation;
      let finalValue = value;

      /**
       * constraints are only applied if the sliders are hidden
       * and the color mode is set
       */
      if (shouldApplyColorModeConstraints(colorMode, showSaturation, showLightness)) {
        console.log(':x: applying constraints');
        const constrained = constrainToColorMode(saturation, value, colorMode);
        finalSaturation = constrained.saturation;
        finalValue = constrained.value;
      } else {
        console.log(':check: no constraints applied');
      }

      const [r, g, b] = hsvToRgb(defaultColor.hsva.h, finalSaturation, finalValue);
      const hex = rgbToHex(r, g, b);
      const newColor: ColorValue = {
        hexa: hex,
        rgba: { r, g, b, a: defaultColor.rgba.a },
        hsva: { ...defaultColor.hsva, s: finalSaturation, v: finalValue }
      };
      onColorChange(newColor, random);
    //} else {
    //  console.log(':x: no color changing', dragStates);
    //}
  };

  // Enhanced slider handlers with drag state tracking
  const createSliderHandler = (sliderType: keyof typeof dragStates, originalHandler?: (values: number[]) => void) => {
    return {
      onValueChange: (values: number[]) => {
        // Always call the original handler for immediate updates
        originalHandler?.(values);
      },
      onValueCommit: () => {
        // Mark slider as not dragging when commit happens
        setDragStates(prev => ({ ...prev, [sliderType]: false }));
      },
      // We'll handle drag start via onPointerDown since Slider doesn't have onDragStart
      onPointerDown: () => {
        setDragStates(prev => ({ ...prev, [sliderType]: true }));
      }
    };
  };

  const createColorHandler = (sliderType: keyof typeof dragStates, originalHandler?: (saturation: number, value: number, random?: boolean) => void) => {
    return {
      onValueChange: (saturation: number, value: number) => {
        originalHandler?.(saturation, value, false);
      },
      onValueCommit: () => {
        setDragStates(prev => ({ ...prev, [sliderType]: false }));
      },
      onPointerDown: () => {
        setDragStates(prev => ({ ...prev, [sliderType]: true }));
      }
    };
  };

  const colorAreaHandlers = createColorHandler('colorArea', handleColorAreaChange);
  const colorBarHandlers = createColorHandler('colorBar', handleColorAreaChange);
  const hueSliderHandlers = createSliderHandler('hue', handleHueChange);
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
    rgba(0, 0, 0, ${defaultColor.rgba.a}),
    hsla(${defaultColor.hsva.h}, 100%, 50%, ${defaultColor.rgba.a}),
    rgba(0, 0, 0, ${defaultColor.rgba.a})
  )`;

  // Checkered pattern for transparency - always present
  const checkerPattern = `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checkerboard' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect x='0' y='0' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23f0f0f0'/%3e%3crect x='0' y='10' width='10' height='10' fill='%23e0e0e0'/%3e%3crect x='10' y='0' width='10' height='10' fill='%23e0e0e0'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23checkerboard)'/%3e%3c/svg%3e")`;

  return (
    <DialogContent 
      className="pcp-dialog__content pcp-dialog__content--responsive" 
      role="dialog"
      aria-modal="true"
    >
      {/* Screen reader instructions */}
      <DialogDescription className="pcp-sr-only">
        Interactive color picker with sliders for hue, saturation, lightness{showAlpha ? ', and transparency' : ''}. 
        Use arrow keys to navigate preset colors, or use sliders to create custom colors.
        {showColorArea ? ' Use the color area to select saturation and lightness by clicking and dragging, or use arrow keys when focused.' : ''}
        {showRandomButton ? ' Use the shuffle button to generate random colors.' : ''}
        Tip: Hold Shift while using arrow keys for larger increments on all controls.
      </DialogDescription>
      
      {/* Hidden instructions for color area keyboard navigation */}
      {showColorArea && (
        <div id="color-area-instructions" className="pcp-sr-only">
          Arrow keys: Navigate saturation and lightness. Home: White. End: Black. Page Up: Pure hue. Page Down: Black. Shift + arrows for larger steps.
        </div>
      )}
      
      <div aria-live="polite" aria-atomic="true" className="pcp-sr-only">
        {announcement}
      </div>

      {/* Fixed header section */}
      <div className="pcp-dialog__header-section">
        <DialogHeader className="pcp-dialog__header">
          <DialogTitle className="pcp-dialog__title">{title}</DialogTitle>
        </DialogHeader>
        
        {/* Current Color Preview - Fixed in header */}
        <div className="pcp-color-picker__preview-container">
          <div
            className="pcp-color-picker__preview"
            style={{
              backgroundImage: `${checkerPattern}`,
              width: '4rem',
              height: '4rem'
            }}
            >
            <div className="pcp-color-picker__preview-inner"
              style={{
                backgroundColor: `rgba(${defaultColor.rgba.r}, ${defaultColor.rgba.g}, ${defaultColor.rgba.b}, ${defaultColor.rgba.a})`,
              }}
            />
          </div>
          <div className="pcp-color-picker__info">
            <div className="pcp-color-picker__badge">
              {defaultColor.hexa}
            </div>
            <div className="pcp-color-picker__value">
              RGB({defaultColor.rgba.r}, {defaultColor.rgba.g}, {defaultColor.rgba.b})
              {showAlpha && `, A: ${Math.round(defaultColor.rgba.a * 100)}%`}
            </div>
            {/* @todo add copy to clipboard button */}
          </div>
        </div>
      </div>

             {/* Scrollable controls section */}
       <div className="pcp-color-picker__controls pcp-color-picker__controls--scrollable">

        {/* Color Reference */}
        {(showColorBar || showColorArea) && (
          <div className="pcp-color-picker__slider-group">
            <span className="pcp-color-picker__label">Color</span>

            {/* warns about color mode constraints and bad UX if showColorArea or showColorBar are true */}
            {(showColorArea || showColorBar) && (!showSaturation && !showLightness) && colorMode !== ColorModeEnum.NORMAL && (
              <div className="pcp-color-picker__warning">
                <p>
                  <strong>Warning:</strong> Color Area and Color bar are better used with Normal color mode.
                </p>
                <p>
                  Color mode constraints are applied for Pastel and Vivid colors when sliders are hidden, and provide a limited range for color selection. Disable the color area or color bar to not impact the user experience.
                </p>
              </div>
            )}


            {showColorArea && (
              <ColorArea
                hue={defaultColor.hsva.h}
                saturation={defaultColor.hsva.s}
                lightness={defaultColor.hsva.v}
                alpha={defaultColor.rgba.a}
                onChange={colorAreaHandlers.onValueChange}
                onDragStart={() => setDragStates(prev => ({ ...prev, colorArea: true }))}
                onDragEnd={() => setDragStates(prev => ({ ...prev, colorArea: false }))}
              />
            )}

            {!showColorArea && showColorBar && (
              <ColorBar 
                hue={defaultColor.hsva.h} 
                saturation={defaultColor.hsva.s} 
                lightness={defaultColor.hsva.v}
                alpha={defaultColor.rgba.a}
                onChange={colorBarHandlers.onValueChange}
                onDragStart={() => setDragStates(prev => ({ ...prev, colorBar: true }))}
                onDragEnd={() => setDragStates(prev => ({ ...prev, colorBar: false }))}
              />
            )}
          </div>
        )}

        {/* Color Controls */}
        {(!hideSliders) && (
          <div className="pcp-color-picker__sliders">
            {showHue && (
              <div className="pcp-color-picker__slider-group" role="group" aria-labelledby="hue-label">
                <span id="hue-label" className="pcp-color-picker__label">Hue</span>
                <div className="pcp-slider pcp-slider--hue">
                  <Slider
                    value={[defaultColor.hsva.h]}
                    onValueChange={(values) => {
                      hueSliderHandlers.onValueChange(values);
                      announceColorChange(
                        { ...defaultColor, hsva: { ...defaultColor.hsva, h: values[0] } },
                        'Hue adjusted.'
                      );
                    }}
                    onValueCommit={hueSliderHandlers.onValueCommit}
                    onPointerDown={hueSliderHandlers.onPointerDown}
                    max={360}
                    step={1}
                    className="pcp-slider__track"
                    aria-label={`Hue slider, current value ${Math.round(defaultColor.hsva.h)} degrees. Use arrow keys to adjust, Shift for larger steps.`}
                    aria-valuetext={`Hue: ${Math.round(defaultColor.hsva.h)} degrees, color appears ${getColorName(defaultColor.hsva.h)}`}
                    aria-orientation="horizontal"
                  />
                </div>
              </div>
            )}

            {showSaturation && (
              <div className="pcp-color-picker__slider-group" role="group" aria-labelledby="saturation-label">
                <span id="saturation-label" className="pcp-color-picker__label">Saturation</span>
                <div className="pcp-slider pcp-slider--saturation">
                  <Slider
                    value={[defaultColor.hsva.s]}
                    onValueChange={(values) => {
                      saturationSliderHandlers.onValueChange(values);
                      announceColorChange(
                        { ...defaultColor, hsva: { ...defaultColor.hsva, s: values[0] } },
                        'Saturation adjusted.'
                      );
                    }}
                    onValueCommit={saturationSliderHandlers.onValueCommit}
                    onPointerDown={saturationSliderHandlers.onPointerDown}
                    max={100}
                    step={1}
                    className="pcp-slider__track"
                    aria-label={`Saturation slider, current value ${Math.round(defaultColor.hsva.s)}%. Use arrow keys to adjust, Shift for larger steps.`}
                    aria-valuetext={`Saturation: ${Math.round(defaultColor.hsva.s)}%, ${defaultColor.hsva.s > 75 ? 'very vibrant' : defaultColor.hsva.s > 50 ? 'vibrant' : defaultColor.hsva.s > 25 ? 'moderate' : 'muted'}`}
                    aria-orientation="horizontal"
                    style={{
                      '--pcp-current-hue': defaultColor.hsva.h.toString()
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            )}

            {showLightness && (
              <div className="pcp-color-picker__slider-group" role="group" aria-labelledby="lightness-label">
                <span id="lightness-label" className="pcp-color-picker__label">Lightness</span>
                <div className="pcp-slider pcp-slider--lightness">
                  <Slider
                    value={[defaultColor.hsva.v]}
                    onValueChange={(values) => {
                      lightnessSliderHandlers.onValueChange(values);
                      announceColorChange(
                        { ...defaultColor, hsva: { ...defaultColor.hsva, v: values[0] } },
                        'Lightness adjusted.'
                      );
                    }}
                    onValueCommit={lightnessSliderHandlers.onValueCommit}
                    onPointerDown={lightnessSliderHandlers.onPointerDown}
                    max={100}
                    step={1}
                    className="pcp-slider__track"
                    aria-label={`Lightness slider, current value ${Math.round(defaultColor.hsva.v)}%. Use arrow keys to adjust, Shift for larger steps.`}
                    aria-valuetext={`Lightness: ${Math.round(defaultColor.hsva.v)}%, ${defaultColor.hsva.v > 75 ? 'very light' : defaultColor.hsva.v > 50 ? 'light' : defaultColor.hsva.v > 25 ? 'medium' : 'dark'}`}
                    aria-orientation="horizontal"
                    style={{
                      '--pcp-current-hue': defaultColor.hsva.h.toString(),
                      '--pcp-current-saturation': `${defaultColor.hsva.s}%`
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            )}
            {showAlpha && (
              <div className="pcp-color-picker__slider-group" role="group" aria-labelledby="alpha-label">
                <span id="alpha-label" className="pcp-color-picker__label">Opacity</span>
                <div className="pcp-slider pcp-slider--alpha"
                  style={{
                    background: `${gradientWithAlpha}, ${checkerPattern}`
                  }}
                >
                  <Slider
                    value={[Math.round(defaultColor.rgba.a * 100)]}
                    onValueChange={(values) => {
                      alphaSliderHandlers.onValueChange(values);
                      announceColorChange(
                        { ...defaultColor, rgba: { ...defaultColor.rgba, a: values[0] / 100 } },
                        'Transparency adjusted.'
                      );
                    }}
                    onValueCommit={alphaSliderHandlers.onValueCommit}
                    onPointerDown={alphaSliderHandlers.onPointerDown}
                    max={100}
                    step={1}
                    className="pcp-slider__track"
                    aria-label={`Opacity slider, current value ${Math.round(defaultColor.rgba.a * 100)}%. Use arrow keys to adjust, Shift for larger steps.`}
                    aria-valuetext={`Opacity: ${Math.round(defaultColor.rgba.a * 100)}%, ${defaultColor.rgba.a > 0.75 ? 'mostly opaque' : defaultColor.rgba.a > 0.5 ? 'semi-transparent' : defaultColor.rgba.a > 0.25 ? 'mostly transparent' : 'nearly invisible'}`}
                    aria-orientation="horizontal"
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
                onClick={() => {
                  onColorChange(defaultColor, true);
                  setAnnouncement('Random color generated. New color will be announced shortly.');
                }}
                aria-label={`Generate random ${colorMode === ColorModeEnum.PASTEL ? 'pastel' : 'vibrant'} color`}
                aria-describedby="random-button-description"
              >
                <Shuffle className="pcp-random__icon" aria-hidden="true" />
                Random {colorMode === ColorModeEnum.PASTEL ? 'Pastel' : 'Color'}
              </Button>
              <div id="random-button-description" className="pcp-sr-only">
                Generates a new random color in {colorMode === ColorModeEnum.PASTEL ? 'pastel' : 'vibrant'} style
              </div>
            </div>
          </>
        )}

        {/* Preset Colors */}
        {showPresets && presets.length > 0 && (
          <>
            <div className="pcp-color-picker__separator"></div>
            <div className="pcp-color-picker__slider-group" role="group" aria-labelledby="presets-label">
              <span id="presets-label" className="pcp-color-picker__label">Preset Colors</span>
              <div 
                className="pcp-color-picker__presets" 
                role="grid" 
                aria-label="Preset color grid"
                onKeyDown={(e) => {
                  const buttons = Array.from(e.currentTarget.querySelectorAll('button'));
                  const currentIndex = buttons.findIndex(btn => btn === document.activeElement);
                  let newIndex = currentIndex;
                  
                  switch (e.key) {
                    case 'ArrowLeft':
                      e.preventDefault();
                      newIndex = Math.max(0, currentIndex - 1);
                      break;
                    case 'ArrowRight':
                      e.preventDefault();
                      newIndex = Math.min(buttons.length - 1, currentIndex + 1);
                      break;
                    case 'ArrowUp':
                      e.preventDefault();
                      // Assuming 6 columns layout
                      newIndex = Math.max(0, currentIndex - 6);
                      break;
                    case 'ArrowDown':
                      e.preventDefault();
                      // Assuming 6 columns layout
                      newIndex = Math.min(buttons.length - 1, currentIndex + 6);
                      break;
                    case 'Home':
                      e.preventDefault();
                      newIndex = 0;
                      break;
                    case 'End':
                      e.preventDefault();
                      newIndex = buttons.length - 1;
                      break;
                  }
                  
                  if (newIndex !== currentIndex && buttons[newIndex]) {
                    (buttons[newIndex] as HTMLElement).focus();
                  }
                }}
              >
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    className="pcp-color-picker__preset"
                    style={{ backgroundColor: preset }}
                    onClick={() => {
                      handlePresetClick(preset);
                      announceColorChange(hexToColorValue(preset, defaultColor.rgba.a), 'Preset color selected.');
                    }}
                    aria-label={`Select preset color ${preset}, ${getColorName(hexToColorValue(preset, 1).hsva.h)}`}
                    role="gridcell"
                    tabIndex={index === 0 ? 0 : -1}
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