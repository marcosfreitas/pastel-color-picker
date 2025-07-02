import '../css/index.css'
import './App.css'
import { Content } from './content'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Initialize theme on page load for Tailwind darkMode: 'class'
    const root = document.documentElement;
    
    // Check if theme is already set by ThemeToggle
    if (!root.classList.contains('light') && !root.classList.contains('dark')) {
      // Default to light mode for demo
      root.classList.add('light');
      root.style.colorScheme = 'light';
    }
  }, []);

  return (
    <div className="max-w-screen text-foreground example-bg">
      <Content />
    </div>
  )
}

export default App 