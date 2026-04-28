# Popover

> Status: `planned` | Priority: `P1` | Category: Overlays

## Purpose

Use for contextual details, filters, or lightweight controls anchored to a trigger.

## Summary

Non-modal contextual floating surface.

## Public API Draft

- `open`
- `defaultOpen`
- `onOpenChange`
- `placement`
- `modal`

## States

- `closed`
- `opening`
- `open`
- `closing`

## Accessibility Contract

- Base primitive: `button plus positioned region`
- Reference pattern: native semantic HTML; add ARIA only when behavior requires it.
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-z-popover`
- `--ds-shadow-raised`
- `--ds-radius-8`

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
