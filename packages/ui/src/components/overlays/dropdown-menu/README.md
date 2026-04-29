# DropdownMenu 컴포넌트 / DropdownMenu Component

트리거에서 열리는 contextual action menu입니다. / Action menu opened from a trigger.

## 역할 / Role

overflow action, 항목별 명령, compact action group을 제공할 때 사용합니다. / Use for contextual commands, overflow actions, or compact action groups.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `overlays` (Overlays)입니다. / Category is `overlays` (Overlays).
- 기본 primitive는 `menu button pattern`입니다. / Base primitive is `menu button pattern`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`open`, `defaultOpen`, `items`, `placement`, `onOpenChange`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `-` | controlled open 상태입니다. / Controlled open state. |
| `defaultOpen` | `boolean` | `false` | uncontrolled 초기 open 상태입니다. / Initial uncontrolled open state. |
| `items` | `item[]` | `[]` | 렌더링할 item 목록입니다. / Items to render. |
| `placement` | `string` | `"bottom-start"` | floating surface 위치입니다. / Floating surface placement. |
| `onOpenChange` | `(open: boolean) => void` | `-` | open 상태가 바뀔 때 호출됩니다. / Called when open state changes. |

## 상태 / States

- `closed`
- `open`
- `highlighted`
- `disabled`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-z-dropdown`
- `--ds-shadow-raised`
- `--ds-radius-6`

## 예시 / Example

```tsx
import { DropdownMenu } from "@workspace/ui/components/overlays/dropdown-menu";

export function Example() {
  return <DropdownMenu triggerLabel="작업 / Actions" items={items} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `dropdown-menu.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `dropdown-menu.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
