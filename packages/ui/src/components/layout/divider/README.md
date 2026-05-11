# Divider 컴포넌트

관련 그룹 사이를 시각적으로 구분하는 separator입니다.

## 역할

새 container를 만들지 않고 인접한 영역의 경계를 표현할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `layout` (Layout)입니다.
- 기본 primitive는 `hr or role='separator'`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`orientation`, `decorative`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `-` | 컴포넌트 방향입니다. |
| `decorative` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `horizontal`
- `vertical`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-border-default`

## 예시

```tsx
import { Divider } from "@bling-lab/ui/components/layout/divider";

export function Example() {
  return <Divider label="구분" />;
}
```

## 구현 메모

- 구현 파일은 `divider.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
