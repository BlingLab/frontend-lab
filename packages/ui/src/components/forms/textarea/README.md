# Textarea 컴포넌트

Field composition을 포함한 여러 줄 텍스트 입력입니다.

## 역할

메모, 설명, 댓글처럼 긴 자유 입력이 필요한 곳에 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `forms` (Forms)입니다.
- 기본 primitive는 `textarea`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`value`, `defaultValue`, `placeholder`, `rows`, `resize`, `size`, `width`, `fieldProps`, `textareaClassName`, `disabled`, `readOnly`, `invalid`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `value` | `string \| number` | `-` | controlled 값입니다. |
| `defaultValue` | `string` | `-` | uncontrolled 초기 값입니다. |
| `placeholder` | `string` | `-` | 입력 전 표시할 placeholder입니다. |
| `rows` | `row[] \| number` | `-` | row data 또는 textarea row 수입니다. |
| `resize` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. |
| `width` | `FieldWidth \| CSSProperties["width"]` | `-` | 렌더링 width 값입니다. |
| `fieldProps` | `FieldProps` | `-` | Field wrapper에 전달할 추가 설정입니다. |
| `textareaClassName` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `readOnly` | `boolean` | `false` | 값을 읽기 전용으로 만듭니다. |
| `invalid` | `boolean` | `false` | validation 실패 상태를 표시합니다. |

## 상태

- `default`
- `hover`
- `focus-visible`
- `disabled`
- `read-only`
- `invalid`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시

```tsx
import { Textarea } from "@bling-lab/ui/components/forms/textarea";

export function Example() {
  return <Textarea label="메모" rows={4} />;
}
```

## 구현 메모

- 구현 파일은 `textarea.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
