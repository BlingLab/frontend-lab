# Col 컴포넌트

`Row` 안에서 12-column span을 표현하는 responsive layout primitive입니다.

## 역할

viewport별 column 폭을 선언해야 하는 grid-like layout에 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `layout` (Layout)입니다.
- 기본 primitive는 `div`입니다.

## Prop 축

`span`, `sm`, `md`, `lg`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `span` | `number` | `12` | 기본 12-column span입니다. |
| `sm` | `number` | `-` | small breakpoint 이상에서 적용할 span입니다. |
| `md` | `number` | `-` | medium breakpoint 이상에서 적용할 span입니다. |
| `lg` | `number` | `-` | large breakpoint 이상에서 적용할 span입니다. |

## 상태

- `span`
- `sm`
- `md`
- `lg`

## 접근성

- layout-only primitive이므로 의미 role을 추가하지 않습니다.
- column 순서 변경으로 읽기 순서를 바꾸지 않습니다.

## 토큰

- `--ds-breakpoint-sm`
- `--ds-breakpoint-md`
- `--ds-breakpoint-lg`

## 예시

```tsx
import { Col, Row } from "@bling-lab/ui";

export function Example() {
  return <Row><Col span={12} md={6}>콘텐츠</Col></Row>;
}
```
