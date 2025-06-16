# Contributing to Pastel Color Picker

Thank you for your interest in contributing to Pastel Color Picker! We welcome contributions from the community and appreciate your help in making this project better.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 22 or higher)
- npm
- Git
- Tailwind CSS

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/pastel-color-picker.git
   cd pastel-color-picker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development Workflow

### Making Changes

1. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards
3. Test your changes thoroughly
4. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add new color variant"
   ```

### Code Style

We use ESLint and TypeScript for code quality. Please ensure your code:

- Follows TypeScript best practices
- Has proper type annotations
- Passes all ESLint checks
- Is properly formatted

Run linting before committing:
```bash
npm run lint
npm run type-check
```

### Building

To build the project:
```bash
npm run build        # Build demo
npm run build:lib    # Build library
```

## 🧪 Testing

While we don't have automated tests yet, please manually test:

- All color picker variants (button, circles, simple, random)
- Color selection and changes
- Alpha channel functionality
- Responsive behavior
- Keyboard navigation
- Different color modes (pastel/vibrant)

## 📝 Commit Convention

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring without feature changes
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Build process or auxiliary tool changes

Examples:
```
feat: add simple color variant
fix: resolve color conversion bug
docs: update API documentation
style: format ColorPicker component
```

## 🐛 Bug Reports

When filing a bug report, please include:

1. **Description**: Clear description of the issue
2. **Reproduction Steps**: Step-by-step instructions to reproduce
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: Browser, OS, component version
6. **Screenshots/Videos**: If applicable

## 💡 Feature Requests

For feature requests, please:

1. Check if the feature already exists or is planned
2. Describe the feature and its use case
3. Explain why it would be valuable
4. Provide examples or mockups if possible

## 🔧 Development Guidelines

### Component Structure

- Keep components focused and single-purpose
- Use TypeScript interfaces for all props
- Follow React best practices (hooks, functional components)
- Ensure accessibility (ARIA labels, keyboard navigation)

### Styling

- Use Tailwind CSS classes
- Maintain consistency with existing styles
- Ensure responsive design
- Test in light and dark modes

### Documentation

- Update README.md for new features
- Add JSDoc comments for complex functions
- Include usage examples
- Update TypeScript interfaces

## 🚢 Release Process

1. Features are merged into `main` branch
2. Version is bumped following [Semantic Versioning](https://semver.org/)
3. Release notes are generated
4. Package is published to npm
5. Demo is deployed to GitHub Pages

## 🤝 Code of Conduct

Please be respectful and inclusive in all interactions. We want this to be a welcoming community for everyone.

## 📞 Questions?

If you have questions about contributing, feel free to:

- Open a Discussion on GitHub
- Create an Issue with the `question` label
- Contact the maintainers

Thank you for contributing! 🎉 