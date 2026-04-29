# Button 컴포넌트 / Button Component

명확한 사용자 명령을 실행하는 기본 액션 컨트롤입니다. / Primary command control for explicit user actions.

## 역할 / Role

저장, 제출, 확인, 취소, 삭제처럼 사용자가 의도를 확정하는 작업에 사용합니다. / Use for form submission, confirmation, cancellation, or destructive actions.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `actions` (Actions)입니다. / Category is `actions` (Actions).
- 기본 primitive는 `button`입니다. / Base primitive is `button`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`variant`, `tone`, `size`, `disabled`, `loading`, `type`, `fullWidth`, `selected`, `justify`, `iconStart`, `iconEnd`

## 상태 / States

- `default`
- `hover`
- `focus-visible`
- `active`
- `disabled`
- `loading`
- `selected`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/button/](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-action-primary-bg`
- `--ds-radius-6`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { Button } from "@workspace/ui/components/actions/button";

export function Example() {
  return <Button iconStart="+">저장 / Save</Button>;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `button.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `button.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
