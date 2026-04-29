# Dialog 컴포넌트 / Dialog Component

사용자의 집중이 필요한 modal surface입니다. / Modal surface that requires focused user attention.

## 역할 / Role

확인, 짧은 폼, 되돌리기 어려운 작업처럼 현재 흐름을 잠시 중단해야 할 때 사용합니다. / Use for confirmation, short forms, or tasks that must be completed before returning.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `overlays` (Overlays)입니다. / Category is `overlays` (Overlays).
- 기본 primitive는 `dialog or modal dialog pattern`입니다. / Base primitive is `dialog or modal dialog pattern`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`open`, `defaultOpen`, `onOpenChange`, `modal`, `size`, `initialFocus`, `closeLabel`, `closeOnBackdropClick`

## 상태 / States

- `closed`
- `opening`
- `open`
- `closing`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-z-dialog`
- `--ds-shadow-raised`
- `--ds-radius-8`

## 예시 / Example

```tsx
import { Dialog } from "@workspace/ui/components/overlays/dialog";

export function Example() {
  return <Dialog triggerLabel="열기 / Open" title="확인 / Confirm">내용 / Content</Dialog>;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `dialog.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `dialog.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
