'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ColorPickerProps, ColorValue } from './types';
import { PRESET_COLORS, PRESET_PASTEL_COLORS } from './constants';
import { generateRandomColor, hexToColorValue, hsvToRgb, rgbToHex } from './utils/colorUtils';
import { ButtonVariant } from './variants/ButtonVariant';
import { CirclesVariant } from './variants/CirclesVariant';
import { RandomVariant } from './variants/RandomVariant';
import { SimpleVariant } from './variants/SimpleVariant';
import './ColorPicker.css';

export function ColorPicker({
  value,
  onChange,
  variant = 'button',
  isPastel = true,
  showAlpha = true,
  showColorArea = false,
  presetColors,
  className,
  size = 'md',
  disabled = false,
  showPresets = true,
  showIcon = true,
  label,
  hideSliders = false
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Determine the appropriate preset list and default color
  const presets = useMemo(() => {
    if (presetColors) return presetColors;
    return isPastel ? PRESET_PASTEL_COLORS : PRESET_COLORS;
  }, [presetColors, isPastel]);

  // Get default color from first preset color
  const defaultColor = useMemo(() => {
    const firstPresetColor = presets[0] || '#45B7D1'; // Fallback to original default
    return hexToColorValue(firstPresetColor, 1);
  }, [presets]);

  const [localColor, setLocalColor] = useState<ColorValue>(
    value || defaultColor
  );

  // Sync internal state with value prop changes or preset changes
  useEffect(() => {
    if (value) {
      setLocalColor(value);
    } else {
      // Update default color when presets change (e.g., when isPastel changes)
      setLocalColor(defaultColor);
    }
  }, [value, defaultColor]);

  const handleColorChange = useCallback((newColor: ColorValue) => {
    setLocalColor(newColor);
    onChange?.(newColor);
  }, [onChange]);

  const handleRandomColor = useCallback(() => {
    const randomColor = generateRandomColor(isPastel);
    handleColorChange(randomColor);
  }, [isPastel, handleColorChange]);

  const handlePresetSelect = useCallback((hex: string) => {
    const colorValue = hexToColorValue(hex, localColor.rgba.a);
    handleColorChange(colorValue);
  }, [localColor.rgba.a, handleColorChange]);

  const handleHueChange = useCallback((hue: number[]) => {
    const [r, g, b] = hsvToRgb(hue[0], localColor.hsva.s, localColor.hsva.v);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: localColor.rgba.a },
      hsva: { ...localColor.hsva, h: hue[0] }
    };
    handleColorChange(newColor);
  }, [localColor, handleColorChange]);

  const handleSaturationChange = useCallback((saturation: number[]) => {
    const [r, g, b] = hsvToRgb(localColor.hsva.h, saturation[0], localColor.hsva.v);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: localColor.rgba.a },
      hsva: { ...localColor.hsva, s: saturation[0] }
    };
    handleColorChange(newColor);
  }, [localColor, handleColorChange]);

  const handleLightnessChange = useCallback((lightness: number[]) => {
    const [r, g, b] = hsvToRgb(localColor.hsva.h, localColor.hsva.s, lightness[0]);
    const hex = rgbToHex(r, g, b);
    const newColor: ColorValue = {
      hexa: hex,
      rgba: { r, g, b, a: localColor.rgba.a },
      hsva: { ...localColor.hsva, v: lightness[0] }
    };
    handleColorChange(newColor);
  }, [localColor, handleColorChange]);

  const handleAlphaChange = useCallback((alpha: number[]) => {
    const newColor: ColorValue = {
      ...localColor,
      rgba: { ...localColor.rgba, a: alpha[0] / 100 },
      hsva: { ...localColor.hsva, a: alpha[0] / 100 }
    };
    handleColorChange(newColor);
  }, [localColor, handleColorChange]);

  // Common props for variants that need dialogs
  const commonDialogProps = {
    localColor,
    handleColorChange,
    showPresets,
    presets,
    showAlpha,
    showColorArea,
    isPastel,
    hideSliders,
    onRandomColor: handleRandomColor,
    onHueChange: handleHueChange,
    onSaturationChange: handleSaturationChange,
    onLightnessChange: handleLightnessChange,
    onAlphaChange: handleAlphaChange,
    size,
    disabled,
    className,
    isOpen,
    setIsOpen
  };

  // Render appropriate variant
  switch (variant) {
    case 'circles':
      return (
        <CirclesVariant
          {...commonDialogProps}
          handlePresetSelect={handlePresetSelect}
        />
      );

    case 'random':
      return (
        <RandomVariant
          localColor={localColor}
          handleRandomColor={handleRandomColor}
          isPastel={isPastel}
          label={label}
          size={size}
          disabled={disabled}
          className={className}
        />
      );

    case 'simple':
      return (
        <SimpleVariant
          {...commonDialogProps}
          showIcon={showIcon}
          label={label}
        />
      );

    case 'button':
    default:
      return (
        <ButtonVariant
          {...commonDialogProps}
          showIcon={showIcon}
          label={label}
        />
      );
  }
}

// Re-export types and utilities for convenience
export type { ColorValue, ColorPickerProps, ColorPickerVariant } from './types';
export { generateRandomColor, hexToColorValue } from './utils/colorUtils';