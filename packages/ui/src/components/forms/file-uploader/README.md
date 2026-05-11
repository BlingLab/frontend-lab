# FileUploader 컴포넌트

파일 선택 상태와 제약 조건을 함께 보여주는 업로드 입력입니다.

## 역할

첨부 파일을 선택하고 선택된 파일 수, 허용 형식, 오류 상태를 사용자에게 보여줄 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `forms` (Forms)입니다.
- 기본 primitive는 `input[type='file']`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`label`, `description`, `helperText`, `accept`, `multiple`, `files`, `defaultFiles`, `maxFiles`, `disabled`, `error`, `onFilesChange`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. |
| `description` | `ReactNode` | `-` | 보조 설명 text입니다. |
| `helperText` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `accept` | `string` | `-` | 허용할 파일 MIME type 또는 확장자입니다. |
| `multiple` | `boolean` | `false` | 여러 값을 선택할 수 있게 합니다. |
| `files` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `defaultFiles` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `maxFiles` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `disabled` | `boolean` | `false` | 사용자 interaction을 비활성화합니다. |
| `error` | `ReactNode` | `-` | 오류 메시지이며 invalid 상태를 만듭니다. |
| `onFilesChange` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |

## 상태

- `default`
- `hover`
- `focus-visible`
- `drag-over`
- `disabled`
- `invalid`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- drag/drop은 동일한 `onFilesChange` 흐름으로 selected file state를 갱신합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시

```tsx
import { FileUploader } from "@bling-lab/ui/components/forms/file-uploader";

export function Example() {
  return <FileUploader label="첨부" multiple maxFiles={3} />;
}
```

## 구현 메모

- 구현 파일은 `file-uploader.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
