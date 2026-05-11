# Stack 컴포넌트

세로 방향으로 자식 요소를 쌓는 layout primitive입니다.

## 역할

폼 필드, 버튼 그룹, 카드 내부 콘텐츠처럼 수직 간격이 반복되는 영역에 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `layout` (Layout)입니다.
- 기본 primitive는 `div`입니다.

## Prop 축

`gap`, `align`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬입니다. |

## 상태

- `gap-sm`
- `gap-md`
- `gap-lg`
- `aligned`

## 접근성

- layout-only primitive이므로 의미 role을 추가하지 않습니다.
- DOM 순서가 읽기 순서와 focus 순서를 결정합니다.

## 토큰

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 예시

```tsx
import { Stack } from "@bling-lab/ui/components/layout/stack";

export function Example() {
  return <Stack gap="md">콘텐츠</Stack>;
}
```
