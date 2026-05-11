# 접근성 체크리스트

## 구현 전

- native HTML만으로 충분한지 확인합니다.
- custom interaction을 만들 때 관련 WAI-ARIA APG pattern을 연결합니다.
- accessible name의 출처를 정의합니다.
- keyboard behavior를 정의합니다.
- focus entry, focus movement, focus return을 정의합니다.
- 필요한 경우 disabled, read-only, invalid, selected, checked, expanded, loading announcement를 정의합니다.

## 구현 중

- semantic element를 우선합니다: `button`, `a`, `input`, `select`, `textarea`, `fieldset`, `legend`, `table`.
- native semantics와 충돌하는 ARIA를 추가하지 않습니다.
- visible focus style을 유지합니다.
- icon-only control에는 accessible label을 제공합니다.
- text alternative는 API에 포함하고 사후 옵션처럼 취급하지 않습니다.
- animated component는 reduced motion을 존중합니다.

## ready 전

- keyboard-only operation이 동작합니다.
- focus order가 예측 가능합니다.
- screen reader name과 state를 확인할 수 있습니다.
- error text가 field와 programmatically associated 되어 있습니다.
- color만 유일한 신호로 쓰지 않습니다.
- compact layout에서도 touch target size가 허용 가능한 수준입니다.
- high contrast mode에서 필수 boundary가 사라지지 않습니다.

## 회귀 테스트 기준

- `scripts/interaction-a11y.mjs`는 `componentCatalog` 기준 상호작용 컴포넌트 목록이 누락되지 않는지 먼저 확인합니다.
- JSDOM에서는 native `select`, `input[type="date"]`, `input[type="file"]`의 브라우저 UI 자체를 열 수 없으므로 focus 유지, value 변경, callback, rendered state를 검증합니다.
- custom navigation pattern은 Arrow, Home, End, Space, Enter 흐름을 테스트에 포함합니다.
- Escape로 닫히는 overlay는 focus return을 반드시 검증합니다.
- 실제 브라우저 layout, native picker popup, drag-and-drop pointer detail은 Playwright visual/browser test 범위로 분리합니다.
