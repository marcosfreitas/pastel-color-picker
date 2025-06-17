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

// RGB to HSV conversion
export function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}

// HSV to RGB conversion
export function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  const c = v * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 1/6) {
    r = c; g = x; b = 0;
  } else if (1/6 <= h && h < 2/6) {
    r = x; g = c; b = 0;
  } else if (2/6 <= h && h < 3/6) {
    r = 0; g = c; b = x;
  } else if (3/6 <= h && h < 4/6) {
    r = 0; g = x; b = c;
  } else if (4/6 <= h && h < 5/6) {
    r = x; g = 0; b = c;
  } else if (5/6 <= h && h < 1) {
    r = c; g = 0; b = x;
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

// Generate random pastel color
// Based on RGB(226, 115, 126) analysis: H≈351°, S≈62%, V≈89%
// This creates colors with similar pastel intensity and softness
export function generateRandomColor(isPastel: boolean = true): ColorValue {
  const h = Math.floor(Math.random() * 360);
  
  if (isPastel) {
    // Pastel colors: moderate saturation (45-75%) and higher brightness (75-95%)
    // This matches the intensity of RGB(226, 115, 126) which has S≈62%, V≈89%
    const s = 45 + Math.random() * 30; // 45-75% saturation
    const v = 75 + Math.random() * 20; // 75-95% brightness
    
    const [r, g, b] = hsvToRgb(h, s, v);
    const hex = rgbToHex(r, g, b);
    
    return {
      hexa: hex,
      rgba: { r, g, b, a: 1 },
      hsva: { h, s, v, a: 1 }
    };
  } else {
    // Vibrant colors: higher saturation and varied brightness
    const s = 60 + Math.random() * 40; // 60-100% saturation
    const v = 50 + Math.random() * 50; // 50-100% brightness
    
    const [r, g, b] = hsvToRgb(h, s, v);
    const hex = rgbToHex(r, g, b);
    
    return {
      hexa: hex,
      rgba: { r, g, b, a: 1 },
      hsva: { h, s, v, a: 1 }
    };
  }
}

// Generate a pastel color based on a specific RGB example
export function generatePastelFromRgb(baseR: number, baseG: number, baseB: number): ColorValue {
  // Convert base RGB to HSL to understand its characteristics
  const [baseH, baseS, baseL] = rgbToHsl(baseR, baseG, baseB);
  
  // Generate a new hue while maintaining similar saturation and lightness characteristics
  const h = Math.floor(Math.random() * 360);
  const s = Math.max(30, Math.min(80, baseS + (Math.random() - 0.5) * 20)); // ±10% variation
  const l = Math.max(50, Math.min(85, baseL + (Math.random() - 0.5) * 20)); // ±10% variation
  
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
  
  const [h, s, v] = rgbToHsv(rgb.r, rgb.g, rgb.b);
  
  return {
    hexa: hex,
    rgba: { ...rgb, a: alpha },
    hsva: { h, s, v, a: alpha }
  };
} 