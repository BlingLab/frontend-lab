# Combobox 컴포넌트 / Combobox Component

알려진 옵션 집합에서 검색 가능한 단일 값을 선택하는 컨트롤입니다. / Searchable single-value selection from a known option set.

## 역할 / Role

옵션 수가 많거나 사용자가 입력으로 빠르게 필터링해야 하는 select 대체 상황에 사용합니다. / Use when a select needs filtering, text input, or many options without leaving the current form.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `combobox with listbox popup`입니다. / Base primitive is `combobox with listbox popup`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`value`, `defaultValue`, `options`, `placeholder`, `size`, `width`, `fieldProps`, `emptyMessage`, `onValueChange`, `disabled`, `invalid`

## 상태 / States

- `closed`
- `open`
- `filtered`
- `highlighted`
- `selected`
- `disabled`
- `invalid`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/combobox/](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- ArrowUp/ArrowDown은 option highlight를 이동하고 Enter는 highlighted option을 선택합니다. / ArrowUp/ArrowDown moves the option highlight, and Enter selects the highlighted option.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { Combobox } from "@workspace/ui/components/forms/combobox";

export function Example() {
  return <Combobox label="담당자 / Owner" options={options} onValueChange={setOwner} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `combobox.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `combobox.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
