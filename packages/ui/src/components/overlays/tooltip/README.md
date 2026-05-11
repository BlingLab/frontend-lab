# Tooltip 컴포넌트

hover 또는 focus된 컨트롤을 짧게 설명하는 helper text입니다.

## 역할

아이콘 버튼이나 축약된 UI를 보조하되 필수 정보를 숨기지 않을 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `overlays` (Overlays)입니다.
- 기본 primitive는 `tooltip pattern`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`content`, `placement`, `delay`, `disabled`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `content` | `ReactNode` | `-` | 표시할 floating content입니다. |
| `placement` | `string` | `"bottom-start"` | floating surface 위치입니다. |
| `delay` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |

## 상태

- `closed`
- `delayed-open`
- `open`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-z-popover`
- `--ds-color-gray-900`
- `--ds-radius-4`

## 예시

```tsx
import { Tooltip } from "@bling-lab/ui/components/overlays/tooltip";

export function Example() {
  return <Tooltip label="도움말" content="설명" />;
}
```

## 구현 메모

- 구현 파일은 `tooltip.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
