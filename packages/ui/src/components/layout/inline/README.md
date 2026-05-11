# Inline 컴포넌트

짧은 콘텐츠를 inline wrapping 흐름으로 배치하는 layout primitive입니다.

## 역할

badge, filter, compact action, metadata처럼 같은 줄에 모였다가 좁은 화면에서 줄바꿈되는 요소에 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `layout` (Layout)입니다.
- 기본 primitive는 `div`입니다.

## Prop 축

`gap`, `align`, `justify`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"center"` | 교차축 정렬입니다. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬입니다. |

## 상태

- `gap-sm`
- `gap-md`
- `gap-lg`
- `aligned`
- `justified`

## 접근성

- layout-only primitive이므로 의미 role을 추가하지 않습니다.
- wrapping이 발생해도 DOM 순서와 focus 순서를 유지합니다.

## 토큰

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 예시

```tsx
import { Inline } from "@bling-lab/ui/components/layout/inline";

export function Example() {
  return <Inline gap="sm">콘텐츠</Inline>;
}
```
