'use client';

import React, { useState } from 'react';
import { ColorValue, ColorModeEnum, ColorMode, ColorPickerSize } from '../types';
import { X, Menu, Settings, PaintBucket, Wrench, Download, Github } from 'lucide-react';

// Import section components
import { HeroSection } from './sections/HeroSection';
import { VariantExamplesSection, VariantState } from './sections/VariantExamplesSection';

import { CustomPresetColorsSection } from './sections/CustomPresetColorsSection';
import { ConfigurationApiSection } from './sections/ConfigurationApiSection';
import { InstallationSection } from './sections/InstallationSection';
import { ThemeToggle } from './components/ThemeToggle';

export function Content() {

  // State for global configuration
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for each variant with individual configurations
  const [variantStates, setVariantStates] = useState<{
    button: VariantState;
    circles: VariantState;
    random: VariantState;
  }>({
    button: {
      config: {
        size: 'md' as ColorPickerSize,
        disabled: false,
        colorMode: ColorModeEnum.PASTEL,
        showColorBar: false,
        showPresets: true,
        showHue: true,
        showSaturation: false,
        showLightness: false,
        showAlpha: true,
        showRandomButton: true,
        hideSliders: false
      }
    },
    circles: {
      config: {
        size: 'md' as ColorPickerSize,
        disabled: false,
        colorMode: ColorModeEnum.NORMAL,
        showColorArea: true,
        showPresets: true,
        showHue: true,
        showSaturation: false,
        showLightness: false,
        showAlpha: false,
        showRandomButton: false,
        hideSliders: false
      }
    },
    random: {
      color: undefined,
      config: {
        size: 'lg' as ColorPickerSize,
        disabled: false,
        title: 'Random Color Generator',
        colorMode: ColorModeEnum.VIVID,
        showPresets: false,
        showHue: false,
        showSaturation: false,
        showLightness: false,
        showAlpha: false,
        showRandomButton: true,
        hideSliders: true
      }
    }
  });

  // Navigation sections following backup layout
  const navigationSections = [
    { title: 'Examples', href: 'variant-examples', icon: Settings },
    { title: 'Custom Presets', href: 'custom-preset-colors', icon: PaintBucket },
    { title: 'Configuration', href: 'configuration-api', icon: Wrench },
    { title: 'Installation', href: 'installation', icon: Download },
  ];

  // Update variant config helper
  const updateVariantConfig = (variant: keyof typeof variantStates, configUpdates: Partial<typeof variantStates[typeof variant]['config']>) => {
    setVariantStates(prev => ({
      ...prev,
      [variant]: {
        ...prev[variant],
        config: {
          ...prev[variant].config,
          ...configUpdates
        }
      }
    }));
  };

  // Update variant color
  const updateVariantColor = (variant: keyof typeof variantStates, color: ColorValue) => {
    setVariantStates(prev => ({
      ...prev,
      [variant]: {
        ...prev[variant],
        color
      }
    }));
  };

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - 20;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      setSidebarOpen(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full overflow-x-hidden">
      {/* Sidebar - Following backup layout */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0`}
        aria-label="Navigation sidebar"
        role="complementary"
      >
        <div className="sticky top-0 h-screen flex flex-col bg-white dark:bg-gray-900">
          <div className="flex flex-col p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 space-y-3">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 demo-nav-button"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 dark:text-gray-100" />
              </button>
            </div>
            
            {/* NPM and GitHub buttons */}
            <div className="flex gap-2">
              <a 
                href="https://www.npmjs.com/package/@marcosfreitas/pastel-color-picker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-xs text-black hover:text-white dark:text-white bg-white dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 border border-black dark:border-gray-700 transition-all duration-200 rounded-md flex-1 justify-center demo-nav-button"
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
                className="flex items-center gap-2 px-3 py-2 text-xs text-black hover:text-white dark:text-white bg-white dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 border border-black dark:border-gray-700 transition-all duration-200 rounded-md flex-1 justify-center demo-nav-button"
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
                  className="w-full text-left px-3 py-2 rounded-md text-sm dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 demo-sidebar-nav"
                  aria-label={`Navigate to ${section.title} section`}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 min-w-0 dark:bg-gray-900" role="main" aria-label="Main content">
        <section className="space-y-8 p-4 sm:p-6 w-full max-w-none sm:max-w-[90%] mx-auto">
          <div className="flex justify-end fixed top-4 right-10 z-40">
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm demo-nav-button"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5 dark:text-gray-100" />
          </button>

          {/* Hero Section */}
          <HeroSection />
 
          <VariantExamplesSection
            variantStates={variantStates}
            updateVariantConfig={updateVariantConfig}
            updateVariantColor={updateVariantColor}
          />

          {/* Custom Preset Colors */}
          <CustomPresetColorsSection />

          {/* Configuration API */}
          <ConfigurationApiSection />

          {/* Installation */}
          <InstallationSection />
        </section>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed w-full h-full inset-0 z-40 bg-white dark:bg-gray-900 opacity-50 lg:hidden" />
        </div>
      )}
    </section>
  );
} 