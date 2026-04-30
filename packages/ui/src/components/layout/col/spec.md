# Col 명세 / Col Spec

## 목적 / Purpose

`Row` 내부에서 responsive 12-column span을 선언합니다. / Declares a responsive 12-column span inside `Row`.

## API 표면 / API Surface

- public component: `Col`
- folder slug: `col`
- category: `layout`
- priority/status: `P0` / `ready`
- props: `span`, `sm`, `md`, `lg`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `span` | `number` | `12` | 기본 12-column span입니다. / Default 12-column span. |
| `sm` | `number` | `-` | small breakpoint 이상에서 적용할 span입니다. / Span applied at the small breakpoint and above. |
| `md` | `number` | `-` | medium breakpoint 이상에서 적용할 span입니다. / Span applied at the medium breakpoint and above. |
| `lg` | `number` | `-` | large breakpoint 이상에서 적용할 span입니다. / Span applied at the large breakpoint and above. |

## 상태 동작 / State Behavior

- span 값은 `data-span`, `data-sm`, `data-md`, `data-lg`로 CSS에 전달됩니다. / Span values are passed to CSS through `data-span`, `data-sm`, `data-md`, and `data-lg`.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: native semantic HTML
- source order와 reading order를 유지합니다. / Source order and reading order are preserved.

## 토큰 계약 / Token Contract

- `--ds-breakpoint-sm`
- `--ds-breakpoint-md`
- `--ds-breakpoint-lg`

## 검증 체크리스트 / Validation Checklist

- `npm run components:validate`가 통과합니다. / `npm run components:validate` passes.
- mobile에서 span이 안전하게 한 줄 폭으로 떨어집니다. / Spans collapse safely to full-width flow on mobile.
