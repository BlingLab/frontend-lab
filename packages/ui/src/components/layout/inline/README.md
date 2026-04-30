# Inline 컴포넌트 / Inline Component

짧은 콘텐츠를 inline wrapping 흐름으로 배치하는 layout primitive입니다. / Layout primitive for placing short content in an inline wrapping flow.

## 역할 / Role

badge, filter, compact action, metadata처럼 같은 줄에 모였다가 좁은 화면에서 줄바꿈되는 요소에 사용합니다. / Use for badges, filters, compact actions, and metadata that group inline and wrap on narrow screens.

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
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"center"` | 교차축 정렬입니다. / Cross-axis alignment. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬입니다. / Main-axis justification. |

## 상태 / States

- `gap-sm`
- `gap-md`
- `gap-lg`
- `aligned`
- `justified`

## 접근성 / Accessibility

- layout-only primitive이므로 의미 role을 추가하지 않습니다. / This is a layout-only primitive and does not add semantic roles.
- wrapping이 발생해도 DOM 순서와 focus 순서를 유지합니다. / It keeps DOM and focus order even when wrapping occurs.

## 토큰 / Tokens

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 예시 / Example

```tsx
import { Inline } from "@workspace/ui/components/layout/inline";

export function Example() {
  return <Inline gap="sm">콘텐츠 / Content</Inline>;
}
```
