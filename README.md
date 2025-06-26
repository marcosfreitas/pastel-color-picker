# 🎨 Pastel Color Picker

[![npm version](https://img.shields.io/npm/v/%40marcosfreitas%2Fpastel-color-picker)](https://www.npmjs.com/package/@marcosfreitas/pastel-color-picker)
[![Node.js](https://img.shields.io/badge/Node.js-22+-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-green.svg)](https://reactjs.org/)

A comprehensive React color picker component with multiple variants, pastel color support, and alpha channel control. Built with Radix UI primitives and modern CSS architecture.

## ✨ Features

- **🎯 Multiple Variants**: Button, Circles, and Random color selection modes
- **🌈 Pastel & Vivid Colors**: Toggle between soft pastel and vibrant color palettes
- **💧 Alpha Channel Support**: Control transparency with optional alpha slider
- **📱 Responsive Design**: Works perfectly on both small and large screens
- **🎨 Custom Presets**: Define your own color palettes
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🔧 TypeScript**: Complete type safety with detailed interfaces
- **⚡ Modern Stack**: Built with Radix UI primitives and BEM CSS methodology

## 🎯 How It Works

The color picker uses the **HSV (Hue, Saturation, Value)** color model, which provides an intuitive way to select colors by separating color properties:

### 🌈 Color Theory

**HSV Color Model Components:**
- **Hue (H)**: The color type (0-360°) - Red, Orange, Yellow, Green, Blue, Purple, etc.
- **Saturation (S)**: Color intensity (0-100%) - Gray to Vivid
- **Value (V)**: Brightness (0-100%) - Black to Bright

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
   - **Value Slider**: Adjust brightness (0% = Black ↔ 100% = Bright)
   - **Alpha Slider**: Control transparency (optional)

4. **📍 Real-time Feedback**
   - Position indicator moves on the color bar as you adjust sliders
   - Live color preview updates instantly
   - RGB and HEX values displayed

### 💡 Example Workflow

```
Step 1: "I want a blue color" → Move hue slider to ~240°
Step 2: Color bar shows [White ████ Blue ████ Black]
Step 3: "Make it more vivid" → Increase saturation to 80%
Step 4: "Make it brighter" → Increase value to 70%
Step 5: Position indicator shows exactly where your color is: [White ██●█ Blue ████ Black]
Result: Beautiful bright blue color! 🎉
```

### 🎨 Color Variants

- **2D Color Area** (optional): Interactive canvas for selecting saturation and value simultaneously
- **Individual Sliders** (default): Separate controls for precise adjustment
- **Random Mode**: Generate colors within pastel or vivid ranges

## 🚀 Demo

[**Live Demo →**](https://marcosfreitas.github.io/pastel-color-picker)

## 📦 Installation

### From npm (Recommended)

```bash
npm install @marcosfreitas/pastel-color-picker
```

### Peer Dependencies

```bash
npm install react react-dom
```

*Note: All other dependencies (Radix UI, Lucide React, etc.) are bundled with the package for optimal compatibility.*

## 🎯 Quick Start

```tsx
import { ColorPicker, ColorValue, ColorMode } from '@marcosfreitas/pastel-color-picker';
import '@marcosfreitas/pastel-color-picker/style.css';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState<ColorValue>();

  return (
    <ColorPicker
      defaultColor={color}
      onColorChange={setColor}
      variant="button"
      colorMode={ColorMode.PASTEL}
      showAlpha={true}
    />
  );
}
```

## 🔧 API Reference

### ColorPickerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultColor` | `ColorValue` | first preset color | Current color value |
| `onColorChange` | `(color: ColorValue, random?: boolean) => void` | - | Callback when color changes |
| `variant` | `'button' \| 'circles' \| 'random'` | `'button'` | Presentation variant |
| `colorMode` | `'pastel' \| 'vivid'` | `'pastel'` | Color generation mode |
| `presets` | `string[]` | pastel/vivid colors | Custom preset colors (hex values) |
| `title` | `string` | `'Color Picker'` | Dialog title |
| `showAlpha` | `boolean` | `true` | Whether to show alpha channel controls |
| `showColorArea` | `boolean` | `false` | Whether to show 2D color area instead of color bar |
| `hideSliders` | `boolean` | `false` | Whether to hide all slider controls in dialogs |
| `showPresets` | `boolean` | `true` | Show preset colors in dialog |
| `showHue` | `boolean` | `true` | Show hue slider |
| `showSaturation` | `boolean` | `true` | Show saturation slider |
| `showLightness` | `boolean` | `true` | Show lightness/value slider |
| `showRandomButton` | `boolean` | `true` | Show random color button |
| `className` | `string` | - | Custom CSS class |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | - | Label text to display with the button/random variants |
| `children` | `ReactNode` | - | Custom content for trigger button |

### Event Callbacks

| Callback | Type | Description |
|----------|------|-------------|
| `onColorChange` | `(color: ColorValue, random?: boolean) => void` | Called when color changes |
| `onPresetClick` | `(color: ColorValue) => void` | Called when preset color is clicked |
| `onHueChange` | `(hue: number[]) => void` | Called when hue slider changes |
| `onSaturationChange` | `(saturation: number[]) => void` | Called when saturation slider changes |
| `onLightnessChange` | `(lightness: number[]) => void` | Called when lightness slider changes |
| `onAlphaChange` | `(alpha: number[]) => void` | Called when alpha slider changes |

### ColorValue Interface

```tsx
interface ColorValue {
  hexa: string;                              // Hex color (#FF0000)
  rgba: { r: number; g: number; b: number; a: number }; // RGBA values
  hsva: { h: number; s: number; v: number; a: number }; // HSVA values
}
```

### ColorMode Enum

```tsx
enum ColorMode {
  PASTEL = 'pastel',
  VIVID = 'vivid'
}
```

## 🎨 Variants

### Button Variant (Default)
Displays a colored button that opens a full-featured color picker dialog.

```tsx
<ColorPicker 
  variant="button" 
  size="md"
  colorMode={ColorMode.PASTEL}
  onColorChange={(color) => console.log(color)}
/>
```

### Circles Variant
Shows preset color circles with an option to open the full picker.

```tsx
<ColorPicker 
  variant="circles" 
  presets={['#FF6B6B', '#4ECDC4', '#45B7D1']}
  colorMode={ColorMode.VIVID}
  onColorChange={(color) => console.log(color)}
/>
```

**Note:** The `label` and `children` props are not rendered in circles variant - it uses preset circles instead.

### Random Variant
Generates random colors with a colored bottom border indicator.

```tsx
<ColorPicker 
  variant="random" 
  colorMode={ColorMode.PASTEL}
  onColorChange={(color) => console.log(color)}
  label="Generate Random Color"
/>
```

**Note:** The `presets` prop is not used in random variant - it generates colors based on `colorMode` only.

## 🎯 Variant Comparison

| Feature | Button | Circles | Random |
|---------|--------|---------|--------|
| **Dialog** | ✅ Full dialog | ✅ Full dialog | ❌ No dialog |
| **Presets** | ✅ Uses presets | ✅ Uses presets | ❌ Ignores presets |
| **Label/Children** | ✅ Renders content | ❌ Uses circles only | ✅ Renders content |
| **All Sliders** | ✅ All controls | ✅ All controls | ❌ No sliders |
| **Random Generation** | ✅ Via dialog | ✅ Via dialog | ✅ Primary function |
| **Best For** | Complex selection | Quick presets | Inspiration |

**Choose your variant:**
- **Button**: When you need full control and all color picker features
- **Circles**: When you want quick preset selection with dialog fallback
- **Random**: When you want simple random color generation for creative workflows

## 🌈 Color Modes

### Pastel Colors
When `colorMode="pastel"`:
- Saturation: 70-100%
- Value: 75-90%
- Perfect for soft, elegant designs

### Vivid Colors
When `colorMode="vivid"`:
- Saturation: 50-100%
- Value: 40-80%
- Great for bold, energetic designs

## 🎯 Advanced Usage

### Custom Theme Integration

```tsx
import { ColorPicker, ColorValue, ColorMode } from '@marcosfreitas/pastel-color-picker';
import '@marcosfreitas/pastel-color-picker/style.css';

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
      defaultColor={themeColor}
      onColorChange={handleColorChange}
      showAlpha={false}
      colorMode={ColorMode.VIVID}
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
  presets={brandColors}
  showPresets={true}
  colorMode={ColorMode.VIVID}
  onColorChange={(color) => console.log('Brand color:', color)}
/>
```

### Minimalist Color Picker

```tsx
function MinimalistPicker() {
  const [color, setColor] = useState<ColorValue>();

  return (
    <ColorPicker
      variant="button"
      defaultColor={color}
      onColorChange={setColor}
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
      defaultColor={bgColor}
      onColorChange={setBgColor}
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
          defaultColor={formData.backgroundColor}
          onColorChange={(color) => setFormData(prev => ({
            ...prev,
            backgroundColor: color
          }))}
        />
      </div>
      
      <div>
        <label>Text Color</label>
        <ColorPicker
          defaultColor={formData.textColor}
          onColorChange={(color) => setFormData(prev => ({
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

The component uses a modern CSS architecture with BEM methodology and scoped variables. You can customize the appearance by overriding CSS custom properties:

```css
:root {
  --pcp-color-border: 0 0% 10%;
  --pcp-color-background: 0 0% 100%;
  --pcp-color-foreground: 222.2 84% 4.9%;
  --pcp-color-primary: 222.2 47.4% 11.2%;
  --pcp-color-primary-foreground: 210 40% 98%;
  --pcp-radius: 0.5rem;
}
```

## ♿ Accessibility

This color picker provides **comprehensive accessibility support** that exceeds WCAG 2.1 AA standards:

### ✅ **Complete Implementation**
- **🎯 Advanced Keyboard Navigation** - 2D color area navigation, grid-based preset selection, shortcuts (Home/End/PageUp/PageDown)
- **🔊 Screen Reader Excellence** - Live region announcements, descriptive color names, context-aware feedback
- **👁️ Enhanced Focus Management** - Dual-outline system with soft black focus rings for optimal visibility
- **🎨 Color Independence** - Information conveyed through text, ARIA labels, and multiple formats (HEX, RGB)
- **⚡ High Contrast Mode** - Automatic detection with enhanced outlines and pure black indicators
- **🌊 Reduced Motion Support** - Respects user motion preferences
- **📱 Responsive Design** - Accessible at all zoom levels and screen sizes

### 🏆 **WCAG 2.1 AA Compliant**
- All success criteria met with automated testing verification
- Compatible with NVDA, JAWS, VoiceOver, and Orca screen readers
- Lighthouse accessibility score: **100%**
- Zero accessibility violations detected by axe-core

### 📚 **Detailed Documentation**
For comprehensive accessibility implementation details, testing procedures, and contribution guidelines, see our **[Accessibility Guide](ACCESSIBILITY.md)**.

**This component sets the standard for accessible color picker implementations.**

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

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Radix UI](https://radix-ui.com/) primitives
- Icons from [Lucide React](https://lucide.dev/)
- Inspired by modern design systems

---

Made with ❤️ by [Marcos Freitas](https://marcosfreitas.co/)

## 📖 Usage Options

This library provides **three different usage patterns** to fit different needs:

### Option 1: Self-Contained (Recommended for Quick Setup)

```typescript
import { ColorPicker, ColorMode } from '@marcosfreitas/pastel-color-picker';
import '@marcosfreitas/pastel-color-picker/style.css';

// Works out of the box - no additional setup needed
```

### Option 2: Headless (Best for Tailwind v4 Projects)

```typescript
import { ColorPicker, ColorMode } from '@marcosfreitas/pastel-color-picker/headless';

// No CSS import needed - uses your Tailwind config
// Ensure your tailwind.config includes the package in content:
// content: ['./node_modules/@marcosfreitas/pastel-color-picker/**/*.js']
```

**What is "Headless"?**
- ✅ **Same components & functionality** as the regular version
- ✅ **Zero bundled CSS** - uses your project's Tailwind utilities
- ✅ **Smaller bundle size** (~35KB CSS savings)
- ✅ **Perfect integration** with existing Tailwind v4 projects
- ⚠️ **Requires** your project to have all necessary Tailwind utilities

**Best for:**
- Projects already using Tailwind CSS v4
- Teams with custom design systems
- Performance-critical applications
- When you want full control over styling

### Option 3: Source Import (Maximum Customization)

```typescript
import { ColorPicker, ColorMode } from '@marcosfreitas/pastel-color-picker/src';

// Direct source import - full control over styling
```

**Which option to choose:**

| Scenario | Use This | Why |
|----------|----------|-----|
| 🚀 **Quick prototyping** | Self-contained | Works immediately, no setup |
| ⚡ **Existing Tailwind v4 project** | **Headless** | Avoids duplicate CSS, smaller bundle |
| 🎨 **Custom design system** | Headless or Source | Full control over styling |
| 🔧 **Need to modify components** | Source | Direct access to component code |
| 📦 **Bundle size matters** | **Headless** | ~35KB CSS savings |

## 🚀 Complete Example

```tsx
import { ColorPicker, ColorValue, ColorMode } from '@marcosfreitas/pastel-color-picker';
import '@marcosfreitas/pastel-color-picker/style.css';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState<ColorValue>();

  const handleColorChange = (newColor: ColorValue, isRandom?: boolean) => {
    console.log('Color changed:', newColor);
    if (isRandom) {
      console.log('This was a random color generation!');
    }
    setColor(newColor);
  };

  return (
    <div>
      <h1>My Color Picker App</h1>
      
      <ColorPicker
        variant="circles"
        defaultColor={color}
        onColorChange={handleColorChange}
        colorMode={ColorMode.PASTEL}
        showAlpha={true}
        title="Choose Your Color"
        onPresetClick={(presetColor) => console.log('Preset clicked:', presetColor)}
      />
      
      {color && (
        <div 
          style={{ 
            width: 100, 
            height: 100, 
            backgroundColor: color.hexa,
            marginTop: 20
          }}
        >
          Selected: {color.hexa}
        </div>
      )}
    </div>
  );
}
```

## 🔧 Headless Version Setup

For the headless version, ensure your `tailwind.config.js` includes:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@marcosfreitas/pastel-color-picker/**/*.js', // Add this!
  ],
  // ... rest of your config
};
```
