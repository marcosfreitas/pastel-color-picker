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
        <Card>
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

        <Card>
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
                    <td className="p-2">black color</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">colorMode</td>
                    <td className="p-2">ColorMode</td>
                    <td className="p-2">pastel colors</td>
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
    </section>
  );
} 