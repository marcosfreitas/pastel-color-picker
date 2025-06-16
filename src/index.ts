// Main exports
export { ColorPicker } from './ColorPicker';
export type { ColorValue, ColorPickerProps, ColorPickerVariant } from './types';
export { generateRandomColor, hexToColorValue } from './utils/colorUtils';

// Component exports
export { ButtonVariant } from './variants/ButtonVariant';
export { CirclesVariant } from './variants/CirclesVariant';
export { RandomVariant } from './variants/RandomVariant';
export { SimpleVariant } from './variants/SimpleVariant';
export { ColorPickerDialog } from './variants/ColorPickerDialog';
export { SimpleColorPickerDialog } from './variants/SimpleColorPickerDialog';
export { ColorArea } from './variants/ColorArea';
export { ColorBar } from './variants/ColorBar';

// UI Components
export { Button } from './components/ui/button';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
export { Label } from './components/ui/label';
export { Slider } from './components/ui/slider';
export { Separator } from './components/ui/separator';
export { Badge } from './components/ui/badge';
export { Card } from './components/ui/card';
export { Switch } from './components/ui/switch';

// Utilities
export { cn } from './utils/cn';

// Constants
export { PRESET_COLORS, PRESET_PASTEL_COLORS } from './constants';

// Types
export type { ButtonProps } from './components/ui/button';

// CSS
import './ColorPicker.css'; 