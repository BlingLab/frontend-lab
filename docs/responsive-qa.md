# 반응형 검증 기준 / Responsive QA Criteria

컴포넌트 시스템은 특정 앱 화면 하나가 아니라 여러 React 프로젝트의 기본 레이아웃으로 쓰이기 때문에 viewport별 검증 기준을 고정합니다.
The component system fixes viewport QA criteria because it is meant to serve as a base layout for many React projects, not one app screen.

## 기준 viewport / Reference Viewports

- 모바일 / Mobile: `360px`부터 단일 column, full-width form control, overflow 없는 card를 확인합니다. / From `360px`, verify single-column layout, full-width form controls, and cards without overflow.
- 태블릿 / Tablet: `768px`에서 `Row`, `Col`, `Stack`, `Inline` wrapping이 자연스럽게 바뀌는지 확인합니다. / At `768px`, verify that `Row`, `Col`, `Stack`, and `Inline` wrapping adapts naturally.
- 데스크톱 / Desktop: `1280px` 이상에서 catalog와 preview가 나란히 배치되고 table/data component가 horizontal scroll을 안전하게 처리하는지 확인합니다. / At `1280px` and above, verify side-by-side catalog/preview layout and safe horizontal scrolling for table/data components.

## 구현 기준 / Implementation Rules

- page width는 `--ds-container-*`, gutter는 `--ds-page-gutter`를 사용합니다. / Page width uses `--ds-container-*`, and gutters use `--ds-page-gutter`.
- form control은 좁은 화면에서 `width="full"`을 우선 사용합니다. / Form controls prefer `width="full"` on narrow screens.
- 고정 형식 UI는 `minmax(0, 1fr)`, `overflow-x: auto`, stable min-height를 사용해 text overflow와 layout shift를 줄입니다. / Fixed-format UI uses `minmax(0, 1fr)`, `overflow-x: auto`, and stable min-height to reduce text overflow and layout shift.
- docs app의 `반응형 시스템 / Responsive System` section은 실제 primitive 조합을 렌더링하는 QA 표면입니다. / The docs app `Responsive System` section is a QA surface that renders real primitive composition.

## 검증 명령 / Verification Commands

```bash
npm run typecheck
npm --workspace @workspace/docs run build
```
