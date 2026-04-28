# Responsive Layout System

레이아웃 시스템은 명시적 grid area보다 flex-first 사고방식을 우선합니다. 대부분의 제품 UI는 toolbar, form row, card list, action group처럼 flex로 충분히 표현되는 경우가 많습니다.

## Reference Model

- Bootstrap: container, row, column, 12-column span 모델
- Foundation: Flexbox 기반 alignment와 automatic sizing
- Tailwind: mobile-first breakpoint와 utility-first 조합

## Core Direction

```text
Container
  Row
    Col
    Col
```

초기 구현은 아직 없지만, layout 컴포넌트를 추가할 때 아래 이름과 책임을 우선 검토합니다.

## Layout Primitives

### Container

페이지나 section의 최대 너비와 좌우 gutter를 관리합니다.

### Row

수평 flex row입니다. 기본적으로 wrap을 허용하고 gutter를 token으로 관리합니다.

### Col

12-column span을 Flexbox의 `basis`와 `max-width`로 표현합니다.

### Stack

수직 간격을 만드는 column flex helper입니다.

### Inline

버튼 묶음, 태그 목록처럼 줄바꿈 가능한 수평 flex helper입니다.

## Breakpoints

Tailwind의 mobile-first breakpoint 이름을 참고합니다.

| Name | Min width |
| --- | --- |
| base | default |
| sm | 40rem |
| md | 48rem |
| lg | 64rem |
| xl | 80rem |
| 2xl | 96rem |

`base`는 가장 작은 화면의 기본값입니다. `md` 같은 breakpoint 값은 해당 너비 이상에서 적용됩니다.

## Rules

- 레이아웃은 모바일 기본값을 먼저 작성합니다.
- 화면이 넓어질수록 `sm`, `md`, `lg`, `xl`, `2xl` 값을 추가합니다.
- 컴포넌트 자체는 페이지 전체 layout을 결정하지 않습니다.
- gutter, container width, breakpoint는 token에서 관리합니다.
- CSS Grid가 필요한 dashboard tile 배치나 explicit area layout은 별도 advanced layout으로 분리합니다.
