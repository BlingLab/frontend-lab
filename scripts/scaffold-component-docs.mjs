import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { componentCatalog, componentCategories } from "../packages/ui/src/components/catalog.js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const force = process.argv.includes("--force");
const categoryLabels = new Map(componentCategories.map((category) => [category.id, category.label]));
const categoryKoreanLabels = new Map([
  ["actions", "액션"],
  ["forms", "폼"],
  ["feedback", "피드백"],
  ["overlays", "오버레이"],
  ["navigation", "내비게이션"],
  ["layout", "레이아웃"],
  ["data-display", "데이터 표시"]
]);

const componentKoreanCopy = {
  button: {
    purpose: "폼 제출, 확인, 취소, 삭제처럼 사용자가 명확한 행동을 수행할 때 사용합니다.",
    summary: "명시적인 사용자 행동을 실행하는 기본 명령 컨트롤입니다."
  },
  "icon-button": {
    purpose: "공간이 좁고 익숙한 아이콘으로 행동을 표현할 수 있을 때 사용합니다.",
    summary: "accessible name이 필수인 compact icon-only action입니다."
  },
  field: {
    purpose: "폼 copy, validation feedback, accessible relationship을 표준화할 때 사용합니다.",
    summary: "form control의 label, description, error, required marker를 공유하는 wrapper입니다."
  },
  "text-field": {
    purpose: "이름, 짧은 설명, URL, email, 검색어처럼 한 줄 text value를 입력할 때 사용합니다.",
    summary: "Field composition과 함께 쓰는 single-line text input입니다."
  },
  textarea: {
    purpose: "긴 자유 입력, comment, description, note를 받을 때 사용합니다.",
    summary: "Field composition과 함께 쓰는 multi-line text entry입니다."
  },
  select: {
    purpose: "제한된 선택지를 하나 고를 때 사용합니다. 검색이나 rich option이 필요할 때만 custom listbox나 combobox로 확장합니다.",
    summary: "알려진 선택지 집합에서 하나의 option을 선택하는 control입니다."
  },
  checkbox: {
    purpose: "독립 choice, agreement, multi-select list에 사용합니다.",
    summary: "binary 또는 mixed-state option control입니다."
  },
  "radio-group": {
    purpose: "모든 선택지를 계속 보여줘야 하고 하나의 값만 선택할 수 있을 때 사용합니다.",
    summary: "visible option set에서 상호 배타적으로 하나를 선택하는 control입니다."
  },
  switch: {
    purpose: "form submission이 아니라 즉시 적용되는 설정에 사용합니다.",
    summary: "즉시 반영되는 on/off setting control입니다."
  },
  alert: {
    purpose: "흐름을 막지 않는 정보, 성공, 경고, 오류 메시지에 사용합니다.",
    summary: "중요한 contextual feedback을 보여주는 inline status message입니다."
  },
  toast: {
    purpose: "workflow를 방해하지 않아야 하는 짧은 결과 알림에 사용합니다.",
    summary: "짧게 표시되는 global notification입니다."
  },
  badge: {
    purpose: "dense interface에서 status, category, count, short metadata를 표시할 때 사용합니다.",
    summary: "작은 status 또는 metadata label입니다."
  },
  progress: {
    purpose: "사용자가 task completion이나 waiting state를 이해해야 할 때 사용합니다.",
    summary: "determinate 또는 indeterminate task progress를 표시합니다."
  },
  skeleton: {
    purpose: "비동기 content가 loading되는 동안 layout을 유지할 때 사용합니다.",
    summary: "loading content를 대신하는 placeholder surface입니다."
  },
  dialog: {
    purpose: "확인, 짧은 form, 돌아가기 전에 끝내야 하는 task에 사용합니다.",
    summary: "사용자의 집중이 필요한 modal surface입니다."
  },
  popover: {
    purpose: "trigger에 연결된 contextual detail, filter, lightweight control에 사용합니다.",
    summary: "non-modal contextual floating surface입니다."
  },
  tooltip: {
    purpose: "visible label을 대체하지 않고 icon-only 또는 compact control을 보조 설명할 때 사용합니다.",
    summary: "focus 또는 hover된 control을 위한 짧은 helper text입니다."
  },
  "dropdown-menu": {
    purpose: "contextual command, overflow action, compact action group에 사용합니다.",
    summary: "trigger에서 열리는 action menu입니다."
  },
  tabs: {
    purpose: "같은 page location을 공유하는 peer section을 full navigation 없이 전환할 때 사용합니다.",
    summary: "같은 context 안에서 관련 panel을 전환합니다."
  },
  breadcrumb: {
    purpose: "상위 location을 보여주고 빠른 상위 이동을 지원할 때 사용합니다.",
    summary: "계층형 page location trail입니다."
  },
  pagination: {
    purpose: "dataset이 page로 나뉘고 직접 또는 순차 navigation이 필요할 때 사용합니다.",
    summary: "paged collection을 이동하는 navigation control입니다."
  },
  card: {
    purpose: "반복 record, summary panel, 독립 content group에 사용합니다.",
    summary: "관련 content와 action을 묶는 surface입니다."
  },
  divider: {
    purpose: "새 container를 만들지 않고 인접 section을 구분할 때 사용합니다.",
    summary: "관련 group 사이의 visual separator입니다."
  },
  table: {
    purpose: "scanning, sorting, column alignment가 중요한 dense data에 사용합니다.",
    summary: "비교 가능한 record를 row와 column으로 구조화합니다."
  },
  "empty-state": {
    purpose: "content가 없는 이유를 설명하고 다음으로 유용한 action을 제안할 때 사용합니다.",
    summary: "view에 data가 없을 때 보여주는 guidance입니다."
  },
  list: {
    purpose: "activity, option, navigation-adjacent record, compact summary에 사용합니다.",
    summary: "동질적인 item을 세로로 보여주는 collection입니다."
  }
};

