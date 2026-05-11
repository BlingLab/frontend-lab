# 반응형 레이아웃 시스템

레이아웃 시스템은 mobile-first, flex-first 방식으로 구현되어 있습니다.

## 실제 primitive

각 primitive는 `packages/ui/src/components/layout/{primitive}/{primitive}.tsx`에서 구현하고, `packages/ui/src/index.ts`에서 export합니다.

```js
import { Container, Row, Col, Stack, Inline } from "@frontend-lab/ui";
```

### Container

페이지나 section의 최대 너비와 좌우 gutter를 관리합니다.

```js
Container({ size: "lg", children: [...] });
```

### Row

wrap 가능한 flex row입니다. `gap`, `align`, `justify`를 data attribute로 표준화합니다.

```js
Row({ gap: "md", align: "center", justify: "between", children: [...] });
```

### Col

12-column span을 `span`, `sm`, `md`, `lg`로 지정합니다. 기본은 작은 화면 기준입니다.

```js
Col({ span: 12, md: 6, lg: 4, children: [...] });
```

### Stack

수직 흐름과 간격을 표준화합니다.

```js
Stack({ gap: "lg", children: [...] });
```

### Inline

버튼 그룹, badge 목록처럼 줄바꿈 가능한 수평 흐름을 표준화합니다.

```js
Inline({ gap: "sm", align: "center", children: [...] });
```

## breakpoint

| 이름| 최소 너비|
| --- | --- |
| base | default |
| sm | 40rem |
| md | 48rem |
| lg | 64rem |
| xl | 80rem |
| 2xl | 96rem |

CSS media query는 현재 `sm`, `md`, `lg` column span을 구현합니다. `xl`, `2xl`은 container token으로 먼저 제공합니다.

## 반응형 동작

- 작은 화면에서 Alert, Toast, Dialog action, List item은 세로로 쌓입니다.
- Table은 `TableWrap`으로 가로 넘침를 허용합니다.
- Button은 작은 화면에서 text wrapping을 허용해 overflow를 막습니다.
- Container gutter는 `--ds-page-gutter` token으로 관리합니다.

## 규칙

- 모바일 기본값을 먼저 작성합니다.
- page layout은 `Container > Row > Col` 조합을 기본으로 사용합니다.
- 세로 form이나 panel 내부는 `Stack`을 사용합니다.
- action group과 metadata group은 `Inline`을 사용합니다.
- 새로운 spacing 값을 만들지 말고 `--ds-layout-gap-*`와 `--ds-space-*`를 사용합니다.
