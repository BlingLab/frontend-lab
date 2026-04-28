# Toast

> Status: `planned` | Priority: `P1` | Category: Feedback

## Purpose

Use for short-lived outcomes that should not interrupt the workflow.

## Summary

Temporary global notification.

## Public API Draft

- `tone`
- `title`
- `description`
- `duration`
- `dismissible`
- `actions`

## States

- `entering`
- `open`
- `exiting`
- `dismissed`

## Accessibility Contract

- Base primitive: `status region with dismiss control`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-z-toast`
- `--ds-shadow-raised`
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
