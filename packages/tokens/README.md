# @workspace/tokens

color, typography, spacing, radius, shadow, motion 같은 디자인 토큰을 관리하는 패키지입니다.
This package manages design tokens such as color, typography, spacing, radius, shadow, and motion.

초기 CSS 토큰은 `src/tokens.css`에 정의합니다. 컴포넌트는 원시 색상값을 직접 쓰지 않고 `--ds-*` 토큰을 통해 값을 참조해야 합니다.
Initial CSS tokens are defined in `src/tokens.css`. Components should reference values through `--ds-*` tokens instead of writing raw color values directly.

## 토큰 레이어 / Token Layers

- `primitive`: 원시 값입니다. 예: `--ds-color-blue-600` / Raw values, for example `--ds-color-blue-600`.
- `semantic`: 제품 의미를 가진 값입니다. 예: `--ds-color-action-primary-bg` / Product-meaning values, for example `--ds-color-action-primary-bg`.
- `component`: 특정 컴포넌트가 재정의할 수 있는 값입니다. 예: `--ds-button-bg` / Values that specific components can override, for example `--ds-button-bg`.

컴포넌트 구현은 가능한 한 `semantic` 토큰을 사용하고, 컴포넌트별 세부 조정이 필요할 때만 `component` 토큰을 추가합니다.
Component implementations should use `semantic` tokens whenever possible and add `component` tokens only when component-level customization is needed.
