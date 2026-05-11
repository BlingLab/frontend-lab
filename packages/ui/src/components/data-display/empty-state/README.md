# EmptyState 컴포넌트

데이터가 없는 화면에서 이유와 다음 행동을 안내합니다.

## 역할

검색 결과 없음, 권한 없음, 초기 상태처럼 비어 있는 화면에 설명과 action을 제공할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `data-display` (Data Display)입니다.
- 기본 primitive는 `section`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`title`, `description`, `icon`, `actions`, `tone`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `-` | 표면 또는 content의 제목입니다. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. |
| `icon` | `ReactNode` | `-` | 시각적으로 함께 표시할 icon입니다. |
| `actions` | `ReactNode \| action[]` | `-` | 사용자가 실행할 수 있는 보조 action입니다. |
| `tone` | `tone` | `-` | semantic color tone입니다. |

## 상태

- `no-data`
- `filtered`
- `error`
- `permission`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-text-muted`
- `--ds-color-bg-surface`
- `--ds-radius-8`

## 예시

```tsx
import { EmptyState } from "@bling-lab/ui/components/data-display/empty-state";

export function Example() {
  return <EmptyState title="결과 없음" actions={[{ label: "초기화" }]} />;
}
```

## 구현 메모

- 구현 파일은 `empty-state.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
