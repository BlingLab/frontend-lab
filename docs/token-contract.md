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

## 필수 의미 토큰 / Required Semantic Tokens

`npm run test:tokens`는 아래 목록을 token contract 기준으로 읽어 `:root`, `normal`, `dark` theme set에 누락이 없는지 확인합니다.
`npm run test:tokens` reads the list below as the token contract and verifies that `:root`, `normal`, and `dark` theme sets do not miss required tokens.

```text
--ds-color-bg-canvas
--ds-color-bg-surface
--ds-color-bg-elevated
--ds-color-bg-muted
--ds-color-bg-inverse
--ds-color-text-primary
--ds-color-text-secondary
--ds-color-text-muted
--ds-color-text-inverse
--ds-color-border-subtle
--ds-color-border-default
--ds-color-border-strong
--ds-color-action-primary-bg
--ds-color-action-primary-bg-hover
--ds-color-action-primary-bg-active
--ds-color-action-primary-border
--ds-color-action-primary-fg
--ds-color-action-neutral-bg
--ds-color-action-neutral-bg-hover
--ds-color-action-neutral-bg-active
--ds-color-action-neutral-border
--ds-color-action-neutral-fg
--ds-color-feedback-info-bg
--ds-color-feedback-info-border
--ds-color-feedback-info-text
--ds-color-feedback-success-bg
--ds-color-feedback-success-border
--ds-color-feedback-success-text
--ds-color-feedback-success
--ds-color-feedback-warning-bg
--ds-color-feedback-warning-border
--ds-color-feedback-warning-text
--ds-color-feedback-warning
--ds-color-feedback-danger-bg
--ds-color-feedback-danger-border
--ds-color-feedback-danger-text
--ds-color-feedback-danger
--ds-state-hover-bg
--ds-state-hover-border
--ds-state-active-bg
--ds-state-selected-bg
--ds-state-selected-border
--ds-color-overlay-backdrop
--ds-color-focus-ring
--ds-focus-ring
```

### 테마 토큰 / Theme Tokens

테마는 `normal`을 기본값으로 두고 semantic token override block으로 구성합니다.
Themes use `normal` as the default and are built as semantic token override blocks.

```text
[data-ds-theme="normal"]
[data-ds-theme="ocean"]
[data-ds-theme="forest"]
[data-ds-theme="dark"]
--ds-theme-id
```

컴포넌트는 테마 이름을 직접 분기하지 않습니다. 같은 semantic token을 사용하면 theme container가 색상 체계를 일괄 적용합니다.
Components do not branch on theme names directly. When they use the same semantic tokens, the theme container applies the color system consistently.

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
--ds-field-bg
--ds-field-border
--ds-card-bg
--ds-overlay-bg
--ds-table-header-bg
--ds-dialog-width-md
--ds-card-width
```

입력, 카드, 오버레이, 리스트, 테이블처럼 화면 전반에서 반복되는 표면은 component token hook을 제공합니다.
Repeated surfaces such as fields, cards, overlays, lists, and tables expose component token hooks.

- field 계열은 `--ds-field-*`를 사용해 background, border, foreground, invalid state를 통일합니다. / Field components use `--ds-field-*` to normalize background, border, foreground, and invalid state.
- card/list/table 계열은 `--ds-card-*`, `--ds-list-*`, `--ds-table-*`로 container surface를 재정의할 수 있습니다. / Card, list, and table components can override container surfaces through `--ds-card-*`, `--ds-list-*`, and `--ds-table-*`.
- overlay 계열은 `--ds-overlay-*`를 사용해 Dialog, Popover, DropdownMenu, CommandPalette의 surface와 shadow를 맞춥니다. / Overlay components use `--ds-overlay-*` to align surfaces and shadows across Dialog, Popover, DropdownMenu, and CommandPalette.

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

## 테마 방향 / Theme Direction

테마 세트는 `packages/tokens/src/tokens.css`에서 관리합니다.
Theme sets are managed in `packages/tokens/src/tokens.css`.

- `normal`은 기본 제품 색상이며 `:root`와 `[data-ds-theme="normal"]`에 모두 선언합니다. / `normal` is the base product color system and is declared on both `:root` and `[data-ds-theme="normal"]`.
- `ocean`, `forest`, `dark`는 semantic token override 예시이자 바로 사용할 수 있는 theme set입니다. / `ocean`, `forest`, and `dark` are semantic token override examples and ready-to-use theme sets.
- 새 theme set은 component CSS를 수정하지 않고 semantic token만 override합니다. / A new theme set overrides only semantic tokens without changing component CSS.
- 같은 화면 안에서 중첩 theme를 사용할 수 있어야 하므로 `[data-ds-theme="normal"]`도 semantic token을 명시적으로 reset합니다. / Because nested themes must work in the same screen, `[data-ds-theme="normal"]` explicitly resets semantic tokens.

자세한 적용 방식은 [테마 시스템 / Theme System](./theme-system.md)을 따릅니다.
Follow [Theme System](./theme-system.md) for detailed usage.

## 규칙 / Rules

- raw hex와 `rgba()`는 `packages/tokens/src/tokens.css`에서만 허용합니다. / Raw hex and `rgba()` are allowed only in `packages/tokens/src/tokens.css`.
- UI CSS는 `--ds-*` token을 사용합니다. / UI CSS uses `--ds-*` tokens.
- hover, active, focus-visible, disabled는 shared state token으로 통일합니다. / Hover, active, focus-visible, and disabled are normalized through shared state tokens.
- theme는 semantic token override로 구성하고 component CSS에서 theme name을 직접 분기하지 않습니다. / Themes are semantic token overrides, and component CSS does not branch on theme names directly.
- spacing, radius, z-index, shadow, motion은 token scale에서만 가져옵니다. / Spacing, radius, z-index, shadow, and motion must come from token scales.
- 컴포넌트 토큰은 소비자가 안정적으로 override해야 할 때만 추가합니다. / Add component tokens only when consumers need stable override hooks.

## 검증 / Validation

`npm run components:validate`는 UI CSS의 raw color 사용, 필수 토큰 누락, public class naming, event prop naming을 검사합니다.
`npm run components:validate` checks raw color usage in UI CSS, required token presence, public class naming, and event prop naming.

`npm run test:tokens`는 이 문서의 필수 의미 토큰 목록을 기준으로 `:root`, `normal`, `dark` theme set 누락과 NORMAL/DARK resolved value 차이를 검사합니다.
`npm run test:tokens` uses this document's required semantic token list to check `:root`, `normal`, and `dark` theme set coverage and NORMAL/DARK resolved value differences.
