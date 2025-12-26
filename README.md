# Erick Martinez - Portfolio Website

A modern developer portfolio built with Jekyll, React, and SCSS featuring a terminal-inspired design.

## Project Structure

```
emartinez-06.github.io/
├── src/                          
    │   ├── components/
    │   │   └── Hero.js              
    │   ├── index.js                 # React entry point
    │   └── webpack.config.js        # Webpack build configuration
    │
    ├── assets/                       # Compiled assets
    │   ├── css/
    │   │   └── main.scss            
    │   └── js/
│       └── react-bundle.js      
│
├── _sass/                        # SCSS partials
│   ├── _variables.scss          # Color scheme and design tokens
│   ├── _animations.scss         # Animation definitions
│   └── base.scss               # Base styles
│
├── _layouts/
│   └── default.html             # HTML template wrapper
│
├── index.md                      # Homepage markdown
├── _config.yml                   # Jekyll configuration
├── package.json                  # Node dependencies
└── Gemfile                       # Ruby dependencies
```

## Tech Stack

- **Jekyll** - Static site generator
- **React** - Interactive UI components
- **SCSS** - Styling with variables and nesting
- **Webpack** - Bundles React components
- **Babel** - Transpiles modern JavaScript

## Dependencies

### Node (JavaScript)
- react, react-dom - UI library
- webpack, webpack-cli - Module bundler
- babel - JavaScript compiler

### Ruby (Jekyll)
- jekyll - Static site generator
- github-pages - GitHub Pages gem
