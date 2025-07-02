import { ColorMode } from '../types';

interface ColorModeConstraints {
  saturation: { min: number; max: number };
  value: { min: number; max: number };
  name: string;
  icon: string;
  description: string;
}

export const COLOR_MODE_CONFIG: Record<ColorMode, ColorModeConstraints> = {
  normal: {
    saturation: { min: 0, max: 100 },
    value: { min: 0, max: 100 },
    name: 'Normal Mode',
    icon: '🌈',
    description: 'Normal mode'
  },
  pastel: {
    saturation: { min: 45, max: 75 },
    value: { min: 75, max: 95 },
    name: 'Pastel Mode',
    icon: '🎨',
    description: 'Soft, pleasant tones'
  },
  vivid: {
    saturation: { min: 60, max: 100 },
    value: { min: 50, max: 100 },
    name: 'Vivid Mode', 
    icon: '⚡',
    description: 'Vibrant, bold tones'
  }
  // Future modes can be easily added:
  // 'high-contrast': {
  //   saturation: { min: 80, max: 100 },
  //   value: { min: 20, max: 100 }, // Allow very light or very dark
  //   name: 'High Contrast',
  //   icon: '🔳',
  //   description: 'Accessibility-focused contrast'
  // },
  // 'low-saturation': {
  //   saturation: { min: 0, max: 30 },
  //   value: { min: 40, max: 90 },
  //   name: 'Low Saturation',
  //   icon: '🌫️', 
  //   description: 'Reduced intensity for sensitivity'
  // }
};

// Generic constraint function that works for any color mode
export function constrainToColorMode(
  saturation: number, 
  value: number, 
  colorMode: ColorMode
): { saturation: number; value: number } {
  const config = COLOR_MODE_CONFIG[colorMode];
  
  if (!config) {
    // fallback: no constraints for unknown modes
    return { saturation, value };
  }

  return {
    saturation: Math.max(config.saturation.min, Math.min(config.saturation.max, saturation)),
    value: Math.max(config.value.min, Math.min(config.value.max, value))
  };
}


export function shouldApplyColorModeConstraints(
  colorMode: ColorMode,
  showSaturation: boolean | undefined,
  showLightness: boolean | undefined
): boolean {
  return !showSaturation && !showLightness && !!COLOR_MODE_CONFIG[colorMode] && colorMode !== 'normal';
} 