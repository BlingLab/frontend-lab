# Pagination 컴포넌트 / Pagination Component

페이지로 나뉜 collection을 이동하는 내비게이션입니다. / Navigate paged collections.

## 역할 / Role

데이터가 여러 페이지로 나뉘고 이전/다음 또는 특정 페이지 이동이 필요할 때 사용합니다. / Use for datasets that are split into pages and need direct or sequential navigation.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `navigation` (Navigation)입니다. / Category is `navigation` (Navigation).
- 기본 primitive는 `nav with links or buttons`입니다. / Base primitive is `nav with links or buttons`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`page`, `defaultPage`, `totalPages`, `siblingCount`, `disabled`, `onPageChange`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `page` | `number` | `-` | 현재 page 값입니다. / Current page value. |
| `defaultPage` | `number` | `-` | uncontrolled 초기 page 값입니다. / Initial uncontrolled page value. |
| `totalPages` | `number` | `-` | 전체 page 수입니다. / Total number of pages. |
| `siblingCount` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. / Disables user interaction. |
| `onPageChange` | `(page: number) => void` | `-` | page 값이 바뀔 때 호출됩니다. / Called when page changes. |

## 상태 / States

- `current`
- `available`
- `disabled`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-border-default`
- `--ds-color-action-primary-bg`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { Pagination } from "@workspace/ui/components/navigation/pagination";

export function Example() {
  return <Pagination page={2} totalPages={5} onPageChange={setPage} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `pagination.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `pagination.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
