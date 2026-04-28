# TextField

> Status: `planned` | Priority: `P0` | Category: Forms

## Purpose

Use for names, short descriptions, URLs, emails, search terms, and similar text values.

## Summary

Single-line text input with Field composition.

## Public API Draft

- `value`
- `defaultValue`
- `placeholder`
- `type`
- `disabled`
- `readOnly`
- `invalid`

## States

- `default`
- `hover`
- `focus-visible`
- `disabled`
- `read-only`
- `invalid`

## Accessibility Contract

- Base primitive: `input`
- Reference pattern: https://html.spec.whatwg.org/multipage/input.html
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to `ready`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

- `--ds-color-bg-surface`
- `--ds-color-border-default`
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
