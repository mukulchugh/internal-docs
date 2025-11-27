# Quivly Dev Docs

Internal engineering documentation for Quivly packages and systems.

## Overview

An interactive documentation hub built with React, Vite, and Mermaid for visualizing Quivly's engineering architecture, APIs, and implementation details.

### Features

- 📦 **Package Documentation**: Comprehensive docs for `@quivly/ui-kit`, `@quivly/flow`, `@quivly/data-grid`, and `@quivly/dashboards`
- 🔍 **Full-Text Search**: Search across all packages and content
- 📊 **Interactive Diagrams**: Zoomable and pannable Mermaid flow diagrams
- 🎨 **Clean UI**: Minimalist design with sidebar navigation
- 🌐 **Native Browser Zoom**: Standard browser zoom controls (Cmd/Ctrl +/-)
- 📱 **Responsive**: Mobile-friendly with collapsible navigation

### Diagram Interactions

All Mermaid diagrams support:
- **Scroll to Zoom**: Zoom in/out with mouse wheel (50%-300%)
- **Drag to Pan**: Click and drag to navigate large diagrams
- **Hover Controls**: Zoom controls appear on diagram hover
- **Reset**: One-click return to original view

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
quivly-dev-docs/
├── components/          # React components
│   ├── code-block.tsx   # Syntax-highlighted code blocks
│   ├── file-tree.tsx    # File structure visualizations
│   └── mermaid.tsx      # Interactive Mermaid diagrams
├── data/
│   └── content.tsx      # Documentation content and metadata
├── utils/
│   └── searchUtils.ts   # Search functionality
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
└── index.html           # Entry point

```

## File Naming Conventions

All files follow **kebab-case** naming:
- Components: `data-grid-provider.tsx`
- Hooks: `use-table-instance.ts`
- Utilities: `create-columns.ts`
- Styles: `theme.css`

## Adding Documentation

### 1. Define Package Metadata

Edit `data/content.tsx` and add to `PACKAGES` array:

```tsx
{
  id: 'my-package',
  name: '@quivly/my-package',
  version: '1.0.0',
  status: 'prod', // 'prod' | 'proposed' | 'deprecated'
  description: 'Package description'
}
```

### 2. Create Package Documentation

Add documentation sections in `DOCS_MAP`:

```tsx
'my-package': {
  overview: {
    title: "Overview",
    content: <YourComponent />
  },
  architecture: {
    title: "Architecture",
    content: <ArchitectureDocs />
  },
  // ... more sections
}
```

### 3. Use Documentation Components

```tsx
// Code blocks
<CodeBlock code={`const example = "code"`} />

// File trees
<FileTree tree={fileTreeStructure} />

// Mermaid diagrams
<Mermaid chart={`graph TD
  A[Start] --> B[End]
`} />
```

## Tech Stack

- **React 19** - UI framework
- **Vite 6** - Build tool and dev server
- **TypeScript 5.8** - Type safety
- **Mermaid 11** - Diagram rendering
- **Lucide React** - Icon library

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

1. Follow kebab-case naming for all files
2. Add TypeScript types for new components
3. Test diagrams for zoom/pan functionality
4. Update README when adding new features

## License

Internal use only - Quivly Engineering Team

---

**Version**: 2024.04
**Last Updated**: November 2024
