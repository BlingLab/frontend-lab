# Button 컴포넌트

명확한 사용자 명령을 실행하는 기본 액션 컨트롤입니다.

## 역할

저장, 제출, 확인, 취소, 삭제처럼 사용자가 의도를 확정하는 작업에 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `actions` (Actions)입니다.
- 기본 primitive는 `button`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`variant`, `tone`, `size`, `disabled`, `loading`, `type`, `fullWidth`, `selected`, `justify`, `iconStart`, `iconEnd`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `tone` | `tone` | `-` | semantic color tone입니다. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `loading` | `boolean` | `false` | loading 상태를 표시합니다. |
| `type` | `string` | `-` | native element type입니다. |
| `fullWidth` | `boolean` | `false` | 부모 폭을 채우도록 확장합니다. |
| `selected` | `boolean` | `false` | 선택된 시각 상태입니다. |
| `justify` | `alignment` | `-` | 자식 요소의 주축 정렬입니다. |
| `iconStart` | `ReactNode` | `-` | content 앞에 표시할 icon입니다. |
| `iconEnd` | `ReactNode` | `-` | content 뒤에 표시할 icon입니다. |

## 상태

- `default`
- `hover`
- `focus-visible`
- `active`
- `disabled`
- `loading`
- `selected`

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
import { Button, Icon } from "@bling-lab/ui";

export function Example() {
  return <Button iconStart={<Icon name="plus" />}>저장</Button>;
}
```

## 구현 메모

- 구현 파일은 `button.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
