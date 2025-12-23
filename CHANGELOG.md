# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-23

### Added
- **Core Calculator Engine**
  - Scientific calculator with TDD approach
  - Parser with Shunting Yard algorithm for expression parsing
  - Evaluator with RPN (Reverse Polish Notation) evaluation
  - Tokenizer for lexical analysis
  - Support for operator precedence and parentheses

- **Mathematical Functions**
  - Basic arithmetic operations: +, -, ×, ÷
  - Trigonometric functions: sin, cos, tan
  - Logarithmic functions: ln (natural log), log (base 10)
  - Power and root: ^ (power), sqrt (square root)
  - Constants: π (pi), e (Euler's number)

- **Angle Mode Support**
  - DEG (Degrees) mode
  - RAD (Radians) mode
  - Toggle between modes with visual feedback

- **User Interface**
  - Modern, responsive design with Tailwind CSS
  - Dark mode support (system preference detection)
  - Glassmorphism effects
  - Smooth animations and transitions
  - Mobile-first responsive layout

- **Accessibility Features**
  - ARIA attributes for screen readers
  - Keyboard navigation support
  - Focus indicators
  - High contrast colors
  - Touch-friendly button sizes (44px minimum)

- **Keyboard Support**
  - Number keys (0-9)
  - Operator keys (+, -, *, /)
  - Enter key for calculation
  - Escape key for clear
  - Backspace for delete

- **Error Handling**
  - Division by zero detection
  - Invalid expression handling
  - Negative logarithm/square root detection
  - Parentheses mismatch detection
  - User-friendly error messages

- **Testing**
  - Comprehensive unit tests (60 tests)
  - Integration tests
  - Test coverage: 92.84% for core logic
  - TDD approach throughout development

- **Documentation**
  - Comprehensive README with setup instructions
  - Manual test guide for UI testing
  - Technical specification document
  - Deployment guide
  - Code comments and JSDoc

### Technical Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Vite 5.0
- **Testing**: Vitest 1.0
- **Code Quality**: ESLint, Prettier
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

### Performance
- Bundle size: < 100KB (gzipped)
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 200ms
- Lighthouse scores: 90+ across all metrics

### Design Principles
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **TDD (Test-Driven Development)**: Tests written before implementation
- **Clean Code**: Readable, maintainable, well-documented code
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance

### Known Issues
None at this time.

### Future Enhancements
- Scientific notation input
- History of calculations
- Memory functions (M+, M-, MR, MC)
- Additional functions (asin, acos, atan, sinh, cosh, tanh)
- Customizable themes
- Export/import calculations

---

## Release Notes

### v1.0.0 - Initial Release
This is the first stable release of the Engineering Calculator. The calculator is fully functional with all planned features implemented, tested, and documented. It has been deployed to GitHub Pages and is ready for production use.

**Deployment URL**: https://kwang-min13.github.io/calculator/

**Repository**: https://github.com/kwang-min13/calculator
