import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { ColorPicker } from '../../ColorPicker';
import { ColorValue, ColorModeEnum } from '../../types';
import { PRESET_COLORS, PRESET_PASTEL_COLORS } from '../../constants';

export function CustomPresetColorsSection() {
  const [customDefaultNormalColor, setCustomDefaultNormalColor] = useState<ColorValue | undefined>(undefined);
  const [customDefaultPastelColor, setCustomDefaultPastelColor] = useState<ColorValue | undefined>(undefined);
  const [customDefaultVibrantColor, setCustomDefaultVibrantColor] = useState<ColorValue | undefined>(undefined);

  return (
    <section id="custom-preset-colors">
      <Card className="p-6 border border-border dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">🎨 Custom Preset Colors or Default One</h2>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Override the default preset colors by providing your own custom palette using the <code className="bg-muted px-1 py-0.5 rounded text-xs dark:bg-gray-700 dark:text-gray-100">presets</code> prop.
        </p>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          This example shows a custom vibrant color palette that replaces the default pastel/vibrant presets.
        </p>
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Custom Palette</h3>
          <div className="flex items-center gap-4">
            <ColorPicker
              variant="button"
              size="md"
              showColorBar={false}
              presets={[
                // blue range
                '#00FFFF', '#0000EE', '#0000DD', '#0000CC',
                '#0000BB', '#0000AA', '#000099', '#000088',
                '#000077', '#000066', '#000055', '#000044',
                '#000033', '#000022', '#000011', '#000000',
              ]}
              colorMode={ColorModeEnum.VIVID}
              label="Custom Colors"
              onColorChange={() => {}}
            />
          </div>

          <div className="p-3 bg-muted rounded-md dark:bg-gray-700">
            <p className="text-xs text-muted-foreground mb-2 dark:text-gray-400">Example usage:</p>
            <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words dark:text-gray-100">
{`
<ColorPicker
  variant="button"
  showColorBar={false}
  presets={[
    // blue range for the presets and default color only
    '#00FFFF', '#0000EE', '#0000DD', '#0000CC',
    '#0000BB', '#0000AA', '#000099', '#000088',
    '#000077', '#000066', '#000055', '#000044',
    '#000033', '#000022', '#000011', '#000000',
  ]}
  colorMode={ColorModeEnum.VIVID} // still required
  label="Custom Colors"
/>`}
            </pre>
          </div>

          <div className="text-xs text-muted-foreground dark:text-gray-400">
            <strong>Note:</strong> When <code className="bg-muted px-1 py-0.5 rounded dark:bg-gray-700 dark:text-gray-100">presets</code> is provided, 
            it overrides both pastel and vibrant default palettes. However, the <code className="bg-muted px-1 py-0.5 rounded dark:bg-gray-700 dark:text-gray-100">colorMode</code> prop 
            still affects random color generation (when using the random button or random variant).
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">
            Default Preset Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-gray-100">Normal Mode</label>
              <div className="mt-1 space-y-2 flex justify-start items-start gap-2">
                <ColorPicker
                  variant="button"
                  size="md"
                  colorMode={ColorModeEnum.NORMAL}
                  label="Normal"
                  onColorChange={(color) => setCustomDefaultNormalColor(color)}
                />
                <div
                  className="w-11 h-11 rounded-lg border-2 dark:border-gray-500"
                  style={{ backgroundColor: customDefaultNormalColor?.hexa }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                First normal preset: <strong style={{ color: PRESET_COLORS[0] }}>{PRESET_COLORS[0]}</strong>
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-gray-100">Pastel Mode</label>
              <div className="mt-1 space-y-2 flex justify-start items-start gap-2">
                <ColorPicker
                  variant="button"
                  size="md"
                  showColorBar={false}
                  colorMode={ColorModeEnum.PASTEL}
                  presets={PRESET_PASTEL_COLORS}
                  label="Pastel"
                  onColorChange={(color) => setCustomDefaultPastelColor(color)}
                />

                <div
                  className="w-11 h-11 rounded-lg border-2 dark:border-gray-500"
                  style={{ backgroundColor: customDefaultPastelColor?.hexa }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
               First pastel preset: <strong style={{ color: PRESET_PASTEL_COLORS[0] }}>{PRESET_PASTEL_COLORS[0]}</strong>
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-gray-100">Vibrant Mode</label>
              
              <div className="mt-1 space-y-2 flex justify-start items-start gap-2">
                <ColorPicker
                  variant="button"
                  size="md"
                  showColorBar={false}
                  colorMode={ColorModeEnum.VIVID}
                  presets={PRESET_COLORS}
                  label="Vibrant"
                  onColorChange={(color) => setCustomDefaultVibrantColor(color)}
                />

                <div
                  className="w-10 h-10 rounded-lg border-2 dark:border-gray-500"
                  style={{ backgroundColor: customDefaultVibrantColor?.hexa }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                First vibrant preset: <strong style={{ color: PRESET_COLORS[0] }}>{PRESET_COLORS[0]}</strong>
              </p>
            </div>
          </div>
        </div>

      </Card>
    </section>
  );
} 