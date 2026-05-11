# RadioGroup 컴포넌트

여러 선택지 중 하나만 선택하는 그룹 컨트롤입니다.

## 역할

모든 선택지를 노출해야 하고 단일 값만 허용하는 설정에 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `forms` (Forms)입니다.
- 기본 primitive는 `fieldset with input[type='radio']`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`value`, `defaultValue`, `options`, `orientation`, `disabled`, `invalid`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `value` | `string \| number` | `-` | controlled 값입니다. |
| `defaultValue` | `string` | `-` | uncontrolled 초기 값입니다. |
| `options` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `orientation` | `"horizontal" \| "vertical"` | `-` | 컴포넌트 방향입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `invalid` | `boolean` | `false` | validation 실패 상태를 표시합니다. |

## 상태

- `unchecked`
- `checked`
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
import { RadioGroup } from "@bling-lab/ui/components/forms/radio-group";

export function Example() {
  return <RadioGroup label="밀도" options={options} defaultValue="comfortable" />;
}
```

## 구현 메모

- 구현 파일은 `radio-group.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
