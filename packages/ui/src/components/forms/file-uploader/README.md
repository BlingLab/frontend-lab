# FileUploader 컴포넌트 / FileUploader Component

파일 선택 상태와 제약 조건을 함께 보여주는 업로드 입력입니다. / File selection control with dropzone-style status and metadata.

## 역할 / Role

첨부 파일을 선택하고 선택된 파일 수, 허용 형식, 오류 상태를 사용자에게 보여줄 때 사용합니다. / Use when users need to attach one or more files while seeing constraints and selected files.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `forms` (Forms)입니다. / Category is `forms` (Forms).
- 기본 primitive는 `input[type='file']`입니다. / Base primitive is `input[type='file']`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`label`, `description`, `helperText`, `accept`, `multiple`, `files`, `defaultFiles`, `maxFiles`, `disabled`, `error`, `onFilesChange`

## 상태 / States

- `default`
- `hover`
- `focus-visible`
- `drag-over`
- `disabled`
- `invalid`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file)](https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file))
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- drag/drop은 동일한 `onFilesChange` 흐름으로 selected file state를 갱신합니다. / Drag/drop updates selected file state through the same `onFilesChange` flow.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-color-bg-surface`
- `--ds-color-border-default`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { FileUploader } from "@workspace/ui/components/forms/file-uploader";

export function Example() {
  return <FileUploader label="첨부 / Attachment" multiple maxFiles={3} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `file-uploader.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `file-uploader.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
