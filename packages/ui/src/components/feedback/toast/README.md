# Toast 컴포넌트

작업 결과를 짧게 보여주는 임시 전역 알림입니다.

## 역할

사용자의 흐름을 막지 않는 저장, 동기화, 복사 완료 같은 결과 안내에 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `feedback` (Feedback)입니다.
- 기본 primitive는 `status region with dismiss control`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`tone`, `title`, `description`, `duration`, `dismissible`, `dismissLabel`, `actions`, `onDismiss`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `tone` | `tone` | `-` | semantic color tone입니다. |
| `title` | `ReactNode` | `-` | 표면 또는 content의 제목입니다. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. |
| `duration` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `dismissible` | `boolean` | `false` | 사용자가 닫을 수 있는 상태입니다. |
| `dismissLabel` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `actions` | `ReactNode \| action[]` | `-` | 사용자가 실행할 수 있는 보조 action입니다. |
| `onDismiss` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `entering`
- `open`
- `exiting`
- `dismissed`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-z-toast`
- `--ds-shadow-raised`
- `--ds-motion-duration-normal`

## 예시

```tsx
import { Toast } from "@bling-lab/ui/components/feedback/toast";

export function Example() {
  return <Toast tone="info" title="동기화됨" dismissible />;
}
```

## 구현 메모

- 구현 파일은 `toast.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
