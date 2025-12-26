# Erick Martinez - Portfolio Website

A modern developer portfolio built with Jekyll, React, and SCSS featuring a terminal-inspired design.

## Project Structure

```
emartinez-06.github.io/
├── src/                          # React source files (MAIN CUSTOMIZATION AREA)
    │   ├── components/
    │   │   └── Hero.js              # ⭐ Main content file - customize your text here
    │   ├── index.js                 # React entry point
    │   └── webpack.config.js        # Webpack build configuration
    │
    ├── assets/                       # Compiled assets
    │   ├── css/
    │   │   └── main.scss            # ⭐ Main styles - customize colors and layout
    │   └── js/
│       └── react-bundle.js      # Compiled React bundle (auto-generated)
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

## Main Files to Customize

### 1. Content (Hero.js)
**File**: `src/components/Hero.js`

This is your main content file. Edit this to change:
- Your name in the heading
- The typed description text
- Button text and links
- Navigation menu items

```javascript
// Example: Change your description
<TerminalText
  text="Mathematics and Computer Science // Baylor '28 // Driven learner"
  delay={0}
  speed={60}
/>
```

### 2. Styles (main.scss)
**File**: `assets/css/main.scss`

Customize:
- Colors and theme
- Layout and spacing
- Navigation position
- Button styles

### 3. Variables (_variables.scss)
**File**: `_sass/_variables.scss`

Change design tokens:
- Color palette
- Font families
- Spacing system
- Animation speeds

## How to Rebuild

Every time you make changes to React or SCSS files, you need to rebuild:

### Method 1: Full Rebuild (Recommended)
```bash
# Step 1: Rebuild React bundle
npm run build

# Step 2: Rebuild Jekyll site
bundle exec jekyll build

# Step 3: Serve locally to test
bundle exec jekyll serve
```

Then visit: `http://localhost:4000`

### Method 2: Development Mode (Auto-rebuild)
```bash
# Terminal 1: Watch React files (auto-rebuild on changes)
npm run watch

# Terminal 2: Watch Jekyll files (auto-rebuild on changes)
bundle exec jekyll serve --livereload
```

This watches for changes and rebuilds automatically.

## Quick Edit Workflow

1. **Edit content**: Modify `src/components/Hero.js`
2. **Rebuild React**: Run `npm run build`
3. **Rebuild Jekyll**: Run `bundle exec jekyll build`
4. **Test locally**: Run `bundle exec jekyll serve`
5. **View changes**: Open `http://localhost:4000`

## What Gets Generated

- `assets/js/react-bundle.js` - Compiled from `src/components/Hero.js`
- `_site/` - Full generated website (don't edit files here)
- These are auto-generated and excluded from git via `.gitignore`

## Common Issues

### Changes not showing up?
1. Make sure you rebuilt React: `npm run build`
2. Make sure you rebuilt Jekyll: `bundle exec jekyll build`
3. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Typing animation not working?
- Rebuild React bundle: `npm run build`
- Clear browser cache

### CSS changes not applying?
- Rebuild Jekyll: `bundle exec jekyll build`
- Check for SCSS syntax errors in terminal output

## Deploy to GitHub Pages

Once you're happy with changes:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub Pages will automatically build and deploy your site.

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

Install all dependencies:
```bash
npm install        # Node dependencies
bundle install     # Ruby dependencies
```
