# Tooltip 컴포넌트 / Tooltip Component

hover 또는 focus된 컨트롤을 짧게 설명하는 helper text입니다. / Brief helper text for a focused or hovered control.

## 역할 / Role

아이콘 버튼이나 축약된 UI를 보조하되 필수 정보를 숨기지 않을 때 사용합니다. / Use to clarify icon-only or compact controls without replacing visible labels.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `overlays` (Overlays)입니다. / Category is `overlays` (Overlays).
- 기본 primitive는 `tooltip pattern`입니다. / Base primitive is `tooltip pattern`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`content`, `placement`, `delay`, `disabled`

## 상태 / States

- `closed`
- `delayed-open`
- `open`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-z-popover`
- `--ds-color-gray-900`
- `--ds-radius-4`

## 예시 / Example

```tsx
import { Tooltip } from "@workspace/ui/components/overlays/tooltip";

export function Example() {
  return <Tooltip label="도움말 / Help" content="설명 / Description" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `tooltip.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `tooltip.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
