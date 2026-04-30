# Icon 컴포넌트 / Icon Component

제품 UI에서 반복 사용하는 기본 symbol을 token 기반 크기로 렌더링하는 SVG icon입니다. / SVG icon component for recurring product UI symbols with token-based sizing.

## 역할 / Role

외부 icon library를 연결하기 전에도 `Button`, `IconButton`, empty state, navigation에서 같은 이름과 크기 체계를 사용할 수 있게 합니다. / It keeps naming and sizing consistent across `Button`, `IconButton`, empty states, and navigation before an external icon library is connected.

## 사용 기준 / Usage Criteria

- 우선순위는 `P1`, 상태는 `ready`입니다. / Priority is `P1`, and status is `ready`.
- 아이콘만으로 의미를 전달하는 control은 `label` 또는 parent control의 accessible name을 반드시 제공합니다. / Controls that rely on an icon must provide `label` or an accessible name on the parent control.
- 장식용 icon은 `label` 없이 렌더링해 `aria-hidden` 상태로 둡니다. / Decorative icons render without `label` and remain `aria-hidden`.
- 크기는 `sm`, `md`, `lg`만 사용합니다. / Use only `sm`, `md`, and `lg` sizes.

## Prop 축 / Prop Axes

`name`, `label`, `size`

## Prop 표 / Prop Table

| Prop | Type | Default | 설명 / Description |
| --- | --- | --- | --- |
| `name` | `string` | `-` | form 제출 또는 group 식별에 쓰는 name입니다. / Name used for form submission or group identity. |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. / Visible label or accessible name. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. / Control size and density. |

## 상태 / States

- `decorative`
- `informative`
- `inherited-color`

## 접근성 / Accessibility

- `label`이 있으면 `role="img"`와 `aria-label`을 제공합니다. / When `label` exists, the icon provides `role="img"` and `aria-label`.
- `label`이 없으면 screen reader에서 제외합니다. / Without `label`, the icon is hidden from screen readers.
- 클릭 가능한 icon은 `Icon` 자체가 아니라 `IconButton` 또는 `Button` 안에 넣습니다. / Clickable icons are placed inside `IconButton` or `Button`, not made interactive by themselves.

## 토큰 / Tokens

- `--ds-size-icon-sm`
- `--ds-size-icon-md`
- `--ds-size-icon-lg`

## 예시 / Example

```tsx
import { Icon } from "@workspace/ui/components/actions/icon";

export function Example() {
  return <Icon name="search" label="검색 / Search" />;
}
```

## 구현 메모 / Implementation Notes

- 구현 파일은 `icon.tsx`, public entry는 `index.ts`입니다. / Implementation lives in `icon.tsx`, and the public entry is `index.ts`.
- stroke와 fill은 currentColor 기반입니다. / Stroke and fill are based on currentColor.
