# Select

> Status: `planned` | Priority: `P0` | Category: Forms

## Purpose

Use native select first; move to custom listbox or combobox only when searchable or rich options are required.

## Summary

Single option selection from a known set.

## Public API Draft

- `value`
- `defaultValue`
- `options`
- `placeholder`
- `disabled`
- `invalid`

## States

- `default`
- `hover`
- `focus-visible`
- `open`
- `disabled`
- `invalid`

## Accessibility Contract

- Base primitive: `select or combobox/listbox pattern`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-bg-surface`
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
