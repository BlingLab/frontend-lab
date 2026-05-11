# Stack 명세

## 목적

반복되는 세로 간격을 token 기반으로 통일합니다.

## API 표면

- public component: `Stack`
- folder slug: `stack`
- category: `layout`
- 우선순위/상태: `P0`, `ready`
- props: `gap`, `align`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | 자식 요소 사이 간격입니다. |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬입니다. |

## 상태 동작

- `gap`과 `align`은 `data-*` 속성으로 CSS에 전달됩니다.

## 접근성 계약

- 기준 문서
- children의 semantic element와 accessible name을 변경하지 않습니다.

## 토큰 계약

- `--ds-layout-gap-sm`
- `--ds-layout-gap-md`
- `--ds-layout-gap-lg`

## 검증 체크리스트

- `npm run components:validate`가 통과합니다.
- nested Stack에서도 간격이 예측 가능하게 유지됩니다.
