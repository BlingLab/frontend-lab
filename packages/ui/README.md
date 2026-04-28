# @workspace/ui

제품 UI에 재사용할 컴포넌트를 배치하는 패키지입니다.
This package contains reusable components for product UI.

현재 패키지는 26개 제품 컴포넌트와 5개 레이아웃 primitive를 vanilla JS factory로 제공합니다. 각 factory는 DOM element를 반환하고, 공통 스타일은 `src/styles.css`에서 제공합니다.
The package currently provides 26 product components and 5 layout primitives as vanilla JS factories. Each factory returns a DOM element, and shared styles are provided by `src/styles.css`.

## 구조 / Structure

```text
src/
├── index.js
├── components.js
├── styles.css
└── components/
    ├── catalog.js
    ├── README.md
    └── {category}/{component-slug}/
        ├── index.js
        ├── README.md
        └── spec.md
```

## 원칙 / Principles

- 컴포넌트 이름은 `PascalCase`, 폴더명은 `kebab-case`를 사용합니다. / Component names use `PascalCase`, and folder names use `kebab-case`.
- 시각 변형은 `variant`, 의미 색상은 `tone`, 밀도는 `density`, 크기는 `size`로 표현합니다. / Visual variation uses `variant`, semantic color uses `tone`, density uses `density`, and size uses `size`.
- 상태 스타일은 임의 클래스보다 `data-state`, `data-disabled`, `data-invalid`, `data-orientation` 같은 표준화된 속성을 우선합니다. / State styles prefer standardized attributes such as `data-state`, `data-disabled`, `data-invalid`, and `data-orientation` over arbitrary classes.
- hover, active, focus-visible, disabled는 shared token과 같은 selector 구조를 사용합니다. / Hover, active, focus-visible, and disabled use shared tokens and consistent selectors.
- page layout은 `Container`, `Row`, `Col`, `Stack`, `Inline` primitive를 사용합니다. / Page layout uses the `Container`, `Row`, `Col`, `Stack`, and `Inline` primitives.
- 접근성은 네이티브 HTML을 먼저 사용하고, 커스텀 상호작용이 필요할 때만 WAI-ARIA APG 패턴을 적용합니다. / Accessibility starts with native HTML and applies WAI-ARIA APG patterns only when custom interaction is required.

## 사용 / Usage

```js
import { Button, Container, Dialog, Stack, TextField } from "@workspace/ui";
import "@workspace/ui/styles.css";

document.body.append(
  Container({
    children: Stack({
      gap: "md",
      children: [
        TextField({ label: "이름 / Name" }),
        Button({ label: "저장 / Save" }),
        Dialog({ title: "확인 / Confirm", triggerLabel: "열기 / Open" })
      ]
    })
  })
);
```

개별 컴포넌트도 폴더 단위로 import할 수 있습니다.
Individual components can also be imported by folder.

```js
import { Button } from "@workspace/ui/components/actions/button";
```

## 명령어 / Commands

```bash
npm run components:scaffold
npm run components:validate
```
