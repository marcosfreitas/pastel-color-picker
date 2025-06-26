'use client';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { ColorModeEnum, ColorPickerDialogProps, ColorPickerVariantProps, ColorValue } from './types';
import { PRESET_COLORS, PRESET_PASTEL_COLORS } from './constants';
import { generateRandomColor, hexToColorValue, hsvToRgb, rgbToHex } from './utils/colorUtils';
import { ButtonVariant } from './variants/ButtonVariant';
import { CirclesVariant } from './variants/CirclesVariant';
import { RandomVariant } from './variants/RandomVariant';
import './css/index.css';


export function ColorPicker(props: ColorPickerVariantProps & ColorPickerDialogProps) {
  const {
    // ColorPickerVariantProps
    variant = 'button',
    size = 'md',
    disabled = false,
    label,
    children,
    className,

    // ColorPickerDialogProps
    title = 'Pick a color',
    defaultColor,
    presets,
    colorMode = ColorModeEnum.PASTEL,
    showColorArea = false,
    showPresets = true,
    hideSliders = false,
    showHue = true,
    showSaturation = false,
    showLightness = false,
    showAlpha = true,
    showRandomButton = true,
    onPresetClick,
    onColorChange,
    onHueChange,
    onSaturationChange,
    onLightnessChange,
    onAlphaChange,
  } = props;
  
  const [isOpen, setIsOpen] = useState(false);
  
  // Determine the appropriate preset list and default color
  const presetColors = useMemo(() => {
    if (presets) return presets;
    return colorMode === ColorModeEnum.PASTEL ? PRESET_PASTEL_COLORS : PRESET_COLORS;
  }, [presets, colorMode]);

  // Get default color from first preset color
  const localDefaultColor = useMemo(() => {
    const firstPresetColor = presetColors[0];
    return hexToColorValue(firstPresetColor, 1);
  }, [presetColors]);

  const [localColor, setLocalColor] = useState<ColorValue>(
    defaultColor || localDefaultColor
  );

  // Sync internal state with value prop changes or preset changes
  useEffect(() => {
    if (defaultColor) {
      setLocalColor(defaultColor);
    } else {
      // Update default color when presets change (e.g., when colorMode changes)
      setLocalColor(localDefaultColor);
    }
  }, [defaultColor, localDefaultColor]);

  // Call onChange with default color on initial render when no value is provided
  const hasCalledInitialChange = useRef(false);
  useEffect(() => {
    if (!defaultColor && onColorChange && !hasCalledInitialChange.current) {
      hasCalledInitialChange.current = true;
      onColorChange(localDefaultColor);
    }
  }, [defaultColor, localDefaultColor, onColorChange]);

  const handleColorChange = useCallback((color: ColorValue, random?: boolean) => {
    if (random) {
      const randomColor = generateRandomColor(colorMode === ColorModeEnum.PASTEL);
      setLocalColor(randomColor);
      onColorChange?.(randomColor);
    } else {
      setLocalColor(color);
      onColorChange?.(color);
    }
  }, [colorMode, onColorChange]);

  const handlePresetSelect = useCallback((color: ColorValue) => {
    handleColorChange(color);
    onPresetClick?.(color);
  }, [handleColorChange, onPresetClick]);

  const handleHueChange = useCallback((hue: number[]) => {
    const [r, g, b] = hsvToRgb(hue[0], localColor.hsva.s, localColor.hsva.v);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: localColor.rgba.a },
      hsva: { ...localColor.hsva, h: hue[0] }
    };
    handleColorChange(newColor);
    onHueChange?.(hue);
  }, [localColor, handleColorChange, onHueChange]);

  const handleSaturationChange = useCallback((saturation: number[]) => {
    const [r, g, b] = hsvToRgb(localColor.hsva.h, saturation[0], localColor.hsva.v);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: localColor.rgba.a },
      hsva: { ...localColor.hsva, s: saturation[0] }
    };
    handleColorChange(newColor);
    onSaturationChange?.(saturation);
  }, [localColor, handleColorChange, onSaturationChange]);

  const handleLightnessChange = useCallback((lightness: number[]) => {
    const [r, g, b] = hsvToRgb(localColor.hsva.h, localColor.hsva.s, lightness[0]);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: localColor.rgba.a },
      hsva: { ...localColor.hsva, v: lightness[0] }
    };
    handleColorChange(newColor);
    onLightnessChange?.(lightness);
  }, [localColor, handleColorChange, onLightnessChange]);

  const handleAlphaChange = useCallback((alpha: number[]) => {
    const newColor: ColorValue = {
      ...localColor,
      rgba: { ...localColor.rgba, a: alpha[0] / 100 },
      hsva: { ...localColor.hsva, a: alpha[0] / 100 }
    };
    handleColorChange(newColor);
    onAlphaChange?.(alpha);
  }, [localColor, handleColorChange, onAlphaChange]);

  // Common props for all variants
  const commonProps: ColorPickerDialogProps & Omit<ColorPickerVariantProps, 'variant'> = {
    // ColorPickerDialogProps
    title,
    defaultColor: localColor,
    presets: presetColors,
    colorMode,
    showColorArea,
    hideSliders,
    showPresets,
    showHue,
    showSaturation,
    showLightness,
    showAlpha,
    showRandomButton,
    onColorChange: handleColorChange,
    onPresetClick: handlePresetSelect,
    onHueChange: handleHueChange,
    onSaturationChange: handleSaturationChange,
    onLightnessChange: handleLightnessChange,
    onAlphaChange: handleAlphaChange,
    
    // ColorPickerVariantProps (excluding variant)
    size,
    disabled,
    label,
    className,
    children,
  };

  // Render appropriate variant wrapped with pcp-root for CSS custom properties
  const renderVariant = () => {
    switch (variant) {
      case 'circles':
        return (
          <CirclesVariant
            {...commonProps}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        );

      case 'random':
        return (
          <RandomVariant
            {...commonProps}
          />
        );

      case 'button':
      default:
        return (
          <ButtonVariant
            {...commonProps}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        );
    }
  };

  return (
    <div className={`pcp-root ${className || ''}`.trim()}>
      {renderVariant()}
    </div>
  );
}

