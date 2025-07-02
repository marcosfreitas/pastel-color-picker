// Headless exports - no CSS imports
// Main exports
export { ColorPicker } from './ColorPicker';
export type { ColorValue, ColorPickerDialogProps, ColorPickerVariant } from './types';
export { generateRandomColor, hexToColorValue } from './utils/colorUtils';

// Component exports
export { ButtonVariant } from './variants/ButtonVariant';
export { CirclesVariant } from './variants/CirclesVariant';
export { RandomVariant } from './variants/RandomVariant';
export { ColorPickerDialog } from './variants/ColorPickerDialog';
export { ColorArea } from './variants/ColorArea';
export { ColorBar } from './variants/ColorBar';

// UI Components
export { Button } from './components/ui/button';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
export { Slider } from './components/ui/slider';

// Constants
export { 
  PRESET_COLORS, 
  PRESET_PASTEL_COLORS, 
  generatePastelVariation
} from './constants';

// Utility functions
export { generatePastelFromRgb,hexToRgb,hslToRgb,hsvToRgb,rgbToHex,rgbToHsl,rgbToHsv } from './utils/colorUtils';

// Types
export type { ButtonProps } from './components/ui/button';

// NOTE: No CSS imports - consumer must handle styling 