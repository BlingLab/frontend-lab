# DataGrid 가상 스크롤 결정 / DataGrid Virtual Scroll Decision

DataGrid의 virtual scroll은 현재 `@workspace/ui` v0.1 범위에 포함하지 않습니다.
DataGrid virtual scroll is not included in the current `@workspace/ui` v0.1 scope.

## 결정 / Decision

- 현재 DataGrid는 500 row 이하의 조작형 table/grid를 기준으로 유지합니다. / The current DataGrid targets interactive table/grid use cases with up to 500 rows.
- 501-2,000 row는 우선 pagination, server filtering, column pruning으로 해결합니다. / For 501-2,000 rows, prefer pagination, server filtering, and column pruning first.
- 2,000 row를 넘거나 한 화면에서 지속적인 scroll 조작이 핵심 workflow가 되면 별도 virtualization proposal을 엽니다. / Open a separate virtualization proposal when row count exceeds 2,000 or continuous scrolling becomes a core workflow.
- v0.1에서는 `virtualized`, `rowHeight`, `overscan`, `estimatedRowHeight` prop을 추가하지 않습니다. / v0.1 does not add `virtualized`, `rowHeight`, `overscan`, or `estimatedRowHeight` props.

## 성능 목표 / Performance Goals

virtualization을 도입하려면 아래 목표를 먼저 충족해야 합니다.
Virtualization must meet the goals below before adoption.

- 초기 render는 1,000 row dataset 기준 200ms 이하를 목표로 합니다. / Initial render should target 200ms or less for a 1,000-row dataset.
- scroll 중 main thread 긴 task는 50ms를 넘지 않도록 설계합니다. / Long main-thread tasks during scroll should stay below 50ms.
- keyboard row navigation은 focus 이동 후 100ms 안에 시각 focus와 `aria-activedescendant` 또는 roving `tabIndex`가 동기화되어야 합니다. / Keyboard row navigation must sync visual focus and `aria-activedescendant` or roving `tabIndex` within 100ms after focus movement.
- DOM에 유지되는 row 수는 viewport row + overscan으로 제한하되 selection, active row, focus return state는 rowKey로 보존해야 합니다. / DOM rows should be limited to viewport rows plus overscan, while selection, active row, and focus return state must be preserved by rowKey.

## 접근성 영향 / Accessibility Impact

- native table처럼 모든 row가 DOM에 있는 구조가 아니므로 `aria-rowcount`, `aria-rowindex`, `aria-colcount`를 정확히 계산해야 합니다. / Because not every row stays in the DOM like a native table, `aria-rowcount`, `aria-rowindex`, and `aria-colcount` must be calculated accurately.
- screen reader가 현재 window를 이해하도록 “현재 101-140행 / 전체 2,400행” 같은 visible text 또는 live region 전략을 검토합니다. / Review visible text or live-region announcements such as “Rows 101-140 of 2,400” so screen readers understand the current window.
- focused row가 unmount될 수 있으므로 roving `tabIndex`만으로는 부족할 수 있습니다. `aria-activedescendant` 기반 focus proxy가 필요한지 검토합니다. / Because a focused row can unmount, roving `tabIndex` may not be enough. Review whether an `aria-activedescendant` focus proxy is required.
- column resize, sticky header, selection checkbox가 virtualized body와 분리될 때 DOM order와 visual order가 어긋나지 않아야 합니다. / DOM order and visual order must remain aligned when column resize, sticky header, and selection checkboxes are separated from a virtualized body.
- browser zoom, reduced motion, high contrast, forced colors에서도 row position과 focus ring이 유지되어야 합니다. / Row position and focus ring must remain stable under browser zoom, reduced motion, high contrast, and forced colors.

## Docs App 예시 결정 / Docs App Example Decision

- 현재 docs app에는 virtualized example을 추가하지 않습니다. / The current docs app does not add a virtualized example.
- 구현이 없는 prop을 문서 예시로 보여주면 consumer가 사용 가능한 API로 오해할 수 있으므로 non-goal만 명시합니다. / Showing an unimplemented prop in docs examples could make consumers believe the API is available, so the docs only state the non-goal.
- future proposal이 열리면 docs app에는 1,000 row fixture, keyboard navigation, screen reader announcement, scroll performance smoke를 함께 추가합니다. / When a future proposal opens, the docs app should add a 1,000-row fixture, keyboard navigation, screen reader announcements, and scroll performance smoke together.

## 후속 조건 / Follow-up Conditions

다음 조건 중 하나가 실제 project 요구로 확인되면 새 issue를 엽니다.
Open a new issue when one of the following conditions appears in a real project requirement.

- 한 화면에서 2,000 row 이상을 pagination 없이 탐색해야 합니다. / A screen must browse more than 2,000 rows without pagination.
- server filtering으로도 첫 interaction까지의 시간이 500ms를 넘습니다. / Time to first interaction exceeds 500ms even with server filtering.
- row height가 일정하고 custom cell editor보다 scan/selection이 핵심입니다. / Row height is stable, and scanning/selection matters more than custom cell editing.
- accessibility owner가 virtualized grid announcement 전략을 review할 수 있습니다. / An accessibility owner can review the virtualized grid announcement strategy.
