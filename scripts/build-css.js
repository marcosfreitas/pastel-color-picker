#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function buildCSS() {
  console.log('🎨 Building CSS for pastel-color-picker...');
  
  try {
    // Ensure the dist directory exists
    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Build the library
    await execAsync('npm run build:lib');
    
    // Verify CSS file was created
    const cssPath = path.join(distDir, 'style.css');
    if (fs.existsSync(cssPath)) {
      console.log('✅ CSS file created successfully at dist/style.css');
      
      // Check file size
      const stats = fs.statSync(cssPath);
      console.log(`📦 CSS file size: ${(stats.size / 1024).toFixed(2)}KB`);
    } else {
      console.warn('⚠️  CSS file not found. Build may have failed.');
    }
    
    console.log('🎉 Build completed successfully!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

buildCSS(); 