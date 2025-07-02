import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

export const ColorPickerThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Get saved theme from localStorage or default to light for color picker only
    const savedTheme = localStorage.getItem('color-picker-theme') as Theme || 'light';
    setTheme(savedTheme);
    applyColorPickerTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Observe for new color picker components and apply current theme
    const observer = new MutationObserver(() => {
      applyColorPickerTheme(theme);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-pcp-root', 'class']
    });

    return () => observer.disconnect();
  }, [theme]);

  const applyColorPickerTheme = (newTheme: Theme) => {
    // Apply theme only to color picker components
    const colorPickerRoots = document.querySelectorAll('[data-pcp-root], .pcp-root');
    colorPickerRoots.forEach(element => {
      if (newTheme === 'dark') {
        element.setAttribute('data-theme', 'dark');
      } else {
        element.setAttribute('data-theme', 'light');
      }
    });
  };

  const handleThemeToggle = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('color-picker-theme', newTheme);
    applyColorPickerTheme(newTheme);
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="relative w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 hover:from-blue-100 hover:to-indigo-200 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl group"
      title={`Switch color picker theme to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label={`Toggle color picker theme from ${theme} to ${theme === 'light' ? 'dark' : 'light'}`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
        ) : (
          <div className="relative">
            <Moon className="w-5 h-5 text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-gray-300 rounded-full opacity-70"></div>
          </div>
        )}
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
}; 