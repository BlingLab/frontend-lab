# Stack 컴포넌트 / Stack Component

세로 방향으로 자식 요소를 쌓는 layout primitive입니다. / Layout primitive for stacking children vertically.

## 역할 / Role

폼 필드, 버튼 그룹, 카드 내부 콘텐츠처럼 수직 간격이 반복되는 영역에 사용합니다. / Use for areas with repeated vertical spacing, such as form fields, button groups, and card content.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `layout` (Layout)입니다. / Category is `layout` (Layout).
- 기본 primitive는 `div`입니다. / Base primitive is `div`.

## Prop 축 / Prop Axes

`gap`, `align`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. / Gap between child elements. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬입니다. / Cross-axis alignment. |

## 상태 / States

- `gap-sm`
- `gap-md`
- `gap-lg`
- `aligned`

## 접근성 / Accessibility

- layout-only primitive이므로 의미 role을 추가하지 않습니다. / This is a layout-only primitive and does not add semantic roles.
- DOM 순서가 읽기 순서와 focus 순서를 결정합니다. / DOM order determines reading and focus order.

## 토큰 / Tokens

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 예시 / Example

```tsx
import { Stack } from "@workspace/ui/components/layout/stack";

export function Example() {
  return <Stack gap="md">콘텐츠 / Content</Stack>;
}
```
