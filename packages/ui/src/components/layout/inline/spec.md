# Inline 명세

## 목적

짧은 요소 묶음을 줄바꿈 가능한 inline 흐름으로 배치합니다.

## API 표면

- public component: `Inline`
- folder slug: `inline`
- category: `layout`
- 우선순위/상태: `P0`, `ready`
- props: `gap`, `align`, `justify`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"center"` | 교차축 정렬입니다. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬입니다. |

## 상태 동작

- `gap`, `align`, `justify`는 `data-*` 속성으로 CSS에 전달됩니다.

## 접근성 계약

- 기준 문서
- visual wrapping은 source order를 바꾸지 않습니다.

## 토큰 계약

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 검증 체크리스트

- `npm run components:validate`가 통과합니다.
- compact viewport에서 text와 control이 겹치지 않습니다.
