# Breadcrumb

> Status: `planned` | Priority: `P1` | Category: Navigation

## Purpose

Use to show parent locations and support quick navigation upward.

## Summary

Hierarchical page location trail.

## Public API Draft

- `items`
- `separator`
- `maxItems`

## States

- `current`
- `link`

## Accessibility Contract

- Base primitive: `nav with ordered list`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-text-muted`
- `--ds-color-action-primary-bg`

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
