'use client';

import React, { useState } from 'react';
import { ColorPicker, ColorValue } from '../ColorPicker';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Github, Menu, X, Code, Settings, Download, Wrench, Zap, PaintBucket } from 'lucide-react';
import { EXAMPLE_PASTEL_VARIATIONS, PRESET_COLORS, PRESET_PASTEL_COLORS } from '../constants';

export function Content() {
  // Default color values
  const defaultButtonColor: ColorValue = {
    hexa: '#4ECDC4',
    rgba: { r: 78, g: 205, b: 196, a: 1 },
    hsva: { h: 174, s: 62, v: 80, a: 1 }
  };

  const defaultCirclesColor: ColorValue = {
    hexa: '#FF6B6B',
    rgba: { r: 255, g: 107, b: 107, a: 1 },
    hsva: { h: 0, s: 58, v: 100, a: 1 }
  };

  const defaultRandomColor: ColorValue = {
    hexa: '#45B7D1',
    rgba: { r: 69, g: 183, b: 209, a: 1 },
    hsva: { h: 191, s: 67, v: 82, a: 1 }
  };

  const defaultSimpleColor: ColorValue = {
    hexa: '#45B7D1',
    rgba: { r: 69, g: 183, b: 209, a: 1 },
    hsva: { h: 191, s: 67, v: 82, a: 1 }
  };

  const [buttonColor, setButtonColor] = useState<ColorValue>(defaultButtonColor);
  const [circlesColor, setCirclesColor] = useState<ColorValue>(defaultCirclesColor);
  const [randomColor, setRandomColor] = useState<ColorValue>(defaultRandomColor);
  const [simpleColor, setSimpleColor] = useState<ColorValue>(defaultSimpleColor);

  const [isPastel, setIsPastel] = useState(true);
  const [showAlpha, setShowAlpha] = useState(true);
  const [showPresets, setShowPresets] = useState(true);
  const [showIcons, setShowIcons] = useState(true);
  const [showColorArea, setShowColorArea] = useState(false);
  const [hideSliders, setHideSliders] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [enhancedPastelColor, setEnhancedPastelColor] = useState<ColorValue>(defaultRandomColor);
  const [customDefaultPastelColor, setCustomDefaultPastelColor] = useState<ColorValue | undefined>(undefined);
  const [customDefaultVibrantColor, setCustomDefaultVibrantColor] = useState<ColorValue | undefined>(undefined);

  // Navigation sections
  const navigationSections = [
    { title: 'Examples', href: 'live-config', icon: Code },
    { title: 'Color Analysis', href: 'pastel-color-analysis', icon: Zap },
    { title: 'Custom Presets', href: 'custom-preset-colors', icon: PaintBucket },
    { title: 'Configuration', href: 'configuration', icon: Wrench },
    { title: 'Usage Options', href: 'usage-options', icon: Settings },
    { title: 'Installation', href: 'installation', icon: Download },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setSidebarOpen(false);
    }
  };

  // Reset all colors to defaults when configuration changes
  const resetAllColors = (newIsPastel?: boolean) => {
    const currentIsPastel = newIsPastel !== undefined ? newIsPastel : isPastel;
    
    // Generate appropriate default colors based on pastel mode
    const getDefaultColor = (baseHue: number): ColorValue => {
      const saturation = currentIsPastel ? 40 : 90;
      const lightness = currentIsPastel ? 90 : 50;
     
     // Convert HSL to RGB
     const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
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
     };
     
     const [r, g, b] = hslToRgb(baseHue, saturation, lightness);
     const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
     
     return {
       hexa: hex,
       rgba: { r, g, b, a: 1 },
       hsva: { h: baseHue, s: saturation, v: lightness, a: 1 }
     };
   };
   
   setButtonColor(getDefaultColor(174)); // Teal-ish
   setCirclesColor(getDefaultColor(0));  // Red-ish
   setRandomColor(getDefaultColor(191)); // Blue-ish (45B7D1)
   setSimpleColor(getDefaultColor(191)); // Blue-ish (45B7D1);
  };

  // Configuration change handlers that reset colors
  const handlePastelChange = (checked: boolean) => {
    setIsPastel(checked);
    resetAllColors(checked);
  };

  const handleAlphaChange = (checked: boolean) => {
    setShowAlpha(checked);
    resetAllColors();
  };

  const handlePresetsChange = (checked: boolean) => {
    setShowPresets(checked);
    resetAllColors();
  };

  const handleIconsChange = (checked: boolean) => {
    setShowIcons(checked);
    resetAllColors();
  };

  const handleColorAreaChange = (checked: boolean) => {
    setShowColorArea(checked);
    resetAllColors();
  };

  const handleHideSlidersChange = (checked: boolean) => {
    setHideSliders(checked);
    resetAllColors();
  };

  return (
    <section className="flex min-h-screen">
      {/* Sidebar */}
      <section className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="sticky top-0 h-screen flex flex-col bg-white">
          <div className="flex flex-col p-4 border-b border-gray-200 flex-shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* NPM and GitHub buttons */}
            <div className="flex gap-2">
              <a 
                href="https://www.npmjs.com/package/@marcosfreitas/pastel-color-picker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-xs text-black hover:text-white bg-white hover:bg-black border border-black transition-all duration-200 rounded-md flex-1 justify-center"
                aria-label="View on NPM"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16">
                   <title>NPM</title>
                   <path fill="#c12127" d="M0,16V0H16V16ZM3,3V13H8V5h3v8h2V3Z"/>
                   <path fill="#ffffff" d="M3,3H13V13H11V5H8v8H3Z"/>
                 </svg>
                <span>NPM</span>
              </a>
              <a 
                href="https://github.com/marcosfreitas/pastel-color-picker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-xs text-black hover:text-white bg-white hover:bg-black border border-black transition-all duration-200 rounded-md flex-1 justify-center"
                aria-label="View on GitHub"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
            {navigationSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.href}
                  onClick={() => scrollToSection(section.href)}
                  className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors flex items-center gap-3"
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 lg:ml-0">
        <section className="space-y-8 p-6 max-w-7xl mx-auto">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white border border-gray-200 shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Header with GitHub link */}
          <div className="relative py-4 border-b border-gray-100">
            {/* Supported by OrdinaryLink.co - center */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Supported by</span>
                <a 
                  href="https://OrdinaryLink.co?utm_source=pastel-color-picker&utm_medium=demo&utm_campaign=open-source-support" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:opacity-80 transition-opacity"
                >
                  OrdinaryLink.co
                </a>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold example-title-main">Pastel Color Picker Component v2.x</h1>
            <p className="example-text">
              A comprehensive ReactJS color picker with multiple presentation modes and options
            </p>
          </div>

          <section className="flex flex-col gap-4">
            {/* Live Configuration Panel */}
            <section id="live-config" className="flex flex-col gap-4">
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
                    onCheckedChange={handlePastelChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="alpha-channel" className="text-sm font-medium">Show Alpha Channel</Label>
                  <Switch
                    id="alpha-channel"
                    checked={showAlpha}
                    onCheckedChange={handleAlphaChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="show-presets" className="text-sm font-medium">Show Preset Colors</Label>
                  <Switch
                    id="show-presets"
                    checked={showPresets}
                    onCheckedChange={handlePresetsChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="show-icons" className="text-sm font-medium">Show Icons</Label>
                  <Switch
                    id="show-icons"
                    checked={showIcons}
                    onCheckedChange={handleIconsChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="show-color-area" className="text-sm font-medium">2D Color Area</Label>
                  <Switch
                    id="show-color-area"
                    checked={showColorArea}
                    onCheckedChange={handleColorAreaChange}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="hide-sliders" className="text-sm font-medium">Hide Sliders</Label>
                  <Switch
                    id="hide-sliders"
                    checked={hideSliders}
                    onCheckedChange={handleHideSlidersChange}
                  />
                </div>
              </div>
            </Card>

            {/* Examples - Color Picker Variants */}
            <section id="examples">
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">📋 Examples</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  See the component in action with different configurations and variants
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Button Variant */}
                  <Card className="p-6 border border-neutral-50">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold example-title-secondary">Button Variant</h3>
                        <p className="text-sm example-text">
                          Click the colored button to open the color picker dialog
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Label>Small:</Label>
                          <ColorPicker
                            variant="button"
                            size="sm"
                            value={buttonColor}
                            onChange={setButtonColor}
                            isPastel={isPastel}
                            showAlpha={showAlpha}
                            showColorArea={showColorArea}
                            showPresets={showPresets}
                            showIcon={showIcons}
                            hideSliders={hideSliders}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label>Medium:</Label>
                          <ColorPicker
                            variant="button"
                            size="md"
                            value={buttonColor}
                            onChange={setButtonColor}
                            isPastel={isPastel}
                            showAlpha={showAlpha}
                            showColorArea={showColorArea}
                            showPresets={showPresets}
                            showIcon={showIcons}
                            hideSliders={hideSliders}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label>Large:</Label>
                          <ColorPicker
                            variant="button"
                            size="lg"
                            value={buttonColor}
                            onChange={setButtonColor}
                            isPastel={isPastel}
                            showAlpha={showAlpha}
                            showColorArea={showColorArea}
                            showPresets={showPresets}
                            showIcon={showIcons}
                            hideSliders={hideSliders}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <Label>With Label:</Label>
                          <ColorPicker
                            variant="button"
                            size="md"
                            value={buttonColor}
                            onChange={setButtonColor}
                            isPastel={isPastel}
                            showAlpha={showAlpha}
                            showColorArea={showColorArea}
                            showPresets={showPresets}
                            showIcon={showIcons}
                            label="Choose Color"
                            hideSliders={hideSliders}
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm font-mono">
                          Selected: {buttonColor.hexa}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          RGB({buttonColor.rgba.r}, {buttonColor.rgba.g}, {buttonColor.rgba.b}, {Math.round(buttonColor.rgba.a * 100)}%)
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Circles Variant */}
                  <Card className="p-6 border border-neutral-50">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold example-title-secondary">Circles Variant</h3>
                        <p className="text-sm example-text">
                          Quick selection with preset colors and custom picker
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                          <Label>Small:</Label>
                          <ColorPicker
                            variant="circles"
                            size="sm"
                            value={circlesColor}
                            onChange={setCirclesColor}
                            isPastel={isPastel}
                            showAlpha={showAlpha}
                            showColorArea={showColorArea}
                            showPresets={showPresets}
                            hideSliders={hideSliders}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                          <Label>Medium:</Label>
                          <ColorPicker
                            variant="circles"
                            size="md"
                            value={circlesColor}
                            onChange={setCirclesColor}
                            isPastel={isPastel}
                            showAlpha={showAlpha}
                            showColorArea={showColorArea}
                            showPresets={showPresets}
                            hideSliders={hideSliders}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full overflow-x-auto min-h-[100px]">
                          <Label>Large:</Label>
                          <ColorPicker
                            variant="circles"
                            size="lg"
                            value={circlesColor}
                            onChange={setCirclesColor}
                            isPastel={isPastel}
                            showAlpha={showAlpha}
                            showColorArea={showColorArea}
                            showPresets={showPresets}
                            hideSliders={hideSliders}
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm font-mono">
                          Selected: {circlesColor.hexa}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          RGB({circlesColor.rgba.r}, {circlesColor.rgba.g}, {circlesColor.rgba.b}, {Math.round(circlesColor.rgba.a * 100)}%)
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Random Variant */}
                  <Card className="p-6 border border-neutral-50">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold example-title-secondary">Random Variant</h3>
                        <p className="text-sm example-text">
                          Generate random pastel or vibrant colors
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <Label className="font-medium min-w-[4rem]">Small:</Label>
                          <div className="flex-shrink-0 w-auto">
                            <ColorPicker
                              variant="random"
                              size="sm"
                              value={randomColor}
                              onChange={setRandomColor}
                              isPastel={isPastel}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <Label className="font-medium min-w-[4rem]">Medium:</Label>
                          <div className="flex-shrink-0 w-auto">
                            <ColorPicker
                              variant="random"
                              size="md"
                              value={randomColor}
                              onChange={setRandomColor}
                              isPastel={isPastel}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <Label className="font-medium min-w-[4rem]">Large:</Label>
                          <div className="flex-shrink-0 w-auto">
                            <ColorPicker
                              variant="random"
                              size="lg"
                              value={randomColor}
                              onChange={setRandomColor}
                              isPastel={isPastel}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <Label className="font-medium min-w-[5rem]">With Label:</Label>
                          <div className="flex-shrink-0 w-auto">
                            <ColorPicker
                              variant="random"
                              size="md"
                              value={randomColor}
                              onChange={setRandomColor}
                              isPastel={isPastel}
                              label="Random"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm font-mono">
                          Selected: {randomColor.hexa}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          RGB({randomColor.rgba.r}, {randomColor.rgba.g}, {randomColor.rgba.b}, {Math.round(randomColor.rgba.a * 100)}%)
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Simple Variant */}
                  <Card className="p-6 border border-neutral-50">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold example-title-secondary">Simple Variant</h3>
                        <p className="text-sm example-text">
                          Simplified picker with only hue control and color reference bar
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <Label className="font-medium min-w-[4rem]">Small:</Label>
                          <ColorPicker
                            variant="simple"
                            size="sm"
                            value={simpleColor}
                            onChange={setSimpleColor}
                            showIcon={showIcons}
                            hideSliders={hideSliders}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <Label className="font-medium min-w-[4rem]">Medium:</Label>
                          <ColorPicker
                            variant="simple"
                            size="md"
                            value={simpleColor}
                            onChange={setSimpleColor}
                            showIcon={showIcons}
                            hideSliders={hideSliders}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <Label className="font-medium min-w-[4rem]">Large:</Label>
                          <ColorPicker
                            variant="simple"
                            size="lg"
                            value={simpleColor}
                            onChange={setSimpleColor}
                            showIcon={showIcons}
                            hideSliders={hideSliders}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <Label className="font-medium min-w-[5rem]">With Label:</Label>
                          <ColorPicker
                            variant="simple"
                            size="md"
                            value={simpleColor}
                            onChange={setSimpleColor}
                            showIcon={showIcons}
                            label="Simple"
                            hideSliders={hideSliders}
                          />
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm font-mono">
                          Selected: {simpleColor.hexa}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          RGB({simpleColor.rgba.r}, {simpleColor.rgba.g}, {simpleColor.rgba.b}, {Math.round(simpleColor.rgba.a * 100)}%)
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Color Area Feature Showcase */}
                  <Card className="p-6 border border-neutral-50">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold example-title-secondary">2D Color Area Feature</h3>
                        <p className="text-sm example-text">
                          Toggle the "2D Color Area" switch above to see the difference between individual sliders and the interactive 2D color canvas
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Individual Sliders (Default)</Label>
                            <ColorPicker
                              variant="button"
                              size="md"
                              value={buttonColor}
                              onChange={setButtonColor}
                              isPastel={isPastel}
                              showAlpha={showAlpha}
                              showColorArea={false}
                              showPresets={showPresets}
                              showIcon={showIcons}
                              label="Sliders Only"
                              hideSliders={hideSliders}
                            />
                            <p className="text-xs text-muted-foreground">
                              Shows color reference bar + individual sliders for precise control
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">2D Color Area</Label>
                            <ColorPicker
                              variant="button"
                              size="md"
                              value={buttonColor}
                              onChange={setButtonColor}
                              isPastel={isPastel}
                              showAlpha={showAlpha}
                              showColorArea={true}
                              showPresets={showPresets}
                              showIcon={showIcons}
                              label="2D Canvas"
                              hideSliders={hideSliders}
                            />
                            <p className="text-xs text-muted-foreground">
                              Interactive 2D canvas for selecting saturation and lightness simultaneously
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm font-medium mb-2">How it works:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• <strong>Default:</strong> Thin color bar shows spectrum + individual sliders for precise control</li>
                          <li>• <strong>2D Area:</strong> Interactive canvas replaces saturation/lightness sliders</li>
                          <li>• <strong>Simple variant:</strong> Always shows color reference bar (no 2D area option)</li>
                          <li>• <strong>Position indicator:</strong> Shows current color position on reference bar</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </section>



            {/* Pastel Color Analysis */}
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
                  <h3 className="text-lg font-semibold mb-4 example-title-secondary">
                    RGB(226, 115, 126)
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2 example-text">Reference: Dusty Rose</h4>
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
                      <h4 className="font-medium mb-2 example-text">Generated Pastel Variations</h4>
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
                          isPastel={true}
                          showIcon={false}
                          value={enhancedPastelColor}
                          onChange={(color) => setEnhancedPastelColor(color)}
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

            {/* Custom Color Preset Example */}
            <section id="custom-preset-colors">
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">🎨 Custom Preset Colors or Default One</h2>
                <p className="text-sm text-muted-foreground">
                  Override the default preset colors by providing your own custom palette using the <code className="bg-muted px-1 py-0.5 rounded text-xs">presetColors</code> prop.
                </p>
                <p className="text-sm text-muted-foreground">
                  This example shows a custom vibrant color palette that replaces the default pastel/vibrant presets.
                </p>
                <div className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold mb-4 example-title-secondary">Custom Palette</h3>
                  <div className="flex items-center gap-4">
                    <ColorPicker
                      variant="button"
                      presetColors={[
                        // blue range
                        '#0000FF', '#0000EE', '#0000DD', '#0000CC',
                        '#0000BB', '#0000AA', '#000099', '#000088',
                        '#000077', '#000066', '#000055', '#000044',
                        '#000033', '#000022', '#000011', '#000000',
                      ]}
                      label="Custom Colors"
                    />
                  </div>

                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground mb-2">Example usage:</p>
                    <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words">
{`import { ColorPicker } from '@marcosfreitas/pastel-color-picker';

<ColorPicker
  variant="button"
  presetColors={[
    // blue range
    '#0000FF', '#0000EE', '#0000DD', '#0000CC',
    '#0000BB', '#0000AA', '#000099', '#000088',
    '#000077', '#000066', '#000055', '#000044',
    '#000033', '#000022', '#000011', '#000000',
  ]}
  isPastel={false}
  label="Custom Colors"
/>`}
                    </pre>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <strong>Note:</strong> When <code className="bg-muted px-1 py-0.5 rounded">presetColors</code> is provided, 
                    it overrides both pastel and vibrant default palettes. The <code className="bg-muted px-1 py-0.5 rounded">isPastel</code> prop 
                    does not make any difference in this case.
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <h3 className="text-lg font-semibold mb-4 example-title-secondary">
                    Default Preset Colors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Pastel Mode (Default: {PRESET_PASTEL_COLORS[0]})</Label>
                      <div className="space-y-2 flex justify-start items-start gap-2">
                        <ColorPicker
                          variant="button"
                          size="md"
                          isPastel={true}
                          showIcon={true}
                          label="Pastel"
                          onChange={(color) => setCustomDefaultPastelColor(color)}
                        />

                        <div
                          className="w-11 h-11 rounded-lg border-2"
                          style={{ backgroundColor: customDefaultPastelColor?.hexa }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                       First pastel preset: <strong style={{ color: PRESET_PASTEL_COLORS[0] }}>RGB(226, 115, 126)</strong>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Vibrant Mode (Default: {PRESET_COLORS[0]})</Label>
                      
                      <div className="space-y-2 flex justify-start items-start gap-2">
                        <ColorPicker
                          variant="button"
                          size="md"
                          isPastel={false}
                          showIcon={true}
                          label="Vibrant"
                          onChange={(color) => setCustomDefaultVibrantColor(color)}
                        />

                        <div
                          className="w-10 h-10 rounded-lg border-2"
                          style={{ backgroundColor: customDefaultVibrantColor?.hexa }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        First vibrant preset: <strong style={{ color: PRESET_COLORS[0] }}>#FF6B6B</strong>
                      </p>
                    </div>
                  </div>
                </div>

              </Card>
            </section>

                         {/* Configuration Section */}
             <section id="configuration">
               <Card className="p-6 border border-border">
                 <h2 className="text-xl font-semibold mb-4">🔧 Configuration</h2>
               <p className="text-sm text-muted-foreground mb-6">
                 The Color Picker component offers extensive customization options to fit your specific needs. 
                 Here's a comprehensive overview of all available properties:
               </p>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <h3 className="text-lg font-medium mb-3">🎨 Core Configuration</h3>
                   
                   <div className="space-y-3">
                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Current Value</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">value?: ColorValue</code>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         The current color value. Contains hexa, rgba, and hsva representations. 
                         Leave undefined for uncontrolled usage.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Presentation Variant</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">variant?: 'circles' | 'button' | 'random' | 'simple'</code>
                         <span className="ml-2 text-blue-600 font-medium">default: 'button'</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Controls the visual presentation: <strong>circles</strong> shows preset colors as clickable circles, 
                         <strong>button</strong> opens a full dialog, <strong>random</strong> generates random colors, 
                         <strong>simple</strong> shows only hue selection.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Pastel Colors</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">isPastel?: boolean</code>
                         <span className="ml-2 text-blue-600 font-medium">default: true</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Controls the color palette mode. Pastel colors are softer and more elegant, 
                         while vibrant colors are bold and energetic. <strong>Automatically selects the first color 
                         from the corresponding preset list as the default.</strong>
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Show Alpha Channel</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">showAlpha?: boolean</code>
                         <span className="ml-2 text-blue-600 font-medium">default: true</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Enables transparency control with an opacity slider. The color bar and area 
                         will show a checkered background pattern when alpha &lt; 100%.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">2D Color Area</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">showColorArea?: boolean</code>
                         <span className="ml-2 text-blue-600 font-medium">default: false</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Replaces individual saturation/lightness sliders with an interactive 2D canvas. 
                         Perfect for visual color selection.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Custom Preset Colors</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">presetColors?: string[]</code>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Array of hex color strings to override default presets. When provided, 
                         replaces both pastel and vibrant default palettes completely.
                       </p>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-4">
                   <h3 className="text-lg font-medium mb-3">🛠️ Interface Control</h3>
                   
                   <div className="space-y-3">
                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Hide Sliders</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">hideSliders?: boolean</code>
                         <span className="ml-2 text-blue-600 font-medium">default: false</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Hides all individual sliders for a cleaner interface. 
                         Users can only select colors using the visual color bar/area.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Show Preset Colors</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">showPresets?: boolean</code>
                         <span className="ml-2 text-blue-600 font-medium">default: true</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Displays a grid of preset colors in the dialog for quick selection. 
                         Can be combined with custom preset colors.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Show Icons</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">showIcon?: boolean</code>
                         <span className="ml-2 text-blue-600 font-medium">default: true</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Shows/hides the palette icon in button variants. Useful when using text labels.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Label Text</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">label?: string</code>
                         <span className="ml-2 text-gray-500 font-medium">default: undefined</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Text label to display with button, random, and simple variants. 
                         Helpful for accessibility and user context.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Size Variant</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">size?: 'sm' | 'md' | 'lg'</code>
                         <span className="ml-2 text-blue-600 font-medium">default: 'md'</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Controls the component size. Affects button dimensions, circle sizes, 
                         and overall spacing.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Disabled State</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">disabled?: boolean</code>
                         <span className="ml-2 text-blue-600 font-medium">default: false</span>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         When true, disables all interactions and applies disabled styling. 
                         Useful for conditional enabling based on form state.
                       </p>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-4">
                   <h3 className="text-lg font-medium mb-3">🔧 Advanced</h3>
                   <div className="space-y-3">
                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">onChange Callback</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">{`onChange?: (color: ColorValue) => void`}</code>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Callback function triggered when the color changes. Receives a ColorValue 
                         object with hexa, rgba, and hsva representations.
                       </p>
                     </div>

                     <div className="p-3 bg-muted rounded-lg">
                       <h4 className="font-medium text-sm mb-1">Custom Class Name</h4>
                       <p className="text-xs text-muted-foreground mb-2">
                         <code className="bg-background px-1 py-0.5 rounded text-xs">className?: string</code>
                       </p>
                       <p className="text-xs text-muted-foreground">
                         Additional CSS classes to apply to the root component. 
                         Useful for custom styling and layout adjustments.
                       </p>
                     </div>
                   </div>
                 </div>
                 
               </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-sm mb-2 text-blue-900">💡 Pro Tips</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• <strong>Minimalist UI:</strong> Use <code>hideSliders={true}</code> + <code>showColorArea={true}</code> for the cleanest interface</li>
                  <li>• <strong>Precise Control:</strong> Keep sliders enabled when users need exact color values</li>
                  <li>• <strong>Quick Selection:</strong> Use <code>variant="circles"</code> with custom presets for brand colors</li>
                  <li>• <strong>Simple Mode:</strong> <code>variant="simple"</code> gives users hue selection only</li>
                </ul>
              </div>
            </Card>
            </section>

            {/* Usage Examples */}
            <Card className="p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 example-title-secondary">Usage Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 example-text">Basic Usage</h4>
                  <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`import { ColorPicker, ColorValue } from '@marcosfreitas/pastel-color-picker';

  const [color, setColor] = useState<ColorValue>();

  <ColorPicker
    value={color}
    onChange={setColor}
    variant="button"
    isPastel={true}
    showAlpha={true}
  />`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2 example-text">2D Color Area (Interactive Canvas)</h4>
                  <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`import { ColorPicker } from '@marcosfreitas/pastel-color-picker';

  <ColorPicker
    variant="button"
    showColorArea={true}  // Enable 2D interactive canvas
    showAlpha={true}
    onChange={(color) => setThemeColor(color)}
  />`}
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 example-text">Circles Variant with Custom Presets</h4>
                  <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`import { ColorPicker } from '@marcosfreitas/pastel-color-picker';

  <ColorPicker
    variant="circles"
    size="lg"
    presetColors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
    onChange={(color) => console.log(color.hexa)}
  />`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2 example-text">Simple Hue-Only Picker</h4>
                  <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`import { ColorPicker } from '@marcosfreitas/pastel-color-picker';

  <ColorPicker
    variant="simple"
    size="lg"
    onChange={(color) => setHueColor(color)}
  />`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2 example-text">Random Color Generator</h4>
                  <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`import { ColorPicker } from '@marcosfreitas/pastel-color-picker';

  <ColorPicker
    variant="random"
    isPastel={false} // For vibrant colors
    onChange={(color) => updateTheme(color)}
  />`}
                  </pre>
                </div>
              </div>
            </Card>
            </section>

            {/* Usage Options Section */}
            <section id="usage-options">
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">⚙️ Usage Options</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  This library provides three different usage patterns to fit different needs:
                </p>
                
                <div className="space-y-6">
                  {/* Option 1: Self-Contained */}
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Option 1</span>
                      Self-Contained (Recommended for Quick Setup)
                    </h3>
                    <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto mb-3">
  {`import { ColorPicker } from '@marcosfreitas/pastel-color-picker';
  import '@marcosfreitas/pastel-color-picker/style.css';

  // Works out of the box with bundled CSS utilities`}
                    </pre>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">✅ Works immediately</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">✅ No setup needed</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">⚠️ Larger bundle</span>
                    </div>
                  </div>

                  {/* Option 2: Headless */}
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Option 2</span>
                      Headless (Best for Tailwind v4 Projects)
                    </h3>
                    <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto mb-3">
  {`import { ColorPicker } from '@marcosfreitas/pastel-color-picker/headless';

  // No CSS import needed - uses your Tailwind config
  // Ensure your tailwind.config includes the package in content`}
                    </pre>
                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">✅ Same functionality</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">✅ Smaller bundle (~35KB savings)</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">⚠️ Requires Tailwind setup</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p className="mb-2"><strong>What is "Headless"?</strong></p>
                      <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Same components & functionality as the regular version</li>
                        <li>Zero bundled CSS - uses your project's Tailwind utilities</li>
                        <li>Perfect integration with existing Tailwind v4 projects</li>
                      </ul>
                    </div>
                  </div>

                  {/* Option 3: Source */}
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Option 3</span>
                      Source (Maximum Customization)
                    </h3>
                    <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto mb-3">
  {`import { ColorPicker } from '@marcosfreitas/pastel-color-picker/src';

  // Direct access to source code for maximum customization`}
                    </pre>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">✅ Full control</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">✅ Can modify components</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">⚠️ Requires build setup</span>
                    </div>
                  </div>
                </div>

                {/* Decision Matrix */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-sm mb-3 text-blue-900">Which option to choose?</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Scenario</th>
                          <th className="text-left p-2">Use This</th>
                          <th className="text-left p-2">Why</th>
                        </tr>
                      </thead>
                      <tbody className="text-blue-800">
                        <tr>
                          <td className="p-2">🚀 Quick prototyping</td>
                          <td className="p-2 font-medium">Self-contained</td>
                          <td className="p-2">Works immediately, no setup</td>
                        </tr>
                        <tr>
                          <td className="p-2">⚡ Existing Tailwind v4 project</td>
                          <td className="p-2 font-medium">Headless</td>
                          <td className="p-2">Avoids duplicate CSS, smaller bundle</td>
                        </tr>
                        <tr>
                          <td className="p-2">🎨 Custom design system</td>
                          <td className="p-2 font-medium">Headless or Source</td>
                          <td className="p-2">Full control over styling</td>
                        </tr>
                        <tr>
                          <td className="p-2">📦 Bundle size matters</td>
                          <td className="p-2 font-medium">Headless</td>
                          <td className="p-2">~35KB CSS savings</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </section>

            {/* Installation Section - Moved after examples */}
            <section id="installation">
              <Card className="p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">📦 Installation</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose the installation method that best fits your project setup. See the <a href="#usage-options" className="text-blue-600 hover:underline">Usage Options</a> section for detailed comparisons.
                </p>
                
                <div className="space-y-6">
                  {/* Base Installation */}
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Step 1</span>
                      Install the Package
                    </h3>
                    <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`npm install @marcosfreitas/pastel-color-picker`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Step 2</span>
                      Install Peer Dependencies
                    </h3>
                    <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`npm install react react-dom @radix-ui/react-dialog @radix-ui/react-slider @radix-ui/react-separator @radix-ui/react-switch @radix-ui/react-label @radix-ui/react-slot lucide-react clsx class-variance-authority`}
                    </pre>
                  </div>

                  {/* Usage Option 1: Self-Contained */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Option 1</span>
                      Self-Contained Setup (Recommended)
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Works immediately with bundled CSS utilities. Perfect for quick prototyping and new projects.
                    </p>
                    <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`import { ColorPicker, ColorValue } from '@marcosfreitas/pastel-color-picker';
  import '@marcosfreitas/pastel-color-picker/style.css';
  import { useState } from 'react';

  function App() {
    const [color, setColor] = useState<ColorValue>();

    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        variant="button"
        isPastel={true}
        showAlpha={true}
      />
    );
  }`}
                    </pre>
                  </div>

                  {/* Usage Option 2: Headless */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Option 2</span>
                      Headless Setup (Tailwind v4 Projects)
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Uses your project's Tailwind utilities. Smaller bundle size (~35KB CSS savings).
                    </p>
                    <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`import { ColorPicker, ColorValue } from '@marcosfreitas/pastel-color-picker/headless';
  import { useState } from 'react';

  function App() {
    const [color, setColor] = useState<ColorValue>();

    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        variant="button"
        isPastel={true}
        showAlpha={true}
      />
    );
  }`}
                    </pre>
                    <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-md">
                      <p className="text-xs text-purple-800">
                        <strong>⚠️ Tailwind Setup Required:</strong> Ensure your <code>tailwind.config.js</code> includes the package in the content array:
                      </p>
                      <pre className="text-xs bg-purple-100 p-2 rounded mt-2 overflow-x-auto">
  {`content: [
    './node_modules/@marcosfreitas/pastel-color-picker/**/*.{js,ts,jsx,tsx}',
    // ... your other content paths
  ]`}
                      </pre>
                    </div>
                  </div>

                  {/* Usage Option 3: Source */}
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">Option 3</span>
                      Source Setup (Maximum Customization)
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Direct access to source code for maximum customization and modification.
                    </p>
                    <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
  {`import { ColorPicker, ColorValue } from '@marcosfreitas/pastel-color-picker/src';
  import { useState } from 'react';

  function App() {
    const [color, setColor] = useState<ColorValue>();

    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        variant="button"
        isPastel={true}
        showAlpha={true}
      />
    );
  }`}
                    </pre>
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                      <p className="text-xs text-orange-800">
                        <strong>⚠️ Build Setup Required:</strong> Your bundler must be configured to handle TypeScript and CSS files from the source directory.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-sm mb-2 text-blue-900">💡 Quick Start Tips</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• <strong>New to the library?</strong> Start with Option 1 (Self-contained) for the fastest setup</li>
                    <li>• <strong>Using Tailwind v4?</strong> Option 2 (Headless) will integrate seamlessly and reduce bundle size</li>
                    <li>• <strong>Need custom styling?</strong> Option 3 (Source) gives you full control over the components</li>
                    <li>• <strong>All options</strong> provide the same functionality - choose based on your project needs</li>
                  </ul>
                </div>
              </Card>
            </section>
          </section>

         </section>
       </section>
     </section>
   );
 } 