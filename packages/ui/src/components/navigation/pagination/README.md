# Pagination

> Status: `planned` | Priority: `P1` | Category: Navigation

## Purpose

Use for datasets that are split into pages and need direct or sequential navigation.

## Summary

Navigate paged collections.

## Public API Draft

- `page`
- `totalPages`
- `siblingCount`
- `disabled`
- `onPageChange`

## States

- `current`
- `available`
- `disabled`

## Accessibility Contract

- Base primitive: `nav with links or buttons`
- Reference pattern: native semantic HTML; add ARIA only when behavior requires it.
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-border-default`
- `--ds-color-action-primary-bg`
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
