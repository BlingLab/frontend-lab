# Inline 명세 / Inline Spec

## 목적 / Purpose

짧은 요소 묶음을 줄바꿈 가능한 inline 흐름으로 배치합니다. / Arranges short element groups in a wrapping inline flow.

## API 표면 / API Surface

- public component: `Inline`
- folder slug: `inline`
- category: `layout`
- priority/status: `P0` / `ready`
- props: `gap`, `align`, `justify`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. / Gap between child elements. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"center"` | 교차축 정렬입니다. / Cross-axis alignment. |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬입니다. / Main-axis justification. |

## 상태 동작 / State Behavior

- `gap`, `align`, `justify`는 `data-*` 속성으로 CSS에 전달됩니다. / `gap`, `align`, and `justify` are passed to CSS through `data-*` attributes.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: native semantic HTML
- visual wrapping은 source order를 바꾸지 않습니다. / Visual wrapping does not change source order.

## 토큰 계약 / Token Contract

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 검증 체크리스트 / Validation Checklist

- `npm run components:validate`가 통과합니다. / `npm run components:validate` passes.
- compact viewport에서 text와 control이 겹치지 않습니다. / Text and controls do not overlap in compact viewports.
