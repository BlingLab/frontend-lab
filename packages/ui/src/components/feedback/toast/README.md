# Toast 컴포넌트 / Toast Component

작업 결과를 짧게 보여주는 임시 전역 알림입니다. / Temporary global notification.

## 역할 / Role

사용자의 흐름을 막지 않는 저장, 동기화, 복사 완료 같은 결과 안내에 사용합니다. / Use for short-lived outcomes that should not interrupt the workflow.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `feedback` (Feedback)입니다. / Category is `feedback` (Feedback).
- 기본 primitive는 `status region with dismiss control`입니다. / Base primitive is `status region with dismiss control`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`tone`, `title`, `description`, `duration`, `dismissible`, `dismissLabel`, `actions`, `onDismiss`

## 상태 / States

- `entering`
- `open`
- `exiting`
- `dismissed`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/alert/](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-z-toast`
- `--ds-shadow-raised`
- `--ds-motion-duration-normal`

## 예시 / Example

```tsx
import { Toast } from "@workspace/ui/components/feedback/toast";

export function Example() {
  return <Toast tone="info" title="동기화됨 / Synced" dismissible />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `toast.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `toast.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
