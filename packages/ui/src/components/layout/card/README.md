# Card 컴포넌트

관련 콘텐츠와 action을 묶는 surface입니다.

## 역할

반복 record, 요약 패널, 독립적인 콘텐츠 블록을 구성할 때 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `layout` (Layout)입니다.
- 기본 primitive는 `article or section`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`title`, `eyebrow`, `description`, `media`, `meta`, `actions`, `footer`, `variant`, `density`, `interactive`, `selected`, `fullWidth`, `actionPlacement`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `-` | 표면 또는 content의 제목입니다. |
| `eyebrow` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. |
| `media` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `meta` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `actions` | `ReactNode \| action[]` | `-` | 사용자가 실행할 수 있는 보조 action입니다. |
| `footer` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `density` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `interactive` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `selected` | `boolean` | `false` | 선택된 시각 상태입니다. |
| `fullWidth` | `boolean` | `false` | 부모 폭을 채우도록 확장합니다. |
| `actionPlacement` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `default`
- `hover`
- `focus-visible`
- `selected`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-radius-8`

## 예시

```tsx
import { Card } from "@bling-lab/ui/components/layout/card";

export function Example() {
  return <Card title="컴포넌트" description="설명" />;
}
```

## 구현 메모

- 구현 파일은 `card.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
