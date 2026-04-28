# 접근성 체크리스트 / Accessibility Checklist

## 구현 전 / Before Implementation

- native HTML만으로 충분한지 확인합니다. / Identify whether native HTML is enough.
- custom interaction을 만들 때 관련 WAI-ARIA APG pattern을 연결합니다. / Link to the relevant WAI-ARIA APG pattern when building custom interaction.
- accessible name의 출처를 정의합니다. / Define the accessible name source.
- keyboard behavior를 정의합니다. / Define keyboard behavior.
- focus entry, focus movement, focus return을 정의합니다. / Define focus entry, focus movement, and focus return.
- 필요한 경우 disabled, read-only, invalid, selected, checked, expanded, loading announcement를 정의합니다. / Define disabled, read-only, invalid, selected, checked, expanded, and loading announcements where relevant.

## 구현 중 / During Implementation

- semantic element를 우선합니다: `button`, `a`, `input`, `select`, `textarea`, `fieldset`, `legend`, `table`. / Prefer semantic elements: `button`, `a`, `input`, `select`, `textarea`, `fieldset`, `legend`, `table`.
- native semantics와 충돌하는 ARIA를 추가하지 않습니다. / Do not add ARIA that conflicts with native semantics.
- visible focus style을 유지합니다. / Keep visible focus styles.
- icon-only control에는 accessible label을 제공합니다. / Ensure icon-only controls have an accessible label.
- text alternative는 API에 포함하고 사후 옵션처럼 취급하지 않습니다. / Keep text alternatives in the API, not as optional afterthoughts.
- animated component는 reduced motion을 존중합니다. / Respect reduced motion for animated components.

## ready 전 / Before Ready

- keyboard-only operation이 동작합니다. / Keyboard-only operation works.
- focus order가 예측 가능합니다. / Focus order is predictable.
- screen reader name과 state를 확인할 수 있습니다. / Screen reader names and states are inspectable.
- error text가 field와 programmatically associated 되어 있습니다. / Error text is programmatically associated with the field.
- color만 유일한 신호로 쓰지 않습니다. / Color is not the only signal.
- compact layout에서도 touch target size가 허용 가능한 수준입니다. / Touch target size is acceptable for compact layouts.
- high contrast mode에서 필수 boundary가 사라지지 않습니다. / High contrast mode does not lose essential boundaries.
