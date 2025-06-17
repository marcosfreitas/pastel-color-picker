#!/bin/bash

# Release script for pastel-color-picker
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    print_error "Working directory is not clean. Please commit or stash your changes."
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_warning "You're not on the main branch. Current branch: $CURRENT_BRANCH"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get version type from argument
VERSION_TYPE=${1:-patch}

if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    print_error "Invalid version type. Use: patch, minor, or major"
    exit 1
fi

print_status "Starting release process for version type: $VERSION_TYPE"

# Run tests
print_status "Running tests..."
npm run type-check
npm run lint

# Build the package
print_status "Building package..."
npm run build:lib

# Bump version
print_status "Bumping version..."
NEW_VERSION=$(npm version $VERSION_TYPE --no-git-tag-version)
print_status "New version: $NEW_VERSION"

# Create git tag
print_status "Creating git tag..."
git add package.json package-lock.json
git commit -m "chore: bump version to $NEW_VERSION"
git tag $NEW_VERSION

# Push changes
print_status "Pushing changes and tag..."
git push origin main
git push origin $NEW_VERSION

print_status "Release process completed!"
print_status "The GitHub Actions workflow will automatically publish the package to GitHub Packages."
print_status "You can monitor the progress at: https://github.com/ordinarylink/pastel-color-picker/actions" 