# Naming Conventions

## Components

- Component name: `PascalCase`
- Folder name: `kebab-case`
- File name: `kebab-case`
- Category name: plural noun, e.g. `actions`, `forms`, `feedback`

Examples:

```text
Button -> actions/button
IconButton -> actions/icon-button
RadioGroup -> forms/radio-group
DropdownMenu -> overlays/dropdown-menu
```

## Props

- Visual style: `variant`
- Semantic color intent: `tone`
- Size scale: `size`
- Density: `density`
- Orientation: `orientation`
- Placement: `placement`
- Alignment: `align`
- Controlled value: `value`
- Initial uncontrolled value: `defaultValue`
- Controlled open state: `open`
- Initial uncontrolled open state: `defaultOpen`
- Change handler: `onValueChange`, `onOpenChange`

Boolean props should be positive:

```text
disabled
required
invalid
readOnly
loading
selected
```

Avoid negative names like `notDisabled`, `noBorder`, or `hideLabel`. Prefer explicit variants or composition.

## CSS

- Public class prefix: `ds-`
- Component class: `.ds-Button`
- Element class: `.ds-Button__icon`
- Modifier class is allowed only for static styling: `.ds-Button--fullWidth`
- Dynamic styling should use data attributes.

Preferred state hooks:

```text
data-state="open|closed|checked|unchecked|selected|loading"
data-disabled
data-invalid
data-readonly
data-orientation="horizontal|vertical"
data-size="sm|md|lg"
data-variant="solid|outline|ghost"
data-tone="neutral|brand|success|warning|danger"
```

## Tokens

Use the `--ds-{category}-{role}-{scale}` shape.

Examples:

```text
--ds-color-bg-surface
--ds-color-text-primary
--ds-color-action-primary-bg
--ds-space-4
--ds-radius-8
--ds-z-dialog
```
