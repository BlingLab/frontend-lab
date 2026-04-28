# Prop API 설계 가이드 / Prop API Guidelines

컴포넌트는 하나의 역할 단위로 유지하되, 여러 화면에서 재사용할 수 있도록 prop 축을 명확하게 나눕니다.
Components stay focused on one role, but their prop axes are separated clearly so they can be reused across many screens.

## 기본 원칙 / Core Principles

- 시각 형태는 `variant`, 의미 색상은 `tone`, 크기는 `size`, 밀도는 `density`, 너비는 `width`로 표현합니다. / Use `variant` for visual shape, `tone` for semantic color, `size` for control size, `density` for spacing density, and `width` for field width.
- 상태는 임의 class보다 `selected`, `disabled`, `invalid`, `loading`, `open`, `dismissible` 같은 prop으로 받고, DOM에는 `data-*` 속성으로 노출합니다. / Accept state through props such as `selected`, `disabled`, `invalid`, `loading`, `open`, and `dismissible`, then expose it to the DOM with `data-*` attributes.
- 장식 또는 보조 영역은 `iconStart`, `iconEnd`, `prefix`, `suffix`, `leading`, `trailing`, `media`, `meta`, `footer`, `actions`처럼 slot prop으로 분리합니다. / Separate decorative or auxiliary regions with slot props such as `iconStart`, `iconEnd`, `prefix`, `suffix`, `leading`, `trailing`, `media`, `meta`, `footer`, and `actions`.
- 렌더링 확장이 필요한 collection 컴포넌트는 `renderItem`, `renderCell`, `rowActions`처럼 render prop을 제공합니다. / Collection components that need rendering extension expose render props such as `renderItem`, `renderCell`, and `rowActions`.
- 이벤트 이름은 결과 중심으로 `onValueChange`, `onOpenChange`, `onSelectionChange`, `onDismiss`, `onRemove`를 사용합니다. / Event names describe the result, using `onValueChange`, `onOpenChange`, `onSelectionChange`, `onDismiss`, and `onRemove`.
- 네이티브 HTML prop은 가능한 그대로 열어두고, 충돌하는 이름은 `Omit<...>`으로 제거한 뒤 시스템 prop으로 다시 정의합니다. / Keep native HTML props available when possible, and remove conflicting names with `Omit<...>` before redefining system props.
- controlled/uncontrolled를 모두 지원하는 상태는 `useControllableState`로 통일합니다. / State that supports both controlled and uncontrolled usage is standardized with `useControllableState`.

## 스타일 축 / Style Axes

- `variant`: `solid`, `outline`, `ghost`, `soft`, `surface`, `outlined`, `pills`, `underline`처럼 구조나 배경 차이를 표현합니다. / `variant` describes structural or background differences such as `solid`, `outline`, `ghost`, `soft`, `surface`, `outlined`, `pills`, and `underline`.
- `tone`: `neutral`, `brand`, `info`, `success`, `warning`, `danger`처럼 의미 기반 색상을 표현합니다. / `tone` describes semantic color such as `neutral`, `brand`, `info`, `success`, `warning`, and `danger`.
- `size`: `sm`, `md`, `lg`처럼 control의 높이와 글자 크기를 바꿉니다. / `size` changes control height and text size with values such as `sm`, `md`, and `lg`.
- `density`: `compact`, `md`, `spacious`처럼 내부 여백과 정보 밀도를 조절합니다. / `density` adjusts inner spacing and information density with values such as `compact`, `md`, and `spacious`.
- `width`: `auto`, `full`처럼 부모 layout 안에서 차지하는 폭을 제어합니다. / `width` controls occupied width in the parent layout with values such as `auto` and `full`.

## 슬롯과 합성 / Slots And Composition

- 단순 문자열만 받지 말고 `ReactNode`를 받아 badge icon, input prefix, card media, table action 같은 화면별 조합을 허용합니다. / Accept `ReactNode` instead of only strings so each screen can compose badge icons, input prefixes, card media, and table actions.
- 내부 control class가 필요한 form 컴포넌트는 wrapper의 `className`과 실제 control의 `inputClassName`, `selectClassName`, `textareaClassName`을 분리합니다. / Form components that wrap a control separate wrapper `className` from control-level `inputClassName`, `selectClassName`, and `textareaClassName`.
- 공통 label, description, error 관계는 `Field`와 `fieldProps`로 합성합니다. / Compose shared label, description, and error relationships through `Field` and `fieldProps`.

## DOM 계약 / DOM Contract

- 스타일 분기는 `data-size`, `data-variant`, `data-tone`, `data-density`, `data-selected`, `data-full-width`, `data-invalid`, `data-disabled`를 사용합니다. / Style branches use `data-size`, `data-variant`, `data-tone`, `data-density`, `data-selected`, `data-full-width`, `data-invalid`, and `data-disabled`.
- hover, active, focus-visible, disabled는 `packages/ui/src/styles.css`의 공통 selector 구조를 따릅니다. / Hover, active, focus-visible, and disabled follow the shared selector structure in `packages/ui/src/styles.css`.
- 접근성 속성은 prop과 함께 자동 연결합니다. 예를 들어 `selected`는 `aria-pressed`, `error`는 `aria-invalid`, `dismissLabel`은 dismiss control의 accessible name으로 연결합니다. / Accessibility attributes are connected from props automatically. For example, `selected` maps to `aria-pressed`, `error` maps to `aria-invalid`, and `dismissLabel` maps to the dismiss control accessible name.

## 상태 제어 / State Control

- `value`/`defaultValue`, `open`/`defaultOpen`, `checked`/`defaultChecked`, `page`/`defaultPage` 쌍을 우선 사용합니다. / Prefer pairs such as `value`/`defaultValue`, `open`/`defaultOpen`, `checked`/`defaultChecked`, and `page`/`defaultPage`.
- controlled prop이 있으면 내부 state를 바꾸지 않고 `on*Change`만 호출합니다. / When a controlled prop exists, do not mutate internal state and only call `on*Change`.
- uncontrolled mode에서는 내부 state를 갱신한 뒤 같은 `on*Change` callback을 호출합니다. / In uncontrolled mode, update internal state and then call the same `on*Change` callback.

## 새 컴포넌트 체크리스트 / New Component Checklist

- prop 이름이 기존 축(`variant`, `tone`, `size`, `density`, `width`)과 충돌하지 않는지 확인합니다. / Confirm prop names do not conflict with existing axes (`variant`, `tone`, `size`, `density`, `width`).
- 필요한 slot prop과 render prop을 먼저 정의하고, 불필요한 새 컴포넌트 분리를 피합니다. / Define required slot props and render props first, and avoid unnecessary new component splits.
- CSS는 raw color나 hard-coded spacing 대신 `--ds-*` token을 사용합니다. / CSS uses `--ds-*` tokens instead of raw color or hard-coded spacing.
- 상태 스타일은 class modifier 대신 `data-*` selector로 검증합니다. / Validate state styles with `data-*` selectors instead of class modifiers.
- 문서는 한글 우선 병기 형식으로 prop 목적과 사용 상황을 적습니다. / Documentation writes prop purpose and usage context in Korean-first bilingual format.
