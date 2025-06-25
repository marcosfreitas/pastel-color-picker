import React from 'react';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { ColorMode } from '../../types';

interface LiveConfigSectionProps {
  isPastel: boolean;
  showAlpha: boolean;
  showPresets: boolean;
  showColorArea: boolean;
  hideSliders: boolean;
  onPastelChange: (checked: boolean) => void;
  onAlphaChange: (checked: boolean) => void;
  onPresetsChange: (checked: boolean) => void;
  onColorAreaChange: (checked: boolean) => void;
  onHideSlidersChange: (checked: boolean) => void;
}

export function LiveConfigSection({
  isPastel,
  showAlpha,
  showPresets,
  showColorArea,
  hideSliders,
  onPastelChange,
  onAlphaChange,
  onPresetsChange,
  onColorAreaChange,
  onHideSlidersChange
}: LiveConfigSectionProps) {
  return (
    <section id="live-config" className="space-y-4">
      <Card className="p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">🎨 Live Configuration</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Toggle these settings to see how they affect all color pickers below
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <Label htmlFor="pastel-mode" className="text-sm font-medium">Pastel Colors</Label>
            <Switch
              id="pastel-mode"
              checked={isPastel}
              onCheckedChange={onPastelChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="alpha-channel" className="text-sm font-medium">Show Alpha Channel</Label>
            <Switch
              id="alpha-channel"
              checked={showAlpha}
              onCheckedChange={onAlphaChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="show-presets" className="text-sm font-medium">Show Preset Colors</Label>
            <Switch
              id="show-presets"
              checked={showPresets}
              onCheckedChange={onPresetsChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="show-color-area" className="text-sm font-medium">2D Color Area</Label>
            <Switch
              id="show-color-area"
              checked={showColorArea}
              onCheckedChange={onColorAreaChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="hide-sliders" className="text-sm font-medium">Hide Sliders</Label>
            <Switch
              id="hide-sliders"
              checked={hideSliders}
              onCheckedChange={onHideSlidersChange}
            />
          </div>
        </div>
      </Card>
    </section>
  );
} 