# InlineLoading 컴포넌트

스피너와 텍스트를 함께 보여주는 인라인 상태 표시입니다.

## 역할

버튼 밖의 짧은 대기, 저장 중, 동기화 결과처럼 텍스트 상태를 함께 전달해야 할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `feedback`입니다.
- 기본 primitive는 `role='status'`입니다.
- 아이콘만 필요하면 `Spinner`, 진행률이 필요하면 `Progress`, 큰 영역의 로딩 자리 확보가 필요하면 `Skeleton`을 사용합니다.

## Prop 축

`label`, `description`, `size`, `tone`, `status`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `"불러오는 중"` | 사용자에게 표시하고 전달할 상태 문구입니다. |
| `description` | `ReactNode` | `-` | 상태를 보강하는 짧은 설명입니다. |
| `size` | `Size` | `"md"` | 표시 밀도와 아이콘 크기입니다. |
| `tone` | `Tone` | `"neutral"` | loading 상태의 색상 tone입니다. |
| `status` | `"loading" \| "success" \| "error"` | `"loading"` | 현재 인라인 상태입니다. |

## 상태

- `loading`
- `success`
- `error`

## 접근성

- 루트는 `role="status"`를 사용해 label과 description을 전달합니다.
- 오류 상태는 더 즉각적으로 안내하기 위해 `aria-live="assertive"`를 사용합니다.
- loading 상태의 Spinner는 텍스트와 중복되지 않도록 장식으로 숨깁니다.

## 토큰

- `--ds-color-text-primary`
- `--ds-color-text-muted`
- `--ds-motion-duration-normal`

## 예시

```tsx
import { InlineLoading } from "@bling-lab/ui/components/feedback/inline-loading";

export function Example() {
  return <InlineLoading label="저장 중" description="잠시만 기다려 주세요." tone="brand" />;
}
```

## 구현 메모

- 구현 파일은 `inline-loading.tsx`, public entry는 `index.ts`입니다.
- `status="success"`와 `status="error"`는 짧은 완료/실패 상태를 같은 공간에서 전달할 때 사용합니다.
- 긴 설명이나 복구 action이 필요하면 `Alert`를 사용합니다.
