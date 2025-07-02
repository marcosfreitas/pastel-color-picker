import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';

type Theme = 'light' | 'dark';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light';
    
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    const body = document.body;

    root.removeAttribute('data-theme');
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');

    if (newTheme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else if (newTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      newTheme = 'light';
    }

    root.style.colorScheme = newTheme;
    root.classList.add(newTheme);
    body.classList.add(newTheme);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const getCurrentIcon = () => {
    if (theme === 'dark') return <Moon className="w-4 h-4 text-neutral-100" />;
    if (theme === 'light') return <Sun className="w-4 h-4 text-yellow-600" />;
  };

  const getNextTheme = (): Theme => {
    return theme === 'light' ? 'dark' : 'light';
  };

  const getThemeLabel = (themeType: Theme): string => {
    return themeType === 'light' ? 'Light' : 'Dark';
  };

  return (
    <button
      type="button"
      role="button"
      tabIndex={0}
      onClick={() => handleThemeChange(getNextTheme())}
      className={cn(
        "relative w-12 h-12 rounded-full",
        "border-1 border-neutral-200 dark:border-neutral-600",
        "bg-gradient-to-br",
        "from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900",
        "hover:from-neutral-100 hover:to-neutral-200 dark:hover:from-neutral-700 dark:hover:to-neutral-800",
        "transition-all duration-300 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      )}
      title={`Click to switch to ${getThemeLabel(getNextTheme())} theme.`}
      aria-label={`Switch theme from ${getThemeLabel(theme)} to ${getThemeLabel(getNextTheme())}`}
    >
      {getCurrentIcon()}

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
    </button>
  );
}; 