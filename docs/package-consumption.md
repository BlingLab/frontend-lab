# 패키지 사용 가이드 / Package Consumption Guide

이 문서는 `@workspace/ui`를 다른 React 프로젝트에서 가져다 쓰는 기준을 설명합니다.
This document explains how to consume `@workspace/ui` from another React project.

## 목표 / Goal

`packages/ui`는 앱 내부 전용 코드가 아니라 React 프로젝트 어디서든 가져다 쓸 수 있는 컴포넌트 패키지로 구성합니다.
`packages/ui` is structured as a reusable component package for any React project, not as app-local code.

## 소비자 요구 사항 / Consumer Requirements

- React 18 이상 / React 18 or later
- React DOM 18 이상 / React DOM 18 or later
- CSS import를 지원하는 bundler / A bundler that supports CSS imports
- ESM import를 지원하는 환경 / An environment that supports ESM imports

## 기본 사용 / Basic Usage

패키지를 설치한 뒤 전역 스타일을 한 번 import합니다.
After installing the package, import the global style once.

```tsx
import "@workspace/ui/styles.css";
```

컴포넌트는 루트 entry에서 가져옵니다.
Import components from the root entry.

```tsx
import { Button, Stack, TextField } from "@workspace/ui";

export function ProfileForm() {
  return (
    <Stack gap="md">
      <TextField label="이름 / Name" />
      <Button>저장 / Save</Button>
    </Stack>
  );
}
```

## 개별 entry import / Per-Component Entry Imports

번들러가 tree shaking을 제대로 하지 못하는 프로젝트에서는 개별 entry를 사용할 수 있습니다.
Use per-component entries when a project bundler does not tree shake the root entry well.

```tsx
import { Button } from "@workspace/ui/components/actions/button";
import { TextField } from "@workspace/ui/components/forms/text-field";
```

## 토큰과 스타일 / Tokens and Styles

빌드된 `@workspace/ui/styles.css`는 기본 `--ds-*` 토큰과 component CSS를 함께 포함합니다.
The built `@workspace/ui/styles.css` includes default `--ds-*` tokens and component CSS together.

토큰을 별도 패키지로 명시적으로 관리하거나 source workspace에서 개발할 때는 `@workspace/tokens/tokens.css`를 먼저 import할 수 있습니다.
When managing tokens explicitly as a separate package or developing inside the source workspace, import `@workspace/tokens/tokens.css` first.

```tsx
import "@workspace/tokens/tokens.css";
import "@workspace/ui/styles.css";
```

## 테마 적용 / Theme Usage

기본 theme는 `normal`이며 token CSS를 import하면 바로 사용할 수 있습니다.
The default theme is `normal` and works immediately after importing token CSS.

```tsx
export function AppShell() {
  return (
    <main data-ds-theme="normal">
      <Button>저장 / Save</Button>
    </main>
  );
}
```

제품, 브랜드, 관리자 화면처럼 범위가 다른 영역은 container 단위로 theme를 바꿉니다.
For areas such as products, brands, or admin screens, switch the theme at the container level.

```tsx
<section data-ds-theme="ocean">
  <DataGrid columns={columns} rows={rows} />
</section>
```

새 theme를 만들 때는 component CSS를 복사하지 않고 `packages/tokens/src/tokens.css`에서 semantic token만 override합니다.
When creating a new theme, do not copy component CSS; override only semantic tokens in `packages/tokens/src/tokens.css`.

## 빌드 산출물 / Build Output

외부 프로젝트가 참조하는 entry는 `packages/ui/dist`입니다.
External projects consume entries from `packages/ui/dist`.

```text
packages/ui/dist/
├── index.js
├── index.d.ts
├── styles.css
└── components/{category}/{component}/
    ├── index.js
    ├── index.d.ts
    ├── {component}.js
    └── {component}.d.ts
```

export 경로는 릴리즈 전에 `npm run test:exports`로 확인합니다.
Validate export paths before release with `npm run test:exports`.

## 소비자 fixture / Consumer Fixture

`apps/consumer-fixture`는 source alias 없이 빌드된 package entry를 가져오는 Vite 앱입니다.
`apps/consumer-fixture` is a Vite app that consumes built package entries without source aliases.

```bash
npm run test:consumer
```

- root export에서 `Button`, `Card`, `DataGrid`, `TextField`, `componentCatalog`를 가져옵니다. / Imports `Button`, `Card`, `DataGrid`, `TextField`, and `componentCatalog` from the root export.
- per-component export에서 `Button`과 `DataGrid`를 가져옵니다. / Imports `Button` and `DataGrid` from per-component exports.
- `@workspace/ui/styles.css`가 기본 토큰을 포함하고, 필요하면 `@workspace/tokens/tokens.css`를 먼저 import해도 build가 통과해야 합니다. / `@workspace/ui/styles.css` includes default tokens, and the build must also pass when `@workspace/tokens/tokens.css` is imported first when needed.

## API 상태 제어 / API State Control

상태를 외부에서 제어해야 하는 화면은 controlled prop과 `on*Change` callback을 함께 사용합니다.
Screens that need external state control use controlled props with `on*Change` callbacks.

```tsx
<DataGrid
  columns={columns}
  rows={rows}
  rowKey={(row) => String(row.id)}
  selectedRowKeys={selectedIds}
  sortState={sortState}
  onSelectedRowKeysChange={setSelectedIds}
  onSortChange={setSortState}
/>
```

uncontrolled 사용이 충분한 화면은 `defaultValue`, `defaultOpen`, `defaultSelectedRowKeys`, `defaultSortState`를 사용합니다.
Screens that only need uncontrolled behavior use `defaultValue`, `defaultOpen`, `defaultSelectedRowKeys`, and `defaultSortState`.

## 패키지 경계 / Package Boundary

- 소비자는 `src` 내부 파일을 직접 import하지 않습니다. / Consumers do not import internal `src` files directly.
- public import는 `exports`에 등록된 entry만 사용합니다. / Public imports use only entries registered in `exports`.
- React는 peer dependency입니다. / React is a peer dependency.
- 컴포넌트 구현은 각 컴포넌트 폴더의 `.tsx`에 둡니다. / Component implementations live in each component folder's `.tsx` file.

## 가져다 쓰는 방식 / How To Adopt In Another Project

1. 이 레포에서 `packages/ui`와 `packages/tokens`를 복사하거나 패키지로 배포합니다. / Copy `packages/ui` and `packages/tokens` from this repo, or publish them as packages.
2. 소비자 프로젝트에서 React peer dependency를 맞춥니다. / Match React peer dependencies in the consumer project.
3. 앱 entry에서 token CSS와 UI CSS를 import합니다. / Import token CSS and UI CSS in the app entry.
4. 루트 entry 또는 개별 component entry에서 컴포넌트를 import합니다. / Import components from the root entry or per-component entries.
5. 제품별 theme는 `data-ds-theme`와 semantic token override로 처리합니다. / Product themes are handled with `data-ds-theme` and semantic token overrides.
