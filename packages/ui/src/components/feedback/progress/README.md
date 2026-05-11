# Progress 컴포넌트

작업 진행률 또는 대기 상태를 전달하는 표시 컴포넌트입니다.

## 역할

완료율, 업로드, 처리 중 상태처럼 시간이 걸리는 작업의 진행을 보여줄 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `feedback` (Feedback)입니다.
- 기본 primitive는 `progress`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`value`, `max`, `label`, `indeterminate`, `tone`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `value` | `string \| number` | `-` | controlled 값입니다. |
| `max` | `number` | `100` | 허용되는 최대 값입니다. |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. |
| `indeterminate` | `boolean` | `false` | 부분 선택 상태를 표시합니다. |
| `tone` | `tone` | `-` | semantic color tone입니다. |

## 상태

- `determinate`
- `indeterminate`
- `complete`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-action-primary-bg`
- `--ds-color-bg-muted`
- `--ds-motion-duration-normal`

## 예시

```tsx
import { Progress } from "@bling-lab/ui/components/feedback/progress";

export function Example() {
  return <Progress label="완료율" value={64} />;
}
```

## 구현 메모

- 구현 파일은 `progress.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
