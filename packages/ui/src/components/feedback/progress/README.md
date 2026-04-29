# Progress 컴포넌트 / Progress Component

작업 진행률 또는 대기 상태를 전달하는 표시 컴포넌트입니다. / Determinate or indeterminate task progress.

## 역할 / Role

완료율, 업로드, 처리 중 상태처럼 시간이 걸리는 작업의 진행을 보여줄 때 사용합니다. / Use when users need to understand task completion or waiting state.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `feedback` (Feedback)입니다. / Category is `feedback` (Feedback).
- 기본 primitive는 `progress`입니다. / Base primitive is `progress`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`value`, `max`, `label`, `indeterminate`, `tone`

## 상태 / States

- `determinate`
- `indeterminate`
- `complete`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-action-primary-bg`
- `--ds-color-bg-muted`
- `--ds-motion-duration-normal`

## 예시 / Example

```tsx
import { Progress } from "@workspace/ui/components/feedback/progress";

export function Example() {
  return <Progress label="완료율 / Completion" value={64} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `progress.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `progress.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
