# 테마 시스템 / Theme System

이 디자인 시스템은 `normal`을 기본 테마로 사용하고, `data-ds-theme` 또는 `.ds-theme-*` class로 테마 세트를 적용합니다.
This design system uses `normal` as the base theme and applies theme sets through `data-ds-theme` or `.ds-theme-*` classes.

## 핵심 원칙 / Core Principles

- 기본값은 `normal`입니다. 별도 설정이 없으면 `:root`가 `normal` semantic token을 제공합니다. / The default is `normal`. Without extra setup, `:root` provides the `normal` semantic tokens.
- 컴포넌트 CSS는 `--ds-color-action-primary-bg`, `--ds-color-bg-surface`, `--ds-state-selected-bg` 같은 semantic token만 사용합니다. / Component CSS uses semantic tokens such as `--ds-color-action-primary-bg`, `--ds-color-bg-surface`, and `--ds-state-selected-bg`.
- 테마는 primitive token보다 semantic token을 재정의합니다. 그래야 Button, DataGrid, Dialog처럼 서로 다른 컴포넌트가 같은 색상 체계를 공유합니다. / Themes redefine semantic tokens rather than primitive tokens, so different components such as Button, DataGrid, and Dialog share one color system.
- 테마는 앱 전체에도, 특정 product 영역에도 적용할 수 있습니다. / Themes can be applied to the full app or to a scoped product area.

## 제공 테마 / Provided Themes

| 테마 / Theme | 용도 / Purpose | 선택자 / Selector |
| --- | --- | --- |
| `normal` | 기본 제품 UI입니다. / Base product UI. | `[data-ds-theme="normal"]`, `.ds-theme-normal` |
| `ocean` | 청록 계열 액션 색상을 쓰는 제품 영역입니다. / Product area with teal action colors. | `[data-ds-theme="ocean"]`, `.ds-theme-ocean` |
| `forest` | 녹색 계열 업무 화면에 맞춘 제품 영역입니다. / Work surface with green action colors. | `[data-ds-theme="forest"]`, `.ds-theme-forest` |
| `dark` | 어두운 배경과 높은 대비가 필요한 영역입니다. / Area that needs dark surfaces and stronger contrast. | `[data-ds-theme="dark"]`, `.ds-theme-dark` |

## NORMAL과 DARK 비교 / NORMAL and DARK Comparison

문서 앱의 `테마 시스템 / Theme System` 섹션은 `normal`과 `dark`를 같은 컴포넌트 조합으로 나란히 렌더링합니다.
The docs app renders `normal` and `dark` side by side with the same component composition in the `Theme System` section.

- `NORMAL`은 밝은 surface, 파란 primary action, 낮은 그림자를 기준으로 합니다. / `NORMAL` is based on light surfaces, blue primary actions, and subtle shadows.
- `DARK`는 어두운 surface, 밝은 primary action, 높은 대비의 border와 focus ring을 기준으로 합니다. / `DARK` is based on dark surfaces, bright primary actions, higher-contrast borders, and focus rings.
- 두 패널은 같은 `TextField`, `Alert`, `Badge`, `Button`을 사용하므로 component CSS 변경 없이 theme token 차이만 확인할 수 있습니다. / Both panels use the same `TextField`, `Alert`, `Badge`, and `Button`, so the difference comes only from theme tokens without component CSS changes.

## 적용 방법 / Usage

앱 전체에 적용할 때는 root element에 `data-ds-theme`를 둡니다.
Place `data-ds-theme` on the root element when applying a theme to the full app.

```tsx
import "@workspace/tokens/tokens.css";
import "@workspace/ui/styles.css";

export function App() {
  return (
    <main data-ds-theme="normal">
      <Button>저장 / Save</Button>
    </main>
  );
}
```

특정 영역만 다른 테마로 바꿀 수도 있습니다.
You can also theme only a specific area.

```tsx
export function SettingsPanel() {
  return (
    <section data-ds-theme="dark">
      <Card title="관리자 설정 / Admin settings">
        <Button>적용 / Apply</Button>
      </Card>
    </section>
  );
}
```

## 새 테마 추가 / Adding a Theme

새 테마는 `packages/tokens/src/tokens.css`에 semantic token override block으로 추가합니다.
Add a new theme as a semantic token override block in `packages/tokens/src/tokens.css`.

```css
[data-ds-theme="violet"],
.ds-theme-violet {
  color-scheme: light;
  --ds-theme-id: violet;

  --ds-color-bg-canvas: #f8f5ff;
  --ds-color-bg-surface: #ffffff;
  --ds-color-bg-muted: #efe7ff;
  --ds-color-text-primary: #23133f;
  --ds-color-text-secondary: #4a3474;
  --ds-color-text-muted: #75658f;
  --ds-color-border-default: #d7c7f2;
  --ds-color-border-strong: #b99ee4;
  --ds-color-action-primary-bg: #6d3fd1;
  --ds-color-action-primary-bg-hover: #5830ad;
  --ds-color-action-primary-bg-active: #47258d;
  --ds-color-action-primary-border: #6d3fd1;
  --ds-state-selected-bg: #efe7ff;
  --ds-state-selected-border: #6d3fd1;
  --ds-color-focus-ring: rgba(109, 63, 209, 0.32);
  --ds-focus-ring: 0 0 0 0.1875rem var(--ds-color-focus-ring);
}
```

새 테마를 추가할 때는 최소한 아래 token을 확인합니다.
When adding a new theme, verify at least the tokens below.

- surface와 canvas 대비가 충분한지 확인합니다. / Confirm enough contrast between surface and canvas.
- primary action의 default, hover, active가 단계적으로 구분되는지 확인합니다. / Confirm primary action default, hover, and active states are visually distinct.
- focus ring이 밝은 배경과 어두운 배경 모두에서 보이는지 확인합니다. / Confirm the focus ring is visible on both light and dark surfaces.
- selected, hover, active state가 component별 자체 색상 없이도 읽히는지 확인합니다. / Confirm selected, hover, and active states are readable without component-specific colors.
- feedback color는 danger, warning, success의 의미가 유지되는지 확인합니다. / Confirm feedback colors preserve danger, warning, and success meanings.

## 검증 / Validation

테마를 수정한 뒤 아래 명령어를 실행합니다.
Run the commands below after changing themes.

```bash
npm run components:validate
npm run test:tokens
npm run typecheck
npm run build
npm --workspace @workspace/docs run build
```

문서 앱의 `테마 시스템 / Theme System` 섹션에서 `NORMAL`, `OCEAN`, `FOREST`, `DARK`를 전환해 컴포넌트가 같은 색상 체계로 함께 바뀌는지 확인합니다.
In the docs app, switch between `NORMAL`, `OCEAN`, `FOREST`, and `DARK` in the `Theme System` section and confirm components change together through one color system.

`npm run test:tokens`는 token contract의 필수 semantic token 목록, NORMAL/DARK resolved value 차이, UI CSS의 theme-name selector/raw value 회귀를 자동 확인합니다.
`npm run test:tokens` automatically checks the required semantic token list from the token contract, NORMAL/DARK resolved value differences, and UI CSS theme-name selector/raw value regressions.
