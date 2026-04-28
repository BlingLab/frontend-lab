# Table

> Status: `planned` | Priority: `P1` | Category: Data Display

## Purpose

Use for dense data that benefits from scanning, sorting, and column alignment.

## Summary

Structured rows and columns for comparable records.

## Public API Draft

- `columns`
- `rows`
- `density`
- `sortable`
- `selectionMode`

## States

- `default`
- `sorted`
- `selected`
- `empty`
- `loading`

## Accessibility Contract

- Base primitive: `table`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/table/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-color-bg-muted`

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
