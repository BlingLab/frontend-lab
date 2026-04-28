# Alert

> Status: `planned` | Priority: `P0` | Category: Feedback

## Purpose

Use for non-blocking information, success, warning, or error messages.

## Summary

Inline status message for important contextual feedback.

## Public API Draft

- `tone`
- `title`
- `description`
- `icon`
- `actions`

## States

- `info`
- `success`
- `warning`
- `danger`

## Accessibility Contract

- Base primitive: `role='status' or role='alert'`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-feedback-success`
- `--ds-color-feedback-warning`
- `--ds-color-feedback-danger`

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
