# @workspace/ui

제품 UI에 재사용할 컴포넌트를 배치하는 패키지입니다.
This package contains reusable components for product UI.

현재 패키지는 34개 제품 컴포넌트와 5개 레이아웃 primitive를 React + TypeScript 컴포넌트로 제공합니다.
The package currently provides 34 product components and 5 layout primitives as React + TypeScript components.

이 패키지는 어떤 React 프로젝트든 베이스로 가져다 쓸 수 있게 public exports, build output, CSS token contract를 분리합니다.
This package separates public exports, build output, and CSS token contracts so it can be used as a base in any React project.

## 구조 / Structure

```text
src/
├── index.ts
├── styles.css
├── shared/
│   ├── types.ts
│   └── utils.ts
└── components/
    ├── catalog.ts
    ├── README.md
    └── {category}/{component-slug}/
        ├── index.ts
        ├── {component-slug}.tsx
        ├── README.md
        └── spec.md
```

## 원칙 / Principles

- 구현 파일은 각 컴포넌트 폴더의 `{component-slug}.tsx`에 둡니다. / Implementation files live in each component folder's `{component-slug}.tsx`.
- `src/index.ts`는 구현을 갖지 않고 public export만 모읍니다. / `src/index.ts` contains no implementation and only gathers public exports.
- 컴포넌트 이름은 `PascalCase`, 폴더명은 `kebab-case`를 사용합니다. / Component names use `PascalCase`, and folder names use `kebab-case`.
- 시각 변형은 `variant`, 의미 색상은 `tone`, 밀도는 `density`, 크기는 `size`로 표현합니다. / Visual variation uses `variant`, semantic color uses `tone`, density uses `density`, and size uses `size`.
- 상태 스타일은 임의 클래스보다 `data-state`, `data-disabled`, `data-invalid`, `data-orientation` 같은 표준화된 속성을 우선합니다. / State styles prefer standardized attributes such as `data-state`, `data-disabled`, `data-invalid`, and `data-orientation` over arbitrary classes.
- hover, active, focus-visible, disabled는 shared token과 같은 selector 구조를 사용합니다. / Hover, active, focus-visible, and disabled use shared tokens and consistent selectors.
- 색상은 component별 raw value가 아니라 semantic token을 사용해서 `data-ds-theme` 전환을 그대로 상속합니다. / Colors use semantic tokens rather than component-specific raw values, so they inherit `data-ds-theme` switching.
- page layout은 `Container`, `Row`, `Col`, `Stack`, `Inline` primitive를 사용합니다. / Page layout uses the `Container`, `Row`, `Col`, `Stack`, and `Inline` primitives.
- 접근성은 네이티브 HTML을 먼저 사용하고, 커스텀 상호작용이 필요할 때만 WAI-ARIA APG 패턴을 적용합니다. / Accessibility starts with native HTML and applies WAI-ARIA APG patterns only when custom interaction is required.

## Prop API 전략 / Prop API Strategy

- 하나의 컴포넌트가 여러 화면에서 쓰일 수 있도록 style axis, state axis, slot axis, render axis를 분리합니다. / Separate style axes, state axes, slot axes, and render axes so one component can work across many screens.
- style axis는 `variant`, `tone`, `size`, `density`, `width`를 우선 사용합니다. / Style axes prefer `variant`, `tone`, `size`, `density`, and `width`.
- state axis는 `selected`, `disabled`, `invalid`, `loading`, `open`, `dismissible`처럼 명확한 boolean 또는 controlled value로 표현합니다. / State axes use clear booleans or controlled values such as `selected`, `disabled`, `invalid`, `loading`, `open`, and `dismissible`.
- controlled/uncontrolled 상태는 `useControllableState` helper로 통일합니다. / Controlled and uncontrolled state uses the shared `useControllableState` helper.
- slot axis는 `iconStart`, `iconEnd`, `prefix`, `suffix`, `leading`, `trailing`, `media`, `meta`, `footer`, `actions`처럼 위치가 드러나는 이름을 사용합니다. / Slot axes use position-aware names such as `iconStart`, `iconEnd`, `prefix`, `suffix`, `leading`, `trailing`, `media`, `meta`, `footer`, and `actions`.
- collection 확장은 `renderItem`, `renderCell`, `rowActions` 같은 render prop으로 열어둡니다. / Collection extension stays open through render props such as `renderItem`, `renderCell`, and `rowActions`.
- 세부 기준은 [Prop API 설계 가이드](../../docs/prop-api-guidelines.md)를 따릅니다. / Follow the detailed rules in the [Prop API Guidelines](../../docs/prop-api-guidelines.md).

## 사용 / Usage

```tsx
import { Button, Container, Dialog, Stack, TextField } from "@workspace/ui";
import "@workspace/ui/styles.css";

export function Example() {
  return (
    <Container data-ds-theme="normal">
      <Stack gap="md">
        <TextField label="이름 / Name" />
        <Button>저장 / Save</Button>
        <Dialog title="확인 / Confirm" triggerLabel="열기 / Open" />
      </Stack>
    </Container>
  );
}
```

개별 컴포넌트도 폴더 단위로 import할 수 있습니다.
Individual components can also be imported by folder.

```tsx
import { Button } from "@workspace/ui/components/actions/button";
```

## 외부 프로젝트에서 사용 / Use In Another Project

소비자 앱 entry에서 CSS를 한 번 import합니다.
Import CSS once in the consumer app entry.

```tsx
import "@workspace/tokens/tokens.css";
import "@workspace/ui/styles.css";
```

기본 theme는 `normal`이며 root나 특정 영역에 `data-ds-theme`를 적용할 수 있습니다.
The default theme is `normal`, and `data-ds-theme` can be applied to the root or a scoped area.

```tsx
<main data-ds-theme="normal">
  <Button>기본 / Normal</Button>
</main>

<section data-ds-theme="dark">
  <Button>어두운 영역 / Dark area</Button>
</section>
```

컴포넌트는 root entry 또는 개별 component entry에서 가져옵니다.
Import components from the root entry or per-component entries.

```tsx
import { Button, TextField } from "@workspace/ui";
```

React와 React DOM은 peer dependency입니다. 소비자 프로젝트가 직접 설치해야 합니다.
React and React DOM are peer dependencies. The consumer project must install them directly.

## 빌드 / Build

```bash
npm --workspace @workspace/ui run build
```

빌드 결과는 `dist`에 생성됩니다.
Build output is generated in `dist`.

```text
dist/
├── index.js
├── index.d.ts
├── styles.css
└── components/
```

## 명령어 / Commands

```bash
npm --workspace @workspace/ui run build
npm --workspace @workspace/ui run typecheck
npm run components:scaffold
npm run components:validate
```
