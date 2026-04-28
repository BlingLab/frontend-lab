# Tabs

> Status: `planned` | Priority: `P0` | Category: Navigation

## Purpose

Use for peer sections that share a page location and do not require full navigation.

## Summary

Switch between related panels in the same context.

## Public API Draft

- `value`
- `defaultValue`
- `orientation`
- `activationMode`
- `disabled`

## States

- `selected`
- `unselected`
- `focus-visible`
- `disabled`

## Accessibility Contract

- Base primitive: `tabs pattern`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-action-primary-bg`
- `--ds-color-border-default`
- `--ds-focus-ring`

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
