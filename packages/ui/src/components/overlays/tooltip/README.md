# Tooltip

> Status: `planned` | Priority: `P1` | Category: Overlays

## Purpose

Use to clarify icon-only or compact controls without replacing visible labels.

## Summary

Brief helper text for a focused or hovered control.

## Public API Draft

- `content`
- `placement`
- `delay`
- `disabled`

## States

- `closed`
- `delayed-open`
- `open`

## Accessibility Contract

- Base primitive: `tooltip pattern`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-z-popover`
- `--ds-color-gray-900`
- `--ds-radius-4`

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
