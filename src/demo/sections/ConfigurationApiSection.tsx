import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

export function ConfigurationApiSection() {
  return (
    <section id="configuration-api" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Configuration API</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Complete reference for all available props and configuration options.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Variant Props</CardTitle>
            <CardDescription>Essential properties for all variants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Prop</th>
                      <th className="text-left p-2 font-medium">Type</th>
                      <th className="text-left p-2 font-medium">Default</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b">
                      <td className="p-2 font-mono">variant</td>
                      <td className="p-2">'button' | 'circles' | 'random'</td>
                      <td className="p-2">'button'</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">size</td>
                      <td className="p-2">'sm' | 'md' | 'lg'</td>
                      <td className="p-2">'md'</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">label</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">children</td>
                      <td className="p-2">ReactNode</td>
                      <td className="p-2">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">className</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Dialog Configuration</CardTitle>
            <CardDescription>Control the color picker dialog features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Prop</th>
                    <th className="text-left p-2 font-medium">Type</th>
                    <th className="text-left p-2 font-medium">Default</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b">
                    <td className="p-2 font-mono">title</td>
                    <td className="p-2">string</td>
                    <td className="p-2">'Color Picker'</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">defaultColor</td>
                    <td className="p-2">ColorValue</td>
                    <td className="p-2">first preseted color</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">presets</td>
                    <td className="p-2">string[]</td>
                    <td className="p-2">pastel colors</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">colorMode</td>
                    <td className="p-2">'pastel' | 'vivid'</td>
                    <td className="p-2">'pastel'</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">showColorArea</td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">false</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">hideSliders</td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">false</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">showPresets</td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">true</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">showHue</td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">true</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">showSaturation</td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">true</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">showLightness</td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">true</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">showAlpha</td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">true</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">showRandomButton</td>
                    <td className="p-2">boolean</td>
                    <td className="p-2">true</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Event Callbacks</CardTitle>
            <CardDescription>Handler functions for color picker events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Callback</th>
                    <th className="text-left p-2 font-medium">Type</th>
                    <th className="text-left p-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b">
                    <td className="p-2 font-mono">onColorChange</td>
                    <td className="p-2">(color: ColorValue, random?: boolean) =&gt; void</td>
                    <td className="p-2">Called when color changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">onPresetClick</td>
                    <td className="p-2">(preset: ColorValue) =&gt; void</td>
                    <td className="p-2">Called when preset color is clicked</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">onHueChange</td>
                    <td className="p-2">(hue: number[]) =&gt; void</td>
                    <td className="p-2">Called when hue slider changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">onSaturationChange</td>
                    <td className="p-2">(saturation: number[]) =&gt; void</td>
                    <td className="p-2">Called when saturation slider changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">onLightnessChange</td>
                    <td className="p-2">(lightness: number[]) =&gt; void</td>
                    <td className="p-2">Called when lightness slider changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">onAlphaChange</td>
                    <td className="p-2">(alpha: number[]) =&gt; void</td>
                    <td className="p-2">Called when alpha slider changes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Variant Feature Matrix */}
      <div className="mt-12">
        <div className="text-center space-y-4 mb-8">
          <h3 id="variant-feature-matrix" className="text-2xl font-bold text-gray-900">Variant Feature Matrix</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            This matrix shows which properties are supported by each variant, ordered from most configurable to least configurable.
          </p>
        </div>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Property Support by Variant</CardTitle>
            <CardDescription>✅ = Supported, ❌ = Not supported</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Property</th>
                    <th className="text-center p-3 font-medium">Button<br/><span className="text-xs text-gray-500">(Full Dialog)</span></th>
                    <th className="text-center p-3 font-medium">Circles<br/><span className="text-xs text-gray-500">(Preset + Dialog)</span></th>
                    <th className="text-center p-3 font-medium">Random<br/><span className="text-xs text-gray-500">(No Dialog)</span></th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b bg-gray-50">
                    <td colSpan={4} className="p-2 font-semibold text-gray-700">Variant Props</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">size</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">disabled</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">label</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                    <td className="text-center p-3">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">children</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                    <td className="text-center p-3">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">className</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                  </tr>
                  
                  <tr className="border-b bg-gray-50">
                    <td colSpan={4} className="p-2 font-semibold text-gray-700">Color Configuration</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">defaultColor</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">presets</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">colorMode</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                  </tr>
                  
                  <tr className="border-b bg-gray-50">
                    <td colSpan={4} className="p-2 font-semibold text-gray-700">Dialog Features</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">title</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">showColorArea</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">hideSliders</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">showPresets</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">showHue</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">showSaturation</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">showLightness</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">showAlpha</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">showRandomButton</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  
                  <tr className="border-b bg-gray-50">
                    <td colSpan={4} className="p-2 font-semibold text-gray-700">Event Callbacks</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onColorChange</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onPresetClick</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onHueChange</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onSaturationChange</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onLightnessChange</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-mono">onAlphaChange</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">✅</td>
                    <td className="text-center p-3">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Button Variant</h4>
                  <p>Full-featured dialog with all controls and customization options. Best for complex color selection needs.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Circles Variant</h4>
                  <p>Quick preset selection with dialog fallback. Ideal for palette-based color picking with advanced options.</p>
                  <p className="text-xs text-amber-700 mt-1"><strong>Note:</strong> Does not render label or children - uses preset circles instead.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Random Variant</h4>
                  <p>Simple random color generation. Perfect for creative workflows and inspiration-based color selection.</p>
                  <p className="text-xs text-amber-700 mt-1"><strong>Note:</strong> Does not use presets array - generates colors based on colorMode only.</p>
                </div>
              </div>
              <div className="pt-3 border-t space-y-2">
                <p><strong>Variant Behavior Notes:</strong></p>
                <ul className="text-xs space-y-1 ml-4">
                  <li>• <strong>Circles variant:</strong> Triggers onPresetClick from both preset circles and dialog presets for consistent behavior</li>
                  <li>• <strong>Random variant:</strong> Uses colorMode to determine pastel vs vivid random color generation algorithm</li>
                  <li>• <strong>All variants:</strong> Support size, disabled, className, defaultColor, colorMode, and onColorChange</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 