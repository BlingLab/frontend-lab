# Select 컴포넌트 / Select Component

정해진 선택지 중 하나를 고르는 네이티브 선택 컨트롤입니다. / Single option selection from a known set.

## 역할 / Role

검색이나 rich option이 필요하지 않은 단일 선택에 우선 사용합니다. / Use native select first; move to custom listbox or combobox only when searchable or rich options are required.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `select or combobox/listbox pattern`입니다. / Base primitive is `select or combobox/listbox pattern`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`value`, `defaultValue`, `options`, `placeholder`, `size`, `width`, `prefix`, `suffix`, `fieldProps`, `selectClassName`, `disabled`, `invalid`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `value` | `string \| number` | `-` | controlled 값입니다. / Controlled value. |
| `defaultValue` | `string` | `-` | uncontrolled 초기 값입니다. / Initial uncontrolled value. |
| `options` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `placeholder` | `string` | `-` | 입력 전 표시할 placeholder입니다. / Placeholder shown before input. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. / Control size and density. |
| `width` | `FieldWidth \| CSSProperties["width"]` | `-` | 렌더링 width 값입니다. / Rendered width value. |
| `prefix` | `ReactNode` | `-` | control 앞쪽 accessory입니다. / Accessory before the control. |
| `suffix` | `ReactNode` | `-` | control 뒤쪽 accessory입니다. / Accessory after the control. |
| `fieldProps` | `FieldProps` | `-` | Field wrapper에 전달할 추가 설정입니다. / Additional settings passed to the Field wrapper. |
| `selectClassName` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. / Disables user interaction. |
| `invalid` | `boolean` | `false` | validation 실패 상태를 표시합니다. / Shows validation failure state. |

## 상태 / States

- `default`
- `hover`
- `focus-visible`
- `open`
- `disabled`
- `invalid`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/combobox/](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { Select } from "@workspace/ui/components/forms/select";

export function Example() {
  return <Select label="상태 / Status" options={[{ label: "준비 / Ready", value: "ready" }]} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `select.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `select.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
