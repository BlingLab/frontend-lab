# Container 명세

## 목적

페이지 콘텐츠 폭과 gutter를 예측 가능하게 제한합니다.

## API 표면

- public component: `Container`
- folder slug: `container`
- category: `layout`
- 우선순위/상태: `P0`, `ready`
- props: `size`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"lg"` | 적용할 container 최대 폭입니다. |

## 상태 동작

- `size`는 `data-size`로 노출되고 CSS container token에 매핑됩니다.

## 접근성 계약

- 기준 문서
- 별도 role을 추가하지 않고 children의 의미를 보존합니다.

## 토큰 계약

- `--ds-container-sm`
- `--ds-container-md`
- `--ds-container-lg`
- `--ds-page-gutter`

## 검증 체크리스트

- `npm run components:validate`가 통과합니다.
- narrow viewport에서 가로 넘침가 생기지 않습니다.
