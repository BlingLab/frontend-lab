# Popover 컴포넌트

트리거에 연결되는 비모달 contextual floating surface입니다.

## 역할

필터, 보조 정보, 가벼운 설정처럼 현재 화면을 떠나지 않는 보조 조작에 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `overlays` (Overlays)입니다.
- 기본 primitive는 `button plus positioned region`입니다.
- 테마와 색상은 component-local 값이 아니라 semantic token을 상속합니다.

## Prop 축

`open`, `defaultOpen`, `onOpenChange`, `placement`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `open` | `boolean` | `-` | controlled open 상태입니다. |
| `defaultOpen` | `boolean` | `false` | uncontrolled 초기 open 상태입니다. |
| `onOpenChange` | `(open: boolean) => void` | `-` | open 상태가 바뀔 때 호출됩니다. |
| `placement` | `string` | `"bottom-start"` | floating surface 위치입니다. |

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

- `--ds-z-popover`
- `--ds-shadow-raised`
- `--ds-radius-8`

## 예시

```tsx
import { Popover } from "@bling-lab/ui/components/overlays/popover";

export function Example() {
  return <Popover triggerLabel="필터" title="필터 옵션">내용</Popover>;
}
```

## 구현 메모

- 구현 파일은 `popover.tsx`, public entry는 `index.ts`입니다.
- controlled/uncontrolled 값이 있는 경우 `onValueChange`, `onOpenChange`, `onSelectionChange`처럼 `onPascalCase` event prop을 사용합니다.
- hover, active, selected, disabled는 shared state token과 `data-*` hook으로 표현합니다.
