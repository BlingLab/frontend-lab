# Accessibility Checklist

## Before Implementation

- Identify whether native HTML is enough.
- Link to the relevant WAI-ARIA APG pattern when building custom interaction.
- Define the accessible name source.
- Define keyboard behavior.
- Define focus entry, focus movement, and focus return.
- Define disabled, read-only, invalid, selected, checked, expanded, and loading announcements where relevant.

## During Implementation

- Prefer semantic elements: `button`, `a`, `input`, `select`, `textarea`, `fieldset`, `legend`, `table`.
- Do not add ARIA that conflicts with native semantics.
- Keep visible focus styles.
- Ensure icon-only controls have an accessible label.
- Keep text alternatives in the API, not as optional afterthoughts.
- Respect reduced motion for animated components.

## Before Ready

- Keyboard-only operation works.
- Focus order is predictable.
- Screen reader names and states are inspectable.
- Error text is programmatically associated with the field.
- Color is not the only signal.
- Touch target size is acceptable for compact layouts.
- High contrast mode does not lose essential boundaries.
