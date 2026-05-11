# Checkbox 컴포넌트

독립적인 선택 또는 mixed 상태를 표현하는 체크 컨트롤입니다.

## 역할

약관 동의, 필터 선택, 다중 선택 목록처럼 각각 독립적인 boolean 값에 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `forms` (Forms)입니다.
- 기본 primitive는 `input[type='checkbox']`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`checked`, `defaultChecked`, `indeterminate`, `disabled`, `invalid`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `checked` | `boolean` | `-` | controlled 선택 상태입니다. |
| `defaultChecked` | `boolean` | `-` | uncontrolled 초기 선택 상태입니다. |
| `indeterminate` | `boolean` | `false` | 부분 선택 상태를 표시합니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `invalid` | `boolean` | `false` | validation 실패 상태를 표시합니다. |

## 상태

- `unchecked`
- `checked`
- `indeterminate`
- `focus-visible`
- `disabled`
- `invalid`

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
import { Checkbox } from "@bling-lab/ui/components/forms/checkbox";

export function Example() {
  return <Checkbox label="알림 받기" defaultChecked />;
}
```

## 구현 메모

- 구현 파일은 `checkbox.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
