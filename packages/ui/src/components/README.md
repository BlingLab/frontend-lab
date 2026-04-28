# Component Catalog

This directory contains the normalized component skeleton for `@workspace/ui`.

## Categories

- `actions`: command controls such as `Button` and `IconButton`
- `forms`: inputs, validation wrappers, and choice controls
- `feedback`: alerts, notifications, progress, and status indicators
- `overlays`: floating or modal surfaces
- `navigation`: controls that move across pages, sections, or panels
- `layout`: structural content surfaces and separators
- `data-display`: lists, tables, empty states, and record presentation

## Folder Contract

```text
{category}/{component-slug}/
├── README.md
└── spec.md
```

When implementation starts, add source files without changing the existing public contract:

```text
{component-slug}.js
{component-slug}.css
{component-slug}.test.js
examples.js
index.js
```

The component catalog in `catalog.js` is the source for initial scaffolding and validation.
