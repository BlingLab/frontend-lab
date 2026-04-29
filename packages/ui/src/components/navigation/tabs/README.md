# Tabs 컴포넌트 / Tabs Component

같은 맥락 안의 관련 패널을 전환하는 내비게이션입니다. / Switch between related panels in the same context.

## 역할 / Role

동일 페이지 위치에서 peer section을 전환하고 URL 이동이 필요하지 않을 때 사용합니다. / Use for peer sections that share a page location and do not require full navigation.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `navigation` (Navigation)입니다. / Category is `navigation` (Navigation).
- 기본 primitive는 `tabs pattern`입니다. / Base primitive is `tabs pattern`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`value`, `defaultValue`, `orientation`, `activationMode`, `variant`, `size`, `fullWidth`, `keepMounted`, `disabled`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `value` | `string \| number` | `-` | controlled 값입니다. / Controlled value. |
| `defaultValue` | `string` | `-` | uncontrolled 초기 값입니다. / Initial uncontrolled value. |
| `orientation` | `"horizontal" \| "vertical"` | `-` | 컴포넌트 방향입니다. / Component orientation. |
| `activationMode` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `variant` | `variant` | `-` | 시각 variant입니다. / Visual variant. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. / Control size and density. |
| `fullWidth` | `boolean` | `false` | 부모 폭을 채우도록 확장합니다. / Expands to fill the parent width. |
| `keepMounted` | `boolean` | `false` | 비활성 content를 DOM에 유지할지 결정합니다. / Determines whether inactive content remains mounted. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. / Disables user interaction. |

## 상태 / States

- `selected`
- `unselected`
- `focus-visible`
- `disabled`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/tabs/](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-action-primary-bg`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { Tabs } from "@workspace/ui/components/navigation/tabs";

export function Example() {
  return <Tabs items={[{ label: "미리보기 / Preview", value: "preview", content: "내용 / Content" }]} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `tabs.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `tabs.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
