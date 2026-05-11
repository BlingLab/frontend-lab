# IconButton 컴포넌트

접근 가능한 이름을 필수로 갖는 아이콘 전용 액션입니다.

## 역할

공간이 제한되고 의미가 익숙한 아이콘으로 표현될 수 있는 명령에 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `actions` (Actions)입니다.
- 기본 primitive는 `button`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`label`, `icon`, `variant`, `tone`, `size`, `shape`, `disabled`, `loading`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. |
| `icon` | `ReactNode` | `-` | 시각적으로 함께 표시할 icon입니다. |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `tone` | `tone` | `-` | semantic color tone입니다. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. |
| `shape` | `string` | `-` | 컴포넌트 외형 형태입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `loading` | `boolean` | `false` | loading 상태를 표시합니다. |

## 상태

- `default`
- `hover`
- `focus-visible`
- `active`
- `disabled`
- `loading`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-action-primary-bg`
- `--ds-radius-6`
- `--ds-focus-ring`

## 예시

```tsx
import { Icon, IconButton } from "@bling-lab/ui";

export function Example() {
  return <IconButton label="검색" icon={<Icon name="search" />} />;
}
```

## 구현 메모

- 구현 파일은 `icon-button.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
