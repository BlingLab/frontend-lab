# NavigationRail 컴포넌트

앱 shell에서 쓰는 compact vertical primary navigation입니다.

## 역할

넓은 화면에서 최상위 destination을 지속적으로 노출해야 할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `navigation` (Navigation)입니다.
- 기본 primitive는 `nav with list of links or buttons`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`items`, `value`, `defaultValue`, `label`, `collapsed`, `onValueChange`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `items` | `item[]` | `[]` | 렌더링할 item 목록입니다. |
| `value` | `string \| number` | `-` | controlled 값입니다. |
| `defaultValue` | `string` | `-` | uncontrolled 초기 값입니다. |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. |
| `collapsed` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `onValueChange` | `function` | `-` | value가 바뀔 때 호출됩니다. |

## 상태

- `default`
- `selected`
- `disabled`
- `collapsed`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시

```tsx
import { NavigationRail } from "@bling-lab/ui/components/navigation/navigation-rail";

export function Example() {
  return <NavigationRail items={items} defaultValue="home" />;
}
```

## 구현 메모

- 구현 파일은 `navigation-rail.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