function renderList(items) {
  return items.map((item) => `- \`${item}\``).join("\n");
}

function renderReadme(component) {
  const categoryLabel = categoryLabels.get(component.category) || component.category;
  const categoryKoreanLabel = categoryKoreanLabels.get(component.category) || component.category;
  const copy = componentKoreanCopy[component.slug] || {
    purpose: "이 컴포넌트가 해결하는 UI 문제를 설명합니다.",
    summary: "컴포넌트의 역할과 사용 맥락을 요약합니다."
  };
  const apgLine = component.apg
    ? `- 참고 pattern / Reference pattern: ${component.apg}`
    : "- 참고 pattern / Reference pattern: native semantic HTML을 우선하고, behavior가 필요할 때만 ARIA를 추가합니다. / Prefer native semantic HTML and add ARIA only when behavior requires it.";

  return `# ${component.name} 컴포넌트 / ${component.name}

> 상태 / Status: \`${component.status}\` | 우선순위 / Priority: \`${component.priority}\` | 카테고리 / Category: ${categoryKoreanLabel} / ${categoryLabel}

## 목적 / Purpose

${copy.purpose}
${component.purpose}

## 요약 / Summary

${copy.summary}
${component.summary}

## 공개 API 초안 / Public API Draft

${renderList(component.props)}

## 상태 / States

${renderList(component.states)}

## 접근성 계약 / Accessibility Contract

- 기본 primitive / Base primitive: \`${component.primitive}\`
${apgLine}
- visible label이 충분하지 않으면 accessible name을 반드시 제공합니다. / Must expose an accessible name whenever the visible label is not enough.
- 컴포넌트가 \`ready\`로 이동하기 전 keyboard operation을 지원해야 합니다. / Must support keyboard operation before the component can move to \`ready\`.
- content를 open, close, select, dismiss할 때 focus movement를 문서화합니다. / Must document focus movement when the component opens, closes, selects, or dismisses content.

## 토큰 hook / Token Hooks

${renderList(component.tokens)}

## 구현 메모 / Implementation Notes

- source는 이 폴더 안에 colocate합니다. / Keep source colocated in this folder.
- custom ARIA widget보다 native element를 우선합니다. / Prefer native elements before custom ARIA widgets.
- styling state에는 \`data-state\`, \`data-disabled\`, \`data-invalid\`, \`data-orientation\`, \`data-size\`를 사용합니다. / Use \`data-state\`, \`data-disabled\`, \`data-invalid\`, \`data-orientation\`, and \`data-size\` for styling state.
- hard-coded color, spacing, radius, z-index 값은 피하고 \`--ds-*\` token을 사용합니다. / Avoid hard-coded color, spacing, radius, or z-index values; use \`--ds-*\` tokens.

## 예시 / Examples

TODO: 구현 시작 시 사용 예시를 추가합니다. / TODO: Add usage examples when implementation starts.

## 열린 질문 / Open Questions

- TODO: 제품 사용처에 필요한 variant를 확인합니다. / TODO: Confirm required variants with product usage.
- TODO: mobile density와 keyboard behavior를 확인합니다. / TODO: Confirm mobile density and keyboard behavior.
`;
}

