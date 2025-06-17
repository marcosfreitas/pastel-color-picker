'use client';

import React, { useState } from 'react';
import { ColorPicker, ColorValue } from '../ColorPicker';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Github } from 'lucide-react';

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
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
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

                 {/* GitHub and NPM links - top right */}
         <div className="flex justify-center gap-3 top-4 relative md:absolute md:top-0 right-0">
           <a 
             href="https://www.npmjs.com/package/@marcosfreitas/pastel-color-picker" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 px-3 py-2 text-sm text-black hover:text-white bg-white hover:bg-black border border-black transition-all duration-200 rounded-md"
             aria-label="View on NPM"
           >
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <title>NPM</title>
                <path fill="#c12127" d="M0,16V0H16V16ZM3,3V13H8V5h3v8h2V3Z"/>
                <path fill="#ffffff" d="M3,3H13V13H11V5H8v8H3Z"/>
              </svg>
             <span className="hidden sm:inline">NPM</span>
           </a>
           <a 
             href="https://github.com/marcosfreitas/pastel-color-picker" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-2 px-3 py-2 text-sm text-black hover:text-white bg-white hover:bg-black border border-black transition-all duration-200 rounded-md"
             aria-label="View on GitHub"
           >
             <Github className="w-5 h-5" />
             <span className="hidden sm:inline">GitHub</span>
           </a>
         </div>
        
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold example-title-main">Pastel Color Picker Component</h1>
        <p className="example-text">
          A comprehensive ReactJS color picker with multiple presentation modes and options
        </p>
      </div>

      {/* Installation & Setup */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">🚀 Installation & Setup</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Install the Package</h3>
                          <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
{`npm install @marcosfreitas/pastel-color-picker`}
              </pre>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Install Peer Dependencies</h3>
            <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
{`npm install react react-dom @radix-ui/react-dialog @radix-ui/react-slider @radix-ui/react-separator @radix-ui/react-switch @radix-ui/react-label @radix-ui/react-slot lucide-react clsx class-variance-authority`}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-2">Import and Use</h3>
                          <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
{`import { ColorPicker, ColorValue } from '@marcosfreitas/pastel-color-picker';
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

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Make sure your project has Tailwind CSS configured, as the component uses Tailwind classes for styling.
            </p>
          </div>
        </div>
      </Card>

      {/* Configuration Explanation */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">📋 Available Configurations</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The Color Picker component offers extensive customization options to fit your specific needs. 
          Here's a comprehensive overview of all available properties:
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-3">🎨 Core Configuration</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">Pastel Colors</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <code className="bg-background px-1 py-0.5 rounded text-xs">isPastel: boolean</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  Controls the color palette mode. Pastel colors are softer and more elegant, 
                  while vibrant colors are bold and energetic.
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">Show Alpha Channel</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <code className="bg-background px-1 py-0.5 rounded text-xs">showAlpha: boolean</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  Enables transparency control with an opacity slider. The color bar and area 
                  will show a checkered background pattern when alpha &lt; 100%.
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">2D Color Area</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <code className="bg-background px-1 py-0.5 rounded text-xs">showColorArea: boolean</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  Replaces individual saturation/lightness sliders with an interactive 2D canvas. 
                  Perfect for visual color selection.
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
                  <code className="bg-background px-1 py-0.5 rounded text-xs">hideSliders: boolean</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <strong>NEW!</strong> Hides all individual sliders for a cleaner interface. 
                  Users can only select colors using the visual color bar/area.
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">Show Preset Colors</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <code className="bg-background px-1 py-0.5 rounded text-xs">showPresets: boolean</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  Displays a grid of preset colors in the dialog for quick selection. 
                  Can be combined with custom preset colors.
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-1">Show Icons</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  <code className="bg-background px-1 py-0.5 rounded text-xs">showIcon: boolean</code>
                </p>
                <p className="text-xs text-muted-foreground">
                  Shows/hides the palette icon in button variants. Useful when using text labels.
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

      {/* Configuration Panel */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">⚙️ Live Configuration</h2>
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

      {/* Color Picker Variants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Button Variant */}
        <Card className="p-6">
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
        <Card className="p-6">
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
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full overflow-x-auto">
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
        <Card className="p-6">
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
        <Card className="p-6">
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
        <Card className="p-6">
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

      {/* Custom Color Preset Example */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 example-title-secondary">Custom Preset Colors</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Override the default preset colors by providing your own custom palette using the <code className="bg-muted px-1 py-0.5 rounded text-xs">presetColors</code> prop.
            </p>
            <p className="text-sm text-muted-foreground">
              This example shows a custom vibrant color palette that replaces the default pastel/vibrant presets.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Label>Custom Palette:</Label>
            <ColorPicker
              variant="button"
              presetColors={[
                '#FF5733', '#33FF57', '#3357FF', '#FF33F1',
                '#F1FF33', '#33FFF1', '#FF8C33', '#8C33FF'
              ]}
              isPastel={false}
              showAlpha={showAlpha}
              showColorArea={showColorArea}
              showIcon={showIcons}
              label="Custom Colors"
              hideSliders={hideSliders}
            />
          </div>

          <div className="p-3 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground mb-2">Example usage:</p>
            <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words">
{`import { ColorPicker } from '@marcosfreitas/pastel-color-picker';

<ColorPicker
  variant="button"
  presetColors={[
    '#FF5733', '#33FF57', '#3357FF', '#FF33F1',
    '#F1FF33', '#33FFF1', '#FF8C33', '#8C33FF'
  ]}
  isPastel={false}
/>`}
            </pre>
          </div>

          <div className="text-xs text-muted-foreground">
            <strong>Note:</strong> When <code className="bg-muted px-1 py-0.5 rounded">presetColors</code> is provided, 
            it overrides both pastel and vibrant default palettes. The <code className="bg-muted px-1 py-0.5 rounded">isPastel</code> prop 
            only affects the random color generation in this case.
          </div>
        </div>
      </Card>

      {/* Usage Examples */}
      <Card className="p-6">
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
    </div>
  );
} 