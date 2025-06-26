import React from 'react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export function InstallationSection() {
  return (
    <section id="installation">
      <Card className="p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">📦 Installation</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Choose the installation method that best fits your project setup. See the Usage Options section for detailed comparisons.
        </p>
        
        <div className="space-y-6">
          {/* Base Installation */}
          <div>
            <h3 className="font-medium mb-3 flex flex-col lg:flex-row items-start gap-2">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Step 1</span>
              Install the Package
            </h3>
            <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
{`npm install @marcosfreitas/pastel-color-picker`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex flex-col lg:flex-row items-start gap-2">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Step 2</span>
              Ensure Peer Dependencies (if not already installed)
            </h3>
            <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
{`npm install react react-dom`}
            </pre>
            <p className="text-xs text-muted-foreground mt-2">
              All other dependencies (Radix UI, Lucide React, etc.) are bundled with the package.
            </p>
          </div>

          {/* Usage Option 1: Self-Contained */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex flex-col lg:flex-row items-start gap-2">
              <Badge variant="default" className="text-xs">Option 1</Badge>
              Self-Contained Setup (Recommended)
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Works immediately with bundled CSS utilities. Perfect for quick prototyping and new projects.
            </p>
            <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
{`// Runtime imports (from .js files)
import { ColorPicker, ColorModeEnum } from '@marcosfreitas/pastel-color-picker';
// Type imports (from .d.ts files)
import type { ColorValue } from '@marcosfreitas/pastel-color-picker';
// CSS import
import '@marcosfreitas/pastel-color-picker/style.css';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState<ColorValue>();

  return (
    <ColorPicker
      defaultColor={color}
      onColorChange={setColor}
      variant="button"
      colorMode={ColorModeEnum.PASTEL}  // Use enum for runtime
      // OR colorMode="pastel"         // Use string literal
      showAlpha={true}
    />
  );
}`}
            </pre>
          </div>

          {/* Usage Option 2: Headless */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex flex-col lg:flex-row items-start gap-2">
              <Badge variant="default" className="text-xs">Option 2</Badge>
              Headless Setup (No Styles, No Animations)
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Uses your project's css utilities. Smaller bundle size (~35KB CSS savings).
            </p>
            <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
{`// Runtime imports (from headless .js files)
import { ColorPicker, ColorModeEnum } from '@marcosfreitas/pastel-color-picker/headless';
// Type imports
import type { ColorValue } from '@marcosfreitas/pastel-color-picker/headless';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState<ColorValue>();

  return (
    <ColorPicker
      defaultColor={color}
      onColorChange={setColor}
      variant="button"
      colorMode={ColorModeEnum.PASTEL}  // Use enum for runtime
      // OR colorMode="pastel"         // Use string literal
      showAlpha={true}
    />
  );
}`}
            </pre>
          </div>

          {/* Usage Option 3: Source */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex flex-col lg:flex-row items-start gap-2">
              <Badge variant="default" className="text-xs">Option 3</Badge>
              Source Setup (Maximum Customization)
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Direct access to source code for maximum customization and modification.
            </p>
            <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
{`// Runtime imports (from source files)
import { ColorPicker, ColorModeEnum } from '@marcosfreitas/pastel-color-picker/src';
// Type imports
import type { ColorValue } from '@marcosfreitas/pastel-color-picker/src';
import { useState } from 'react';

function App() {
  const [color, setColor] = useState<ColorValue>();

  return (
    <ColorPicker
      defaultColor={color}
      onColorChange={setColor}
      variant="button"
      colorMode={ColorModeEnum.PASTEL}  // Use enum for runtime
      // OR colorMode="pastel"         // Use string literal
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
  );
} 