# Spinner 명세

## 목적

레이아웃을 유지할 필요는 작고, 사용자가 짧은 비동기 대기 상태만 알아야 할 때 사용합니다.

## API 표면

- public component: `Spinner`
- folder slug: `spinner`
- category: `feedback`
- 우선순위/상태: `P1`, `ready`
- props: `size`, `tone`, `label`, `status`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `size` | `Size` | `"md"` | 스피너 크기입니다. |
| `tone` | `Tone` | `"neutral"` | 상태 색상 tone입니다. |
| `label` | `string` | `"불러오는 중"` | 상태 전달용 접근성 문구입니다. |
| `status` | `"status" \| "decorative"` | `"status"` | 보조기술에 상태를 전달할지 장식으로 숨길지 결정합니다. |

## 변형

- `size`는 `sm`, `md`, `lg`만 허용합니다.
- `tone`은 semantic tone만 사용합니다.
- 진행률을 표현하지 않으므로 수치형 값은 받지 않습니다.

## 상태 동작

- `status`: `role="status"`와 숨김 문구를 렌더링합니다.
- `decorative`: 보조기술에서 숨기고 visual indicator로만 사용합니다.
- `animated`: 기본 회전 애니메이션을 사용하되 모션 감소 환경에서는 중지합니다.

## 상호작용

- 자체 포커스나 pointer interaction은 없습니다.
- 부모 컨트롤이 disabled 또는 busy 상태를 전달해야 합니다.

## 접근성 계약

- 상태 전달용 Spinner는 빈 live region이 되지 않도록 `label`을 유지합니다.
- 같은 영역에서 visible loading text가 있으면 장식 상태로 사용합니다.
- 상태가 길게 이어지거나 진행률이 중요하면 `Progress`로 전환합니다.

## 토큰 계약

- `--ds-size-icon-sm`
- `--ds-size-icon-md`
- `--ds-size-icon-lg`
- `--ds-motion-duration-normal`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다.
- theme override는 semantic token을 통해 상속되어야 합니다.

## 검증 체크리스트

- 문서 앱에서 기본 예시가 렌더링됩니다.
- `npm run components:validate`가 통과합니다.
- 상태 전달용 Spinner는 `role="status"`를 노출합니다.
- 장식용 Spinner는 `aria-hidden="true"`를 노출합니다.

## 결정 기록

- 이 컴포넌트는 `span` primitive를 기준으로 구현합니다.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다.
