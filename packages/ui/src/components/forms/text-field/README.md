# TextField 컴포넌트 / TextField Component

Field composition을 포함한 한 줄 텍스트 입력입니다. / Single-line text input with Field composition.

## 역할 / Role

이름, 짧은 설명, URL, 이메일, 검색어처럼 한 줄 값에 사용합니다. / Use for names, short descriptions, URLs, emails, search terms, and similar text values.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `input`입니다. / Base primitive is `input`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`value`, `defaultValue`, `placeholder`, `type`, `size`, `width`, `prefix`, `suffix`, `fieldProps`, `inputClassName`, `disabled`, `readOnly`, `invalid`

## 상태 / States

- `default`
- `hover`
- `focus-visible`
- `disabled`
- `read-only`
- `invalid`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://html.spec.whatwg.org/multipage/input.html](https://html.spec.whatwg.org/multipage/input.html)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { TextField } from "@workspace/ui/components/forms/text-field";

export function Example() {
  return <TextField label="이름 / Name" width="full" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `text-field.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `text-field.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
