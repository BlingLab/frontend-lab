# Container 컴포넌트

페이지 콘텐츠 폭과 gutter를 일정하게 제한하는 레이아웃 primitive입니다.

## 역할

문서, 설정, 대시보드처럼 읽기 가능한 최대 폭이 필요한 화면의 바깥 wrapper로 사용합니다.

## 사용 기준

- 우선순위는 `P0`, 상태는 `ready`입니다.
- 카테고리는 `layout` (Layout)입니다.
- 기본 primitive는 `div`입니다.
- public export에 포함되므로 catalog와 문서 앱에서 함께 관리합니다.

## Prop 축

`size`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"lg"` | 적용할 container 최대 폭입니다. |

## 상태

- `sm`
- `md`
- `lg`
- `xl`
- `2xl`

## 접근성

- layout-only primitive이므로 의미 role을 추가하지 않습니다.
- DOM 순서와 화면 순서가 어긋나지 않아야 합니다.

## 토큰

- `--ds-container-sm`
- `--ds-container-md`
- `--ds-container-lg`
- `--ds-page-gutter`

## 예시

```tsx
import { Container } from "@bling-lab/ui/components/layout/container";

export function Example() {
  return <Container size="lg">콘텐츠</Container>;
}
```
