# Badge 컴포넌트 / Badge Component

상태, 분류, 수량, 짧은 metadata를 표시하는 작은 라벨입니다. / Small status or metadata label.

## 역할 / Role

목록, 카드, 테이블 안에서 빠르게 훑어야 하는 상태 정보를 표시할 때 사용합니다. / Use to mark status, category, count, or short metadata in dense interfaces.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `feedback` (Feedback)입니다. / Category is `feedback` (Feedback).
- 기본 primitive는 `span`입니다. / Base primitive is `span`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`tone`, `variant`, `size`, `iconStart`, `iconEnd`, `removable`, `removeLabel`, `onRemove`

## 상태 / States

- `neutral`
- `info`
- `success`
- `warning`
- `danger`
- `removable`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-radius-pill`
- `--ds-color-bg-muted`
- `--ds-color-text-muted`

## 예시 / Example

```tsx
import { Badge } from "@workspace/ui/components/feedback/badge";

export function Example() {
  return <Badge label="준비 / Ready" tone="success" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `badge.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `badge.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
