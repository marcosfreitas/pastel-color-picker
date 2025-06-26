# 🎨 Pastel Color Picker

[![npm version](https://img.shields.io/npm/v/%40marcosfreitas%2Fpastel-color-picker)](https://www.npmjs.com/package/@marcosfreitas/pastel-color-picker)
[![Node.js](https://img.shields.io/badge/Node.js-22+-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-green.svg)](https://reactjs.org/)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-green.svg)](https://www.w3.org/WAI/WCAG21/Understanding/)

## 📋 Summary

A comprehensive React color picker component with multiple variants, pastel color support, and alpha channel control. Built with Radix UI primitives and modern CSS architecture.

**Key Features:**
- 🎯 **Multiple Variants** - Button, Circles, and Random selection modes
- 🌈 **Pastel & Vivid Colors** - Smart color generation for different aesthetics  
- 💧 **Alpha Channel Support** - Transparency control with visual feedback
- ♿ **WCAG 2.1 AA Compliant** - Full accessibility with screen reader support
- 🔧 **TypeScript Ready** - Complete type safety with detailed interfaces
- ⚡ **Modern Stack** - Built with Radix UI primitives and BEM CSS methodology
- 📦 **Flexible Installation** - Self-contained, headless, or source import options

## 📑 Table of Contents

- [✨ Features](#-features)
- [🎯 How It Works](#-how-it-works)
- [🚀 Demo](#-demo)
- [📦 Installation](#-installation)
- [🎯 Quick Start](#-quick-start)
- [🔧 API Reference](#-api-reference)
  - [🔍 Import Clarification](#-import-clarification)
  - [ColorPickerProps](#colorpickerprops)
  - [Event Callbacks](#event-callbacks)
  - [ColorValue Interface](#colorvalue-interface)
  - [ColorMode Enum](#colormode-enum)
- [🎨 Variants](#-variants)
  - [Button Variant](#button-variant-default)
  - [Circles Variant](#circles-variant)
  - [Random Variant](#random-variant)
  - [Variant Comparison](#-variant-comparison)
- [🌈 Color Modes](#-color-modes)
- [🎨 Styling](#-styling)
- [♿ Accessibility](#-accessibility)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

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
// Runtime imports (from .js files)
import { ColorPicker, ColorModeEnum } from '@marcosfreitas/pastel-color-picker';
// Type imports (from .d.ts files)
import type { ColorValue } from '@marcosfreitas/pastel-color-picker';
// CSS import
import '@marcosfreitas/pastel-color-picker/style.css';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState<ColorValue>();

  return (
    <ColorPicker
      defaultColor={color}
      onColorChange={setColor}
      variant="button"
      colorMode={ColorModeEnum.PASTEL}  // Use enum for runtime
      // OR colorMode="pastel"         // Use string literal
      showAlpha={true}
    />
  );
}
```

## 🔧 API Reference

### 🔍 Import Clarification

**Important:** Types (`ColorValue`, `ColorMode`, etc.) must be imported separately from runtime values:

```tsx
// ✅ Correct - Import types separately
import { ColorPicker, ColorModeEnum } from '@marcosfreitas/pastel-color-picker';
import type { ColorValue, ColorMode } from '@marcosfreitas/pastel-color-picker';

// ❌ Incorrect - Types don't exist in JS runtime
import { ColorPicker, ColorValue, ColorMode } from '@marcosfreitas/pastel-color-picker';
```

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
