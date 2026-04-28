# 토큰 계약 / Token Contract

이 시스템의 토큰은 단순 CSS 변수 모음이 아니라 제품의 색상, 크기, 상태, 반응형 규칙을 고정하는 계약입니다.
Tokens are not just a variable dump; they define the product contract for color, size, interaction state, and responsive behavior.

## 레이어 / Layers

### 원시 토큰 / Primitive Tokens

원시 토큰은 색상 ramp, spacing scale, radius, typography처럼 가장 낮은 레벨의 값입니다.
Primitive tokens are low-level values such as color ramps, spacing scales, radius, and typography.

```text
--ds-color-brand-600
--ds-color-gray-200
--ds-space-4
--ds-radius-8
```

### 의미 토큰 / Semantic Tokens

의미 토큰은 제품 의도를 표현합니다. 컴포넌트 CSS는 원시 토큰보다 의미 토큰을 우선 사용합니다.
Semantic tokens express product intent. Component CSS should prefer semantic tokens over primitive tokens.

```text
--ds-color-bg-surface
--ds-color-text-primary
--ds-color-border-default
--ds-color-action-primary-bg
--ds-color-feedback-danger-bg
```

### 상태 토큰 / State Tokens

hover, active, selected, disabled처럼 여러 컴포넌트가 공유하는 상호작용 상태입니다.
Shared interaction states used across components, such as hover, active, selected, and disabled.

```text
--ds-state-hover-bg
--ds-state-hover-border
--ds-state-active-bg
--ds-state-selected-border
--ds-state-disabled-opacity
```

### 컴포넌트 토큰 / Component Tokens

컴포넌트별 안정적인 override hook입니다. 기본값은 semantic token을 바라봐야 합니다.
Component-specific override hooks. Defaults should resolve to semantic tokens.

```text
--ds-button-height-md
--ds-button-padding-x-md
--ds-dialog-width-md
--ds-card-width
```

### 반응형 토큰 / Responsive Tokens

container, gutter, breakpoint는 token source에서 관리합니다.
Container, gutter, and breakpoint values live in the token source.

```text
--ds-breakpoint-sm: 40rem
--ds-breakpoint-md: 48rem
--ds-breakpoint-lg: 64rem
--ds-container-lg
--ds-page-gutter
```

## 색상 방향 / Color Direction

이 시스템은 자체 brand ramp와 feedback ramp를 갖습니다.
This system owns its brand and feedback ramps.

- brand: 주요 action, selected state, focus ring에 사용합니다. / Used for primary actions, selected state, and focus rings.
- gray: surface, border, text hierarchy에 사용합니다. / Used for surfaces, borders, and text hierarchy.
- green, amber, red: success, warning, danger feedback에 사용합니다. / Used for success, warning, and danger feedback.

컴포넌트는 `brand-600` 같은 raw ramp를 직접 쓰기보다 `--ds-color-action-primary-bg`나 `--ds-state-selected-border`를 우선 사용합니다.
Components should prefer tokens such as `--ds-color-action-primary-bg` or `--ds-state-selected-border` over direct ramp tokens like `brand-600`.

## 규칙 / Rules

- raw hex와 `rgba()`는 `packages/tokens/src/tokens.css`에서만 허용합니다. / Raw hex and `rgba()` are allowed only in `packages/tokens/src/tokens.css`.
- UI CSS는 `--ds-*` token을 사용합니다. / UI CSS uses `--ds-*` tokens.
- hover, active, focus-visible, disabled는 shared state token으로 통일합니다. / Hover, active, focus-visible, and disabled are normalized through shared state tokens.
- spacing, radius, z-index, shadow, motion은 token scale에서만 가져옵니다. / Spacing, radius, z-index, shadow, and motion must come from token scales.
- 컴포넌트 토큰은 소비자가 안정적으로 override해야 할 때만 추가합니다. / Add component tokens only when consumers need stable override hooks.

## 검증 / Validation

`npm run components:validate`는 UI CSS의 raw color 사용, 필수 토큰 누락, public class naming, event prop naming을 검사합니다.
`npm run components:validate` checks raw color usage in UI CSS, required token presence, public class naming, and event prop naming.
