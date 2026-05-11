# 명명 규칙

한글을 설명의 기본 언어로 두고, 코드 식별자는 일관된 영문 규칙을 사용합니다.

## 파일과 폴더

- package, app, component folder: `kebab-case`
- 일반 파일
- 문서 진입 파일
- component folder path: `packages/ui/src/components/{category}/{component-slug}`
- component implementation file: `{component-slug}.tsx`
- 컴포넌트 entry file: `index.ts`

예시

```text
actions/icon-button
forms/radio-group
data-display/empty-state
responsive-layout-system.md
```

## 컴포넌트

- export name: `PascalCase`
- props interface: `{ComponentName}Props`
- DOM class root: `.ds-PascalCase`
- DOM class element: `.ds-PascalCase-element`
- dynamic state: class modifier보다 `data-*`를 우선합니다.

예시

```text
Button -> .ds-Button
DropdownMenu -> .ds-DropdownMenu-content
RadioGroup -> .ds-RadioGroup-list
```

구현 위치 예시

```text
Button -> components/actions/button/button.tsx
TextField -> components/forms/text-field/text-field.tsx
DropdownMenu -> components/overlays/dropdown-menu/dropdown-menu.tsx
```

## 변수와 함수

- local variable: `camelCase`
- function: `camelCase`
- exported React component: `PascalCase`
- true constant: `UPPER_SNAKE_CASE`
- boolean: 긍정형 이름을 사용합니다.

좋은 예

```text
disabled
required
invalid
readOnly
loading
selected
```

피할 예

```text
notDisabled
noBorder
hideLabel
```

## props와 이벤트

- 시각 스타일
- 의미 색상 의도
- 크기 scale
- 밀도
- 방향
- 위치
- 정렬
- controlled value: `value`
- uncontrolled initial value: `defaultValue`
- controlled open state: `open`
- uncontrolled initial open state: `defaultOpen`

이벤트 prop은 반드시 `onPascalCase` 형식을 사용합니다.

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

## data attribute

상태 styling은 아래 hook을 우선 사용합니다.

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

## 토큰

토큰은 `--ds-{category}-{role}-{scale}` 또는 `--ds-{component}-{part}-{role}` 형식을 사용합니다.

예시

```text
--ds-color-bg-surface
--ds-color-action-primary-bg
--ds-state-hover-bg
--ds-size-control-md
--ds-button-height-md
--ds-dialog-width-md
```

## 검증

`npm run components:validate`는 아래 항목을 검사합니다.

- component name: `PascalCase`
- component slug: `kebab-case`
- event prop: `onPascalCase`
- public CSS class: `.ds-PascalCase` 또는 `.ds-PascalCase-element`
- UI CSS raw color 금지
- 필수 token과 component export 존재
- 각 컴포넌트가 자기 폴더의 `{slug}.tsx`에서 구현되는지 확인
