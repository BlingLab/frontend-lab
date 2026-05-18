# SearchField 컴포넌트

검색 입력과 clear 동작을 표준화한 단일 행 검색 필드입니다.

## 역할

목록, 테이블, 명령 영역에서 검색어를 입력하고 결과 영역과 연결해야 할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `forms`입니다.
- 기본 primitive는 `input[type='search']`입니다.
- 일반 텍스트 입력은 `TextField`, 알려진 옵션 검색과 선택은 `Combobox`, 자유 검색어 입력은 `SearchField`를 사용합니다.

## Prop 축

`label`, `description`, `error`, `value`, `defaultValue`, `onValueChange`, `onClear`, `placeholder`, `size`, `width`, `fieldProps`, `inputClassName`, `resultsId`, `clearLabel`, `disabled`, `required`

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

## 상태

- `empty`
- `filled`
- `focus-visible`
- `disabled`
- `invalid`

## 접근성

- visible label이 필요 없으면 `fieldProps={{ hideLabel: true }}`로 숨김 label을 유지합니다.
- `resultsId`를 넘기면 input의 `aria-controls`로 결과 영역을 연결합니다.
- clear 버튼은 `clearLabel`로 접근성 이름을 제공하고, 검색어가 없을 때 비활성화합니다.

## 토큰

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시

```tsx
import { SearchField } from "@bling-lab/ui/components/forms/search-field";

export function Example() {
  return <SearchField label="컴포넌트 검색" resultsId="component-results" width="full" />;
}
```

## 구현 메모

- 구현 파일은 `search-field.tsx`, public entry는 `index.ts`입니다.
- 검색 아이콘은 장식으로 숨기고 입력 이름은 label로 제공합니다.
- clear 버튼은 값을 빈 문자열로 바꾼 뒤 `onClear`를 호출합니다.
