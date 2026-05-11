# 패키지 사용 가이드

이 문서는 `@bling-lab/ui`를 다른 React 프로젝트에서 가져다 쓰는 기준을 설명합니다.

## 목표

`packages/ui`는 앱 내부 전용 코드가 아니라 React 프로젝트 어디서든 가져다 쓸 수 있는 컴포넌트 패키지로 구성합니다.

## 소비자 요구 사항

- React 18 이상
- React DOM 18 이상
- CSS import를 지원하는 bundler
- ESM import를 지원하는 환경

## 기본 사용

패키지를 설치한 뒤 전역 스타일을 한 번 import합니다.

```tsx
import "@bling-lab/ui/styles.css";
```

컴포넌트는 루트 entry에서 가져옵니다.

```tsx
import { Button, Stack, TextField } from "@bling-lab/ui";

export function ProfileForm() {
  return (
    <Stack gap="md">
      <TextField label="이름" />
      <Button>저장</Button>
    </Stack>
  );
}
```

## 개별 entry import

번들러가 tree shaking을 제대로 하지 못하는 프로젝트에서는 개별 entry를 사용할 수 있습니다.

```tsx
import { Button } from "@bling-lab/ui/components/actions/button";
import { TextField } from "@bling-lab/ui/components/forms/text-field";
```

## 토큰과 스타일

빌드된 `@bling-lab/ui/styles.css`는 기본 `--ds-*` 토큰과 component CSS를 함께 포함합니다.

토큰을 별도 패키지로 명시적으로 관리하거나 source workspace에서 개발할 때는 `@workspace/tokens/tokens.css`를 먼저 import할 수 있습니다.

```tsx
import "@workspace/tokens/tokens.css";
import "@bling-lab/ui/styles.css";
```

## 테마 적용

기본 theme는 `normal`이며 token CSS를 import하면 바로 사용할 수 있습니다.

```tsx
export function AppShell() {
  return (
    <main data-ds-theme="normal">
      <Button>저장</Button>
    </main>
  );
}
```

제품, 브랜드, 관리자 화면처럼 범위가 다른 영역은 container 단위로 theme를 바꿉니다.

```tsx
<section data-ds-theme="ocean">
  <DataGrid columns={columns} rows={rows} />
</section>
```

새 theme를 만들 때는 component CSS를 복사하지 않고 `packages/tokens/src/tokens.css`에서 semantic token만 override합니다.

## 빌드 산출물

외부 프로젝트가 참조하는 entry는 `packages/ui/dist`입니다.

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

## 소비자 fixture

`apps/consumer-fixture`는 소스 alias 없이 빌드된 package entry를 가져오는 Vite 앱입니다.

```bash
npm run test:consumer
```

- 루트 export에서 `Button`, `Card`, `DataGrid`, `TextField`, `componentCatalog`를 가져옵니다.
- 개별 컴포넌트 export에서 `Button`과 `DataGrid`를 가져옵니다.
- `@bling-lab/ui/styles.css`가 기본 토큰을 포함하고, 필요하면 `@workspace/tokens/tokens.css`를 먼저 import해도 build가 통과해야 합니다.

## API 상태 제어

상태를 외부에서 제어해야 하는 화면은 controlled prop과 `on*Change` callback을 함께 사용합니다.

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

## 패키지 경계

- 소비자는 `src` 내부 파일을 직접 import하지 않습니다.
- public import는 `exports`에 등록된 entry만 사용합니다.
- React는 peer dependency입니다.
- 컴포넌트 구현은 각 컴포넌트 폴더의 `.tsx`에 둡니다.

## 가져다 쓰는 방식

1. 이 레포에서 `packages/ui`와 `packages/tokens`를 복사하거나 패키지로 배포합니다.
2. 소비자 프로젝트에서 React peer dependency를 맞춥니다.
3. 앱 entry에서 token CSS와 UI CSS를 import합니다.
4. 루트 entry 또는 개별 컴포넌트 entry에서 컴포넌트를 import합니다.
5. 제품별 theme는 `data-ds-theme`와 semantic token override로 처리합니다.
