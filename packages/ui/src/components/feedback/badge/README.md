# Badge

> Status: `planned` | Priority: `P0` | Category: Feedback

## Purpose

Use to mark status, category, count, or short metadata in dense interfaces.

## Summary

Small status or metadata label.

## Public API Draft

- `tone`
- `variant`
- `size`

## States

- `neutral`
- `info`
- `success`
- `warning`
- `danger`

## Accessibility Contract

- Base primitive: `span`
- Reference pattern: native semantic HTML; add ARIA only when behavior requires it.
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-radius-pill`
- `--ds-color-bg-muted`
- `--ds-color-text-muted`

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
