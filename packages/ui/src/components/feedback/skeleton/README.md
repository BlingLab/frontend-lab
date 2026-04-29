# Skeleton 컴포넌트 / Skeleton Component

비동기 콘텐츠가 로드되는 동안 레이아웃을 유지하는 placeholder입니다. / Placeholder surface for loading content.

## 역할 / Role

로딩 중에도 화면 구조를 보존하고 content jump를 줄일 때 사용합니다. / Use to preserve layout while asynchronous content loads.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `feedback` (Feedback)입니다. / Category is `feedback` (Feedback).
- 기본 primitive는 `div with aria-hidden when decorative`입니다. / Base primitive is `div with aria-hidden when decorative`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`shape`, `width`, `height`, `animated`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `shape` | `string` | `-` | 컴포넌트 외형 형태입니다. / Visual shape of the component. |
| `width` | `FieldWidth \| CSSProperties["width"]` | `-` | 렌더링 width 값입니다. / Rendered width value. |
| `height` | `CSSProperties["height"]` | `-` | 렌더링 height 값입니다. / Rendered height value. |
| `animated` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. / Component-specific extension prop. |

## 상태 / States

- `static`
- `animated`

## 접근성 / Accessibility

- 기본 기준 / Base reference: 해당 없음 또는 네이티브 HTML 기준을 따릅니다. / Not applicable or follows native HTML behavior.
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-bg-muted`
- `--ds-motion-duration-normal`
- `--ds-radius-6`

## 예시 / Example

```tsx
import { Skeleton } from "@workspace/ui/components/feedback/skeleton";

export function Example() {
  return <Skeleton width="14rem" height="1.25rem" animated />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `skeleton.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `skeleton.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
