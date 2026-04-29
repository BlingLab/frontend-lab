# RadioGroup 컴포넌트 / RadioGroup Component

여러 선택지 중 하나만 선택하는 그룹 컨트롤입니다. / Mutually exclusive selection from a visible option set.

## 역할 / Role

모든 선택지를 노출해야 하고 단일 값만 허용하는 설정에 사용합니다. / Use when all choices should remain visible and only one value can be selected.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `fieldset with input[type='radio']`입니다. / Base primitive is `fieldset with input[type='radio']`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`value`, `defaultValue`, `options`, `orientation`, `disabled`, `invalid`

## 상태 / States

- `unchecked`
- `checked`
- `focus-visible`
- `disabled`
- `invalid`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/radio/](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-action-primary-bg`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { RadioGroup } from "@workspace/ui/components/forms/radio-group";

export function Example() {
  return <RadioGroup label="밀도 / Density" options={options} defaultValue="comfortable" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `radio-group.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `radio-group.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
