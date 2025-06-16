# ColorPicker Component

A comprehensive color picker component built with Radix UI and styled with shadcn/ui components. Features multiple presentation modes, pastel color support, alpha channel control, and responsive design.

## Features

- **Multiple Variants**: Button, Circles, Simple, and Random color selection modes
- **Pastel & Vibrant Colors**: Toggle between pastel and vibrant color palettes
- **Alpha Channel Support**: Control transparency with optional alpha slider
- **Responsive Design**: Works on both small and large screens
- **Custom Presets**: Define your own color presets
- **Accessibility**: Full keyboard navigation and screen reader support
- **TypeScript**: Complete type safety with detailed interfaces

## Installation

Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-dialog @radix-ui/react-slider lucide-react
```

## Basic Usage

```tsx
import { ColorPicker, ColorValue } from '@/shared/components/ui/color-picker';

function MyComponent() {
  const [color, setColor] = useState<ColorValue>();

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      variant="button"
      isPastel={true}
      showAlpha={true}
    />
  );
}
```

## Variants

### Button Variant (Default)

The button variant displays a colored button that opens a dialog with full color picker controls.

```tsx
<ColorPicker
  variant="button"
  size="md"
  value={color}
  onChange={setColor}
/>
```

### Circles Variant

Displays a row of preset color circles with an additional button to open the full picker.

```tsx
<ColorPicker
  variant="circles"
  size="lg"
  value={color}
  onChange={setColor}
  presetColors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
/>
```

### Simple Variant

A simplified version that only shows the hue slider for quick color selection.

```tsx
<ColorPicker
  variant="simple"
  size="md"
  value={color}
  onChange={setColor}
/>
```

### Random Variant

A button that generates random colors based on the pastel/vibrant setting. Features a colored bottom border.

```tsx
<ColorPicker
  variant="random"
  isPastel={true}
  onChange={(color) => setThemeColor(color)}
/>
```

## Props

### ColorPickerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `ColorValue` | `black (#000000)` | Current color value |
| `onChange` | `(color: ColorValue) => void` | - | Callback when color changes |
| `variant` | `'circles' \| 'button' \| 'random' \| 'simple'` | `'button'` | Presentation variant |
| `isPastel` | `boolean` | `true` | Whether to use pastel colors |
| `showAlpha` | `boolean` | `true` | Whether to show alpha channel controls |
| `presetColors` | `string[]` | - | Custom preset colors (hex values) |
| `className` | `string` | - | Custom CSS class |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `showPresets` | `boolean` | `true` | Show preset colors in dialog |

### ColorValue Interface

```tsx
interface ColorValue {
  hexa: string;                              // Hex color (#FF0000)
  rgba: { r: number; g: number; b: number; a: number }; // RGBA values
  hsva: { h: number; s: number; v: number; a: number }; // HSVA values
}
```

## Color Modes

### Pastel Colors
When `isPastel={true}`, the random color generator creates soft, muted colors with:
- Saturation: 70-100%
- Lightness: 75-90%

### Vibrant Colors
When `isPastel={false}`, the random color generator creates bold, vibrant colors with:
- Saturation: 50-100%
- Lightness: 40-80%

## Preset Colors

The component comes with built-in preset colors:

**Pastel Presets (Updated - softer colors):**
- `#F5E6E8`, `#E8F4F8`, `#F0F4FF`, `#F2F5E8`, `#FFF7E8`
- `#F5E8F5`, `#E8F2E8`, `#FFF0E8`, `#F0E8F5`, `#E8F0FF`

**Vibrant Presets:**
- `#FF6B6B`, `#4ECDC4`, `#45B7D1`, `#96CEB4`, `#FFEAA7`
- `#DDA0DD`, `#98D8C8`, `#F7DC6F`, `#BB8FCE`, `#85C1E9`

You can override these with the `presetColors` prop.

## Default Color

The default color for all variants is black (`#000000`) when no value is provided.

## Advanced Usage

### Custom Theme Integration

```tsx
function ThemeColorPicker() {
  const [themeColor, setThemeColor] = useState<ColorValue>();

  const handleColorChange = (color: ColorValue) => {
    setThemeColor(color);
    // Update CSS custom properties
    document.documentElement.style.setProperty('--theme-color', color.hexa);
    document.documentElement.style.setProperty(
      '--theme-color-rgb', 
      `${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}`
    );
  };

  return (
    <ColorPicker
      variant="button"
      value={themeColor}
      onChange={handleColorChange}
      showAlpha={false}
    />
  );
}
```

### Simple Hue Selection

```tsx
function SimpleHuePicker() {
  const [hueColor, setHueColor] = useState<ColorValue>();

  return (
    <ColorPicker
      variant="simple"
      size="lg"
      value={hueColor}
      onChange={setHueColor}
    />
  );
}
```

### Brand Color Selector

```tsx
const brandColors = [
  '#1a73e8', '#ea4335', '#fbbc04', '#34a853',
  '#9aa0a6', '#5f6368', '#202124', '#fff'
];

<ColorPicker
  variant="circles"
  presetColors={brandColors}
  showPresets={false}
  isPastel={false}
/>
```

## Styling

The component uses CSS modules for custom slider styling. The included styles provide:

- Gradient backgrounds for hue, saturation, and lightness sliders
- Checkerboard pattern for alpha channel visualization
- Dynamic color updates based on current selection
- Colored bottom border for random variant

## Accessibility

The component includes:

- Full keyboard navigation
- ARIA labels and descriptions
- Screen reader support
- Focus management
- High contrast mode support

## Browser Support

- Chrome/Edge: 88+
- Firefox: 78+
- Safari: 14+

## Dependencies

- `@radix-ui/react-dialog`: Dialog component
- `@radix-ui/react-slider`: Slider component  
- `lucide-react`: Icons
- `React`: 18+

## License

MIT License