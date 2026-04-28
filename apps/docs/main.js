const navItems = [
  { id: "overview", label: "구성 원칙" },
  { id: "tokens", label: "디자인 토큰" },
  { id: "rules", label: "개발 규약" },
  { id: "roadmap", label: "로드맵" },
  { id: "components", label: "컴포넌트" },
  { id: "example", label: "조합 예시" }
];

const components = [
  {
    name: "Button",
    meta: "Primary, secondary, danger 상태를 구분하는 기본 액션 컴포넌트",
    description:
      "폼 제출, 저장, 삭제처럼 사용자가 명확한 행동을 수행할 때 사용합니다.",
    preview: `
      <div class="preview-row">
        <button class="button primary" type="button">저장</button>
        <button class="button secondary" type="button">취소</button>
        <button class="button danger" type="button">삭제</button>
      </div>
    `,
    code: `<button class="button primary" type="button">저장</button>
<button class="button secondary" type="button">취소</button>`
  },
  {
    name: "Badge",
    meta: "상태, 분류, 짧은 메타 정보를 표시하는 작은 라벨",
    description:
      "목록과 카드에서 상태를 빠르게 스캔할 수 있도록 짧은 단어로 사용합니다.",
    preview: `
      <div class="preview-row">
        <span class="badge">Ready</span>
        <span class="badge success">Active</span>
        <span class="badge warning">Draft</span>
      </div>
    `,
    code: `<span class="badge">Ready</span>
<span class="badge success">Active</span>`
  },
  {
    name: "TextField",
    meta: "텍스트 입력을 위한 기본 필드",
    description:
      "라벨과 함께 사용해 사용자가 어떤 값을 입력해야 하는지 명확히 보여줍니다.",
    preview: `
      <label class="field">
        이름
        <input type="text" value="Design System">
      </label>
    `,
    code: `<label class="field">
  이름
  <input type="text" value="Design System">
</label>`
  },
  {
    name: "Card",
    meta: "관련 정보를 묶어서 보여주는 컨테이너",
    description:
      "반복되는 콘텐츠나 독립적인 정보 블록을 표현할 때 사용합니다.",
    preview: `
      <article class="mini-card">
        <span class="badge success">Published</span>
        <h3>Component guide</h3>
        <p>컴포넌트의 목적, 상태, 사용 예시를 함께 제공합니다.</p>
      </article>
    `,
    code: `<article class="mini-card">
  <span class="badge success">Published</span>
  <h3>Component guide</h3>
  <p>컴포넌트의 목적과 사용 예시를 제공합니다.</p>
</article>`
  },
  {
    name: "Alert",
    meta: "정보, 성공, 경고, 오류 메시지를 강조하는 피드백 컴포넌트",
    description:
      "사용자가 놓치면 안 되는 상태 변화나 안내 문구를 보여줄 때 사용합니다.",
    preview: `
      <div class="alert" role="status">
        <span aria-hidden="true">i</span>
        <div>
          <strong>문서가 저장되었습니다</strong>
          <span>변경 사항은 로컬 문서 사이트에 반영됩니다.</span>
        </div>
      </div>
    `,
    code: `<div class="alert" role="status">
  <strong>문서가 저장되었습니다</strong>
  <span>변경 사항은 로컬 문서 사이트에 반영됩니다.</span>
</div>`
  },
  {
    name: "Tabs",
    meta: "같은 맥락의 콘텐츠를 제한된 공간에서 전환하는 탐색 컴포넌트",
    description:
      "문서 예시, 코드, 상태별 화면처럼 관련된 뷰를 나눠 보여줄 때 사용합니다.",
    preview: `
      <div class="tabs">
        <div class="tab-list" role="tablist" aria-label="컴포넌트 예시">
          <button type="button" role="tab" aria-selected="true">Preview</button>
          <button type="button" role="tab" aria-selected="false">Code</button>
          <button type="button" role="tab" aria-selected="false">Usage</button>
        </div>
        <div class="tab-panel" role="tabpanel">선택한 탭의 콘텐츠를 표시합니다.</div>
      </div>
    `,
    code: `<div class="tab-list" role="tablist">
  <button type="button" role="tab" aria-selected="true">Preview</button>
  <button type="button" role="tab" aria-selected="false">Code</button>
</div>`
  }
];

const roadmapGroups = [
  {
    category: "Actions",
    priority: "P0",
    components: ["Button", "IconButton"],
    note: "명령 실행과 툴바 액션의 기준"
  },
  {
    category: "Forms",
    priority: "P0",
    components: ["Field", "TextField", "Select", "Checkbox", "RadioGroup", "Switch"],
    note: "라벨, 검증, 선택 입력의 공통 계약"
  },
  {
    category: "Feedback",
    priority: "P0/P1",
    components: ["Alert", "Badge", "Toast", "Progress", "Skeleton"],
    note: "상태, 결과, 로딩, 알림 표현"
  },
  {
    category: "Overlays",
    priority: "P1",
    components: ["Dialog", "Popover", "Tooltip", "DropdownMenu"],
    note: "포커스 관리와 레이어 규칙이 필요한 컴포넌트"
  },
  {
    category: "Navigation",
    priority: "P0/P1",
    components: ["Tabs", "Breadcrumb", "Pagination"],
    note: "위치 이동과 패널 전환"
  },
  {
    category: "Layout / Data",
    priority: "P0/P1",
    components: ["Card", "Divider", "Table", "EmptyState", "List"],
    note: "반복 콘텐츠, 구획, 데이터 표시"
  }
];

function renderNav() {
  const nav = document.querySelector("#nav");

  nav.innerHTML = navItems
    .map((item) => `<a href="#${item.id}" data-section="${item.id}">${item.label}</a>`)
    .join("");
}

function renderRoadmap() {
  const list = document.querySelector("#roadmap-list");

  list.innerHTML = roadmapGroups
    .map(
      (group) => `
        <article class="roadmap-card">
          <div class="roadmap-card-header">
            <h3>${group.category}</h3>
            <span class="status-pill">${group.priority}</span>
          </div>
          <p>${group.note}</p>
          <div class="roadmap-tags">
            ${group.components.map((component) => `<span>${component}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderComponents() {
  const list = document.querySelector("#component-list");

  list.innerHTML = components
    .map(
      (component) => `
        <article class="component-card">
          <div>
            <h3>${component.name}</h3>
            <p class="component-meta">${component.meta}</p>
            <p class="component-copy">${component.description}</p>
            <div class="code-block">
              <pre><code>${escapeHtml(component.code)}</code></pre>
            </div>
          </div>
          <div class="preview" aria-label="${component.name} 미리보기">
            ${component.preview}
          </div>
        </article>
      `
    )
    .join("");
}

function updateActiveNav() {
  const sections = navItems
    .map((item) => document.querySelector(`#${item.id}`))
    .filter(Boolean);
  let current = sections[0];

  for (const section of sections) {
    if (section.offsetTop - 120 <= window.scrollY) {
      current = section;
    }
  }

  document.querySelectorAll(".nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === current?.id);
  });
}

function wireTabs() {
  document.querySelectorAll(".tab-list").forEach((tabList) => {
    tabList.addEventListener("click", (event) => {
      const button = event.target.closest("button");

      if (!button) {
        return;
      }

      tabList.querySelectorAll("button").forEach((tab) => {
        tab.setAttribute("aria-selected", String(tab === button));
      });
    });
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

renderNav();
renderRoadmap();
renderComponents();
wireTabs();
updateActiveNav();

window.addEventListener("scroll", updateActiveNav, { passive: true });
