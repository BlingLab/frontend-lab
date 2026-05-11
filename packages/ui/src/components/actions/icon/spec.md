# Icon 명세

## 목적

제품 UI에서 반복되는 작은 symbol을 같은 이름, 크기, 접근성 기준으로 렌더링합니다.

## API 표면

- public component: `Icon`
- folder slug: `icon`
- category: `actions`
- 우선순위/상태: `P1`, `ready`
- props: `name`, `label`, `size`

## Prop 표

| Prop | Type | Default | 설명 |
| --- | --- | --- | --- |
| `name` | `string` | `-` | form 제출 또는 group 식별에 쓰는 name입니다. |
| `label` | `ReactNode` | `-` | 사용자에게 보이는 label 또는 accessible name입니다. |
| `size` | `Size` | `"md"` | control 크기와 밀도입니다. |

## 변형

- `name`은 제공되는 `IconName` union 안에서만 선택합니다.
- `size`는 token size인 `sm`, `md`, `lg`를 사용합니다.
- 색상은 parent text color를 상속하고 component-local color를 만들지 않습니다.

## 상태 동작

- `decorative`: `label`이 없고 `aria-hidden`으로 처리합니다.
- `informative`: `label`이 있고 `role="img"`로 노출합니다.
- `inherited-color`: currentColor로 렌더링합니다.

## 접근성 계약

- interactive icon은 `IconButton` 또는 `Button`이 accessible name을 담당합니다.
- 순수 장식 icon은 screen reader에서 제외합니다.
- 정보성 icon은 visible text 없이 단독으로 의미를 전달하지 않도록 검토합니다.

## 토큰 계약

- `--ds-size-icon-sm`
- `--ds-size-icon-md`
- `--ds-size-icon-lg`

## 검증 체크리스트

- `Icon`은 루트 export와 개별 컴포넌트 export 모두에서 import됩니다.
- `label` 유무에 따라 `aria-hidden` 또는 `aria-label`이 올바르게 렌더링됩니다.
- `Button`, `IconButton`, 문서 앱 예시에서 currentColor를 상속합니다.
