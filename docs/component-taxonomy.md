# 컴포넌트 분류 / Component Taxonomy

컴포넌트는 역할과 변경 빈도에 따라 분류합니다. 분류가 명확해야 API, 테스트, 문서 깊이를 일관되게 정할 수 있습니다.
Components are classified by role and change frequency. Clear classification keeps API, testing, and documentation depth consistent.

## 기반 / Foundations

UI 전체의 기반입니다.
The foundation for the overall UI.

- Tokens
- Typography
- Icons
- Layout rules

## 액션 / Actions

사용자가 명시적 명령을 실행하는 컴포넌트입니다.
Components that execute explicit user commands.

- Button
- IconButton

## 폼 / Forms

사용자가 값을 입력하거나 선택하는 컴포넌트입니다.
Components where users enter or select values.

- Field
- TextField
- Textarea
- Select
- Checkbox
- RadioGroup
- Switch

## 피드백 / Feedback

상태, 결과, 경고, 진행 상황을 전달하는 컴포넌트입니다.
Components that communicate status, outcomes, warnings, and progress.

- Alert
- Toast
- Badge
- Progress
- Skeleton

## 오버레이 / Overlays

현재 화면 위에 임시 UI 계층을 만드는 컴포넌트입니다.
Components that create a temporary UI layer above the current screen.

- Dialog
- Popover
- Tooltip
- DropdownMenu

## 내비게이션 / Navigation

위치 이동이나 같은 맥락의 panel 전환을 담당합니다.
Handles movement across locations or panel switching in the same context.

- Tabs
- Breadcrumb
- Pagination

## 레이아웃 / Layout

콘텐츠 surface와 구획을 만드는 구조 컴포넌트입니다.
Structural components that create content surfaces and sections.

- Card
- Divider

## 데이터 표시 / Data Display

정보를 구조화해 보여주는 컴포넌트입니다.
Components that present information in structured form.

- Table
- EmptyState
- List

## 성숙도 / Maturity

- `planned`: 설계 예정 또는 문서 골조만 있는 상태 / Planned or documentation skeleton only.
- `draft`: API와 상태 설계가 검토된 상태 / API and state design have been reviewed.
- `ready`: 구현, 예시, 핵심 접근성 확인이 완료된 상태 / Implementation, examples, and core accessibility checks are complete.
- `stable`: 실제 화면 적용과 테스트가 충분해 변경을 제한하는 상태 / Used in real screens with enough tests to restrict changes.
