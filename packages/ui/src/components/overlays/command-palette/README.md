# CommandPalette 컴포넌트

키보드 친화적인 전역 명령 검색 surface입니다.

## 역할

빠른 이동, 명령 검색, shortcut 기반 작업 실행을 한 곳에서 제공할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `overlays` (Overlays)입니다.
- 기본 primitive는 `dialog with combobox-style command list`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`title`, `triggerLabel`, `commands`, `open`, `defaultOpen`, `placeholder`, `emptyMessage`, `onOpenChange`, `onCommandSelect`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `"명령 팔레트"` | dialog 제목입니다. |
| `triggerLabel` | `ReactNode` | `"명령 열기"` | palette를 여는 trigger button label입니다. |
| `commands` | `CommandPaletteCommand[]` | `[]` | 검색하고 실행할 command 목록입니다. |
| `open` | `boolean` | `-` | controlled open 상태입니다. |
| `defaultOpen` | `boolean` | `false` | uncontrolled 초기 open 상태입니다. |
| `placeholder` | `string` | `"명령 검색"` | 검색 input placeholder입니다. |
| `emptyMessage` | `ReactNode` | `"명령이 없습니다."` | 검색 결과가 없을 때 표시합니다. |
| `onOpenChange` | `(open: boolean) => void` | `-` | open 상태가 바뀔 때 호출됩니다. |
| `onCommandSelect` | `(command: CommandPaletteCommand) => void` | `-` | command가 선택될 때 호출됩니다. |

## 상태

- `closed`
- `open`
- `filtered`
- `highlighted`
- `empty`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-z-dialog`
- `--ds-shadow-raised`
- `--ds-focus-ring`

## 예시

```tsx
import { CommandPalette } from "@bling-lab/ui/components/overlays/command-palette";

export function Example() {
  return <CommandPalette commands={commands} onCommandSelect={runCommand} />;
}
```

## 구현 메모

- 구현 파일은 `command-palette.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
