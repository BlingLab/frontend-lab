# 컴포넌트 작성 규약 / Component Authoring

## 폴더 구조 / Folder Structure

```text
packages/ui/src/components/{category}/{component-slug}/
├── README.md
└── spec.md
```

구현을 시작하면 같은 폴더에 아래 파일을 추가합니다.
When implementation starts, add the files below in the same folder.

```text
{component-slug}.js
{component-slug}.css
{component-slug}.test.js
examples.js
index.js
```

## 소스 구성 / Source Composition

- `index.js`: public export만 담당합니다. / Handles public exports only.
- `{component-slug}.js`: component factory 또는 framework component를 둡니다. / Contains the component factory or framework component.
- `{component-slug}.css`: component token hook과 상태 스타일을 둡니다. / Contains component token hooks and state styles.
- `{component-slug}.test.js`: keyboard, state, disabled, invalid, focus-visible 동작을 검증합니다. / Verifies keyboard, state, disabled, invalid, and focus-visible behavior.
- `examples.js`: 문서 앱과 테스트 fixture가 공유할 수 있는 예시 데이터를 둡니다. / Stores example data shared by the docs app and test fixtures.

## 컴포넌트 계약 / Component Contract

모든 컴포넌트는 구현 전에 아래 항목을 문서화합니다.
Every component documents the items below before implementation.

- Purpose: 해결하는 UI 문제 / The UI problem being solved
- Anatomy: root, trigger, content, label, message 등 구성 요소 / Structural parts such as root, trigger, content, label, and message
- Public API: props, events, defaults / Props, events, and defaults
- States: visual state와 interaction state / Visual states and interaction states
- Accessibility: semantic element, ARIA pattern, keyboard, focus / Semantic element, ARIA pattern, keyboard behavior, and focus behavior
- Tokens: 사용하는 semantic/component token / Semantic and component tokens used
- Test Plan: 최소 검증 범위 / Minimum verification scope

## 구현 규칙 / Implementation Rules

- native element로 해결 가능한 경우 custom role을 만들지 않습니다. / Do not create a custom role when a native element can solve the problem.
- controlled/uncontrolled 패턴이 필요한 컴포넌트는 `value`, `defaultValue`, `onValueChange` 이름을 사용합니다. / Components that need controlled/uncontrolled patterns use `value`, `defaultValue`, and `onValueChange`.
- open state가 필요한 컴포넌트는 `open`, `defaultOpen`, `onOpenChange` 이름을 사용합니다. / Components with open state use `open`, `defaultOpen`, and `onOpenChange`.
- 상태 스타일은 `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, `data-size`, `data-variant`를 우선합니다. / Prefer `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, `data-size`, and `data-variant` for state styling.
- JS가 없어도 의미가 유지되어야 하는 컴포넌트는 HTML 구조가 먼저 올바르게 동작해야 합니다. / Components whose meaning should survive without JS must have a correct HTML structure first.
- component 내부에서 원시 색상, 간격, z-index를 직접 쓰지 않습니다. / Do not write raw color, spacing, or z-index values inside components.
