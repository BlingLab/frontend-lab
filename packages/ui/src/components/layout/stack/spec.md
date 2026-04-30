# Stack 명세 / Stack Spec

## 목적 / Purpose

반복되는 세로 간격을 token 기반으로 통일합니다. / Standardizes repeated vertical spacing with tokens.

## API 표면 / API Surface

- public component: `Stack`
- folder slug: `stack`
- category: `layout`
- priority/status: `P0` / `ready`
- props: `gap`, `align`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. / Gap between child elements. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬입니다. / Cross-axis alignment. |

## 상태 동작 / State Behavior

- `gap`과 `align`은 `data-*` 속성으로 CSS에 전달됩니다. / `gap` and `align` are passed to CSS through `data-*` attributes.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: native semantic HTML
- children의 semantic element와 accessible name을 변경하지 않습니다. / It does not alter child semantic elements or accessible names.

## 토큰 계약 / Token Contract

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 검증 체크리스트 / Validation Checklist

- `npm run components:validate`가 통과합니다. / `npm run components:validate` passes.
- nested Stack에서도 간격이 예측 가능하게 유지됩니다. / Spacing remains predictable in nested Stack usage.
