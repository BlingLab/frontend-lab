# Badge 컴포넌트

상태, 분류, 수량, 짧은 metadata를 표시하는 작은 라벨입니다.

## 역할

목록, 카드, 테이블 안에서 빠르게 훑어야 하는 상태 정보를 표시할 때 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `feedback` (Feedback)입니다.
- 기본 primitive는 `span`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`tone`, `variant`, `size`, `iconStart`, `iconEnd`, `removable`, `removeLabel`, `onRemove`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `tone` | `tone` | `-` | semantic color tone입니다. |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. |
| `iconStart` | `ReactNode` | `-` | content 앞에 표시할 icon입니다. |
| `iconEnd` | `ReactNode` | `-` | content 뒤에 표시할 icon입니다. |
| `removable` | `boolean` | `false` | 사용자가 제거할 수 있는 상태입니다. |
| `removeLabel` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `onRemove` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `neutral`
- `info`
- `success`
- `warning`
- `danger`
- `removable`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-radius-pill`
- `--ds-color-bg-muted`
- `--ds-color-text-muted`

## 예시

```tsx
import { Badge } from "@bling-lab/ui/components/feedback/badge";

export function Example() {
  return <Badge label="준비" tone="success" />;
}
```

## 구현 메모

- 구현 파일은 `badge.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
