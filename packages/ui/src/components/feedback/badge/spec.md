# Badge 명세 / Badge Spec

## 목적 / Purpose

목록, 카드, 테이블 안에서 빠르게 훑어야 하는 상태 정보를 표시할 때 사용합니다. / Use to mark status, category, count, or short metadata in dense interfaces.

## API 표면 / API Surface

- public component: `Badge`
- folder slug: `badge`
- category: `feedback`
- priority/status: `P0` / `ready`
- props: `tone`, `variant`, `size`, `iconStart`, `iconEnd`, `removable`, `removeLabel`, `onRemove`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `tone` | `tone` | `-` | semantic color tone입니다. / Semantic color tone. |
| `variant` | `variant` | `-` | 시각 variant입니다. / Visual variant. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. / Control size and density. |
| `iconStart` | `ReactNode` | `-` | content 앞에 표시할 icon입니다. / Icon displayed before the content. |
| `iconEnd` | `ReactNode` | `-` | content 뒤에 표시할 icon입니다. / Icon displayed after the content. |
| `removable` | `boolean` | `false` | 사용자가 제거할 수 있는 상태입니다. / Allows the user to remove the item. |
| `removeLabel` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `onRemove` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |

## 변형 / Variants

- 시각 변형은 이미 정의된 `variant`, `tone`, `size`, `density`, `orientation` prop이 있을 때만 사용합니다. / Visual variants use existing props such as `variant`, `tone`, `size`, `density`, and `orientation` only when they are defined.
- 새로운 변형은 product use case와 접근성 영향이 명확할 때만 추가합니다. / Add new variants only when the product use case and accessibility impact are clear.
- 색상 차이는 theme token으로 처리하고 component CSS에서 theme name을 직접 분기하지 않습니다. / Color differences are handled by theme tokens, and component CSS does not branch on theme names.

## 상태 동작 / State Behavior

- `neutral`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `info`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `success`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `warning`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `danger`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `removable`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.

## 상호작용 / Interaction

- pointer hover는 `--ds-state-hover-bg` 또는 component semantic token으로 표현합니다. / Pointer hover uses `--ds-state-hover-bg` or component semantic tokens.
- active/pressed/selected 상태는 `data-*` attribute와 ARIA state가 필요한 경우 함께 갱신합니다. / Active, pressed, and selected states update `data-*` attributes and ARIA state together when needed.
- disabled 상태는 native `disabled` 또는 `aria-disabled`를 사용하고 opacity만으로 의미를 전달하지 않습니다. / Disabled state uses native `disabled` or `aria-disabled` and never relies on opacity alone.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- keyboard focus는 항상 보이고 DOM 순서와 화면 순서가 어긋나지 않아야 합니다. / Keyboard focus must remain visible, and DOM order must match visual order.
- interactive child가 있는 경우 role 중첩과 tab stop 수를 검토합니다. / When interactive children exist, review role nesting and tab stop count.
- 상태 변화가 사용자에게 중요하면 visible text 또는 live region으로 전달합니다. / Important state changes are communicated through visible text or a live region.

## 토큰 계약 / Token Contract

- `--ds-radius-pill`
- `--ds-color-bg-muted`
- `--ds-color-text-muted`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다. / Component CSS does not use raw hex, raw rgba, or arbitrary spacing values.
- theme override는 semantic token을 통해 상속되어야 합니다. / Theme overrides must be inherited through semantic tokens.

## 검증 체크리스트 / Validation Checklist

- docs app에서 기본 예시가 렌더링됩니다. / The basic example renders in the docs app.
- `npm run components:validate`가 통과합니다. / `npm run components:validate` passes.
- keyboard focus, hover, disabled, selected 또는 open 상태가 시각적으로 구분됩니다. / Keyboard focus, hover, disabled, selected, or open states are visually distinct.
- narrow viewport에서 text overflow와 horizontal scroll이 의도한 영역에만 생깁니다. / In narrow viewports, text overflow and horizontal scroll appear only where intended.

## 결정 기록 / Decisions

- 이 컴포넌트는 `span` primitive를 기준으로 구현합니다. / This component is implemented around the `span` primitive.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다. / The public API follows the catalog prop list, and breaking changes are recorded in release notes.
