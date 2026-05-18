# SearchField 명세

## 목적

목록, 테이블, 명령 영역에서 검색어를 입력하고 결과 영역과 연결해야 할 때 사용합니다.

## API 표면

- public component: `SearchField`
- folder slug: `search-field`
- category: `forms`
- 우선순위/상태: `P1`, `ready`
- props: `label`, `description`, `error`, `value`, `defaultValue`, `onValueChange`, `onClear`, `placeholder`, `size`, `width`, `fieldProps`, `inputClassName`, `resultsId`, `clearLabel`, `disabled`, `required`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `"검색"` | 검색 필드 label입니다. |
| `description` | `ReactNode` | `-` | 보조 설명입니다. |
| `error` | `ReactNode` | `-` | 오류 메시지이며 invalid 상태를 만듭니다. |
| `value` | `string` | `-` | controlled 검색어입니다. |
| `defaultValue` | `string` | `""` | uncontrolled 초기 검색어입니다. |
| `onValueChange` | `(value: string) => void` | `-` | 검색어가 바뀔 때 호출됩니다. |
| `onClear` | `() => void` | `-` | clear 버튼으로 검색어를 지운 뒤 호출됩니다. |
| `placeholder` | `string` | `"검색어 입력"` | 입력 전 표시할 placeholder입니다. |
| `size` | `Size` | `"md"` | control 높이와 밀도입니다. |
| `width` | `FieldWidth` | `"auto"` | Field wrapper 폭입니다. |
| `fieldProps` | `Omit<FieldProps, ...>` | `-` | Field wrapper에 전달할 추가 설정입니다. |
| `inputClassName` | `string` | `-` | 실제 input에 전달할 추가 CSS class입니다. |
| `resultsId` | `string` | `-` | 검색 결과 영역과 연결할 id입니다. |
| `clearLabel` | `string` | `"검색어 지우기"` | clear 버튼의 접근성 이름입니다. |
| `disabled` | `boolean` | `false` | 입력과 clear 버튼을 비활성화합니다. |
| `required` | `boolean` | `false` | 필수 입력 상태를 표시합니다. |

## 변형

- 첫 버전은 단일 입력 필드만 지원합니다.
- 검색 결과 목록, suggestion popup, option 선택은 `Combobox` 범위입니다.
- 검색 제출 버튼은 포함하지 않고 form submit 또는 외부 action과 조합합니다.

## 상태 동작

- `empty`: clear 버튼은 비활성화되고 포커스 순서에서 제외됩니다.
- `filled`: clear 버튼을 사용할 수 있고 클릭 시 값이 빈 문자열로 바뀝니다.
- `focus-visible`: input shell 또는 clear 버튼의 focus ring이 유지됩니다.
- `disabled`: 입력과 clear 버튼을 모두 비활성화합니다.
- `invalid`: Field error와 input `aria-invalid`를 연결합니다.

## 상호작용

- input change는 `onValueChange`로 현재 검색어를 전달합니다.
- clear 버튼은 값을 비운 뒤 `onClear`를 호출합니다.
- Enter submit은 native form 동작에 맡깁니다.

## 접근성 계약

- 검색 필드는 항상 label을 가져야 합니다.
- 숨김 label이 필요한 경우에도 `Field`의 `hideLabel`을 사용해 접근성 이름을 유지합니다.
- `resultsId`가 있으면 input이 결과 영역을 `aria-controls`로 참조합니다.
- clear 버튼은 검색어가 없을 때 disabled 상태를 사용합니다.

## 토큰 계약

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다.
- theme override는 semantic token을 통해 상속되어야 합니다.

## 검증 체크리스트

- 문서 앱에서 기본 예시가 렌더링됩니다.
- `npm run components:validate`가 통과합니다.
- clear 버튼과 결과 영역 연결의 접근성 마크업을 검증합니다.
- controlled와 uncontrolled 값 변경 계약을 타입 검증에 포함합니다.

## 결정 기록

- 이 컴포넌트는 `input[type='search']` primitive를 기준으로 구현합니다.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다.
