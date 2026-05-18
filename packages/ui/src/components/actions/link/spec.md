# Link 명세

## 목적

페이지, 문서, 외부 주소처럼 사용자가 다른 위치로 이동해야 할 때 사용합니다.

## API 표면

- public component: `Link`
- folder slug: `link`
- category: `actions`
- 우선순위/상태: `P1`, `ready`
- props: `href`, `children`, `label`, `variant`, `tone`, `size`, `iconStart`, `iconEnd`, `external`, `externalLabel`, `disabled`

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

## 변형

- `inline`: 본문 안에서 쓰는 기본 링크입니다.
- `standalone`: 목록, 카드, 보조 액션처럼 독립적으로 보이는 링크입니다.
- `button`: 실제 이동을 버튼 형태로 강조해야 할 때만 사용합니다.

## 상태 동작

- `default`: native anchor로 렌더링하고 `href` 이동을 유지합니다.
- `external`: 외부 링크 아이콘, `target="_blank"`, `rel="noopener noreferrer"`, 숨김 문구를 적용합니다.
- `disabled`: `href`를 제거하고 click 이동을 막으며 포커스 순서에서 제외합니다.

## 상호작용

- Enter 키와 pointer click은 native anchor 동작을 따릅니다.
- Space 키 명령 실행이 필요한 컨트롤은 `Button`으로 구현합니다.
- `onClick`은 분석이나 부가 처리에만 사용하고 이동 의미를 대체하지 않습니다.

## 접근성 계약

- 링크 텍스트만으로 이동 목적을 알 수 있어야 합니다.
- 외부 링크는 새 창 열림을 숨김 문구로 전달합니다.
- disabled-looking anchor는 실제 링크가 아니므로 포커스 가능한 `href`를 유지하지 않습니다.

## 토큰 계약

- `--ds-color-action-primary-bg`
- `--ds-color-text-primary`
- `--ds-focus-ring`

- component CSS에서는 raw hex, raw rgba, 임의 spacing 값을 쓰지 않습니다.
- theme override는 semantic token을 통해 상속되어야 합니다.

## 검증 체크리스트

- 문서 앱에서 기본 예시가 렌더링됩니다.
- `npm run components:validate`가 통과합니다.
- 외부 링크는 안전한 `rel`과 새 창 문구를 포함합니다.
- disabled 링크는 `href`가 없고 포커스 순서에서 제외됩니다.

## 결정 기록

- 이 컴포넌트는 `a` primitive를 기준으로 구현합니다.
- public API는 catalog의 props 목록을 기준으로 유지하고 breaking change는 release note에 기록합니다.
