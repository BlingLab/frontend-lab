# Combobox 컴포넌트

알려진 옵션 집합에서 검색 가능한 단일 값을 선택하는 컨트롤입니다.

## 역할

옵션 수가 많거나 사용자가 입력으로 빠르게 필터링해야 하는 select 대체 상황에 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `forms` (Forms)입니다.
- 기본 primitive는 `combobox with listbox popup`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`label`, `description`, `error`, `value`, `defaultValue`, `options`, `placeholder`, `emptyMessage`, `size`, `width`, `disabled`, `required`, `fieldProps`, `onValueChange`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | 필드 label입니다. |
| `description` | `ReactNode` | `-` | 보조 설명입니다. |
| `error` | `ReactNode` | `-` | 오류 메시지이며 invalid 상태를 만듭니다. |
| `value` | `string` | `-` | controlled 선택 값입니다. |
| `defaultValue` | `string` | `""` | uncontrolled 초기 선택 값입니다. |
| `options` | `ComboboxOption[]` | `[]` | 검색하고 선택할 option 목록입니다. |
| `placeholder` | `string` | `"검색 또는 선택"` | 입력 placeholder입니다. |
| `emptyMessage` | `ReactNode` | `"결과가 없습니다."` | 필터 결과가 없을 때 표시합니다. |
| `size` | `Size` | `"md"` | control 높이와 밀도입니다. |
| `width` | `FieldWidth` | `"auto"` | Field wrapper 폭입니다. |
| `disabled` | `boolean` | `false` | 입력과 toggle을 비활성화합니다. |
| `required` | `boolean` | `false` | 필수 입력 상태를 표시합니다. |
| `fieldProps` | `Omit<FieldProps, ...>` | `-` | Field wrapper에 전달할 추가 설정입니다. |
| `onValueChange` | `(value: string) => void` | `-` | 선택 값이 바뀔 때 호출됩니다. |

## 상태

- `closed`
- `open`
- `filtered`
- `highlighted`
- `selected`
- `disabled`
- `invalid`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- ArrowUp/ArrowDown은 option highlight를 이동하고 Enter는 highlighted option을 선택합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시

```tsx
import { Combobox } from "@bling-lab/ui/components/forms/combobox";

export function Example() {
  return <Combobox label="담당자" options={options} onValueChange={setOwner} />;
}
```

## 구현 메모

- 구현 파일은 `combobox.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
