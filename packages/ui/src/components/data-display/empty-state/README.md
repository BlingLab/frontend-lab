# EmptyState 컴포넌트 / EmptyState Component

데이터가 없는 화면에서 이유와 다음 행동을 안내합니다. / Guidance shown when a view has no data.

## 역할 / Role

검색 결과 없음, 권한 없음, 초기 상태처럼 비어 있는 화면에 설명과 action을 제공할 때 사용합니다. / Use to explain why content is missing and offer the next useful action.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `data-display` (Data Display)입니다. / Category is `data-display` (Data Display).
- 기본 primitive는 `section`입니다. / Base primitive is `section`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`title`, `description`, `icon`, `actions`, `tone`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `-` | 표면 또는 content의 제목입니다. / Title of the surface or content. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. / Helper description text. |
| `icon` | `ReactNode` | `-` | 시각적으로 함께 표시할 icon입니다. / Icon displayed with the content. |
| `actions` | `ReactNode \| action[]` | `-` | 사용자가 실행할 수 있는 보조 action입니다. / Secondary actions the user can run. |
| `tone` | `tone` | `-` | semantic color tone입니다. / Semantic color tone. |

## 상태 / States

- `no-data`
- `filtered`
- `error`
- `permission`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-text-muted`
- `--ds-color-bg-surface`
- `--ds-radius-8`

## 예시 / Example

```tsx
import { EmptyState } from "@workspace/ui/components/data-display/empty-state";

export function Example() {
  return <EmptyState title="결과 없음 / No results" actions={[{ label: "초기화 / Reset" }]} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `empty-state.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `empty-state.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
