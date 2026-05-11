# DataGrid 가상 스크롤 결정

DataGrid의 virtual scroll은 현재 `@bling-lab/ui` v0.1 범위에 포함하지 않습니다.

## 결정

- 현재 DataGrid는 500 row 이하의 조작형 table/grid를 기준으로 유지합니다.
- 501-2,000 row는 우선 pagination, server filtering, column pruning으로 해결합니다.
- 2,000 row를 넘거나 한 화면에서 지속적인 scroll 조작이 핵심 workflow가 되면 별도 virtualization proposal을 엽니다.
- v0.1에서는 `virtualized`, `rowHeight`, `overscan`, `estimatedRowHeight` prop을 추가하지 않습니다.

## 성능 목표

virtualization을 도입하려면 아래 목표를 먼저 충족해야 합니다.

- 초기 render는 1,000 row dataset 기준 200ms 이하를 목표로 합니다.
- scroll 중 main thread 긴 task는 50ms를 넘지 않도록 설계합니다.
- keyboard row navigation은 focus 이동 후 100ms 안에 시각 focus와 `aria-activedescendant` 또는 roving `tabIndex`가 동기화되어야 합니다.
- DOM에 유지되는 row 수는 viewport row + overscan으로 제한하되 selection, active row, focus return state는 rowKey로 보존해야 합니다.

## 프로토타입 검증

가상 스크롤은 아직 public API가 아니지만, ARIA 전략과 성능 smoke는 `npm run test:datagrid-virtual`로 검증합니다.

- current baseline은 500 row DataGrid가 `aria-rowcount`, selection column 포함 `aria-colcount`, row keyboard state를 유지하는지 확인합니다.
- prototype fixture는 1,000 row 중 visible window 40 row만 렌더링하고 `aria-rowcount`, absolute `aria-rowindex`, `aria-activedescendant`를 검증합니다.
- 키보드 이동은 window 밖으로 이동해도 active row를 mount 상태로 유지하고 selection은 rowKey로 보존해야 합니다.
- 성능 smoke는 120회 keyboard window update가 로컬 300ms, CI 600ms 안에 끝나는지 확인합니다. CI는 hosted runner 부하에 민감하므로 회귀 감지 기준은 유지하되 false negative를 줄입니다.

## 접근성 영향

- native table처럼 모든 row가 DOM에 있는 구조가 아니므로 `aria-rowcount`, `aria-rowindex`, `aria-colcount`를 정확히 계산해야 합니다.
- screen reader가 현재 window를 이해하도록 “현재 101-140행 / 전체 2,400행” 같은 visible text 또는 live region 전략을 검토합니다.
- focused row가 unmount될 수 있으므로 roving `tabIndex`만으로는 부족할 수 있습니다. `aria-activedescendant` 기반 focus proxy가 필요한지 검토합니다.
- column resize, sticky header, selection checkbox가 virtualized body와 분리될 때 DOM order와 visual order가 어긋나지 않아야 합니다.
- browser zoom, reduced motion, high contrast, forced colors에서도 row position과 focus ring이 유지되어야 합니다.

## Docs App 예시 결정

- 현재 문서 앱에는 가상화 예시을 추가하지 않습니다.
- 구현이 없는 prop을 문서 예시로 보여주면 consumer가 사용 가능한 API로 오해할 수 있으므로 non-goal만 명시합니다.
- 향후 제안이 열리면 문서 앱에는 1,000 row fixture, 키보드 이동, 스크린 리더 알림, 스크롤 성능 스모크를 함께 추가합니다.

## 후속 조건

다음 조건 중 하나가 실제 project 요구로 확인되면 새 issue를 엽니다.

- 한 화면에서 2,000 row 이상을 pagination 없이 탐색해야 합니다.
- server filtering으로도 첫 interaction까지의 시간이 500ms를 넘습니다.
- row height가 일정하고 custom cell editor보다 scan/selection이 핵심입니다.
- accessibility owner가 virtualized grid announcement 전략을 review할 수 있습니다.
