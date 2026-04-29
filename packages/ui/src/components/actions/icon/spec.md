# Icon 명세 / Icon Spec

## 목적 / Purpose

제품 UI에서 반복되는 작은 symbol을 같은 이름, 크기, 접근성 기준으로 렌더링합니다. / Render recurring product UI symbols with shared naming, sizing, and accessibility rules.

## API 표면 / API Surface

- public component: `Icon`
- folder slug: `icon`
- category: `actions`
- priority/status: `P1` / `ready`
- props: `name`, `label`, `size`

## 변형 / Variants

- `name`은 제공되는 `IconName` union 안에서만 선택합니다. / `name` is selected only from the provided `IconName` union.
- `size`는 token size인 `sm`, `md`, `lg`를 사용합니다. / `size` uses token sizes `sm`, `md`, and `lg`.
- 색상은 parent text color를 상속하고 component-local color를 만들지 않습니다. / Color inherits parent text color and does not create component-local color.

## 상태 동작 / State Behavior

- `decorative`: `label`이 없고 `aria-hidden`으로 처리합니다. / No `label`; treated as `aria-hidden`.
- `informative`: `label`이 있고 `role="img"`로 노출합니다. / Has `label`; exposed with `role="img"`.
- `inherited-color`: currentColor로 렌더링합니다. / Renders with currentColor.

## 접근성 계약 / Accessibility Contract

- interactive icon은 `IconButton` 또는 `Button`이 accessible name을 담당합니다. / Interactive icons rely on `IconButton` or `Button` for accessible names.
- 순수 장식 icon은 screen reader에서 제외합니다. / Purely decorative icons are hidden from screen readers.
- 정보성 icon은 visible text 없이 단독으로 의미를 전달하지 않도록 검토합니다. / Informative icons are reviewed so they do not replace required visible text.

## 토큰 계약 / Token Contract

- `--ds-size-icon-sm`
- `--ds-size-icon-md`
- `--ds-size-icon-lg`

## 검증 체크리스트 / Validation Checklist

- `Icon`은 root export와 per-component export 모두에서 import됩니다. / `Icon` imports from both root and per-component entries.
- `label` 유무에 따라 `aria-hidden` 또는 `aria-label`이 올바르게 렌더링됩니다. / `aria-hidden` or `aria-label` renders correctly depending on `label`.
- `Button`, `IconButton`, docs app 예시에서 currentColor를 상속합니다. / It inherits currentColor in `Button`, `IconButton`, and docs app examples.
