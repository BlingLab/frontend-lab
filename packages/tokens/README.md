# @workspace/tokens

color, typography, spacing, radius, shadow, motion 같은 디자인 토큰을 관리하는 패키지입니다.
This package manages design tokens such as color, typography, spacing, radius, shadow, and motion.

초기 CSS 토큰은 `src/tokens.css`에 정의합니다. 컴포넌트는 원시 색상값을 직접 쓰지 않고 `--ds-*` 토큰을 통해 값을 참조해야 합니다.
Initial CSS tokens are defined in `src/tokens.css`. Components should reference values through `--ds-*` tokens instead of writing raw color values directly.

## 토큰 레이어 / Token Layers

- `primitive`: 원시 값입니다. 예: `--ds-color-blue-600` / Raw values, for example `--ds-color-blue-600`.
- `semantic`: 제품 의미를 가진 값입니다. 예: `--ds-color-action-primary-bg` / Product-meaning values, for example `--ds-color-action-primary-bg`.
- `theme`: `normal`, `ocean`, `forest`, `dark`처럼 semantic token 묶음을 전환하는 세트입니다. / Sets that switch groups of semantic tokens, such as `normal`, `ocean`, `forest`, and `dark`.
- `component`: 특정 컴포넌트가 재정의할 수 있는 값입니다. 예: `--ds-button-bg` / Values that specific components can override, for example `--ds-button-bg`.

컴포넌트 구현은 가능한 한 `semantic` 토큰을 사용하고, 컴포넌트별 세부 조정이 필요할 때만 `component` 토큰을 추가합니다.
Component implementations should use `semantic` tokens whenever possible and add `component` tokens only when component-level customization is needed.

## 외부 프로젝트 사용 / External Project Usage

소비자 프로젝트는 앱 entry에서 token CSS를 먼저 import합니다.
Consumer projects import token CSS first in the app entry.

```tsx
import "@workspace/tokens/tokens.css";
import "@workspace/ui/styles.css";
```

제품별 theme은 `data-ds-theme` 또는 `.ds-theme-*` class로 적용합니다. 기본 theme는 `normal`입니다.
Product themes are applied with `data-ds-theme` or `.ds-theme-*` classes. The default theme is `normal`.

```tsx
export function App() {
  return (
    <main data-ds-theme="normal">
      <Button>저장 / Save</Button>
    </main>
  );
}
```

특정 영역만 다른 theme로 바꿀 수도 있습니다.
You can also switch only a scoped area to another theme.

```tsx
<section data-ds-theme="dark">
  <Card title="관리자 설정 / Admin settings" />
</section>
```

새 theme는 component CSS를 수정하지 않고 semantic token만 override합니다.
New themes override semantic tokens without changing component CSS.

```css
[data-ds-theme="product"],
.ds-theme-product {
  color-scheme: light;
  --ds-theme-id: product;
  --ds-color-bg-canvas: #f8fafc;
  --ds-color-bg-surface: #ffffff;
  --ds-color-text-primary: #101827;
  --ds-color-action-primary-bg: #1f6feb;
  --ds-color-action-primary-bg-hover: #174ea6;
  --ds-state-selected-bg: #eaf2ff;
  --ds-state-selected-border: #1f6feb;
}
```

raw color 값은 token source에서만 관리하고, UI component CSS에는 직접 쓰지 않습니다.
Raw color values are managed only in token sources and are not written directly in UI component CSS.

상세 기준은 [테마 시스템 / Theme System](../../docs/theme-system.md)과 [토큰 계약 / Token Contract](../../docs/token-contract.md)을 확인합니다.
See [Theme System](../../docs/theme-system.md) and [Token Contract](../../docs/token-contract.md) for the full rules.
