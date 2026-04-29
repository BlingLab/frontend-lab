# Combobox 명세 / Combobox Spec

## 목적 / Purpose

옵션 수가 많거나 사용자가 입력으로 빠르게 필터링해야 하는 select 대체 상황에 사용합니다. / Use when a select needs filtering, text input, or many options without leaving the current form.

## API 표면 / API Surface

- public component: `Combobox`
- folder slug: `combobox`
- category: `forms`
- priority/status: `P0` / `ready`
- props: `label`, `description`, `error`, `value`, `defaultValue`, `options`, `placeholder`, `emptyMessage`, `size`, `width`, `disabled`, `required`, `fieldProps`, `onValueChange`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | 필드 label입니다. / Field label. |
| `description` | `ReactNode` | `-` | 보조 설명입니다. / Helper description. |
| `error` | `ReactNode` | `-` | 오류 메시지이며 invalid 상태를 만듭니다. / Error message that creates the invalid state. |
| `value` | `string` | `-` | controlled 선택 값입니다. / Controlled selected value. |
| `defaultValue` | `string` | `""` | uncontrolled 초기 선택 값입니다. / Initial uncontrolled selected value. |
| `options` | `ComboboxOption[]` | `[]` | 검색하고 선택할 option 목록입니다. / Options available for filtering and selection. |
| `placeholder` | `string` | `"검색 또는 선택 / Search or select"` | 입력 placeholder입니다. / Input placeholder. |
| `emptyMessage` | `ReactNode` | `"결과가 없습니다. / No results."` | 필터 결과가 없을 때 표시합니다. / Shown when filtering returns no options. |
| `size` | `Size` | `"md"` | control 높이와 밀도입니다. / Control height and density. |
| `width` | `FieldWidth` | `"auto"` | Field wrapper 폭입니다. / Field wrapper width. |
| `disabled` | `boolean` | `false` | 입력과 toggle을 비활성화합니다. / Disables the input and toggle. |
| `required` | `boolean` | `false` | 필수 입력 상태를 표시합니다. / Marks the field as required. |
| `fieldProps` | `Omit<FieldProps, ...>` | `-` | Field wrapper에 전달할 추가 설정입니다. / Additional settings passed to the Field wrapper. |
| `onValueChange` | `(value: string) => void` | `-` | 선택 값이 바뀔 때 호출됩니다. / Called when the selected value changes. |

## 변형 / Variants

- 시각 변형은 이미 정의된 `variant`, `tone`, `size`, `density`, `orientation` prop이 있을 때만 사용합니다. / Visual variants use existing props such as `variant`, `tone`, `size`, `density`, and `orientation` only when they are defined.
- 새로운 변형은 product use case와 접근성 영향이 명확할 때만 추가합니다. / Add new variants only when the product use case and accessibility impact are clear.
- 색상 차이는 theme token으로 처리하고 component CSS에서 theme name을 직접 분기하지 않습니다. / Color differences are handled by theme tokens, and component CSS does not branch on theme names.

## 상태 동작 / State Behavior

- `closed`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `open`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `filtered`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `highlighted`: 상태는 `aria-activedescendant`와 visual highlight가 함께 유지되어야 합니다. / This state keeps `aria-activedescendant` and visual highlight aligned.
- `selected`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `disabled`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `invalid`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.

## 상호작용 / Interaction

- pointer hover는 `--ds-state-hover-bg` 또는 component semantic token으로 표현합니다. / Pointer hover uses `--ds-state-hover-bg` or component semantic tokens.
- ArrowUp/ArrowDown은 highlighted option을 이동하고 Enter는 선택합니다. / ArrowUp/ArrowDown moves the highlighted option, and Enter selects it.
- active/pressed/selected 상태는 `data-*` attribute와 ARIA state가 필요한 경우 함께 갱신합니다. / Active, pressed, and selected states update `data-*` attributes and ARIA state together when needed.
- disabled 상태는 native `disabled` 또는 `aria-disabled`를 사용하고 opacity만으로 의미를 전달하지 않습니다. / Disabled state uses native `disabled` or `aria-disabled` and never relies on opacity alone.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: [https://www.w3.org/WAI/ARIA/apg/patterns/combobox/](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- keyboard focus는 항상 보이고 DOM 순서와 화면 순서가 어긋나지 않아야 합니다. / Keyboard focus must remain visible, and DOM order must match visual order.
- interactive child가 있는 경우 role 중첩과 tab stop 수를 검토합니다. / When interactive children exist, review role nesting and tab stop count.
- 상태 변화가 사용자에게 중요하면 visible text 또는 live region으로 전달합니다. / Important state changes are communicated through visible text or a live region.

## 토큰 계약 / Token Contract

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다. / Component CSS does not use raw hex, raw rgba, or arbitrary spacing values.
- theme override는 semantic token을 통해 상속되어야 합니다. / Theme overrides must be inherited through semantic tokens.

## 검증 체크리스트 / Validation Checklist

- docs app에서 기본 예시가 렌더링됩니다. / The basic example renders in the docs app.
- `npm run components:validate`가 통과합니다. / `npm run components:validate` passes.
- keyboard focus, hover, disabled, selected 또는 open 상태가 시각적으로 구분됩니다. / Keyboard focus, hover, disabled, selected, or open states are visually distinct.
- narrow viewport에서 text overflow와 horizontal scroll이 의도한 영역에만 생깁니다. / In narrow viewports, text overflow and horizontal scroll appear only where intended.

## 결정 기록 / Decisions

- 이 컴포넌트는 `combobox with listbox popup` primitive를 기준으로 구현합니다. / This component is implemented around the `combobox with listbox popup` primitive.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다. / The public API follows the catalog prop list, and breaking changes are recorded in release notes.
