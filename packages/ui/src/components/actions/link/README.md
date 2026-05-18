# Link 컴포넌트

실제 위치 이동을 담당하는 native anchor 기반 컴포넌트입니다.

## 역할

페이지, 문서, 외부 주소처럼 사용자가 다른 위치로 이동해야 할 때 사용합니다.

## 사용 기준

- 우선순위는 `P1`, 상태는 `ready`입니다.
- 카테고리는 `actions`입니다.
- 기본 primitive는 `a`입니다.
- 명령 실행, 저장, 삭제, 제출은 `Button`을 사용하고 위치 이동은 `Link`를 사용합니다.

## Prop 축

`href`, `children`, `label`, `variant`, `tone`, `size`, `iconStart`, `iconEnd`, `external`, `externalLabel`, `disabled`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `href` | `string` | `-` | 이동할 주소입니다. |
| `children` | `ReactNode` | `-` | 링크 안에 표시할 내용입니다. |
| `label` | `ReactNode` | `-` | children이 없을 때 사용할 링크 내용입니다. |
| `variant` | `"inline" \| "standalone" \| "button"` | `"inline"` | 링크의 시각 표현 방식입니다. |
| `tone` | `Tone` | `"brand"` | 링크 색상 tone입니다. |
| `size` | `Size` | `"md"` | 링크 글자와 버튼형 높이입니다. |
| `iconStart` | `ReactNode` | `-` | content 앞에 표시할 icon입니다. |
| `iconEnd` | `ReactNode` | `-` | content 뒤에 표시할 icon입니다. |
| `external` | `boolean` | `false` | 외부 링크 표시와 새 창 열림 속성을 적용합니다. |
| `externalLabel` | `string` | `"새 창에서 열림"` | 외부 링크의 추가 접근성 문구입니다. |
| `disabled` | `boolean` | `false` | 링크 이동과 포커스를 비활성화합니다. |

## 상태

- `default`
- `hover`
- `focus-visible`
- `external`
- `disabled`

## 접근성

- native `a`를 사용하고 실제 이동 대상이 있을 때 `href`를 제공합니다.
- `external`은 `target="_blank"`와 안전한 `rel` 값을 적용하고, 숨김 문구로 새 창 열림을 전달합니다.
- `disabled`는 실제 링크가 아니므로 `href`, `target`, `rel`을 제거하고 `aria-disabled`와 `tabIndex=-1`을 적용합니다.

## 토큰

- `--ds-color-action-primary-bg`
- `--ds-color-text-primary`
- `--ds-focus-ring`

## 예시

```tsx
import { Link } from "@bling-lab/ui/components/actions/link";

export function Example() {
  return <Link href="/docs">문서 보기</Link>;
}
```

## 구현 메모

- 구현 파일은 `link.tsx`, public entry는 `index.ts`입니다.
- 버튼처럼 보이는 링크도 실제 이동이면 `Link variant="button"`을 사용합니다.
- 실행 결과가 현재 화면 상태를 바꾸는 동작이면 `Button`을 사용합니다.
