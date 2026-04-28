# Button

> Status: `planned` | Priority: `P0` | Category: Actions

## Purpose

Use for form submission, confirmation, cancellation, or destructive actions.

## Summary

Primary command control for explicit user actions.

## Public API Draft

- `variant`
- `tone`
- `size`
- `disabled`
- `loading`
- `type`

## States

- `default`
- `hover`
- `focus-visible`
- `active`
- `disabled`
- `loading`

## Accessibility Contract

- Base primitive: `button`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-action-primary-bg`
- `--ds-radius-6`
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
