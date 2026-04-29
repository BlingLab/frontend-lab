# DatePicker 컴포넌트 / DatePicker Component

Field composition을 공유하는 단일 날짜 입력입니다. / Date input with shared Field composition.

## 역할 / Role

브라우저 기본 날짜 입력으로 충분한 시작일, 종료일, 마감일 입력에 사용합니다. / Use when a workflow needs a single calendar date with native browser behavior first.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `input[type='date']`입니다. / Base primitive is `input[type='date']`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`value`, `defaultValue`, `minDate`, `maxDate`, `size`, `width`, `fieldProps`, `inputClassName`, `disabled`, `readOnly`, `invalid`

## 상태 / States

- `default`
- `hover`
- `focus-visible`
- `disabled`
- `read-only`
- `invalid`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)](https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date))
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { DatePicker } from "@workspace/ui/components/forms/date-picker";

export function Example() {
  return <DatePicker label="시작일 / Start date" defaultValue="2026-04-29" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `date-picker.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `date-picker.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
