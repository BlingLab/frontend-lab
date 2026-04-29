# 시각 회귀 기준 / Visual Regression Criteria

docs app과 컴포넌트 패키지를 배포하기 전에 NORMAL/DARK 테마와 주요 viewport에서 시각 기준을 확인합니다.
Before releasing the docs app and component package, verify visual baselines across NORMAL/DARK themes and key viewports.

## 기준 화면 / Baseline Screens

- 문서 앱 / docs app 첫 화면은 NORMAL과 DARK 테마 전환 후 header, theme controls, component examples가 겹치지 않아야 합니다. / The docs app first screen must not have overlapping header, theme controls, or component examples after switching NORMAL and DARK themes.
- Forms, Overlays, Navigation, Data Display 섹션은 각 1개 이상 대표 컴포넌트를 포함해야 합니다. / Forms, Overlays, Navigation, and Data Display sections must include at least one representative component each.
- DataGrid는 row focus, selected row, resize handle, horizontal overflow 상태를 확인합니다. / DataGrid must verify row focus, selected row, resize handle, and horizontal overflow states.

## Viewport 매트릭스 / Viewport Matrix

| 이름 / Name | 크기 / Size | 확인 기준 / Check Criteria |
| --- | --- | --- |
| Mobile | `390 x 844` | 단일 column 흐름, button text wrap, horizontal overflow가 grid 영역에만 제한됩니다. / Single-column flow, button text wrapping, and horizontal overflow stay constrained to grid areas. |
| Tablet | `768 x 1024` | navigation과 content 영역이 겹치지 않고 spacing token rhythm을 유지합니다. / Navigation and content do not overlap and keep spacing token rhythm. |
| Desktop | `1440 x 960` | dense component examples가 과도하게 벌어지지 않고 scan 가능한 밀도를 유지합니다. / Dense component examples do not spread too far and remain scannable. |

## 통과 기준 / Pass Criteria

- 텍스트는 control 또는 card 내부에서 잘리지 않고, 필요한 경우 줄바꿈됩니다. / Text is not clipped inside controls or cards, and wraps when needed.
- focus-visible, hover, selected, disabled, loading 상태는 token 기반으로 구분됩니다. / Focus-visible, hover, selected, disabled, and loading states are distinguished through tokens.
- raw color나 theme name 분기 없이 `--ds-*` token이 실제 색상 변화를 담당합니다. / `--ds-*` tokens drive color changes without raw colors or theme-name branches.
- screenshot 차이가 생기면 의도한 변경인지 PR description에 적습니다. / If screenshots differ, document whether the change is intentional in the PR description.

## 자동화 / Automation

Playwright screenshot 검증은 `npm run test:visual`로 실행합니다.
Run Playwright screenshot validation with `npm run test:visual`.

- 첫 자동화 범위는 docs app home, theme compare, DataGrid example 세 화면입니다. / The first automated scope covers docs app home, theme compare, and DataGrid example screens.
- NORMAL/DARK theme와 mobile/tablet/desktop viewport 조합을 screenshot으로 저장합니다. / Stores screenshots for NORMAL/DARK themes across mobile/tablet/desktop viewports.
- 산출물은 `artifacts/visual-regression`에 생성되고 CI에서는 artifact로 업로드됩니다. / Outputs are generated in `artifacts/visual-regression` and uploaded as CI artifacts.
- 현재 단계는 screenshot artifact와 layout overflow 검증을 수행하고, pixel baseline comparison은 별도 기준이 안정화되면 추가합니다. / This stage performs screenshot artifact and layout overflow checks; pixel baseline comparison should be added after baseline criteria stabilize.

```bash
npm run test:visual
```
