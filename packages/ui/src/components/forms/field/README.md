# Field

> Status: `planned` | Priority: `P0` | Category: Forms

## Purpose

Use to normalize form copy, validation feedback, and accessible relationships.

## Summary

Shared label, description, error, and required marker wrapper for form controls.

## Public API Draft

- `label`
- `description`
- `error`
- `required`
- `disabled`
- `controlId`

## States

- `default`
- `disabled`
- `invalid`
- `required`

## Accessibility Contract

- Base primitive: `label and form control relationship`
- Reference pattern: https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-text-primary`
- `--ds-color-text-muted`
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
