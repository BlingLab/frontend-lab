# Alert 컴포넌트

문맥 안에서 중요한 상태를 전달하는 inline feedback입니다.

## 역할

정보, 성공, 경고, 오류 메시지를 흐름을 막지 않고 보여줄 때 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `feedback` (Feedback)입니다.
- 기본 primitive는 `role='status' or role='alert'`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`tone`, `title`, `description`, `icon`, `actions`, `variant`, `actionsPlacement`, `dismissible`, `dismissLabel`, `onDismiss`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `tone` | `tone` | `-` | semantic color tone입니다. |
| `title` | `ReactNode` | `-` | 표면 또는 content의 제목입니다. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. |
| `icon` | `ReactNode` | `-` | 시각적으로 함께 표시할 icon입니다. |
| `actions` | `ReactNode \| action[]` | `-` | 사용자가 실행할 수 있는 보조 action입니다. |
| `variant` | `variant` | `-` | 시각 variant입니다. |
| `actionsPlacement` | `"inline" \| "bottom"` | `"inline"` | action을 배치할 위치입니다. |
| `dismissible` | `boolean` | `false` | 사용자가 닫을 수 있는 상태입니다. |
| `dismissLabel` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `onDismiss` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `info`
- `success`
- `warning`
- `danger`
- `dismissible`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-feedback-success`
- `--ds-color-feedback-warning`
- `--ds-color-feedback-danger`

## 예시

```tsx
import { Alert } from "@bling-lab/ui/components/feedback/alert";

export function Example() {
  return <Alert tone="success" title="저장 완료" description="변경 사항이 반영되었습니다." />;
}
```

## 구현 메모

- 구현 파일은 `alert.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
