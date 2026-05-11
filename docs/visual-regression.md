# 시각 회귀 기준

문서 앱과 컴포넌트 패키지를 배포하기 전에 NORMAL/DARK 테마와 주요 viewport에서 시각 기준을 확인합니다.

## 기준 화면

- 문서 앱 첫 화면은 NORMAL과 DARK 테마 전환 후 header, theme controls, component examples가 겹치지 않아야 합니다.
- Forms, Overlays, Navigation, Data Display 섹션은 각 1개 이상 대표 컴포넌트를 포함해야 합니다.
- DataGrid는 row focus, selected row, resize handle, 가로 넘침 상태를 확인합니다.

## Viewport 매트릭스

| 이름| 크기| 확인 기준|
| --- | --- | --- |
| Mobile | `390 x 844` | 단일 column 흐름, button text wrap, 가로 넘침가 grid 영역에만 제한됩니다.|
| Tablet | `768 x 1024` | navigation과 content 영역이 겹치지 않고 spacing token rhythm을 유지합니다.|
| Desktop | `1440 x 960` | dense component examples가 과도하게 벌어지지 않고 scan 가능한 밀도를 유지합니다.|

## 통과 기준

- 텍스트는 control 또는 card 내부에서 잘리지 않고, 필요한 경우 줄바꿈됩니다.
- focus-visible, hover, selected, disabled, loading 상태는 token 기반으로 구분됩니다.
- raw color나 theme name 분기 없이 `--ds-*` token이 실제 색상 변화를 담당합니다.
- 스크린샷 차이가 생기면 의도한 변경인지 PR description에 적습니다.
- pixel baseline comparison은 전체 pixel의 `1%` 초과 diff를 실패로 처리합니다.
- anti-aliasing이나 font rendering 차이는 `pixelmatch` threshold `0.12` 안에서 흡수하고, 초과 diff는 `artifacts/visual-regression/diff`에 저장합니다.

## 기준선 운영

- 기준 이미지는 `tests/visual-baselines`에 저장하고 PR에서 일반 파일처럼 review합니다.
- 의도한 시각 변경은 먼저 구현한 뒤 `npm run test:visual -- --update-baselines`로 기준 이미지를 갱신합니다.
- baseline 갱신 PR에는 변경된 화면, theme, viewport와 의도한 이유를 적습니다.
- 실패가 flake로 의심되면 같은 commit에서 한 번 재실행하고, 두 번째도 실패하면 diff artifact를 기준으로 UI 또는 baseline을 수정합니다.

## 자동화

Playwright 스크린샷 검증은 `npm run test:visual`로 실행합니다.

- 첫 자동화 범위는 문서 앱 home, 테마 비교, DataGrid example 세 화면입니다.
- NORMAL/DARK theme와 mobile/tablet/desktop viewport 조합을 스크린샷으로 저장합니다.
- 산출물은 `artifacts/visual-regression`에 생성되고 CI에서는 artifact로 업로드됩니다.
- 일반 실행은 스크린샷 artifact, layout overflow, pixel baseline comparison을 함께 수행합니다.

```bash
npm run test:visual
npm run test:visual -- --update-baselines
```
