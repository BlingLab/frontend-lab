# 컴포넌트 분류

컴포넌트는 역할과 변경 빈도에 따라 분류합니다. 분류가 명확해야 API, 테스트, 문서 깊이를 일관되게 정할 수 있습니다.

## 기반

UI 전체의 기반입니다.

- Tokens
- Typography
- Icons
- Layout rules

## 액션

사용자가 명시적 명령을 실행하는 컴포넌트입니다.

- Button
- IconButton
- Icon
- Link

## 폼

사용자가 값을 입력하거나 선택하는 컴포넌트입니다.

- Field
- TextField
- Textarea
- Select
- DatePicker
- Combobox
- Checkbox
- RadioGroup
- Switch
- FileUploader

## 피드백

상태, 결과, 경고, 진행 상황을 전달하는 컴포넌트입니다.

- Alert
- Toast
- Badge
- Progress
- Spinner
- InlineLoading
- Skeleton

## 오버레이

현재 화면 위에 임시 UI 계층을 만드는 컴포넌트입니다.

- Dialog
- Popover
- Tooltip
- DropdownMenu
- CommandPalette

## 내비게이션

위치 이동이나 같은 맥락의 panel 전환을 담당합니다.

- Tabs
- Breadcrumb
- Pagination
- Stepper
- NavigationRail
- SideNav

## 레이아웃

콘텐츠 surface와 구획을 만드는 구조 컴포넌트입니다.

- Container
- Row
- Col
- Stack
- Inline
- Card
- Divider

## 데이터 표시

정보를 구조화해 보여주는 컴포넌트입니다.

- Table
- DataGrid
- EmptyState
- List

## 현재 카탈로그

현재 public catalog는 43개 ready 컴포넌트로 구성됩니다.

| 분류 | 컴포넌트 | 기준 |
| --- | --- | --- |
| Actions | Button, IconButton, Icon, Link | 명령 실행, 위치 이동, 명령 UI에 필요한 시각 primitive입니다. |
| Forms | Field, TextField, Textarea, Select, DatePicker, Combobox, Checkbox, RadioGroup, Switch, FileUploader | 값 입력, 값 선택, 검증 관계를 담당합니다. |
| Feedback | Alert, Toast, Badge, Progress, Spinner, InlineLoading, Skeleton | 상태, 결과, 진행, 짧은 대기, 로딩 placeholder를 전달합니다. |
| Overlays | Dialog, Popover, Tooltip, DropdownMenu, CommandPalette | 현재 surface 위에 임시 계층을 만들고 focus/dismiss 계약을 가집니다. |
| Navigation | Tabs, Breadcrumb, Pagination, Stepper, NavigationRail, SideNav | 위치 이동, 단계 진행, 같은 맥락의 panel 전환을 담당합니다. |
| Layout | Container, Row, Col, Stack, Inline, Card, Divider | page width, grid, spacing, surface, 구획을 담당합니다. |
| Data Display | Table, DataGrid, EmptyState, List | 레코드, 컬렉션, 빈 상태, tabular data를 구조화합니다. |

## 성숙도

- `planned`: 설계 예정 또는 문서 골조만 있는 상태
- `draft`: API와 상태 설계가 검토된 상태
- `ready`: 구현, 예시, 핵심 접근성 확인이 완료된 상태
- `stable`: 실제 화면 적용과 테스트가 충분해 변경을 제한하는 상태
