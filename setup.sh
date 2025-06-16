#!/bin/bash

echo "🎨 Setting up Pastel Color Picker..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first:"
    echo "   sudo apt install npm"
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 You can now run:"
    echo "   npm run dev      # Start development server"
    echo "   npm run build    # Build for production"
    echo "   npm run build:lib # Build library for npm"
    echo ""
    echo "🌐 Demo will be available at: http://localhost:5173"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi 