# RadioGroup

> Status: `planned` | Priority: `P0` | Category: Forms

## Purpose

Use when all choices should remain visible and only one value can be selected.

## Summary

Mutually exclusive selection from a visible option set.

## Public API Draft

- `value`
- `defaultValue`
- `options`
- `orientation`
- `disabled`
- `invalid`

## States

- `unchecked`
- `checked`
- `focus-visible`
- `disabled`
- `invalid`

## Accessibility Contract

- Base primitive: `fieldset with input[type='radio']`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
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
