# InlineLoading 명세

## 목적

버튼 밖의 짧은 대기, 저장 중, 동기화 결과처럼 텍스트 상태를 함께 전달해야 할 때 사용합니다.

## API 표면

- public component: `InlineLoading`
- folder slug: `inline-loading`
- category: `feedback`
- 우선순위/상태: `P1`, `ready`
- props: `label`, `description`, `size`, `tone`, `status`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `"불러오는 중"` | 사용자에게 표시하고 전달할 상태 문구입니다. |
| `description` | `ReactNode` | `-` | 상태를 보강하는 짧은 설명입니다. |
| `size` | `Size` | `"md"` | 표시 밀도와 아이콘 크기입니다. |
| `tone` | `Tone` | `"neutral"` | loading 상태의 색상 tone입니다. |
| `status` | `"loading" \| "success" \| "error"` | `"loading"` | 현재 인라인 상태입니다. |

## 변형

- `status`는 `loading`, `success`, `error`만 허용합니다.
- `tone`은 loading 상태의 색상 보정에 사용하고, success/error는 상태 색상을 우선합니다.
- action이 필요하면 `Alert` 또는 `Toast`로 확장합니다.

## 상태 동작

- `loading`: 장식용 Spinner와 visible label을 함께 렌더링합니다.
- `success`: 완료 아이콘과 상태 문구를 렌더링합니다.
- `error`: 경고 아이콘과 상태 문구를 렌더링하고 assertive live region을 사용합니다.

## 상호작용

- 자체 포커스나 pointer interaction은 없습니다.
- 상태가 바뀔 때 같은 DOM 영역에서 label을 갱신해 보조기술이 변화를 추적할 수 있게 합니다.

## 접근성 계약

- 루트는 `role="status"`와 `aria-live`를 사용합니다.
- 로딩 아이콘은 텍스트와 중복 안내되지 않도록 숨깁니다.
- 장시간 작업, 수치 진행률, 취소 action이 필요하면 `Progress`나 별도 action pattern을 사용합니다.

## 토큰 계약

- `--ds-color-text-primary`
- `--ds-color-text-muted`
- `--ds-motion-duration-normal`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다.
- theme override는 semantic token을 통해 상속되어야 합니다.

## 검증 체크리스트

- 문서 앱에서 기본 예시가 렌더링됩니다.
- `npm run components:validate`가 통과합니다.
- `loading`, `success`, `error` 상태가 시각적으로 구분됩니다.
- 상태 텍스트가 좁은 폭에서도 줄바꿈됩니다.

## 결정 기록

- 이 컴포넌트는 `role='status'` primitive를 기준으로 구현합니다.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다.
