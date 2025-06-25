# Scoped CSS Variables - No Global Conflicts

## Overview

The Pastel Color Picker component now uses **scoped CSS variables** to prevent conflicts with other projects. All CSS custom properties are prefixed with `--pcp-` and scoped to specific selectors.

## Implementation

### Before (Global - Could Cause Conflicts)
```css
:root {
  --color-background: 0 0% 100%;
  --color-primary: 222.2 47.4% 11.2%;
  --radius: 0.5rem;
}
```

### After (Scoped - No Conflicts)
```css
.pcp-root,
[data-pcp-root] {
  --pcp-color-background: 0 0% 100%;
  --pcp-color-primary: 222.2 47.4% 11.2%;
  --pcp-radius: 0.5rem;
}
```

## How It Works

1. **Scoped Selectors**: Variables are only available within `.pcp-root` or `[data-pcp-root]` elements
2. **Prefixed Variables**: All variables use `--pcp-` prefix to avoid naming conflicts
3. **Automatic Application**: The main `ColorPicker` component automatically adds `pcp-root` class
4. **Portal Support**: Dialog components use `data-pcp-root` attribute for portal-rendered content

## Usage

The scoping is automatic - no changes needed in your code:

```tsx
// This automatically gets the pcp-root class
<ColorPicker value={color} onChange={setColor} />

// CSS variables are scoped to this component only
// Your project's --color-primary won't conflict with --pcp-color-primary
```

## Benefits

- ✅ **No Global Pollution**: CSS variables don't leak into global scope
- ✅ **No Naming Conflicts**: Prefixed variables prevent collisions
- ✅ **Framework Agnostic**: Works with any CSS framework (Tailwind, Bootstrap, etc.)
- ✅ **Automatic Scoping**: No manual setup required
- ✅ **Portal Compatible**: Works with React portals and dialogs

## CSS Architecture

```
Your Project CSS:
:root {
  --color-primary: blue;     ← Your project's primary color
  --background: white;       ← Your project's background
}

Pastel Color Picker CSS:
.pcp-root {
  --pcp-color-primary: red;  ← Component's primary color (scoped)
  --pcp-background: gray;    ← Component's background (scoped)
}
```

Both can coexist without conflicts! 