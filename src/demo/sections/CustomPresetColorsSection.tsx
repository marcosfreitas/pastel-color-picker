import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { ColorPicker } from '../../ColorPicker';
import { ColorValue, ColorMode } from '../../types';
import { PRESET_COLORS, PRESET_PASTEL_COLORS } from '../../constants';

export function CustomPresetColorsSection() {
  const [customDefaultPastelColor, setCustomDefaultPastelColor] = useState<ColorValue | undefined>(undefined);
  const [customDefaultVibrantColor, setCustomDefaultVibrantColor] = useState<ColorValue | undefined>(undefined);

  return (
    <section id="custom-preset-colors">
      <Card className="p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">🎨 Custom Preset Colors or Default One</h2>
        <p className="text-sm text-muted-foreground">
          Override the default preset colors by providing your own custom palette using the <code className="bg-muted px-1 py-0.5 rounded text-xs">presets</code> prop.
        </p>
        <p className="text-sm text-muted-foreground">
          This example shows a custom vibrant color palette that replaces the default pastel/vibrant presets.
        </p>
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold mb-4">Custom Palette</h3>
          <div className="flex items-center gap-4">
            <ColorPicker
              variant="button"
              size="md"
              disabled={false}
              presets={[
                // blue range
                '#0000FF', '#0000EE', '#0000DD', '#0000CC',
                '#0000BB', '#0000AA', '#000099', '#000088',
                '#000077', '#000066', '#000055', '#000044',
                '#000033', '#000022', '#000011', '#000000',
              ]}
              colorMode={ColorMode.VIVID}
              label="Custom Colors"
              onColorChange={() => {}}
            />
          </div>

          <div className="p-3 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground mb-2">Example usage:</p>
            <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words">
{`import { ColorPicker } from '@marcosfreitas/pastel-color-picker';

<ColorPicker
  variant="button"
  presets={[
    // blue range
    '#0000FF', '#0000EE', '#0000DD', '#0000CC',
    '#0000BB', '#0000AA', '#000099', '#000088',
    '#000077', '#000066', '#000055', '#000044',
    '#000033', '#000022', '#000011', '#000000',
  ]}
  colorMode={ColorMode.VIVID}
  label="Custom Colors"
/>`}
            </pre>
          </div>

          <div className="text-xs text-muted-foreground">
            <strong>Note:</strong> When <code className="bg-muted px-1 py-0.5 rounded">presets</code> is provided, 
            it overrides both pastel and vibrant default palettes. The <code className="bg-muted px-1 py-0.5 rounded">colorMode</code> prop 
            does not make any difference in this case.
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold mb-4">
            Default Preset Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Pastel Mode</Label>
              <div className="mt-1 space-y-2 flex justify-start items-start gap-2">
                <ColorPicker
                  variant="button"
                  size="md"
                  disabled={false}
                  colorMode={ColorMode.PASTEL}
                  presets={PRESET_PASTEL_COLORS}
                  label="Pastel"
                  onColorChange={(color) => setCustomDefaultPastelColor(color)}
                />

                <div
                  className="w-11 h-11 rounded-lg border-2"
                  style={{ backgroundColor: customDefaultPastelColor?.hexa }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
               First pastel preset: <strong style={{ color: PRESET_PASTEL_COLORS[0] }}>{PRESET_PASTEL_COLORS[0]}</strong>
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Vibrant Mode</Label>
              
              <div className="mt-1 space-y-2 flex justify-start items-start gap-2">
                <ColorPicker
                  variant="button"
                  size="md"
                  disabled={false}
                  colorMode={ColorMode.VIVID}
                  presets={PRESET_COLORS}
                  label="Vibrant"
                  onColorChange={(color) => setCustomDefaultVibrantColor(color)}
                />

                <div
                  className="w-10 h-10 rounded-lg border-2"
                  style={{ backgroundColor: customDefaultVibrantColor?.hexa }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                First vibrant preset: <strong style={{ color: PRESET_COLORS[0] }}>{PRESET_COLORS[0]}</strong>
              </p>
            </div>
          </div>
        </div>

      </Card>
    </section>
  );
} 