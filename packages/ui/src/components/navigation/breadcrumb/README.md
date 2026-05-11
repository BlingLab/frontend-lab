# Breadcrumb 컴포넌트

현재 페이지의 계층 위치를 보여주는 trail입니다.

## 역할

상위 위치를 노출하고 사용자가 빠르게 위 단계로 이동할 수 있어야 할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `navigation` (Navigation)입니다.
- 기본 primitive는 `nav with ordered list`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`items`, `separator`, `maxItems`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `items` | `item[]` | `[]` | 렌더링할 item 목록입니다. |
| `separator` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `maxItems` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `current`
- `link`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-text-muted`
- `--ds-color-action-primary-bg`

## 예시

```tsx
import { Breadcrumb } from "@bling-lab/ui/components/navigation/breadcrumb";

export function Example() {
  return <Breadcrumb items={items} />;
}
```

## 구현 메모

- 구현 파일은 `breadcrumb.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
