# Spinner 컴포넌트

짧은 대기 상태를 보여주는 원형 진행 표시입니다.

## 역할

레이아웃을 유지할 필요는 작고, 사용자가 짧은 비동기 대기 상태만 알아야 할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `feedback`입니다.
- 기본 primitive는 `status span or decorative span`입니다.
- 긴 작업의 진행률은 `Progress`, 로딩 중 레이아웃 안정화는 `Skeleton`, 텍스트 설명이 필요한 상태는 `InlineLoading`을 사용합니다.

## Prop 축

`size`, `tone`, `label`, `status`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `size` | `Size` | `"md"` | 스피너 크기입니다. |
| `tone` | `Tone` | `"neutral"` | 상태 색상 tone입니다. |
| `label` | `string` | `"불러오는 중"` | 상태 전달용 접근성 문구입니다. |
| `status` | `"status" \| "decorative"` | `"status"` | 보조기술에 상태를 전달할지 장식으로 숨길지 결정합니다. |

## 상태

- `status`
- `decorative`
- `animated`

## 접근성

- `status="status"`는 `role="status"`와 숨김 문구로 대기 상태를 전달합니다.
- 이미 버튼, 행, 영역이 `aria-busy`나 visible text로 상태를 전달하면 `status="decorative"`로 중복 안내를 피합니다.
- 장식 상태는 `aria-hidden="true"`를 사용합니다.

## 토큰

- `--ds-size-icon-sm`
- `--ds-size-icon-md`
- `--ds-size-icon-lg`
- `--ds-motion-duration-normal`

## 예시

```tsx
import { Spinner } from "@bling-lab/ui/components/feedback/spinner";

export function Example() {
  return <Spinner label="목록을 불러오는 중" tone="brand" />;
}
```

## 구현 메모

- 구현 파일은 `spinner.tsx`, public entry는 `index.ts`입니다.
- 버튼 내부 로딩 표시는 장식용 Spinner를 사용하고 버튼 자체가 `aria-busy`를 전달합니다.
- 모션 감소 환경에서는 회전 애니메이션을 중지합니다.
