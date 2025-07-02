import React, { useState } from 'react';
import { ColorPicker } from '../../ColorPicker';
import { Switch } from '../../components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Palette, Circle, Shuffle, ChevronDown, ChevronUp } from 'lucide-react';
import { ColorValue, ColorModeEnum, ColorPickerSize } from '../../types';
import { cn } from '../../utils/cn';
export interface VariantState {
  color?: ColorValue;
  config: {
    size: ColorPickerSize;
    disabled: boolean;
    title?: string;
    colorMode: ColorModeEnum;
    showColorBar?: boolean;
    showColorArea?: boolean;
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
  const [expandedConfigs, setExpandedConfigs] = useState<Record<string, boolean>>({
    button: false,
    circles: false,
    random: false,
  });

  const toggleConfig = (variant: string) => {
    setExpandedConfigs(prev => ({
      ...prev,
      [variant]: !prev[variant]
    }));
  };

  // Configuration panel component
  const ConfigurationPanel = ({ variant, title }: { variant: keyof typeof variantStates, title: string }) => {
    const state = variantStates[variant];
    
    return (
      <Card className="w-full border border-border dark:border-gray-700 dark:bg-gray-900">
        <CardHeader 
          className="select-none rounded-lg pb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex flex-row items-center justify-between"
          onClick={() => toggleConfig(variant)}
        >
          <CardTitle className="text-sm font-medium dark:text-gray-100">{title} Configuration</CardTitle>
          {expandedConfigs[variant] ? (
            <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </CardHeader>
        {expandedConfigs[variant] && (
          <CardContent className="space-y-6">
          {/* Basic Props */}
          <div className="space-y-3">
            <label className="text-xs font-medium dark:text-gray-400">Basic Properties</label>
            
            {/* Size */}
            <div className="mt-4 space-y-2 flex items-center gap-2">
              <div className="flex gap-1" role="group" aria-label="Size selection">
                {(['sm', 'md', 'lg'] as const).map(size => (
                  <button
                    key={size}
                    type="button"
                    className={cn("text-xs px-2 h-7 rounded-md bg-secondary dark:bg-gray-700 text-primary dark:text-white demo-nav-button", state.config.size === size ? 'border-2 dark:border-gray-500' : '')}
                    onClick={() => updateVariantConfig(variant, { size })}
                    aria-pressed={state.config.size === size}
                    aria-label={`Set size to ${size}`}
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
              <label htmlFor={`${variant}-disabled`} className="text-xs dark:text-gray-400">Disabled</label>
            </div>
          </div>

          {/* Color Mode */}
          <div className="space-y-2">
            <label className="text-xs font-medium dark:text-gray-400">Color Mode</label>
            <div className="mt-4 flex gap-1" role="group" aria-label="Color mode selection">
              <button
                type="button"
                className={cn("text-xs px-2 h-7 rounded-md bg-secondary dark:bg-gray-700 text-primary dark:text-white", state.config.colorMode === ColorModeEnum.NORMAL ? 'border-2 dark:border-gray-500' : '')}
                onClick={() => updateVariantConfig(variant, { colorMode: ColorModeEnum.NORMAL })}
                aria-pressed={state.config.colorMode === ColorModeEnum.NORMAL}
                aria-label="Set color mode to normal"
              >
                Normal
              </button>
              <button
                type="button"
                className={cn("text-xs px-2 h-7 rounded-md bg-secondary dark:bg-gray-700 text-primary dark:text-white", state.config.colorMode === ColorModeEnum.PASTEL ? 'border-2 dark:border-gray-500' : '')}
                onClick={() => updateVariantConfig(variant, { colorMode: ColorModeEnum.PASTEL })}
                aria-pressed={state.config.colorMode === ColorModeEnum.PASTEL}
                aria-label="Set color mode to pastel"
              >
                Pastel
              </button>
              <button
                type="button"
                className={cn("text-xs px-2 h-7 rounded-md bg-secondary dark:bg-gray-700 text-primary dark:text-white", state.config.colorMode === ColorModeEnum.VIVID ? 'border-2 dark:border-gray-500' : '')}
                onClick={() => updateVariantConfig(variant, { colorMode: ColorModeEnum.VIVID })}
                aria-pressed={state.config.colorMode === ColorModeEnum.VIVID}
                aria-label="Set color mode to vivid"
              >
                Vivid
              </button>
            </div>
          </div>

          {/* Dialog Features - Only show for variants that have dialogs */}
          {variant !== 'random' && (
            <div className="space-y-3">
              <label className="text-xs font-medium dark:text-gray-400">Dialog Features</label>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-color-bar`}
                    checked={state.config.showColorBar}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showColorBar: checked })}
                  />
                  <label htmlFor={`${variant}-color-bar`} className="text-xs dark:text-gray-400">Color Bar</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-color-area`}
                    checked={state.config.showColorArea}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showColorArea: checked })}
                  />
                  <label htmlFor={`${variant}-color-area`} className="text-xs dark:text-gray-400">Color Area</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-presets`}
                    checked={state.config.showPresets}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showPresets: checked })}
                  />
                  <label htmlFor={`${variant}-presets`} className="text-xs dark:text-gray-400">Presets</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-hue`}
                    checked={state.config.showHue}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showHue: checked })}
                  />
                  <label htmlFor={`${variant}-hue`} className="text-xs dark:text-gray-400">Hue Slider</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-saturation`}
                    checked={state.config.showSaturation}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showSaturation: checked })}
                  />
                  <label htmlFor={`${variant}-saturation`} className="text-xs dark:text-gray-400">Saturation</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-lightness`}
                    checked={state.config.showLightness}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showLightness: checked })}
                  />
                  <label htmlFor={`${variant}-lightness`} className="text-xs dark:text-gray-400">Lightness</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-alpha`}
                    checked={state.config.showAlpha}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showAlpha: checked })}
                  />
                  <label htmlFor={`${variant}-alpha`} className="text-xs dark:text-gray-400">Alpha</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-random`}
                    checked={state.config.showRandomButton}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { showRandomButton: checked })}
                  />
                  <label htmlFor={`${variant}-random`} className="text-xs dark:text-gray-400">Random Button</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`${variant}-hide-sliders`}
                    checked={state.config.hideSliders}
                    onCheckedChange={(checked) => updateVariantConfig(variant, { hideSliders: checked })}
                  />
                  <label htmlFor={`${variant}-hide-sliders`} className="text-xs dark:text-gray-400">Hide Sliders</label>
                </div>
              </div>
            </div>
          )}

          {/* Random Variant Specific Note */}
          {variant === 'random' && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Note:</strong> The Random variant is a simple button that generates random colors directly. 
                It doesn't open a dialog, so only <a href="#configuration-api" className="text-black decoration-underline">Color Mode</a> affects its behavior.
              </p>
            </div>
          )}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div id="variant-examples" className="space-y-6">
      {/* Header with title */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Variant Examples</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">Explore different color picker presentations and configurations</p>
        </div>
      </div>
      
      {/* Variants Grid */}
      <section className="flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Button Variant */}
        <Card className="border border-border dark:border-gray-700 lg:w-2/6 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              Button Variant
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Perfect for form controls and action buttons. Supports icons, labels, and flexible content sizing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-evenly gap-4 p-4 rounded-lg flex-wrap">
                    {/* Color only button */}
                    <ColorPicker
                      variant="button"
                      size={variantStates.button.config.size}
                      disabled={variantStates.button.config.disabled}
                      title={variantStates.button.config.title}
                      colorMode={variantStates.button.config.colorMode}
                      showColorBar={variantStates.button.config.showColorBar}
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
                      showColorBar={variantStates.button.config.showColorBar}
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
                      showColorBar={variantStates.button.config.showColorBar}
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
        <Card className="border border-border dark:border-gray-700 lg:w-2/6 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                <Circle className="w-4 h-4 text-white" />
              </div>
              Circles Variant
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Grid of colored circles for quick color selection. Great for palettes and color swatches.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-4 p-4 rounded-lg">
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
        <Card className="border border-border dark:border-gray-700 lg:w-2/6 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Shuffle className="w-4 h-4 text-white" />
              </div>
              Random Variant
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Generate random colors with a single click. No dialog - just instant random color generation. Perfect for inspiration and creative workflows.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-evenly gap-4 p-4 rounded-lg flex-wrap">
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
                <ConfigurationPanel variant="random" title="Random" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 