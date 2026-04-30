# Container 명세 / Container Spec

## 목적 / Purpose

페이지 콘텐츠 폭과 gutter를 예측 가능하게 제한합니다. / Constrains page content width and gutters predictably.

## API 표면 / API Surface

- public component: `Container`
- folder slug: `container`
- category: `layout`
- priority/status: `P0` / `ready`
- props: `size`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"lg"` | 적용할 container 최대 폭입니다. / Maximum container width to apply. |

## 상태 동작 / State Behavior

- `size`는 `data-size`로 노출되고 CSS container token에 매핑됩니다. / `size` is exposed through `data-size` and maps to CSS container tokens.

## 접근성 계약 / Accessibility Contract

- 기준 문서 / Reference: native semantic HTML
- 별도 role을 추가하지 않고 children의 의미를 보존합니다. / It adds no extra role and preserves child semantics.

## 토큰 계약 / Token Contract

- `--ds-container-sm`
- `--ds-container-md`
- `--ds-container-lg`
- `--ds-page-gutter`

## 검증 체크리스트 / Validation Checklist

- `npm run components:validate`가 통과합니다. / `npm run components:validate` passes.
- narrow viewport에서 horizontal overflow가 생기지 않습니다. / No horizontal overflow appears in narrow viewports.
