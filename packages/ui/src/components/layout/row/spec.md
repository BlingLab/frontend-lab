# Row 명세

## 목적

자식 요소를 wrapping 가능한 가로 흐름으로 배치합니다.

## API 표면

- public component: `Row`
- folder slug: `row`
- category: `layout`
- 우선순위/상태: `P0`, `ready`
- props: `gap`, `align`, `justify`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬입니다. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬입니다. |

## 상태 동작

- `gap`, `align`, `justify`는 `data-*` 속성으로 CSS에 전달됩니다.

## 접근성 계약

- 기준 문서
- layout-only wrapper로 동작하며 child semantics를 보존합니다.

## 토큰 계약

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 검증 체크리스트

- `npm run components:validate`가 통과합니다.
- wrapping 후에도 focus 순서가 DOM 순서와 일치합니다.
