# CommandPalette 컴포넌트 / CommandPalette Component

키보드 친화적인 전역 명령 검색 surface입니다. / Keyboard-friendly command search surface.

## 역할 / Role

빠른 이동, 명령 검색, shortcut 기반 작업 실행을 한 곳에서 제공할 때 사용합니다. / Use for global command discovery, quick navigation, and shortcut-driven actions.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 카테고리는 `overlays` (Overlays)입니다. / Category is `overlays` (Overlays).
- 기본 primitive는 `dialog with combobox-style command list`입니다. / Base primitive is `dialog with combobox-style command list`.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다. / Theme and color inherit semantic tokens instead of component-local values.

## Prop 축 / Prop Axes

`title`, `triggerLabel`, `commands`, `open`, `defaultOpen`, `placeholder`, `emptyMessage`, `onOpenChange`, `onCommandSelect`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` | `"명령 팔레트 / Command palette"` | dialog 제목입니다. / Dialog title. |
| `triggerLabel` | `ReactNode` | `"명령 열기 / Open commands"` | palette를 여는 trigger button label입니다. / Trigger button label that opens the palette. |
| `commands` | `CommandPaletteCommand[]` | `[]` | 검색하고 실행할 command 목록입니다. / Commands available for search and execution. |
| `open` | `boolean` | `-` | controlled open 상태입니다. / Controlled open state. |
| `defaultOpen` | `boolean` | `false` | uncontrolled 초기 open 상태입니다. / Initial uncontrolled open state. |
| `placeholder` | `string` | `"명령 검색 / Search commands"` | 검색 input placeholder입니다. / Search input placeholder. |
| `emptyMessage` | `ReactNode` | `"명령이 없습니다. / No commands."` | 검색 결과가 없을 때 표시합니다. / Shown when no commands match. |
| `onOpenChange` | `(open: boolean) => void` | `-` | open 상태가 바뀔 때 호출됩니다. / Called when open state changes. |
| `onCommandSelect` | `(command: CommandPaletteCommand) => void` | `-` | command가 선택될 때 호출됩니다. / Called when a command is selected. |
## 상태 / States

- `closed`
- `open`
- `filtered`
- `highlighted`
- `empty`

## 접근성 / Accessibility

- 기본 기준 / Base reference: [https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다. / Controls that need an accessible name receive it through `label`, `aria-label`, or visible text.
- focus-visible은 `--ds-focus-ring`을 사용하고 keyboard navigation에서 사라지지 않아야 합니다. / Focus-visible uses `--ds-focus-ring` and must remain visible during keyboard navigation.

## 토큰 / Tokens

- `--ds-z-dialog`
- `--ds-shadow-raised`
- `--ds-focus-ring`

## 예시 / Example

```tsx
import { CommandPalette } from "@workspace/ui/components/overlays/command-palette";

export function Example() {
  return <CommandPalette commands={commands} onCommandSelect={runCommand} />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `command-palette.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `command-palette.tsx`, and the public entry is `index.ts`.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다. / Controlled or uncontrolled values use `onPascalCase` event props such as `onValueChange`, `onOpenChange`, and `onSelectionChange`.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다. / Hover, active, selected, and disabled are represented with shared state tokens and `data-*` hooks.
