# Alert 컴포넌트 / Alert Component

문맥 안에서 중요한 상태를 전달하는 inline feedback입니다. / Inline status message for important contextual feedback.

## 역할 / Role

정보, 성공, 경고, 오류 메시지를 흐름을 막지 않고 보여줄 때 사용합니다. / Use for non-blocking information, success, warning, or error messages.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `feedback` (Feedback)입니다. / Category is `feedback` (Feedback).
- 기본 primitive는 `role='status' or role='alert'`입니다. / Base primitive is `role='status' or role='alert'`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`tone`, `title`, `description`, `icon`, `actions`, `variant`, `actionsPlacement`, `dismissible`, `dismissLabel`, `onDismiss`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `tone` | `tone` | `-` | semantic color tone입니다. / Semantic color tone. |
| `title` | `ReactNode` | `-` | 표면 또는 content의 제목입니다. / Title of the surface or content. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. / Helper description text. |
| `icon` | `ReactNode` | `-` | 시각적으로 함께 표시할 icon입니다. / Icon displayed with the content. |
| `actions` | `ReactNode \| action[]` | `-` | 사용자가 실행할 수 있는 보조 action입니다. / Secondary actions the user can run. |
| `variant` | `variant` | `-` | 시각 variant입니다. / Visual variant. |
| `actionsPlacement` | `"inline" \| "bottom"` | `"inline"` | action을 배치할 위치입니다. / Placement for actions. |
| `dismissible` | `boolean` | `false` | 사용자가 닫을 수 있는 상태입니다. / Allows the user to dismiss the component. |
| `dismissLabel` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |
| `onDismiss` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |

## 상태 / States

- `info`
- `success`
- `warning`
- `danger`
- `dismissible`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/alert/](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-feedback-success`
- `--ds-color-feedback-warning`
- `--ds-color-feedback-danger`

## 예시 / Example

```tsx
import { Alert } from "@workspace/ui/components/feedback/alert";

export function Example() {
  return <Alert tone="success" title="저장 완료 / Saved" description="변경 사항이 반영되었습니다. / Your changes have been applied." />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `alert.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `alert.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
