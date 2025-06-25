import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { ColorPicker } from '../../ColorPicker';
import { ColorValue, ColorMode } from '../../types';
import { EXAMPLE_PASTEL_VARIATIONS, PRESET_PASTEL_COLORS } from '../../constants';

export function PastelColorAnalysisSection() {
  const [enhancedPastelColor, setEnhancedPastelColor] = useState<ColorValue>({
    hexa: '#45B7D1',
    rgba: { r: 69, g: 183, b: 209, a: 1 },
    hsva: { h: 191, s: 67, v: 82, a: 1 }
  });

  return (
    <section id="pastel-color-analysis">
      <Card className="p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">🎨 Pastel Color Analysis</h2>
        <p className="text-sm text-muted-foreground">
          This section provides a detailed analysis of our approach to generating pastel colors.
        </p>
        <p className="text-sm text-muted-foreground">
          We use a combination of algorithms to generate pastel colors that are both visually appealing and easy to use.
        </p>
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold mb-4">
            RGB(226, 115, 126)
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Reference: Dusty Rose</h4>
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-16 h-16 rounded-lg border-2"
                  style={{ backgroundColor: 'rgb(226, 115, 126)' }}
                />
                <div className="space-y-1">
                  <p className="text-sm font-mono">RGB(226, 115, 126)</p>
                  <p className="text-sm font-mono">#E2737E</p>
                  <p className="text-xs text-muted-foreground">HSL(351°, 62%, 67%)</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This dusty rose color exemplifies perfect pastel characteristics: <strong>moderate saturation (62%)</strong> and <strong>balanced lightness (67%)</strong>. Our improved pastel system generates colors within similar ranges.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Generated Pastel Variations</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Using our <code className="bg-neutral-100 px-1 py-0.5 rounded text-xs">generatePastelVariation()</code> function 
                with the RGB(226, 115, 126) base:
              </p>
              <div className="flex gap-2 mb-3">
                {EXAMPLE_PASTEL_VARIATIONS.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-12 h-12 rounded-lg border-2 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <p className="text-xs font-mono mt-1">{color}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Left to right: <strong>Original</strong>, <strong>Lighter variation</strong>, <strong>Darker variation</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 p-3 bg-neutral-100 rounded-md">
              <div className="space-y-2">
                <p className="text-sm font-medium">Current Algorithm</p>
                <p className="text-xs text-blue-800">
                  <strong>Saturation:</strong> 45-75% (balanced)
                </p>
                <p className="text-xs text-blue-800">
                  <strong>Lightness:</strong> 60-80% (better contrast)
                </p>
              </div>

              <div className="space-y-2 flex justify-start items-start gap-2">
                <ColorPicker
                  variant="random"
                  size="md"
                  disabled={false}
                  colorMode={ColorMode.PASTEL}
                  presets={PRESET_PASTEL_COLORS}
                  defaultColor={enhancedPastelColor}
                  onColorChange={(color) => setEnhancedPastelColor(color)}
                />

                <div
                  className="w-10 h-10 rounded-lg border-2"
                  style={{ backgroundColor: enhancedPastelColor.hexa }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
} 