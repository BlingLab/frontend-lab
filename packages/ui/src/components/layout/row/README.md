# Row 컴포넌트 / Row Component

가로 방향으로 자식 요소를 배치하는 flex layout primitive입니다. / Flex layout primitive for arranging children horizontally.

## 역할 / Role

관련 control, card, column을 한 줄 흐름으로 배치하고 필요하면 wrapping할 때 사용합니다. / Use to place related controls, cards, or columns in a horizontal flow that can wrap.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `layout` (Layout)입니다. / Category is `layout` (Layout).
- 기본 primitive는 `div`입니다. / Base primitive is `div`.

## Prop 축 / Prop Axes

`gap`, `align`, `justify`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. / Gap between child elements. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬입니다. / Cross-axis alignment. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬입니다. / Main-axis justification. |

## 상태 / States

- `gap-sm`
- `gap-md`
- `gap-lg`
- `aligned`
- `justified`

## 접근성 / Accessibility

- layout-only primitive이므로 의미 role을 추가하지 않습니다. / This is a layout-only primitive and does not add semantic roles.
- 시각 배치 때문에 focus 순서를 바꾸지 않습니다. / Visual layout must not change focus order.

## 토큰 / Tokens

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 예시 / Example

```tsx
import { Row } from "@workspace/ui/components/layout/row";

export function Example() {
  return <Row gap="md">콘텐츠 / Content</Row>;
}
```
