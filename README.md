# 🎨 Pastel Color Picker

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-green.svg)](https://reactjs.org/)

A comprehensive React color picker component with multiple variants, pastel color support, and alpha channel control. Built with Radix UI primitives and styled with Tailwind CSS.

## ✨ Features

- **🎯 Multiple Variants**: Button, Circles, Simple, and Random color selection modes
- **🌈 Pastel & Vibrant Colors**: Toggle between soft pastel and vibrant color palettes
- **💧 Alpha Channel Support**: Control transparency with optional alpha slider
- **📱 Responsive Design**: Works perfectly on both small and large screens
- **🎨 Custom Presets**: Define your own color palettes
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🔧 TypeScript**: Complete type safety with detailed interfaces
- **⚡ Modern Stack**: Built with Radix UI primitives and Tailwind CSS

## 🎯 How It Works

The color picker uses the **HSL (Hue, Saturation, Lightness)** color model, which provides an intuitive way to select colors by separating color properties:

### 🌈 Color Theory

**HSL Color Model Components:**
- **Hue (H)**: The color type (0-360°) - Red, Orange, Yellow, Green, Blue, Purple, etc.
- **Saturation (S)**: Color intensity (0-100%) - Gray to Vivid
- **Lightness (L)**: Brightness (0-100%) - Black to White

### 🔄 User Selection Process

1. **🎨 Choose Base Color (Hue)**
   - Use the hue slider to select the base color type
   - Range: 0-360° (Red → Orange → Yellow → Green → Blue → Purple → Red)

2. **📊 Visual Reference Bar**
   - A thin color bar displays: `White → Selected Hue → Black`
   - Shows the full spectrum for your chosen hue
   - Position indicator shows where your current color sits

3. **🎛️ Fine-tune Color Properties**
   - **Saturation Slider**: Adjust color intensity (0% = Gray ↔ 100% = Vivid)
   - **Lightness Slider**: Adjust brightness (0% = Black ↔ 100% = White)
   - **Opacity Slider**: Control transparency (optional)

4. **📍 Real-time Feedback**
   - Position indicator moves on the color bar as you adjust sliders
   - Live color preview updates instantly
   - RGB and HEX values displayed

### 💡 Example Workflow

```
Step 1: "I want a blue color" → Move hue slider to ~240°
Step 2: Color bar shows [White ████ Blue ████ Black]
Step 3: "Make it more vivid" → Increase saturation to 80%
Step 4: "Make it lighter" → Increase lightness to 70%
Step 5: Position indicator shows exactly where your color is: [White ██●█ Blue ████ Black]
Result: Beautiful light blue color! 🎉
```

### 🎨 Color Variants

- **2D Color Area** (optional): Interactive canvas for selecting saturation and lightness simultaneously
- **Individual Sliders** (default): Separate controls for precise adjustment
- **Simple Mode**: Hue-only selection for quick color changes
- **Random Mode**: Generate colors within pastel or vibrant ranges

## 🚀 Demo

[**Live Demo →**](https://ordinarylink.github.io/pastel-color-picker)

## 📦 Installation

### From npm (Recommended)

```bash
npm install @marcosfreitas/pastel-color-picker
```

### Peer Dependencies

```bash
npm install react react-dom @radix-ui/react-dialog @radix-ui/react-slider lucide-react clsx
```

## 🎯 Quick Start

```tsx
import { ColorPicker, ColorValue } from '@marcosfreitas/pastel-color-picker';

function App() {
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

## 🔧 API Reference

### ColorPickerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `ColorValue` | `black (#000000)` | Current color value |
| `onChange` | `(color: ColorValue) => void` | - | Callback when color changes |
| `variant` | `'circles' \| 'button' \| 'random' \| 'simple'` | `'button'` | Presentation variant |
| `isPastel` | `boolean` | `true` | Whether to use pastel colors |
| `showAlpha` | `boolean` | `true` | Whether to show alpha channel controls |
| `showColorArea` | `boolean` | `false` | Whether to show 2D color area instead of individual sliders |
| `hideSliders` | `boolean` | `false` | Whether to hide all slider controls in dialogs |
| `presetColors` | `string[]` | - | Custom preset colors (hex values) |
| `className` | `string` | - | Custom CSS class |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `showPresets` | `boolean` | `true` | Show preset colors in dialog |
| `showIcon` | `boolean` | `true` | Whether to show icons in button variants |
| `label` | `string` | - | Label text to display with the button/random/simple variants |

### ColorValue Interface

```tsx
interface ColorValue {
  hexa: string;                              // Hex color (#FF0000)
  rgba: { r: number; g: number; b: number; a: number }; // RGBA values
  hsva: { h: number; s: number; v: number; a: number }; // HSVA values
}
```

## 🎨 Variants

### Button Variant (Default)
Displays a colored button that opens a full-featured color picker dialog.

```tsx
<ColorPicker variant="button" size="md" />
```

### Circles Variant
Shows preset color circles with an option to open the full picker.

```tsx
<ColorPicker 
  variant="circles" 
  presetColors={['#FF6B6B', '#4ECDC4', '#45B7D1']} 
/>
```

### Simple Variant
A simplified version with only hue selection.

```tsx
<ColorPicker variant="simple" />
```

### Random Variant
Generates random colors with a colored bottom border indicator.

```tsx
<ColorPicker variant="random" isPastel={true} />
```

## 🌈 Color Modes

### Pastel Colors
When `isPastel={true}`:
- Saturation: 70-100%
- Lightness: 75-90%
- Perfect for soft, elegant designs

### Vibrant Colors
When `isPastel={false}`:
- Saturation: 50-100%
- Lightness: 40-80%
- Great for bold, energetic designs

## 🎯 Advanced Usage

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

### Minimalist Color Picker

```tsx
function MinimalistPicker() {
  const [color, setColor] = useState<ColorValue>();

  return (
    <ColorPicker
      variant="button"
      value={color}
      onChange={setColor}
      hideSliders={true}
      showColorArea={true}
      showPresets={false}
      label="Pick Color"
    />
  );
}
```

### Transparency-Aware Color Picker

```tsx
function TransparencyPicker() {
  const [bgColor, setBgColor] = useState<ColorValue>();

  return (
    <ColorPicker
      variant="button"
      value={bgColor}
      onChange={setBgColor}
      showAlpha={true}
      showColorArea={true}
      hideSliders={false}
    />
  );
}
```

### Form Integration

```tsx
function ColorForm() {
  const [formData, setFormData] = useState({
    backgroundColor: null as ColorValue | null,
    textColor: null as ColorValue | null,
  });

  return (
    <form>
      <div>
        <label>Background Color</label>
        <ColorPicker
          value={formData.backgroundColor}
          onChange={(color) => setFormData(prev => ({
            ...prev,
            backgroundColor: color
          }))}
        />
      </div>
      
      <div>
        <label>Text Color</label>
        <ColorPicker
          value={formData.textColor}
          onChange={(color) => setFormData(prev => ({
            ...prev,
            textColor: color
          }))}
          showAlpha={false}
        />
      </div>
    </form>
  );
}
```

## 🎨 Styling

The component uses Tailwind CSS for styling. Make sure to include the required CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## ♿ Accessibility

- Full keyboard navigation
- ARIA labels and descriptions
- Screen reader support
- Focus management
- High contrast mode support

## 🌐 Browser Support

- Chrome/Edge: 88+
- Firefox: 78+
- Safari: 14+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Radix UI](https://radix-ui.com/) primitives
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Inspired by modern design systems

---

Made with ❤️ by [Ordinary Link]([https://github.com/ordinarylink](https://ordinarylink.co/))
