# Divider

> Status: `planned` | Priority: `P1` | Category: Layout

## Purpose

Use to separate adjacent sections without introducing a new container.

## Summary

Visual separator between related groups.

## Public API Draft

- `orientation`
- `decorative`

## States

- `horizontal`
- `vertical`

## Accessibility Contract

- Base primitive: `hr or role='separator'`
- Reference pattern: native semantic HTML; add ARIA only when behavior requires it.
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-border-default`

## Implementation Notes

- Keep source colocated in this folder.
- Prefer native elements before custom ARIA widgets.
- Use `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, and `data-size` for styling state.
- Avoid hard-coded color, spacing, radius, or z-index values; use `--ds-*` tokens.

## Examples

TODO: Add usage examples when implementation starts.

## Open Questions

- TODO: Confirm required variants with product usage.
- TODO: Confirm mobile density and keyboard behavior.
