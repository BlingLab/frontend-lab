# EmptyState

> Status: `planned` | Priority: `P1` | Category: Data Display

## Purpose

Use to explain why content is missing and offer the next useful action.

## Summary

Guidance shown when a view has no data.

## Public API Draft

- `title`
- `description`
- `icon`
- `actions`
- `tone`

## States

- `no-data`
- `filtered`
- `error`
- `permission`

## Accessibility Contract

- Base primitive: `section`
- Reference pattern: native semantic HTML; add ARIA only when behavior requires it.
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-text-muted`
- `--ds-color-bg-surface`
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
