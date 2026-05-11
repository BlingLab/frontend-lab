# @bling-lab/ui

제품 UI에 재사용할 컴포넌트를 배치하는 패키지입니다.

현재 패키지는 35개 제품 컴포넌트와 5개 레이아웃 primitive를 React + TypeScript 컴포넌트로 제공합니다.

이 패키지는 어떤 React 프로젝트든 베이스로 가져다 쓸 수 있게 public exports, build output, CSS token contract를 분리합니다.

## 구조

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

## 컴포넌트 문서

각 컴포넌트 폴더의 `README.md`와 `spec.md`는 실제 구현을 기준으로 유지합니다.

- `README.md`: 역할, 사용 기준, prop 축, 상태, 접근성, token, 사용 예시
- `spec.md`: API 표면, 상태 동작, 상호작용, 접근성 계약, 검증 체크리스트
- 기준 데이터: `src/components/catalog.ts`

## 원칙

- 구현 파일은 각 컴포넌트 폴더의 `{component-slug}.tsx`에 둡니다.
- `src/index.ts`는 구현을 갖지 않고 public export만 모읍니다.
- 컴포넌트 이름은 `PascalCase`, 폴더명은 `kebab-case`를 사용합니다.
- 시각 변형은 `variant`, 의미 색상은 `tone`, 밀도는 `density`, 크기는 `size`로 표현합니다.
- 상태 스타일은 임의 클래스보다 `data-state`, `data-disabled`, `data-invalid`, `data-orientation` 같은 표준화된 속성을 우선합니다.
- hover, active, focus-visible, disabled는 shared token과 같은 selector 구조를 사용합니다.
- 색상은 component별 raw value가 아니라 semantic token을 사용해서 `data-ds-theme` 전환을 그대로 상속합니다.
- 반복 아이콘은 `Icon` 컴포넌트를 통해 공유하고, 외부 icon library를 붙이더라도 `IconButton`, `Button` slot에는 ReactNode로 주입합니다.
- page layout은 `Container`, `Row`, `Col`, `Stack`, `Inline` primitive를 사용합니다.
- 접근성은 네이티브 HTML을 먼저 사용하고, 커스텀 상호작용이 필요할 때만 WAI-ARIA APG 패턴을 적용합니다.

## Prop API 전략

- 하나의 컴포넌트가 여러 화면에서 쓰일 수 있도록 style axis, state axis, slot axis, render axis를 분리합니다.
- style axis는 `variant`, `tone`, `size`, `density`, `width`를 우선 사용합니다.
- state axis는 `selected`, `disabled`, `invalid`, `loading`, `open`, `dismissible`처럼 명확한 boolean 또는 controlled value로 표현합니다.
- controlled/uncontrolled 상태는 `useControllableState` helper로 통일합니다.
- slot axis는 `iconStart`, `iconEnd`, `prefix`, `suffix`, `leading`, `trailing`, `media`, `meta`, `footer`, `actions`처럼 위치가 드러나는 이름을 사용합니다.
- collection 확장은 `renderItem`, `renderCell`, `rowActions` 같은 render prop으로 열어둡니다.
- 세부 기준은 [Prop API 설계 가이드](../../docs/prop-api-guidelines.md)를 따릅니다.

## 사용

```tsx
import { Button, Container, Dialog, Stack, TextField } from "@bling-lab/ui";
import "@bling-lab/ui/styles.css";

export function Example() {
  return (
    <Container data-ds-theme="normal">
      <Stack gap="md">
        <TextField label="이름" />
        <Button>저장</Button>
        <Dialog title="확인" triggerLabel="열기" />
      </Stack>
    </Container>
  );
}
```

개별 컴포넌트도 폴더 단위로 import할 수 있습니다.

```tsx
import { Button } from "@bling-lab/ui/components/actions/button";
```

## 외부 프로젝트에서 사용

소비자 앱 entry에서 CSS를 한 번 import합니다. 빌드된 `@bling-lab/ui/styles.css`에는 기본 token과 component CSS가 함께 들어 있습니다.

```tsx
import "@bling-lab/ui/styles.css";
```

source workspace에서 token package를 명시적으로 확인해야 할 때는 `@workspace/tokens/tokens.css`를 먼저 import할 수 있습니다.

기본 theme는 `normal`이며 root나 특정 영역에 `data-ds-theme`를 적용할 수 있습니다.

```tsx
<main data-ds-theme="normal">
  <Button>기본</Button>
</main>

<section data-ds-theme="dark">
  <Button>어두운 영역</Button>
</section>
```

컴포넌트는 루트 entry 또는 개별 컴포넌트 entry에서 가져옵니다.

```tsx
import { Button, TextField } from "@bling-lab/ui";
```

React와 React DOM은 peer dependency입니다. 소비자 프로젝트가 직접 설치해야 합니다.

## 빌드

```bash
npm --workspace @bling-lab/ui run build
```

빌드 결과는 `dist`에 생성됩니다.

```text
dist/
├── index.js
├── index.d.ts
├── styles.css
└── components/
```

## 명령어

```bash
npm --workspace @bling-lab/ui run build
npm --workspace @bling-lab/ui run typecheck
npm run components:scaffold
npm run components:validate
npm run test:a11y
npm run test:interaction
npm run test:exports
```
