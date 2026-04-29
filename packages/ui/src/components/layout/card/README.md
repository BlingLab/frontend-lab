# Card 컴포넌트 / Card Component

관련 콘텐츠와 action을 묶는 surface입니다. / Surface for grouping related content and actions.

## 역할 / Role

반복 record, 요약 패널, 독립적인 콘텐츠 블록을 구성할 때 사용합니다. / Use for repeated records, summary panels, or independent content groups.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `layout` (Layout)입니다. / Category is `layout` (Layout).
- 기본 primitive는 `article or section`입니다. / Base primitive is `article or section`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`title`, `eyebrow`, `description`, `media`, `meta`, `actions`, `footer`, `variant`, `density`, `interactive`, `selected`, `fullWidth`, `actionPlacement`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `-` | 표면 또는 content의 제목입니다. / Title of the surface or content. |
| `eyebrow` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. / Helper description text. |
| `media` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `meta` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `actions` | `ReactNode \| action[]` | `-` | 사용자가 실행할 수 있는 보조 action입니다. / Secondary actions the user can run. |
| `footer` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `variant` | `variant` | `-` | 시각 variant입니다. / Visual variant. |
| `density` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `interactive` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `selected` | `boolean` | `false` | 선택된 시각 상태입니다. / Selected visual state. |
| `fullWidth` | `boolean` | `false` | 부모 폭을 채우도록 확장합니다. / Expands to fill the parent width. |
| `actionPlacement` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |

## 상태 / States

- `default`
- `hover`
- `focus-visible`
- `selected`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-radius-8`

## 예시 / Example

```tsx
import { Card } from "@workspace/ui/components/layout/card";

export function Example() {
  return <Card title="컴포넌트 / Component" description="설명 / Description" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `card.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `card.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
