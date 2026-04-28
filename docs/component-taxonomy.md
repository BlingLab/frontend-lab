# Component Taxonomy

컴포넌트는 역할과 변경 빈도에 따라 분류합니다. 분류가 명확해야 API, 테스트, 문서 깊이를 일관되게 정할 수 있습니다.

## Foundations

UI 전체의 기반입니다.

- Tokens
- Typography
- Icons
- Layout rules

## Actions

사용자가 명시적 명령을 실행하는 컴포넌트입니다.

- Button
- IconButton

## Forms

사용자가 값을 입력하거나 선택하는 컴포넌트입니다.

- Field
- TextField
- Textarea
- Select
- Checkbox
- RadioGroup
- Switch

## Feedback

상태, 결과, 경고, 진행 상황을 전달하는 컴포넌트입니다.

- Alert
- Toast
- Badge
- Progress
- Skeleton

## Overlays

현재 화면 위에 임시 UI 계층을 만드는 컴포넌트입니다.

- Dialog
- Popover
- Tooltip
- DropdownMenu

## Navigation

위치 이동이나 같은 맥락의 panel 전환을 담당합니다.

- Tabs
- Breadcrumb
- Pagination

## Layout

콘텐츠 surface와 구획을 만드는 구조 컴포넌트입니다.

- Card
- Divider

## Data Display

정보를 구조화해 보여주는 컴포넌트입니다.

- Table
- EmptyState
- List

## Maturity

- `planned`: 설계 예정 또는 문서 골조만 있는 상태
- `draft`: API와 상태 설계가 검토된 상태
- `ready`: 구현, 예시, 핵심 접근성 확인이 완료된 상태
- `stable`: 실제 화면 적용과 테스트가 충분해 변경을 제한하는 상태
