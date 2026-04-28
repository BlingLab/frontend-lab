# Card

> Status: `planned` | Priority: `P0` | Category: Layout

## Purpose

Use for repeated records, summary panels, or independent content groups.

## Summary

Surface for grouping related content and actions.

## Public API Draft

- `variant`
- `density`
- `interactive`

## States

- `default`
- `hover`
- `focus-visible`
- `selected`

## Accessibility Contract

- Base primitive: `article or section`
- Reference pattern: native semantic HTML; add ARIA only when behavior requires it.
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-bg-surface`
- `--ds-color-border-default`
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
