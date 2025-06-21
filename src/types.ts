import { ReactNode } from 'react';

export interface ColorValue {
  hexa: string;
  rgba: { r: number; g: number; b: number; a: number };
  hsva: { h: number; s: number; v: number; a: number };
}

export type ColorPickerVariant = 'circles' | 'button' | 'random' | 'simple';

export interface ColorPickerProps {
  /** Current color value */
  value?: ColorValue;
  /** Callback when color changes */
  onChange?: (color: ColorValue) => void;
  /** Presentation variant */
  variant?: ColorPickerVariant;
  /** Whether to use pastel colors */
  isPastel?: boolean;
  /** Whether to show alpha channel controls */
  showAlpha?: boolean;
  /** Whether to show the 2D color area (disabled by default) */
  showColorArea?: boolean;
  /** Custom preset colors */
  presetColors?: string[];
  /** Custom class name */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Show preset colors in dialog */
  showPresets?: boolean;
  /** Label text to display with the button/random/simple variants */
  label?: string;
  /** Whether to hide all slider controls in dialogs */
  hideSliders?: boolean;
  /** Children elements to render (typically icons) - rendered before label */
  children?: ReactNode;
} 