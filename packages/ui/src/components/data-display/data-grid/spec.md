# DataGrid 명세 / DataGrid Spec

## 목적 / Purpose

정적 table보다 많은 조작이 필요한 dense record 화면에 사용합니다. / Use when dense records need structured scanning with richer controls than a static table.

## API 표면 / API Surface

- public component: `DataGrid`
- folder slug: `data-grid`
- category: `data-display`
- priority/status: `P0` / `ready`
- props: `columns`, `rows`, `density`, `sortable`, `selectionMode`, `striped`, `stickyHeader`, `emptyMessage`, `rowKey`, `rowActions`, `sortState`, `defaultSortState`, `selectedRowKeys`, `defaultSelectedRowKeys`, `activeRowKey`, `defaultActiveRowKey`, `keyboardNavigation`, `resizableColumns`, `onSortChange`, `onSelectedRowKeysChange`, `onSelectionChange`, `onActiveRowKeyChange`, `onColumnResize`

## 변형 / Variants

- 시각 변형은 이미 정의된 `variant`, `tone`, `size`, `density`, `orientation` prop이 있을 때만 사용합니다. / Visual variants use existing props such as `variant`, `tone`, `size`, `density`, and `orientation` only when they are defined.
- 새로운 변형은 product use case와 접근성 영향이 명확할 때만 추가합니다. / Add new variants only when the product use case and accessibility impact are clear.
- 색상 차이는 theme token으로 처리하고 component CSS에서 theme name을 직접 분기하지 않습니다. / Color differences are handled by theme tokens, and component CSS does not branch on theme names.

## 상태 동작 / State Behavior

- `default`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `hover`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `sorted`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `selected`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `active`: keyboard row navigation의 현재 행은 `data-active`와 roving `tabIndex`를 함께 갱신해야 합니다. / The current keyboard navigation row must update `data-active` and roving `tabIndex` together.
- `empty`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `loading`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `resizing`: resize handle은 pointer drag 중 column width state를 갱신하고 token 기반 focus ring을 유지해야 합니다. / The resize handle updates column width state during pointer drag and keeps token-based focus styling.

## 상호작용 / Interaction

- pointer hover는 `--ds-state-hover-bg` 또는 component semantic token으로 표현합니다. / Pointer hover uses `--ds-state-hover-bg` or component semantic tokens.
- `Table`의 sort/selection controlled API를 그대로 노출해 grid 수준에서 상태를 관리할 수 있어야 합니다. / Exposes `Table` sort/selection controlled API so state can be managed at grid level.
- 행 focus는 `keyboardNavigation="row"`일 때 `ArrowUp`, `ArrowDown`, `Home`, `End`를 지원하고 한 행만 `tabIndex=0`이 됩니다. / Row focus supports `ArrowUp`, `ArrowDown`, `Home`, and `End` when `keyboardNavigation="row"`, with only one row using `tabIndex=0`.
- 여러 행 선택에서는 focused row에서 Space로 선택을 토글합니다. / In multi-row selection, Space toggles the focused row selection.
- column resize는 `resizableColumns`와 column의 `resizable`로 켜고 끄며 `onColumnResize`로 최종 width를 외부에 알립니다. / Column resize is controlled by `resizableColumns` and each column's `resizable`, and reports width through `onColumnResize`.
- active/pressed/selected 상태는 `data-*` attribute와 ARIA state가 필요한 경우 함께 갱신합니다. / Active, pressed, and selected states update `data-*` attributes and ARIA state together when needed.
- disabled 상태는 native `disabled` 또는 `aria-disabled`를 사용하고 opacity만으로 의미를 전달하지 않습니다. / Disabled state uses native `disabled` or `aria-disabled` and never relies on opacity alone.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: [https://www.w3.org/WAI/ARIA/apg/patterns/grid/](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- keyboard focus는 항상 보이고 DOM 순서와 화면 순서가 어긋나지 않아야 합니다. / Keyboard focus must remain visible, and DOM order must match visual order.
- `role="grid"`를 table에 적용하되 row와 gridcell의 DOM 순서를 native table 구조와 맞춥니다. / Apply `role="grid"` to the table while keeping row and gridcell DOM order aligned with native table structure.
- interactive child가 있는 경우 role 중첩과 tab stop 수를 검토합니다. / When interactive children exist, review role nesting and tab stop count.
- 상태 변화가 사용자에게 중요하면 visible text 또는 live region으로 전달합니다. / Important state changes are communicated through visible text or a live region.

## 토큰 계약 / Token Contract

- `--ds-color-border-default`
- `--ds-color-bg-surface`
- `--ds-color-bg-muted`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다. / Component CSS does not use raw hex, raw rgba, or arbitrary spacing values.
- theme override는 semantic token을 통해 상속되어야 합니다. / Theme overrides must be inherited through semantic tokens.

## 검증 체크리스트 / Validation Checklist

- docs app에서 기본 예시가 렌더링됩니다. / The basic example renders in the docs app.
- `npm run components:validate`가 통과합니다. / `npm run components:validate` passes.
- keyboard focus, hover, disabled, selected 또는 open 상태가 시각적으로 구분됩니다. / Keyboard focus, hover, disabled, selected, or open states are visually distinct.
- `npm run test:interaction`에서 DataGrid row keyboard navigation이 검증됩니다. / DataGrid row keyboard navigation is verified through `npm run test:interaction`.
- narrow viewport에서 text overflow와 horizontal scroll이 의도한 영역에만 생깁니다. / In narrow viewports, text overflow and horizontal scroll appear only where intended.

## 결정 기록 / Decisions

- 이 컴포넌트는 `table with grid-like interactions` primitive를 기준으로 구현합니다. / This component is implemented around the `table with grid-like interactions` primitive.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다. / The public API follows the catalog prop list, and breaking changes are recorded in release notes.
- virtual scroll은 현재 범위에서 제외하고, 실제 large dataset 요구가 생기면 별도 이슈로 성능 기준과 ARIA 영향을 함께 설계합니다. / Virtual scroll is excluded from the current scope; when large dataset requirements appear, a separate issue should define performance criteria and ARIA impact together.
