// Predefined vivid color palette
export const PRESET_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#FFFFFF', '#000000'
];

// Enhanced pastel colors - based on RGB(226, 115, 126) intensity
// These colors maintain soft, muted tones with similar lightness and saturation characteristics
export const PRESET_PASTEL_COLORS = [
  // Row 1: Warm pastels (pinks, corals, peaches)
  '#E2737E', // Exact RGB(226, 115, 126) - dusty rose reference
  '#F2A5A5', // Soft coral pink
  '#E8B4CB', // Muted pink
  '#F0C4A0', // Soft peach
  '#E6C2B7', // Dusty beige-pink
  
  // Row 2: Cool pastels (blues, greens, purples)
  '#A5C9E2', // Soft sky blue
  '#B8E6D1', // Mint green
  '#C9A5E2', // Soft lavender
  '#A5E2D4', // Seafoam green
  '#B5D4F0', // Powder blue
  
  // Row 3: Neutral pastels (grays, taupes, soft yellows)
  '#E2D5C2', // Warm beige
  '#F0E8A5', // Soft butter yellow
  '#D1C7E2', // Soft periwinkle
  '#777777', // pastel black
  '#fffff5', // pastel light
];

// Helper function to generate pastel variations of a color
export function generatePastelVariation(baseRgb: { r: number; g: number; b: number }): string[] {
  const variations = [];
  
  // Base color
  const baseHex = `#${baseRgb.r.toString(16).padStart(2, '0')}${baseRgb.g.toString(16).padStart(2, '0')}${baseRgb.b.toString(16).padStart(2, '0')}`;
  variations.push(baseHex);
  
  // Lighter variation (increase lightness by 15%)
  const lighter = {
    r: Math.min(255, Math.round(baseRgb.r + (255 - baseRgb.r) * 0.3)),
    g: Math.min(255, Math.round(baseRgb.g + (255 - baseRgb.g) * 0.3)),
    b: Math.min(255, Math.round(baseRgb.b + (255 - baseRgb.b) * 0.3))
  };
  const lighterHex = `#${lighter.r.toString(16).padStart(2, '0')}${lighter.g.toString(16).padStart(2, '0')}${lighter.b.toString(16).padStart(2, '0')}`;
  variations.push(lighterHex);
  
  // Slightly darker variation (decrease lightness by 10%)
  const darker = {
    r: Math.max(0, Math.round(baseRgb.r * 0.85)),
    g: Math.max(0, Math.round(baseRgb.g * 0.85)),
    b: Math.max(0, Math.round(baseRgb.b * 0.85))
  };
  const darkerHex = `#${darker.r.toString(16).padStart(2, '0')}${darker.g.toString(16).padStart(2, '0')}${darker.b.toString(16).padStart(2, '0')}`;
  variations.push(darkerHex);
  
  return variations;
}

 