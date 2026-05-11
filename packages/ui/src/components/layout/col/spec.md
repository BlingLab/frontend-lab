# Col 명세

## 목적

`Row` 내부에서 responsive 12-column span을 선언합니다.

## API 표면

- public component: `Col`
- folder slug: `col`
- category: `layout`
- 우선순위/상태: `P0`, `ready`
- props: `span`, `sm`, `md`, `lg`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `span` | `number` | `12` | 기본 12-column span입니다. |
| `sm` | `number` | `-` | small breakpoint 이상에서 적용할 span입니다. |
| `md` | `number` | `-` | medium breakpoint 이상에서 적용할 span입니다. |
| `lg` | `number` | `-` | large breakpoint 이상에서 적용할 span입니다. |

## 상태 동작

- span 값은 `data-span`, `data-sm`, `data-md`, `data-lg`로 CSS에 전달됩니다.

## 접근성 계약

- 기준 문서
- source order와 reading order를 유지합니다.

## 토큰 계약

- `--ds-breakpoint-sm`
- `--ds-breakpoint-md`
- `--ds-breakpoint-lg`

## 검증 체크리스트

- `npm run components:validate`가 통과합니다.
- mobile에서 span이 안전하게 한 줄 폭으로 떨어집니다.
