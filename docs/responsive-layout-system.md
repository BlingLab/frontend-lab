# 반응형 레이아웃 시스템 / Responsive Layout System

레이아웃 시스템은 mobile-first, flex-first 방식으로 구현되어 있습니다.
The layout system is implemented as mobile-first and flex-first.

## 실제 primitive / Implemented Primitives

`packages/ui/src/components.js`에서 아래 primitive를 export합니다.
The following primitives are exported from `packages/ui/src/components.js`.

```js
import { Container, Row, Col, Stack, Inline } from "@frontend-lab/ui";
```

### Container

페이지나 section의 최대 너비와 좌우 gutter를 관리합니다.
Manages max width and horizontal gutters for pages or sections.

```js
Container({ size: "lg", children: [...] });
```

### Row

wrap 가능한 flex row입니다. `gap`, `align`, `justify`를 data attribute로 표준화합니다.
A wrapping flex row. `gap`, `align`, and `justify` are standardized through data attributes.

```js
Row({ gap: "md", align: "center", justify: "between", children: [...] });
```

### Col

12-column span을 `span`, `sm`, `md`, `lg`로 지정합니다. 기본은 작은 화면 기준입니다.
Defines 12-column spans with `span`, `sm`, `md`, and `lg`. The base value is for small screens.

```js
Col({ span: 12, md: 6, lg: 4, children: [...] });
```

### Stack

수직 흐름과 간격을 표준화합니다.
Standardizes vertical flow and spacing.

```js
Stack({ gap: "lg", children: [...] });
```

### Inline

버튼 그룹, badge 목록처럼 줄바꿈 가능한 수평 흐름을 표준화합니다.
Standardizes wrapping horizontal flow for button groups, badge lists, and similar UI.

```js
Inline({ gap: "sm", align: "center", children: [...] });
```

## breakpoint / Breakpoints

| 이름 / Name | 최소 너비 / Min width |
| --- | --- |
| base | default |
| sm | 40rem |
| md | 48rem |
| lg | 64rem |
| xl | 80rem |
| 2xl | 96rem |

CSS media query는 현재 `sm`, `md`, `lg` column span을 구현합니다. `xl`, `2xl`은 container token으로 먼저 제공합니다.
CSS media queries currently implement `sm`, `md`, and `lg` column spans. `xl` and `2xl` are provided first as container tokens.

## 반응형 동작 / Responsive Behavior

- 작은 화면에서 Alert, Toast, Dialog action, List item은 세로로 쌓입니다. / Alert, Toast, Dialog actions, and List items stack vertically on small screens.
- Table은 `TableWrap`으로 horizontal overflow를 허용합니다. / Tables allow horizontal overflow through `TableWrap`.
- Button은 작은 화면에서 text wrapping을 허용해 overflow를 막습니다. / Buttons allow text wrapping on small screens to prevent overflow.
- Container gutter는 `--ds-page-gutter` token으로 관리합니다. / Container gutters are managed through `--ds-page-gutter`.

## 규칙 / Rules

- 모바일 기본값을 먼저 작성합니다. / Write mobile defaults first.
- page layout은 `Container > Row > Col` 조합을 기본으로 사용합니다. / Use `Container > Row > Col` as the default page layout composition.
- 세로 form이나 panel 내부는 `Stack`을 사용합니다. / Use `Stack` for vertical forms or panel internals.
- action group과 metadata group은 `Inline`을 사용합니다. / Use `Inline` for action groups and metadata groups.
- 새로운 spacing 값을 만들지 말고 `--ds-layout-gap-*`와 `--ds-space-*`를 사용합니다. / Use `--ds-layout-gap-*` and `--ds-space-*` instead of inventing new spacing values.
