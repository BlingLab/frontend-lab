# Stepper 컴포넌트

순서가 있는 workflow 진행률과 step 이동을 보여줍니다.

## 역할

여러 단계의 흐름에서 현재 단계, 완료 상태, 선택 가능한 단계를 함께 보여줄 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `navigation` (Navigation)입니다.
- 기본 primitive는 `ordered list navigation`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`steps`, `value`, `defaultValue`, `orientation`, `variant`, `onValueChange`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `steps` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `value` | `string \| number` | `-` | controlled 값입니다. |
| `defaultValue` | `string` | `-` | uncontrolled 초기 값입니다. |
| `orientation` | `"horizontal" \| "vertical"` | `-` | 컴포넌트 방향입니다. |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `onValueChange` | `function` | `-` | value가 바뀔 때 호출됩니다. |

## 상태

- `pending`
- `active`
- `complete`
- `keyboard-navigation`
- `disabled`
- `error`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- Arrow key, Home, End는 step button 사이를 이동합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-border-default`
- `--ds-color-action-primary-bg`
- `--ds-focus-ring`

## 예시

```tsx
import { Stepper } from "@bling-lab/ui/components/navigation/stepper";

export function Example() {
  return <Stepper steps={steps} defaultValue="details" />;
}
```

## 구현 메모

- 구현 파일은 `stepper.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
