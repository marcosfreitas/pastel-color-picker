import { ReactNode } from 'react';

export interface ColorValue {
  hexa: string;
  rgba: { r: number; g: number; b: number; a: number };
  hsva: { h: number; s: number; v: number; a: number };
}

export type ColorPickerVariant = 'circles' | 'button' | 'random' | 'simple';

export interface ColorPickerVariantProps {
  variant: ColorPickerVariant;
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  /** Label text to display with the button/random/simple variants */
  label?: string;
  className?: string;
  /** Children elements to render (typically icons) - rendered before label */
  children?: ReactNode;
}

export enum ColorMode {
  PASTEL = 'pastel',
  VIVID = 'vivid'
}

export interface ColorPickerDialogProps {
  /** Title of the color picker */
  title?: string;
  /** Current color value */
  defaultColor?: ColorValue;
  presets: string[];
  /** Whether to use pastel colors */
  colorMode: ColorMode;
  /** Whether to show the 2D color area (disabled by default) */
  showColorArea?: boolean;
  /** Whether to hide all slider controls in dialogs */
  hideSliders?: boolean;
  
  /** Whether to show preset colors in dialog */
  showPresets?: boolean;
  showHue?: boolean;
  showSaturation?: boolean;
  showLightness?: boolean;
  /** Whether to show alpha channel controls */
  showAlpha?: boolean;
  
  showRandomButton?: boolean;
  
  onColorChange: (color: ColorValue) => void;
  onPresetClick?: (preset: ColorValue) => void;
  onRandomColor?: (color: ColorValue) => void;
  onHueChange?: (hue: number[]) => void;
  onSaturationChange?: (saturation: number[]) => void;
  onLightnessChange?: (lightness: number[]) => void;
  onAlphaChange?: (alpha: number[]) => void;
} 