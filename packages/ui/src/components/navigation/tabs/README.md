# Tabs 컴포넌트

같은 맥락 안의 관련 패널을 전환하는 내비게이션입니다.

## 역할

동일 페이지 위치에서 peer section을 전환하고 URL 이동이 필요하지 않을 때 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `navigation` (Navigation)입니다.
- 기본 primitive는 `tabs pattern`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`value`, `defaultValue`, `orientation`, `activationMode`, `variant`, `size`, `fullWidth`, `keepMounted`, `disabled`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `value` | `string \| number` | `-` | controlled 값입니다. |
| `defaultValue` | `string` | `-` | uncontrolled 초기 값입니다. |
| `orientation` | `"horizontal" \| "vertical"` | `-` | 컴포넌트 방향입니다. |
| `activationMode` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. |
| `fullWidth` | `boolean` | `false` | 부모 폭을 채우도록 확장합니다. |
| `keepMounted` | `boolean` | `false` | 비활성 content를 DOM에 유지할지 결정합니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |

## 상태

- `selected`
- `unselected`
- `focus-visible`
- `disabled`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-action-primary-bg`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시

```tsx
import { Tabs } from "@bling-lab/ui/components/navigation/tabs";

export function Example() {
  return <Tabs items={[{ label: "미리보기", value: "preview", content: "내용" }]} />;
}
```

## 구현 메모

- 구현 파일은 `tabs.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
