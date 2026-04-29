# Checkbox 컴포넌트 / Checkbox Component

독립적인 선택 또는 mixed 상태를 표현하는 체크 컨트롤입니다. / Binary or mixed-state option control.

## 역할 / Role

약관 동의, 필터 선택, 다중 선택 목록처럼 각각 독립적인 boolean 값에 사용합니다. / Use for independent choices, agreement, or multi-select lists.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `input[type='checkbox']`입니다. / Base primitive is `input[type='checkbox']`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`checked`, `defaultChecked`, `indeterminate`, `disabled`, `invalid`

## 상태 / States

- `unchecked`
- `checked`
- `indeterminate`
- `focus-visible`
- `disabled`
- `invalid`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-action-primary-bg`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { Checkbox } from "@workspace/ui/components/forms/checkbox";

export function Example() {
  return <Checkbox label="알림 받기 / Receive notifications" defaultChecked />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `checkbox.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `checkbox.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
