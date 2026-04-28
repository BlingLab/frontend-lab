# Component Authoring

## Folder Structure

```text
packages/ui/src/components/{category}/{component-slug}/
├── README.md
└── spec.md
```

구현을 시작하면 같은 폴더에 아래 파일을 추가합니다.

```text
{component-slug}.js
{component-slug}.css
{component-slug}.test.js
examples.js
index.js
```

## Source Composition

- `index.js`: public export만 담당합니다.
- `{component-slug}.js`: component factory 또는 framework component를 둡니다.
- `{component-slug}.css`: component token hook과 상태 스타일을 둡니다.
- `{component-slug}.test.js`: keyboard, state, disabled, invalid, focus-visible 동작을 검증합니다.
- `examples.js`: 문서 앱과 테스트 fixture가 공유할 수 있는 예시 데이터를 둡니다.

## Component Contract

모든 컴포넌트는 구현 전에 아래 항목을 문서화합니다.

- Purpose: 해결하는 UI 문제
- Anatomy: root, trigger, content, label, message 등 구성 요소
- Public API: props, events, defaults
- States: visual state와 interaction state
- Accessibility: semantic element, ARIA pattern, keyboard, focus
- Tokens: 사용하는 semantic/component token
- Test Plan: 최소 검증 범위

## Implementation Rules

- native element로 해결 가능한 경우 custom role을 만들지 않습니다.
- controlled/uncontrolled 패턴이 필요한 컴포넌트는 `value`, `defaultValue`, `onValueChange` 이름을 사용합니다.
- open state가 필요한 컴포넌트는 `open`, `defaultOpen`, `onOpenChange` 이름을 사용합니다.
- 상태 스타일은 `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, `data-size`, `data-variant`를 우선합니다.
- JS가 없어도 의미가 유지되어야 하는 컴포넌트는 HTML 구조가 먼저 올바르게 동작해야 합니다.
- component 내부에서 원시 색상, 간격, z-index를 직접 쓰지 않습니다.
