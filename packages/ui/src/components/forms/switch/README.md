# Switch 컴포넌트 / Switch Component

즉시 적용되는 켜기/끄기 설정 컨트롤입니다. / Immediate on/off setting control.

## 역할 / Role

폼 제출보다 설정 변경 자체가 즉시 의미를 갖는 기능 토글에 사용합니다. / Use for settings that take effect immediately rather than form submission choices.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `button or input checkbox with switch semantics`입니다. / Base primitive is `button or input checkbox with switch semantics`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`checked`, `defaultChecked`, `disabled`, `label`, `onCheckedChange`

## 상태 / States

- `off`
- `on`
- `focus-visible`
- `disabled`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/switch/](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-action-primary-bg`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { Switch } from "@workspace/ui/components/forms/switch";

export function Example() {
  return <Switch label="자동 저장 / Autosave" defaultChecked />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `switch.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `switch.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
