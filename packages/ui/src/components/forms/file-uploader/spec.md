# FileUploader 명세

## 목적

첨부 파일을 선택하고 선택된 파일 수, 허용 형식, 오류 상태를 사용자에게 보여줄 때 사용합니다.

## API 표면

- public component: `FileUploader`
- folder slug: `file-uploader`
- category: `forms`
- 우선순위/상태: `P1`, `ready`
- props: `label`, `description`, `helperText`, `accept`, `multiple`, `files`, `defaultFiles`, `maxFiles`, `disabled`, `error`, `onFilesChange`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. |
| `helperText` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `accept` | `string` | `-` | 허용할 파일 MIME type 또는 확장자입니다. |
| `multiple` | `boolean` | `false` | 여러 값을 선택할 수 있게 합니다. |
| `files` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `defaultFiles` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `maxFiles` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `error` | `ReactNode` | `-` | 오류 메시지이며 invalid 상태를 만듭니다. |
| `onFilesChange` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 변형

- 시각 변형은 이미 정의된 `variant`, `tone`, `size`, `density`, `orientation` prop이 있을 때만 사용합니다.
- 새로운 변형은 product use case와 접근성 영향이 명확할 때만 추가합니다.
- 색상 차이는 theme token으로 처리하고 component CSS에서 theme name을 직접 분기하지 않습니다.

## 상태 동작

- `default`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `hover`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `focus-visible`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `drag-over`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `disabled`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `invalid`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.

## 상호작용

- pointer hover는 `--ds-state-hover-bg` 또는 component semantic token으로 표현합니다.
- drag-over는 `data-dragging` hook으로 표현하고 drop 후 `files` state를 갱신합니다.
- active/pressed/selected 상태는 `data-*` attribute와 ARIA state가 필요한 경우 함께 갱신합니다.
- disabled 상태는 native `disabled` 또는 `aria-disabled`를 사용하고 opacity만으로 의미를 전달하지 않습니다.

## 접근성 계약

- 기준 문서
- keyboard focus는 항상 보이고 DOM 순서와 화면 순서가 어긋나지 않아야 합니다.
- interactive child가 있는 경우 role 중첩과 tab stop 수를 검토합니다.
- 상태 변화가 사용자에게 중요하면 visible text 또는 live region으로 전달합니다.

## 토큰 계약

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다.
- theme override는 semantic token을 통해 상속되어야 합니다.

## 검증 체크리스트

- 문서 앱에서 기본 예시가 렌더링됩니다.
- `npm run components:validate`가 통과합니다.
- keyboard focus, hover, disabled, selected 또는 open 상태가 시각적으로 구분됩니다.
- narrow viewport에서 text overflow와 horizontal scroll이 의도한 영역에만 생깁니다.

## 결정 기록

- 이 컴포넌트는 `input[type='file']` primitive를 기준으로 구현합니다.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다.
