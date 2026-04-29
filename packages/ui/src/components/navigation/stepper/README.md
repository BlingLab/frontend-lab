# Stepper 컴포넌트 / Stepper

> 상태 / Status: `ready` | 우선순위 / Priority: `P1` | 카테고리 / Category: 내비게이션 / Navigation

## 목적 / Purpose

이 컴포넌트가 해결하는 UI 문제를 설명합니다.
Use for multi-step flows where users need current progress and optional step switching.

## 요약 / Summary

컴포넌트의 역할과 사용 맥락을 요약합니다.
Ordered workflow progress and step navigation.

## 공개 API 초안 / Public API Draft

- `steps`
- `value`
- `defaultValue`
- `orientation`
- `variant`
- `onValueChange`

## 상태 / States

- `pending`
- `active`
- `complete`
- `disabled`
- `error`

## 접근성 계약 / Accessibility Contract

- 기본 primitive / Base primitive: `ordered list navigation`
- 참고 pattern / Reference pattern: native semantic HTML을 우선하고, behavior가 필요할 때만 ARIA를 추가합니다. / Prefer native semantic HTML and add ARIA only when behavior requires it.
- visible label이 충분하지 않으면 accessible name을 반드시 제공합니다. / Must expose an accessible name whenever the visible label is not enough.
- 컴포넌트가 `ready`로 이동하기 전 keyboard operation을 지원해야 합니다. / Must support keyboard operation before the component can move to `ready`.
- content를 open, close, select, dismiss할 때 focus movement를 문서화합니다. / Must document focus movement when the component opens, closes, selects, or dismisses content.

## 토큰 hook / Token Hooks

- `--ds-color-border-default`
- `--ds-color-action-primary-bg`
- `--ds-focus-ring`

## 구현 메모 / Implementation Notes

- source는 이 폴더 안에 colocate합니다. / Keep source colocated in this folder.
- custom ARIA widget보다 native element를 우선합니다. / Prefer native elements before custom ARIA widgets.
- styling state에는 `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, `data-size`를 사용합니다. / Use `data-state`, `data-disabled`, `data-invalid`, `data-orientation`, and `data-size` for styling state.
- hard-coded color, spacing, radius, z-index 값은 피하고 `--ds-*` token을 사용합니다. / Avoid hard-coded color, spacing, radius, or z-index values; use `--ds-*` tokens.

## 예시 / Examples

TODO: 구현 시작 시 사용 예시를 추가합니다. / TODO: Add usage examples when implementation starts.

## 열린 질문 / Open Questions

- TODO: 제품 사용처에 필요한 variant를 확인합니다. / TODO: Confirm required variants with product usage.
- TODO: mobile density와 keyboard behavior를 확인합니다. / TODO: Confirm mobile density and keyboard behavior.
