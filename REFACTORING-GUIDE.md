# Pastel Color Picker - Style Refactoring Guide

## Overview
This document outlines the refactoring of all component styles from utility-based classes to a BEM (Block Element Modifier) methodology using the `pcp` prefix for better organization and maintainability.

## File Structure
```
src/
├── css/
│   ├── index.css       # Main entry point, imports all styles
│   ├── base.css        # CSS custom properties and root styles
│   ├── button.css      # Button component styles
│   ├── dialog.css      # Dialog component styles
│   ├── color-picker.css # Color picker main component styles
│   ├── circles.css     # Circles variant styles
│   └── slider.css      # Slider component styles
└── ColorPicker.tsx     # Updated to import ./css/index.css
```

## BEM Methodology

### Naming Convention
- **Block**: `.pcp-[component]` (e.g., `.pcp-button`, `.pcp-dialog`)
- **Element**: `.pcp-[component]__[element]` (e.g., `.pcp-button__content`)
- **Modifier**: `.pcp-[component]--[modifier]` (e.g., `.pcp-button--size-lg`)

### Components

#### Button Component
**Block**: `.pcp-button`
**Elements**:
- `.pcp-button__content` - Button content wrapper

**Modifiers**:
- `.pcp-button--variant-default` - Default button style
- `.pcp-button--variant-outline` - Outline button style
- `.pcp-button--variant-secondary` - Secondary button style
- `.pcp-button--variant-ghost` - Ghost button style
- `.pcp-button--size-sm` - Small size
- `.pcp-button--size-md` - Medium size
- `.pcp-button--size-lg` - Large size
- `.pcp-button--size-icon` - Icon button size
- `.pcp-button--color-picker` - Color picker specific styles

#### Dialog Component
**Block**: `.pcp-dialog`
**Elements**:
- `.pcp-dialog__overlay` - Dialog backdrop
- `.pcp-dialog__content` - Dialog content container
- `.pcp-dialog__header` - Dialog header
- `.pcp-dialog__title` - Dialog title
- `.pcp-dialog__description` - Dialog description
- `.pcp-dialog__footer` - Dialog footer
- `.pcp-dialog__close` - Dialog close button

**Animation States**:
- `.pcp-dialog--state-open` - Open animation state
- `.pcp-dialog--state-closed` - Close animation state

#### Color Picker Component
**Block**: `.pcp-color-picker`
**Elements**:
- `.pcp-color-picker__preview-container` - Preview container
- `.pcp-color-picker__preview` - Color preview element
- `.pcp-color-picker__info` - Color information display
- `.pcp-color-picker__label` - Color picker labels
- `.pcp-color-picker__value` - Color value display
- `.pcp-color-picker__controls` - Controls container
- `.pcp-color-picker__sliders` - Sliders container
- `.pcp-color-picker__slider-group` - Individual slider group
- `.pcp-color-picker__presets` - Color presets container
- `.pcp-color-picker__preset` - Individual preset color
- `.pcp-color-picker__actions` - Action buttons container
- `.pcp-color-picker__separator` - Visual separator
- `.pcp-color-picker__badge` - Color value badge

**Modifiers**:
- `.pcp-color-picker__preset--selected` - Selected preset
- `.pcp-color-picker__preset--disabled` - Disabled preset

#### Circles Variant Component
**Block**: `.pcp-circles`
**Elements**:
- `.pcp-circles__circle` - Individual color circle
- `.pcp-circles__more-button` - More colors button

**Modifiers**:
- `.pcp-circles--size-sm` - Small size
- `.pcp-circles--size-md` - Medium size
- `.pcp-circles--size-lg` - Large size
- `.pcp-circles--disabled` - Disabled state
- `.pcp-circles__circle--selected` - Selected circle
- `.pcp-circles__circle--disabled` - Disabled circle
- `.pcp-circles__more-button--disabled` - Disabled more button

#### Slider Component
**Block**: `.pcp-slider`
**Elements**:
- `.pcp-slider__track` - Slider track
- `.pcp-slider__range` - Slider active range
- `.pcp-slider__thumb` - Slider thumb/handle

**Modifiers**:
- `.pcp-slider--hue` - Hue slider with color gradient
- `.pcp-slider--saturation` - Saturation slider
- `.pcp-slider--lightness` - Lightness slider
- `.pcp-slider--alpha` - Alpha slider with transparency pattern
- `.pcp-slider--disabled` - Disabled slider
- `.pcp-slider--vertical` - Vertical orientation

## Benefits

### 1. Better Organization
- Styles are logically grouped by component
- Clear separation of concerns
- Easy to locate and modify specific component styles

### 2. Reduced CSS Conflicts
- Scoped component styles with `pcp` prefix
- No more global utility class conflicts
- Predictable CSS specificity

### 3. Maintainability
- BEM methodology provides clear naming conventions
- Easy to understand the relationship between styles
- Reduced CSS bloat by removing unused utility classes

### 4. Performance
- Smaller CSS bundle size
- More targeted styles
- Better browser caching due to logical file separation

## Migration Notes

### Before (Utility Classes)
```tsx
<button className={cn(
  'pcp-bg-background pcp-text-foreground',
  'pcp-rounded-lg pcp-border-2 pcp-border-gray-200',
  'pcp-transition-all pcp-duration-200',
  'hover:pcp-border-gray-300 hover:pcp-scale-105',
  disabled && 'pcp-opacity-50 pcp-cursor-not-allowed'
)} />
```

### After (BEM Classes)
```tsx
<button className={cn(
  'pcp-button pcp-button--color-picker',
  `pcp-button--size-${size}`,
  disabled && 'pcp-button--disabled'
)} />
```

## Custom Properties
All color values use CSS custom properties defined in `base.css`:
- `--pcp-color-primary`
- `--pcp-color-background`
- `--pcp-color-foreground`
- `--pcp-color-border`
- etc.

This ensures consistent theming across all components while maintaining the ability to customize colors at the root level.

## Browser Support
The refactored styles maintain the same browser support as the original utility classes, with CSS custom properties supported in all modern browsers. 