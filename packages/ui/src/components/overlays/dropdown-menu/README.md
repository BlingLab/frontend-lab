# DropdownMenu

> Status: `planned` | Priority: `P1` | Category: Overlays

## Purpose

Use for contextual commands, overflow actions, or compact action groups.

## Summary

Action menu opened from a trigger.

## Public API Draft

- `open`
- `defaultOpen`
- `items`
- `placement`
- `onOpenChange`

## States

- `closed`
- `open`
- `highlighted`
- `disabled`

## Accessibility Contract

- Base primitive: `menu button pattern`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-z-dropdown`
- `--ds-shadow-raised`
- `--ds-radius-6`

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
