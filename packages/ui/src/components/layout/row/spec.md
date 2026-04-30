# Row 명세 / Row Spec

## 목적 / Purpose

자식 요소를 wrapping 가능한 가로 흐름으로 배치합니다. / Arranges children in a wrapping horizontal flow.

## API 표면 / API Surface

- public component: `Row`
- folder slug: `row`
- category: `layout`
- priority/status: `P0` / `ready`
- props: `gap`, `align`, `justify`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. / Gap between child elements. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬입니다. / Cross-axis alignment. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬입니다. / Main-axis justification. |

## 상태 동작 / State Behavior

- `gap`, `align`, `justify`는 `data-*` 속성으로 CSS에 전달됩니다. / `gap`, `align`, and `justify` are passed to CSS through `data-*` attributes.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: native semantic HTML
- layout-only wrapper로 동작하며 child semantics를 보존합니다. / It acts as a layout-only wrapper and preserves child semantics.

## 토큰 계약 / Token Contract

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 검증 체크리스트 / Validation Checklist

- `npm run components:validate`가 통과합니다. / `npm run components:validate` passes.
- wrapping 후에도 focus 순서가 DOM 순서와 일치합니다. / Focus order still follows DOM order after wrapping.
