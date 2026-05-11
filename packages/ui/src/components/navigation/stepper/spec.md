# Stepper 명세

## 목적

여러 단계의 흐름에서 현재 단계, 완료 상태, 선택 가능한 단계를 함께 보여줄 때 사용합니다.

## API 표면

- public component: `Stepper`
- folder slug: `stepper`
- category: `navigation`
- 우선순위/상태: `P1`, `ready`
- props: `steps`, `value`, `defaultValue`, `orientation`, `variant`, `onValueChange`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `steps` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `value` | `string \| number` | `-` | controlled 값입니다. |
| `defaultValue` | `string` | `-` | uncontrolled 초기 값입니다. |
| `orientation` | `"horizontal" \| "vertical"` | `-` | 컴포넌트 방향입니다. |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `onValueChange` | `function` | `-` | value가 바뀔 때 호출됩니다. |

## 변형

- 시각 변형은 이미 정의된 `variant`, `tone`, `size`, `density`, `orientation` prop이 있을 때만 사용합니다.
- 새로운 변형은 product use case와 접근성 영향이 명확할 때만 추가합니다.
- 색상 차이는 theme token으로 처리하고 component CSS에서 theme name을 직접 분기하지 않습니다.

## 상태 동작

- `pending`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `active`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `complete`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `keyboard-navigation`: Arrow key, Home, End 이동과 focus state가 함께 유지되어야 합니다.
- `disabled`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.
- `error`: 상태는 시각 스타일과 접근성 신호가 함께 유지되어야 합니다.

## 상호작용

- pointer hover는 `--ds-state-hover-bg` 또는 component semantic token으로 표현합니다.
- orientation에 따라 ArrowLeft/ArrowRight 또는 ArrowUp/ArrowDown 이동을 지원합니다.
- active/pressed/selected 상태는 `data-*` attribute와 ARIA state가 필요한 경우 함께 갱신합니다.
- disabled 상태는 native `disabled` 또는 `aria-disabled`를 사용하고 opacity만으로 의미를 전달하지 않습니다.

## 접근성 계약

- 기준 문서
- keyboard focus는 항상 보이고 DOM 순서와 화면 순서가 어긋나지 않아야 합니다.
- interactive child가 있는 경우 role 중첩과 tab stop 수를 검토합니다.
- 상태 변화가 사용자에게 중요하면 visible text 또는 live region으로 전달합니다.

## 토큰 계약

- `--ds-color-border-default`
- `--ds-color-action-primary-bg`
- `--ds-focus-ring`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다.
- theme override는 semantic token을 통해 상속되어야 합니다.

## 검증 체크리스트

- 문서 앱에서 기본 예시가 렌더링됩니다.
- `npm run components:validate`가 통과합니다.
- keyboard focus, hover, disabled, selected 또는 open 상태가 시각적으로 구분됩니다.
- narrow viewport에서 text overflow와 horizontal scroll이 의도한 영역에만 생깁니다.

## 결정 기록

- 이 컴포넌트는 `ordered list navigation` primitive를 기준으로 구현합니다.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다.
