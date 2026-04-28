# Progress

> Status: `planned` | Priority: `P1` | Category: Feedback

## Purpose

Use when users need to understand task completion or waiting state.

## Summary

Determinate or indeterminate task progress.

## Public API Draft

- `value`
- `max`
- `label`
- `indeterminate`
- `tone`

## States

- `determinate`
- `indeterminate`
- `complete`

## Accessibility Contract

- Base primitive: `progress`
- Reference pattern: native semantic HTML; add ARIA only when behavior requires it.
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-action-primary-bg`
- `--ds-color-bg-muted`
- `--ds-motion-duration-normal`

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
