# Field 컴포넌트 / Field Component

폼 컨트롤의 label, 설명, 에러, 필수 표시를 정규화하는 wrapper입니다. / Shared label, description, error, and required marker wrapper for form controls.

## 역할 / Role

입력 도움말, validation feedback, 접근 가능한 관계를 여러 폼 컴포넌트에서 일관되게 유지할 때 사용합니다. / Use to normalize form copy, validation feedback, and accessible relationships.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `label and form control relationship`입니다. / Base primitive is `label and form control relationship`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`label`, `description`, `error`, `required`, `disabled`, `controlId`, `orientation`, `width`, `hideLabel`

## 상태 / States

- `default`
- `disabled`
- `invalid`
- `required`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-text-primary`
- `--ds-color-text-muted`
- `--ds-color-feedback-danger`

## 예시 / Example

```tsx
import { Field } from "@workspace/ui/components/forms/field";

export function Example() {
  return <Field label="이름 / Name" controlId="name"><input id="name" /></Field>;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `field.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `field.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
