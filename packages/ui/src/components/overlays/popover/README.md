# Popover 컴포넌트 / Popover Component

트리거에 연결되는 비모달 contextual floating surface입니다. / Non-modal contextual floating surface.

## 역할 / Role

필터, 보조 정보, 가벼운 설정처럼 현재 화면을 떠나지 않는 보조 조작에 사용합니다. / Use for contextual details, filters, or lightweight controls anchored to a trigger.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `overlays` (Overlays)입니다. / Category is `overlays` (Overlays).
- 기본 primitive는 `button plus positioned region`입니다. / Base primitive is `button plus positioned region`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`open`, `defaultOpen`, `onOpenChange`, `placement`

## 상태 / States

- `closed`
- `opening`
- `open`
- `closing`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-z-popover`
- `--ds-shadow-raised`
- `--ds-radius-8`

## 예시 / Example

```tsx
import { Popover } from "@workspace/ui/components/overlays/popover";

export function Example() {
  return <Popover triggerLabel="필터 / Filter" title="필터 옵션 / Filter options">내용 / Content</Popover>;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `popover.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `popover.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
