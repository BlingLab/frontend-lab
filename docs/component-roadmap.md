# 컴포넌트 로드맵 / Component Roadmap

## 조사 기준 / Research Basis

외부 기준은 접근성 패턴과 대형 디자인 시스템의 컴포넌트 운영 방식을 기준으로 삼았습니다.
External references are based on accessibility patterns and component operating models from large design systems.

- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)는 공통 위젯 패턴, 키보드 인터랙션, role/state/property 사용 기준을 제공합니다. / WAI-ARIA APG provides shared widget patterns, keyboard interaction rules, and role/state/property guidance.
- [Carbon Design System](https://carbondesignsystem.com/components/overview/components/)은 컴포넌트를 특정 UI 문제를 해결하는 빌딩 블록으로 보고, feedback, form, navigation, data 같은 제품 문제 중심으로 분류합니다. / Carbon treats components as building blocks for specific UI problems and organizes them around product concerns such as feedback, forms, navigation, and data.
- [Material Web](https://material-web.dev/about/intro/)은 primitive, component, token으로 이어지는 계층과 adaptive/dynamic color 같은 토큰 기반 확장성을 강조합니다. / Material Web emphasizes the primitive-to-component-to-token hierarchy and token-based extensibility such as adaptive and dynamic color.
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/accessibility)와 [React Aria](https://react-aria.adobe.com/blog/introducing-react-spectrum)는 스타일과 동작을 분리하고, 접근성/키보드/focus management를 headless primitive로 다루는 방향을 보여줍니다. / Radix Primitives and React Aria separate styling from behavior and treat accessibility, keyboard handling, and focus management as headless primitives.
- [OpenUI](https://openuispec.org/spec)는 component, props, events, accessibility metadata를 구조화된 명세로 유지하는 방식을 권장합니다. / OpenUI recommends maintaining components, props, events, and accessibility metadata as structured specifications.

## 상태 모델 / Status Model

- `planned`: 폴더, README, spec이 있고 구현 범위가 등록된 상태입니다. / Folder, README, and spec exist, and the implementation scope is registered.
- `draft`: API 초안, 접근성 계약, 상태 모델이 검토된 상태입니다. / API draft, accessibility contract, and state model have been reviewed.
- `ready`: 구현, 예시, 핵심 접근성 확인이 완료된 상태입니다. / Implementation, examples, and core accessibility checks are complete.
- `stable`: 문서 앱에서 실제 사용되고 API 변경이 제한되는 상태입니다. / The component is used in the docs app and API changes are restricted.

## 우선순위 모델 / Priority Model

- `P0`: 시스템의 기반입니다. 다른 컴포넌트 구현 전에 먼저 정의합니다. / Foundation of the system; define before other components.
- `P1`: 제품 화면에서 자주 필요하지만 P0 위에 쌓아도 되는 컴포넌트입니다. / Frequently needed in product screens, but safe to build on top of P0.
- `P2`: 도메인 화면이 명확해진 뒤 추가합니다. / Add after domain screens become clear.

## P0 컴포넌트 / P0 Components

| 분류 / Category | 컴포넌트 / Component | 이유 / Why |
| --- | --- | --- |
| Actions | Button | 모든 command UI의 기준입니다. / Baseline for all command UI. |
| Actions | IconButton | 툴바, 테이블 액션, compact UI에 필요합니다. / Needed for toolbars, table actions, and compact UI. |
| Forms | Field | 라벨, 설명, 에러, required 처리의 공통 계약입니다. / Shared contract for labels, descriptions, errors, and required handling. |
| Forms | TextField | 대부분의 입력 폼이 의존하는 기본 입력입니다. / Base input used by most forms. |
| Forms | Select | 제한된 선택 입력의 기본입니다. / Base control for constrained selection. |
| Forms | DatePicker | native date 입력과 Field 합성 기준입니다. / Baseline for native date input with Field composition. |
| Forms | Combobox | 검색 가능한 단일 선택 기준입니다. / Baseline for searchable single selection. |
| Forms | Checkbox | 독립 선택과 다중 선택의 기본입니다. / Base control for independent and multi-select choices. |
| Forms | RadioGroup | 상호 배타 선택의 기본입니다. / Base control for mutually exclusive choices. |
| Forms | Switch | 즉시 반영되는 설정 UI의 기본입니다. / Base control for settings that apply immediately. |
| Feedback | Alert | inline feedback과 validation summary의 기준입니다. / Baseline for inline feedback and validation summaries. |
| Feedback | Badge | 상태/분류를 스캔하는 가장 작은 표시 단위입니다. / Smallest unit for scanning status and category. |
| Navigation | Tabs | 문서, 설정, 상세 화면에서 반복되는 panel 전환입니다. / Repeated panel switching pattern for docs, settings, and detail screens. |
| Layout | Container | page width와 gutter의 기준입니다. / Baseline for page width and gutters. |
| Layout | Row | horizontal wrapping layout의 기준입니다. / Baseline for horizontal wrapping layout. |
| Layout | Col | responsive 12-column layout의 기준입니다. / Baseline for responsive 12-column layout. |
| Layout | Stack | vertical spacing composition의 기준입니다. / Baseline for vertical spacing composition. |
| Layout | Inline | compact inline group composition의 기준입니다. / Baseline for compact inline group composition. |
| Layout | Card | 반복 레코드와 summary surface의 기준입니다. / Baseline for repeated records and summary surfaces. |

## P1 컴포넌트 / P1 Components

| 분류 / Category | 컴포넌트 / Component | 이유 / Why |
| --- | --- | --- |
| Forms | Textarea | 긴 텍스트 입력입니다. / Long-form text input. |
| Feedback | Toast | 전역 작업 결과 알림입니다. / Global notification for task outcomes. |
| Feedback | Progress | 비동기 작업 상태 표시입니다. / Status indicator for asynchronous work. |
| Feedback | Skeleton | loading layout 안정화입니다. / Stabilizes layout while content loads. |
| Overlays | Dialog | blocking task와 confirmation의 기준입니다. / Baseline for blocking tasks and confirmations. |
| Overlays | Popover | contextual surface입니다. / Contextual floating surface. |
| Overlays | Tooltip | icon-only UI 설명에 필요합니다. / Needed to explain icon-only UI. |
| Overlays | DropdownMenu | overflow action과 contextual command입니다. / Handles overflow actions and contextual commands. |
| Overlays | CommandPalette | global command discovery 기준입니다. / Baseline for global command discovery. |
| Navigation | Breadcrumb | 정보 구조가 깊어질 때 필요합니다. / Needed when information architecture becomes deep. |
| Navigation | Pagination | data list 확장에 필요합니다. / Needed as data lists scale. |
| Navigation | Stepper | multi-step workflow 진행 상태 기준입니다. / Baseline for multi-step workflow progress. |
| Navigation | NavigationRail | app shell의 compact primary navigation 기준입니다. / Baseline for compact primary navigation in app shells. |
| Navigation | SideNav | grouped workspace navigation 기준입니다. / Baseline for grouped workspace navigation. |
| Forms | FileUploader | 파일 선택과 첨부 상태 기준입니다. / Baseline for file selection and attachment state. |
| Layout | Divider | 카드 남용 없이 구획을 나누는 최소 단위입니다. / Minimal separator that avoids overusing cards. |
| Data Display | Table | 레코드 비교와 운영형 화면의 핵심입니다. / Core pattern for comparing records and building operational screens. |
| Data Display | DataGrid | sorting, selection, row action이 필요한 dense grid 기준이며 virtual scroll은 v0.1 non-goal입니다. / Baseline for dense grids that need sorting, selection, and row actions; virtual scroll is a v0.1 non-goal. |
| Data Display | EmptyState | 빈 화면의 next action을 표준화합니다. / Standardizes next actions for empty screens. |
| Data Display | List | 반복 데이터의 기본 표시 단위입니다. / Base display unit for repeated data. |

## 보류 컴포넌트 / Deferred Components

현재 보류 컴포넌트는 없습니다. / There are no deferred components at the moment.
