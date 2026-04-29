# Breadcrumb 컴포넌트 / Breadcrumb Component

현재 페이지의 계층 위치를 보여주는 trail입니다. / Hierarchical page location trail.

## 역할 / Role

상위 위치를 노출하고 사용자가 빠르게 위 단계로 이동할 수 있어야 할 때 사용합니다. / Use to show parent locations and support quick navigation upward.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `navigation` (Navigation)입니다. / Category is `navigation` (Navigation).
- 기본 primitive는 `nav with ordered list`입니다. / Base primitive is `nav with ordered list`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`items`, `separator`, `maxItems`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `items` | `item[]` | `[]` | 렌더링할 item 목록입니다. / Items to render. |
| `separator` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `maxItems` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |

## 상태 / States

- `current`
- `link`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-text-muted`
- `--ds-color-action-primary-bg`

## 예시 / Example

```tsx
import { Breadcrumb } from "@workspace/ui/components/navigation/breadcrumb";

export function Example() {
  return <Breadcrumb items={items} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `breadcrumb.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `breadcrumb.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
