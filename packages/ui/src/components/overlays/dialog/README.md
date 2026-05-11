# Dialog 컴포넌트

사용자의 집중이 필요한 modal surface입니다.

## 역할

확인, 짧은 폼, 되돌리기 어려운 작업처럼 현재 흐름을 잠시 중단해야 할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `overlays` (Overlays)입니다.
- 기본 primitive는 `dialog or modal dialog pattern`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`open`, `defaultOpen`, `onOpenChange`, `modal`, `size`, `initialFocus`, `closeLabel`, `closeOnBackdropClick`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `open` | `boolean` | `-` | controlled open 상태입니다. |
| `defaultOpen` | `boolean` | `false` | uncontrolled 초기 open 상태입니다. |
| `onOpenChange` | `(open: boolean) => void` | `-` | open 상태가 바뀔 때 호출됩니다. |
| `modal` | `boolean` | `true` | modal interaction으로 열지 결정합니다. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. |
| `initialFocus` | `component-specific` | `-` | 컴포넌트별 확장 prop입니다. |
| `closeLabel` | `string` | `"닫기"` | 닫기 control의 accessible label입니다. |
| `closeOnBackdropClick` | `boolean` | `true` | backdrop click으로 닫을지 결정합니다. |

## 상태

- `closed`
- `opening`
- `open`
- `closing`

## 접근성

- 기본 기준
- accessible name이 필요한 control은 `label`, `aria-label`, visible text 중 하나로 이름을 제공합니다.
- focus-visible은 `--ds-focus-ring`을 사용하고 키보드 이동에서 사라지지 않아야 합니다.

## 토큰

- `--ds-z-dialog`
- `--ds-shadow-raised`
- `--ds-radius-8`

## 예시

```tsx
import { Dialog } from "@bling-lab/ui/components/overlays/dialog";

export function Example() {
  return <Dialog triggerLabel="열기" title="확인">내용</Dialog>;
}
```

## 구현 메모

- 구현 파일은 `dialog.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
