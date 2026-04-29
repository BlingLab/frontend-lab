# Stepper 컴포넌트 / Stepper Component

순서가 있는 workflow 진행률과 step 이동을 보여줍니다. / Ordered workflow progress and step navigation.

## 역할 / Role

여러 단계의 흐름에서 현재 단계, 완료 상태, 선택 가능한 단계를 함께 보여줄 때 사용합니다. / Use for multi-step flows where users need current progress and optional step switching.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `navigation` (Navigation)입니다. / Category is `navigation` (Navigation).
- 기본 primitive는 `ordered list navigation`입니다. / Base primitive is `ordered list navigation`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`steps`, `value`, `defaultValue`, `orientation`, `variant`, `onValueChange`

## 상태 / States

- `pending`
- `active`
- `complete`
- `disabled`
- `error`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-border-default`
- `--ds-color-action-primary-bg`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { Stepper } from "@workspace/ui/components/navigation/stepper";

export function Example() {
  return <Stepper steps={steps} defaultValue="details" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `stepper.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `stepper.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
