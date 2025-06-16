import { ColorValue } from '../types';

// HSL to RGB conversion
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const hueToRgb = (m: number, n: number, o: number) => {
    if (o < 0) o += 1;
    if (o > 1) o -= 1;
    if (o < 1/6) return m + (n - m) * 6 * o;
    if (o < 1/2) return n;
    if (o < 2/3) return m + (n - m) * (2/3 - o) * 6;
    return m;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1/3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// RGB to Hex conversion
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Hex to RGB conversion
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// RGB to HSL conversion
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Generate random pastel color
export function generateRandomColor(isPastel: boolean = true): ColorValue {
  const h = Math.floor(Math.random() * 360);
  const s = isPastel ? 70 + Math.random() * 30 : 50 + Math.random() * 50; // 70-100% for pastel, 50-100% for vibrant
  const l = isPastel ? 75 + Math.random() * 15 : 40 + Math.random() * 40; // 75-90% for pastel, 40-80% for vibrant
  
  const [r, g, b] = hslToRgb(h, s, l);
  const hex = rgbToHex(r, g, b);
  
  return {
    hexa: hex,
    rgba: { r, g, b, a: 1 },
    hsva: { h, s: s, v: l, a: 1 }
  };
}

// Convert hex to ColorValue
export function hexToColorValue(hex: string, alpha: number = 1): ColorValue {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return {
      hexa: '#000000',
      rgba: { r: 0, g: 0, b: 0, a: alpha },
      hsva: { h: 0, s: 0, v: 0, a: alpha }
    };
  }
  
  const [h, s, l] = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  return {
    hexa: hex,
    rgba: { ...rgb, a: alpha },
    hsva: { h, s, v: l, a: alpha }
  };
} 