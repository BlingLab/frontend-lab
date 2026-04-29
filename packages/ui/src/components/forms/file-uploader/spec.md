# FileUploader 명세 / FileUploader Spec

## 목적 / Purpose

첨부 파일을 선택하고 선택된 파일 수, 허용 형식, 오류 상태를 사용자에게 보여줄 때 사용합니다. / Use when users need to attach one or more files while seeing constraints and selected files.

## API 표면 / API Surface

- public component: `FileUploader`
- folder slug: `file-uploader`
- category: `forms`
- priority/status: `P1` / `ready`
- props: `label`, `description`, `helperText`, `accept`, `multiple`, `files`, `defaultFiles`, `maxFiles`, `disabled`, `error`, `onFilesChange`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. / Visible label or accessible name. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. / Helper description text. |
| `helperText` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `accept` | `string` | `-` | 허용할 파일 MIME type 또는 확장자입니다. / Accepted file MIME types or extensions. |
| `multiple` | `boolean` | `false` | 여러 값을 선택할 수 있게 합니다. / Allows multiple values to be selected. |
| `files` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `defaultFiles` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `maxFiles` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. / Disables user interaction. |
| `error` | `ReactNode` | `-` | 오류 메시지이며 invalid 상태를 만듭니다. / Error message that creates the invalid state. |
| `onFilesChange` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |

## 변형 / Variants

- 시각 변형은 이미 정의된 `variant`, `tone`, `size`, `density`, `orientation` prop이 있을 때만 사용합니다. / Visual variants use existing props such as `variant`, `tone`, `size`, `density`, and `orientation` only when they are defined.
- 새로운 변형은 product use case와 접근성 영향이 명확할 때만 추가합니다. / Add new variants only when the product use case and accessibility impact are clear.
- 색상 차이는 theme token으로 처리하고 component CSS에서 theme name을 직접 분기하지 않습니다. / Color differences are handled by theme tokens, and component CSS does not branch on theme names.

## 상태 동작 / State Behavior

- `default`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `hover`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `focus-visible`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `drag-over`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `disabled`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.
- `invalid`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다. / This state must keep visual styling and accessibility signals aligned.

## 상호작용 / Interaction

- pointer hover는 `--ds-state-hover-bg` 또는 component semantic token으로 표현합니다. / Pointer hover uses `--ds-state-hover-bg` or component semantic tokens.
- drag-over는 `data-dragging` hook으로 표현하고 drop 후 `files` state를 갱신합니다. / Drag-over is represented through the `data-dragging` hook and updates `files` state after drop.
- active/pressed/selected 상태는 `data-*` attribute와 ARIA state가 필요한 경우 함께 갱신합니다. / Active, pressed, and selected states update `data-*` attributes and ARIA state together when needed.
- disabled 상태는 native `disabled` 또는 `aria-disabled`를 사용하고 opacity만으로 의미를 전달하지 않습니다. / Disabled state uses native `disabled` or `aria-disabled` and never relies on opacity alone.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: [https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file)](https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file))
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

- 이 컴포넌트는 `input[type='file']` primitive를 기준으로 구현합니다. / This component is implemented around the `input[type='file']` primitive.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다. / The public API follows the catalog prop list, and breaking changes are recorded in release notes.
