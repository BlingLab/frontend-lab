# Col 컴포넌트 / Col Component

`Row` 안에서 12-column span을 표현하는 responsive layout primitive입니다. / Responsive layout primitive that represents a 12-column span inside `Row`.

## 역할 / Role

viewport별 column 폭을 선언해야 하는 grid-like layout에 사용합니다. / Use for grid-like layouts that need column widths per viewport.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `layout` (Layout)입니다. / Category is `layout` (Layout).
- 기본 primitive는 `div`입니다. / Base primitive is `div`.

## Prop 축 / Prop Axes

`span`, `sm`, `md`, `lg`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `span` | `number` | `12` | 기본 12-column span입니다. / Default 12-column span. |
| `sm` | `number` | `-` | small breakpoint 이상에서 적용할 span입니다. / Span applied at the small breakpoint and above. |
| `md` | `number` | `-` | medium breakpoint 이상에서 적용할 span입니다. / Span applied at the medium breakpoint and above. |
| `lg` | `number` | `-` | large breakpoint 이상에서 적용할 span입니다. / Span applied at the large breakpoint and above. |

## 상태 / States

- `span`
- `sm`
- `md`
- `lg`

## 접근성 / Accessibility

- layout-only primitive이므로 의미 role을 추가하지 않습니다. / This is a layout-only primitive and does not add semantic roles.
- column 순서 변경으로 읽기 순서를 바꾸지 않습니다. / Column layout must not change reading order.

## 토큰 / Tokens

- `--ds-breakpoint-sm`
- `--ds-breakpoint-md`
- `--ds-breakpoint-lg`

## 예시 / Example

```tsx
import { Col, Row } from "@workspace/ui";

export function Example() {
  return <Row><Col span={12} md={6}>콘텐츠 / Content</Col></Row>;
}
```
