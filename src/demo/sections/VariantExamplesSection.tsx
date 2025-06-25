import React from 'react';
import { ColorPicker } from '../../ColorPicker';
import { Switch } from '../../components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Palette, Circle, Shuffle } from 'lucide-react';
import { ColorValue, ColorMode } from '../../types';
import { PRESET_COLORS, PRESET_PASTEL_COLORS } from '../../constants';
import { cn } from '../../utils/cn';

interface VariantState {
  color?: ColorValue;
  config: {
    size: 'sm' | 'md' | 'lg';
    disabled: boolean;
    title: string;
    colorMode: ColorMode;
    showColorArea: boolean;
    showPresets: boolean;
    showHue: boolean;
    showSaturation: boolean;
    showLightness: boolean;
    showAlpha: boolean;
    showRandomButton: boolean;
    hideSliders: boolean;
  };
}

interface VariantExamplesSectionProps {
  variantStates: {
    button: VariantState;
    circles: VariantState;
    random: VariantState;
  };
  updateVariantConfig: (variant: keyof VariantExamplesSectionProps['variantStates'], configUpdates: Partial<VariantState['config']>) => void;
  updateVariantColor: (variant: keyof VariantExamplesSectionProps['variantStates'], color: ColorValue) => void;
}

export function VariantExamplesSection({
  variantStates,
  updateVariantConfig,
  updateVariantColor
}: VariantExamplesSectionProps) {
  // Configuration panel component
  const ConfigurationPanel = ({ variant, title }: { variant: keyof typeof variantStates, title: string }) => {
    const state = variantStates[variant];
    
    return (
      <Card className="w-full border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">🎨 {title} Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Props */}
          <div className="space-y-3">
            <Label className="text-xs font-medium">Basic Properties</Label>
            
            {/* Size */}
            <div className="mt-4 space-y-2 flex items-center gap-2">
              <div className="flex gap-1">
                {(['sm', 'md', 'lg'] as const).map(size => (
                  <button
                    key={size}
                    className={cn("text-xs px-2 h-7 rounded-md bg-secondary text-primary", state.config.size === size ? 'border-2' : '')}
                    onClick={() => updateVariantConfig(variant, { size })}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Disabled */}
            <div className="flex items-center space-x-2">
              <Switch
                id={`${variant}-disabled`}
                checked={state.config.disabled}
                onCheckedChange={(checked) => updateVariantConfig(variant, { disabled: checked })}
              />
              <Label htmlFor={`${variant}-disabled`} className="text-xs">Disabled</Label>
            </div>
          </div>

          {/* Color Mode */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Color Mode</Label>
            <div className="mt-4 flex gap-1">
              <button
                type="button"
                className={cn("text-xs px-2 h-7 rounded-md bg-secondary text-primary", state.config.colorMode === ColorMode.PASTEL ? 'border-2' : '')}
                onClick={() => updateVariantConfig(variant, { colorMode: ColorMode.PASTEL })}
              >
                Pastel
              </button>
              <button
                type="button"
                className={cn("text-xs px-2 h-7 rounded-md bg-secondary text-primary", state.config.colorMode === ColorMode.VIVID ? 'border-2' : '')}
                onClick={() => updateVariantConfig(variant, { colorMode: ColorMode.VIVID })}
              >
                Vivid
              </button>
            </div>
          </div>

          {/* Dialog Features - Only show for variants that have dialogs */}
          {variant !== 'random' && (
            <div className="space-y-3">
              <Label className="text-xs font-medium">Dialog Features</Label>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-color-area`}
                    checked={state.config.showColorArea}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showColorArea: checked })}
                  />
                  <Label htmlFor={`${variant}-color-area`} className="text-xs">Color Area</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-presets`}
                    checked={state.config.showPresets}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showPresets: checked })}
                  />
                  <Label htmlFor={`${variant}-presets`} className="text-xs">Presets</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-hue`}
                    checked={state.config.showHue}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showHue: checked })}
                  />
                  <Label htmlFor={`${variant}-hue`} className="text-xs">Hue Slider</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-saturation`}
                    checked={state.config.showSaturation}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showSaturation: checked })}
                  />
                  <Label htmlFor={`${variant}-saturation`} className="text-xs">Saturation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-lightness`}
                    checked={state.config.showLightness}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showLightness: checked })}
                  />
                  <Label htmlFor={`${variant}-lightness`} className="text-xs">Lightness</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-alpha`}
                    checked={state.config.showAlpha}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showAlpha: checked })}
                  />
                  <Label htmlFor={`${variant}-alpha`} className="text-xs">Alpha</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-random`}
                    checked={state.config.showRandomButton}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showRandomButton: checked })}
                  />
                  <Label htmlFor={`${variant}-random`} className="text-xs">Random Button</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-hide-sliders`}
                    checked={state.config.hideSliders}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { hideSliders: checked })}
                  />
                  <Label htmlFor={`${variant}-hide-sliders`} className="text-xs">Hide Sliders</Label>
                </div>
              </div>
            </div>
          )}

          {/* Random Variant Specific Note */}
          {variant === 'random' && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Note:</strong> The Random variant is a simple button that generates random colors directly. 
                It doesn't open a dialog, so only <a href="#custom-preset-colors" className="text-black" style={{textDecoration:'underline'}}>Presets</a> and <a href="#color-mode" className="text-blue-700 decoration-underline">Color Mode</a> affects its behavior.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="variant-examples" className="flex flex-col md:flex-row gap-4 items-stretch">

      {/* Button Variant */}
      <Card className="border border-border md:w-2/6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            Button Variant
          </CardTitle>
          <CardDescription>
            Perfect for form controls and action buttons. Supports icons, labels, and flexible content sizing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Live Examples</Label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg flex-wrap">
                  {/* Color only button */}
                  <ColorPicker
                    variant="button"
                    size={variantStates.button.config.size}
                    disabled={variantStates.button.config.disabled}
                    title={variantStates.button.config.title}
                    presets={variantStates.button.config.colorMode === ColorMode.PASTEL ? PRESET_PASTEL_COLORS : PRESET_COLORS}
                    colorMode={variantStates.button.config.colorMode}
                    showColorArea={variantStates.button.config.showColorArea}
                    showPresets={variantStates.button.config.showPresets}
                    showHue={variantStates.button.config.showHue}
                    showSaturation={variantStates.button.config.showSaturation}
                    showLightness={variantStates.button.config.showLightness}
                    showAlpha={variantStates.button.config.showAlpha}
                    showRandomButton={variantStates.button.config.showRandomButton}
                    hideSliders={variantStates.button.config.hideSliders}
                    onColorChange={(color) => updateVariantColor('button', color)}
                  />
                  {/* Button with label */}
                  <ColorPicker
                    variant="button"
                    size={variantStates.button.config.size}
                    disabled={variantStates.button.config.disabled}
                    title={variantStates.button.config.title}
                    colorMode={variantStates.button.config.colorMode}
                    showColorArea={variantStates.button.config.showColorArea}
                    showPresets={variantStates.button.config.showPresets}
                    showHue={variantStates.button.config.showHue}
                    showSaturation={variantStates.button.config.showSaturation}
                    showLightness={variantStates.button.config.showLightness}
                    showAlpha={variantStates.button.config.showAlpha}
                    showRandomButton={variantStates.button.config.showRandomButton}
                    hideSliders={variantStates.button.config.hideSliders}
                    onColorChange={(color) => updateVariantColor('button', color)}
                    label="Choose Color"
                  />
                  {/* Button with icon */}
                  <ColorPicker
                    variant="button"
                    size={variantStates.button.config.size}
                    disabled={variantStates.button.config.disabled}
                    title={variantStates.button.config.title}
                    colorMode={variantStates.button.config.colorMode}
                    showColorArea={variantStates.button.config.showColorArea}
                    showPresets={variantStates.button.config.showPresets}
                    showHue={variantStates.button.config.showHue}
                    showSaturation={variantStates.button.config.showSaturation}
                    showLightness={variantStates.button.config.showLightness}
                    showAlpha={variantStates.button.config.showAlpha}
                    showRandomButton={variantStates.button.config.showRandomButton}
                    hideSliders={variantStates.button.config.hideSliders}
                    onColorChange={(color) => updateVariantColor('button', color)}
                  >
                    <Palette className="w-4 h-4" />
                  </ColorPicker>
                </div>
              </div>
              <ConfigurationPanel variant="button" title="Button" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Circles Variant */}
      <Card className="border border-border md:w-2/6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center">
              <Circle className="w-4 h-4 text-white" />
            </div>
            Circles Variant
          </CardTitle>
          <CardDescription>
            Grid of colored circles for quick color selection. Great for palettes and color swatches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Live Example</Label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <ColorPicker
                    variant="circles"
                    size={variantStates.circles.config.size}
                    disabled={variantStates.circles.config.disabled}
                    title={variantStates.circles.config.title}
                    colorMode={variantStates.circles.config.colorMode}
                    showColorArea={variantStates.circles.config.showColorArea}
                    showPresets={variantStates.circles.config.showPresets}
                    showHue={variantStates.circles.config.showHue}
                    showSaturation={variantStates.circles.config.showSaturation}
                    showLightness={variantStates.circles.config.showLightness}
                    showAlpha={variantStates.circles.config.showAlpha}
                    showRandomButton={variantStates.circles.config.showRandomButton}
                    hideSliders={variantStates.circles.config.hideSliders}
                    onColorChange={(color) => updateVariantColor('circles', color)}
                  />
                </div>
              </div>
              <ConfigurationPanel variant="circles" title="Circles" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Random Variant */}
      <Card className="border border-border md:w-2/6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Shuffle className="w-4 h-4 text-white" />
            </div>
            Random Variant
          </CardTitle>
          <CardDescription>
            Generate random colors with a single click. No dialog - just instant random color generation. Perfect for inspiration and creative workflows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Live Examples</Label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg flex-wrap">
                  <ColorPicker
                    variant="random"
                    size={variantStates.random.config.size}
                    disabled={variantStates.random.config.disabled}
                    colorMode={variantStates.random.config.colorMode}
                    onColorChange={(color) => updateVariantColor('random', color)}
                    label="Random Color"
                  />
                  <ColorPicker
                    variant="random"
                    size={variantStates.random.config.size}
                    disabled={variantStates.random.config.disabled}
                    colorMode={variantStates.random.config.colorMode}
                    onColorChange={(color) => updateVariantColor('random', color)}
                  >
                    <Shuffle className="w-4 h-4" />
                  </ColorPicker>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Current Color</Label>
                <div className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: variantStates.random.color ? variantStates.random.color.hexa : 'undefined' }}
                  ></div>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {variantStates.random.color ? variantStates.random.color.hexa : 'undefined'}
                  </code>
                </div>
              </div>
              <ConfigurationPanel variant="random" title="Random" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
} 