# Pagination 컴포넌트

페이지로 나뉜 collection을 이동하는 내비게이션입니다.

## 역할

데이터가 여러 페이지로 나뉘고 이전/다음 또는 특정 페이지 이동이 필요할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `navigation` (Navigation)입니다.
- 기본 primitive는 `nav with links or buttons`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`page`, `defaultPage`, `totalPages`, `siblingCount`, `disabled`, `onPageChange`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `page` | `number` | `-` | 현재 page 값입니다. |
| `defaultPage` | `number` | `-` | uncontrolled 초기 page 값입니다. |
| `totalPages` | `number` | `-` | 전체 page 수입니다. |
| `siblingCount` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `onPageChange` | `(page: number) => void` | `-` | page 값이 바뀔 때 호출됩니다. |

## 상태

- `current`
- `available`
- `disabled`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-border-default`
- `--ds-color-action-primary-bg`
- `--ds-focus-ring`

## 예시

```tsx
import { Pagination } from "@bling-lab/ui/components/navigation/pagination";

export function Example() {
  return <Pagination page={2} totalPages={5} onPageChange={setPage} />;
}
```

## 구현 메모

- 구현 파일은 `pagination.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