function renderSpec(component) {
  return `# ${component.name} 스펙 / ${component.name} Spec

## 구조 / Anatomy

- 루트 / Root
- 콘텐츠 / Content
- 선택적 accessory 또는 action 영역 / Optional accessory or action region

## variant / Variants

TODO: 허용되는 variant와 각 variant가 적합한 상황을 정의합니다. / TODO: Define allowed variants and when each one is appropriate.

## 동작 / Behavior

- 기본 상태 / Default state: TODO
- 상호작용 / Interaction: TODO
- disabled/read-only 동작 / Disabled/read-only behavior: TODO
- validation 또는 error 동작 / Validation or error behavior: TODO

## 접근성 / Accessibility

- primitive / Primitive: \`${component.primitive}\`
- 참고 pattern / Pattern reference: ${component.apg || "native semantic HTML"}
- 키보드 지원 / Keyboard support: TODO
- 포커스 관리 / Focus management: TODO
- 스크린 리더 알림 / Screen reader announcement: TODO

## 토큰 / Tokens

${renderList(component.tokens)}

## 테스트 계획 / Test Plan

- 단위 동작 / Unit behavior: TODO
- 키보드 내비게이션 / Keyboard navigation: TODO
- focus-visible 상태 / Focus visible state: TODO
- 고대비와 reduced motion / High contrast and reduced motion: TODO
- 반응형 레이아웃 / Responsive layout: TODO

## 결정 기록 / Decision Log

- TODO: 구현 전에 API와 behavior 결정을 기록합니다. / TODO: Record API and behavior decisions before implementation.
`;
}

function renderEntry(component) {
  return `export { ${component.name} } from "../../../components.js";
`;
}

async function writeIfMissing(path, content) {
  await mkdir(dirname(path), { recursive: true });

  if (!force && existsSync(path)) {
    return false;
  }

  await writeFile(path, content, "utf8");
  return true;
}

let written = 0;

for (const component of componentCatalog) {
  const componentDir = join(
    rootDir,
    "packages",
    "ui",
    "src",
    "components",
    component.category,
    component.slug
  );

  if (await writeIfMissing(join(componentDir, "README.md"), renderReadme(component))) {
    written += 1;
  }

  if (await writeIfMissing(join(componentDir, "spec.md"), renderSpec(component))) {
    written += 1;
  }

  if (await writeIfMissing(join(componentDir, "index.js"), renderEntry(component))) {
    written += 1;
  }
}

console.log(`${written}개 컴포넌트 파일을 작성했습니다. / ${written} component file(s) written.`);
