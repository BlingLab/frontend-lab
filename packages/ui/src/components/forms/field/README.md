# Field 컴포넌트

폼 컨트롤의 label, 설명, 에러, 필수 표시를 정규화하는 wrapper입니다.

## 역할

입력 도움말, validation feedback, 접근 가능한 관계를 여러 폼 컴포넌트에서 일관되게 유지할 때 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `forms` (Forms)입니다.
- 기본 primitive는 `label and form control relationship`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`label`, `description`, `error`, `required`, `disabled`, `controlId`, `orientation`, `width`, `hideLabel`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. |
| `error` | `ReactNode` | `-` | 오류 메시지이며 invalid 상태를 만듭니다. |
| `required` | `boolean` | `false` | 필수 입력 상태를 표시합니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `controlId` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `orientation` | `"horizontal" \| "vertical"` | `-` | 컴포넌트 방향입니다. |
| `width` | `FieldWidth \| CSSProperties["width"]` | `-` | 렌더링 width 값입니다. |
| `hideLabel` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `default`
- `disabled`
- `invalid`
- `required`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-text-primary`
- `--ds-color-text-muted`
- `--ds-color-feedback-danger`

## 예시

```tsx
import { Field } from "@bling-lab/ui/components/forms/field";

export function Example() {
  return <Field label="이름" controlId="name"><input id="name" /></Field>;
}
```

## 구현 메모

- 구현 파일은 `field.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
