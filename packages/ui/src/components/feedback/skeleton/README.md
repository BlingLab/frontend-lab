# Skeleton 컴포넌트

비동기 콘텐츠가 로드되는 동안 레이아웃을 유지하는 placeholder입니다.

## 역할

로딩 중에도 화면 구조를 보존하고 content jump를 줄일 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `feedback` (Feedback)입니다.
- 기본 primitive는 `div with aria-hidden when decorative`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`shape`, `width`, `height`, `animated`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `shape` | `string` | `-` | 컴포넌트 외형 형태입니다. |
| `width` | `FieldWidth \| CSSProperties["width"]` | `-` | 렌더링 width 값입니다. |
| `height` | `CSSProperties["height"]` | `-` | 렌더링 height 값입니다. |
| `animated` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `static`
- `animated`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-bg-muted`
- `--ds-motion-duration-normal`
- `--ds-radius-6`

## 예시

```tsx
import { Skeleton } from "@bling-lab/ui/components/feedback/skeleton";

export function Example() {
  return <Skeleton width="14rem" height="1.25rem" animated />;
}
```

## 구현 메모

- 구현 파일은 `skeleton.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
