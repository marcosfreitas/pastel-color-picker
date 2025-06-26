import React from 'react';
import { Badge } from '../../components/ui/badge';
import { Palette, Settings, Heart, Github, HandHeart } from 'lucide-react';

export function HeroSection() {
  return (
    <>
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

      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent" style={{ fontFamily: 'Prociono, serif' }}>
            Pastel Color Picker <span className="text-sm text-black font-mono">v4</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A beautiful, accessible, and highly customizable color picker component for React applications.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="secondary" className="flex items-center gap-1">
            <HandHeart className="w-4 h-4" />
            Accessible
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Palette className="w-4 h-4" />
            Multiple Variants
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            Highly Configurable
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            TypeScript Ready
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Github className="w-4 h-4" />
            Open Source
          </Badge>
        </div>
      </section>
    </>
  );
} 