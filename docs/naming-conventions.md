# 명명 규칙 / Naming Conventions

한글을 설명의 기본 언어로 두고, 코드 식별자는 일관된 영문 규칙을 사용합니다.
Korean is the primary documentation language, while code identifiers follow consistent English naming rules.

## 파일과 폴더 / Files and Folders

- package, app, component folder: `kebab-case`
- 일반 파일 / General files: `kebab-case`
- 문서 진입 파일 / Documentation entry files: `README.md`, `CHANGELOG.md`
- component folder path: `packages/ui/src/components/{category}/{component-slug}`
- component implementation file: `{component-slug}.tsx`
- component entry file: `index.ts`

예시 / Examples:

```text
actions/icon-button
forms/radio-group
data-display/empty-state
responsive-layout-system.md
```

## 컴포넌트 / Components

- export name: `PascalCase`
- props interface: `{ComponentName}Props`
- DOM class root: `.ds-PascalCase`
- DOM class element: `.ds-PascalCase-element`
- dynamic state: class modifier보다 `data-*`를 우선합니다. / Prefer `data-*` over class modifiers for dynamic state.

예시 / Examples:

```text
Button -> .ds-Button
DropdownMenu -> .ds-DropdownMenu-content
RadioGroup -> .ds-RadioGroup-list
```

구현 위치 예시 / Implementation path examples:

```text
Button -> components/actions/button/button.tsx
TextField -> components/forms/text-field/text-field.tsx
DropdownMenu -> components/overlays/dropdown-menu/dropdown-menu.tsx
```

## 변수와 함수 / Variables and Functions

- local variable: `camelCase`
- function: `camelCase`
- exported React component: `PascalCase`
- true constant: `UPPER_SNAKE_CASE`
- boolean: 긍정형 이름을 사용합니다. / Use positive boolean names.

좋은 예 / Good:

```text
disabled
required
invalid
readOnly
loading
selected
```

피할 예 / Avoid:

```text
notDisabled
noBorder
hideLabel
```

## props와 이벤트 / Props and Events

- 시각 스타일 / Visual style: `variant`
- 의미 색상 의도 / Semantic color intent: `tone`
- 크기 scale / Size scale: `size`
- 밀도 / Density: `density`
- 방향 / Orientation: `orientation`
- 위치 / Placement: `placement`
- 정렬 / Alignment: `align`
- controlled value: `value`
- uncontrolled initial value: `defaultValue`
- controlled open state: `open`
- uncontrolled initial open state: `defaultOpen`

이벤트 prop은 반드시 `onPascalCase` 형식을 사용합니다.
Event props must use the `onPascalCase` shape.

```text
onClick
onChange
onValueChange
onOpenChange
onSelect
onDismiss
onPageChange
onSelectionChange
```

상태 변경 이벤트는 값 자체를 먼저 전달합니다. 필요할 때만 원본 event를 전달합니다.
State change events should pass the value first. Pass the native event only when the consumer needs it.

## data attribute / Data Attributes

상태 styling은 아래 hook을 우선 사용합니다.
Use the following hooks for state styling.

```text
data-state="open|closed|checked|unchecked|selected|loading"
data-disabled
data-invalid
data-readonly
data-orientation="horizontal|vertical"
data-size="sm|md|lg"
data-variant="solid|outline|ghost"
data-tone="neutral|brand|success|warning|danger|info"
```

## 토큰 / Tokens

토큰은 `--ds-{category}-{role}-{scale}` 또는 `--ds-{component}-{part}-{role}` 형식을 사용합니다.
Tokens use either `--ds-{category}-{role}-{scale}` or `--ds-{component}-{part}-{role}`.

예시 / Examples:

```text
--ds-color-bg-surface
--ds-color-action-primary-bg
--ds-state-hover-bg
--ds-size-control-md
--ds-button-height-md
--ds-dialog-width-md
```

## 검증 / Validation

`npm run components:validate`는 아래 항목을 검사합니다.
`npm run components:validate` checks the following items.

- component name: `PascalCase`
- component slug: `kebab-case`
- event prop: `onPascalCase`
- public CSS class: `.ds-PascalCase` 또는 `.ds-PascalCase-element`
- UI CSS raw color 금지 / No raw colors in UI CSS
- 필수 token과 component export 존재 / Required token and component export presence
- 각 컴포넌트가 자기 폴더의 `{slug}.tsx`에서 구현되는지 확인 / Checks that each component is implemented in its own `{slug}.tsx`
