# Container 컴포넌트 / Container Component

페이지 콘텐츠 폭과 gutter를 일정하게 제한하는 레이아웃 primitive입니다. / Layout primitive that constrains page content width and gutters.

## 역할 / Role

문서, 설정, 대시보드처럼 읽기 가능한 최대 폭이 필요한 화면의 바깥 wrapper로 사용합니다. / Use as the outer wrapper for screens that need a readable max width, such as docs, settings, and dashboards.

## 사용 기준 / Usage Criteria

- 우선순위는 `P0`, 상태는 `ready`입니다. / Priority is `P0`, and status is `ready`.
- 카테고리는 `layout` (Layout)입니다. / Category is `layout` (Layout).
- 기본 primitive는 `div`입니다. / Base primitive is `div`.
- public export에 포함되므로 catalog와 문서 앱에서 함께 관리합니다. / It is part of public exports, so it is managed through the catalog and docs app.

## Prop 축 / Prop Axes

`size`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"lg"` | 적용할 container 최대 폭입니다. / Maximum container width to apply. |

## 상태 / States

- `sm`
- `md`
- `lg`
- `xl`
- `2xl`

## 접근성 / Accessibility

- layout-only primitive이므로 의미 role을 추가하지 않습니다. / This is a layout-only primitive and does not add semantic roles.
- DOM 순서와 화면 순서가 어긋나지 않아야 합니다. / DOM order must match visual order.

## 토큰 / Tokens

- `--ds-container-sm`
- `--ds-container-md`
- `--ds-container-lg`
- `--ds-page-gutter`

## 예시 / Example

```tsx
import { Container } from "@workspace/ui/components/layout/container";

export function Example() {
  return <Container size="lg">콘텐츠 / Content</Container>;
}
```
