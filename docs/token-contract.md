# Token Contract

## Layers

### Primitive

Raw scales that should rarely appear in component CSS.

```text
--ds-color-blue-600
--ds-space-4
--ds-radius-8
```

### Semantic

Product meaning mapped to primitive values.

```text
--ds-color-bg-canvas
--ds-color-bg-surface
--ds-color-text-primary
--ds-color-action-primary-bg
--ds-color-feedback-danger
```

### Component

Component-specific override hooks.

```text
--ds-button-bg
--ds-button-color
--ds-dialog-width
```

Component tokens should resolve to semantic tokens by default.

## Rules

- Component CSS should use semantic tokens first.
- Component tokens are added only when consumers need a stable override hook.
- Raw hex values are allowed only in `packages/tokens/src/tokens.css`.
- Spacing uses a fixed scale. Do not invent one-off margins in component CSS.
- z-index values must come from `--ds-z-*`.
- motion duration/easing must come from `--ds-motion-*`.

## Initial Scale

The initial CSS source is [tokens.css](../packages/tokens/src/tokens.css).
