import "@workspace/tokens/tokens.css";
import "@workspace/ui/styles.css";
import "../styles.css";

import { StrictMode, type CSSProperties, type ReactNode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Combobox,
  CommandPalette,
  Container,
  DataGrid,
  DatePicker,
  Dialog,
  Divider,
  DropdownMenu,
  EmptyState,
  FileUploader,
  IconButton,
  Inline,
  List,
  NavigationRail,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Row,
  Select,
  SideNav,
  Skeleton,
  Stack,
  Stepper,
  Switch,
  Table,
  Tabs,
  Textarea,
  TextField,
  Toast,
  Tooltip,
  componentCatalog
} from "@workspace/ui";

const navItems = [
  { id: "overview", label: "구성 원칙 / Principles" },
  { id: "tokens", label: "디자인 토큰 / Tokens" },
  { id: "themes", label: "테마 시스템 / Themes" },
  { id: "rules", label: "개발 규약 / Rules" },
  { id: "components", label: "컴포넌트 / Components" },
  { id: "example", label: "조합 예시 / Example" }
];

const themeOptions = [
  { id: "normal", label: "NORMAL", description: "기본 제품 톤 / Base product tone" },
  { id: "ocean", label: "OCEAN", description: "청록 액션 톤 / Teal action tone" },
  { id: "forest", label: "FOREST", description: "녹색 업무 톤 / Green work tone" },
  { id: "dark", label: "DARK", description: "어두운 표면 톤 / Dark surface tone" }
];

const roadmapGroups = [
  { category: "액션 / Actions", priority: "P0", components: ["Button", "IconButton"] },
  { category: "폼 / Forms", priority: "P0/P1", components: ["Field", "TextField", "DatePicker", "Combobox", "Select", "Checkbox", "RadioGroup", "Switch", "FileUploader"] },
  { category: "피드백 / Feedback", priority: "P0/P1", components: ["Alert", "Badge", "Toast", "Progress", "Skeleton"] },
  { category: "오버레이 / Overlays", priority: "P1", components: ["Dialog", "Popover", "Tooltip", "DropdownMenu", "CommandPalette"] },
  { category: "내비게이션 / Navigation", priority: "P0/P1", components: ["Tabs", "Breadcrumb", "Pagination", "Stepper", "NavigationRail", "SideNav"] },
  { category: "레이아웃 / 데이터 / Layout / Data", priority: "P0/P1", components: ["Card", "Divider", "Table", "DataGrid", "EmptyState", "List"] }
];

const showcase: Record<string, { preview: ReactNode; code: string }> = {
  Button: {
    preview: (
      <Inline gap="sm" justify="center">
        <Button iconStart="+" selected>저장 / Save</Button>
        <Button variant="outline" tone="neutral">취소 / Cancel</Button>
        <Button tone="danger">삭제 / Delete</Button>
      </Inline>
    ),
    code: `import { Button } from "@workspace/ui";\n\n<Button iconStart="+" selected>저장 / Save</Button>`
  },
  IconButton: {
    preview: (
      <Inline gap="sm" justify="center">
        <IconButton label="추가 / Add" icon="+" shape="circle" />
        <IconButton label="검색 / Search" icon="⌕" variant="outline" />
        <IconButton label="삭제 / Delete" icon="×" tone="danger" variant="outline" />
      </Inline>
    ),
    code: `import { IconButton } from "@workspace/ui";\n\n<IconButton label="검색 / Search" icon="⌕" />`
  },
  Field: {
    preview: <TextField label="프로젝트 / Project" description="Field composition으로 label 관계를 고정합니다. / Field composition keeps label relationships." defaultValue="frontend-lab" />,
    code: `import { Field, TextField } from "@workspace/ui";`
  },
  TextField: {
    preview: <TextField label="이름 / Name" description="한 줄 입력입니다. / Single-line input." defaultValue="Design System" prefix="Aa" suffix="필수 / Required" width="full" />,
    code: `import { TextField } from "@workspace/ui";\n\n<TextField label="이름 / Name" prefix="Aa" suffix="필수 / Required" width="full" />`
  },
  Textarea: {
    preview: <Textarea label="메모 / Note" defaultValue="긴 설명을 입력합니다. / Write a longer description." rows={4} />,
    code: `import { Textarea } from "@workspace/ui";\n\n<Textarea label="메모 / Note" rows={4} />`
  },
  Select: {
    preview: <Select label="상태 / Status" defaultValue="ready" prefix="상태 / Status" width="full" options={[{ label: "준비 / Ready", value: "ready" }, { label: "초안 / Draft", value: "draft" }]} />,
    code: `import { Select } from "@workspace/ui";\n\n<Select options={[{ label: "준비 / Ready", value: "ready" }]} />`
  },
  DatePicker: {
    preview: <DatePicker label="시작일 / Start date" defaultValue="2026-04-29" width="full" />,
    code: `import { DatePicker } from "@workspace/ui";\n\n<DatePicker label="시작일 / Start date" />`
  },
  Combobox: {
    preview: <Combobox label="담당자 / Owner" defaultValue="design" options={[{ label: "디자인 / Design", value: "design" }, { label: "프론트엔드 / Frontend", value: "frontend" }, { label: "제품 / Product", value: "product" }]} />,
    code: `import { Combobox } from "@workspace/ui";`
  },
  Checkbox: {
    preview: <Checkbox label="알림 받기 / Receive notifications" description="중요 변경 사항을 알려줍니다. / Sends important updates." defaultChecked />,
    code: `import { Checkbox } from "@workspace/ui";\n\n<Checkbox label="알림 받기 / Receive notifications" />`
  },
  RadioGroup: {
    preview: <RadioGroup label="밀도 / Density" defaultValue="comfortable" orientation="horizontal" options={[{ label: "촘촘함 / Compact", value: "compact" }, { label: "기본 / Comfortable", value: "comfortable" }]} />,
    code: `import { RadioGroup } from "@workspace/ui";`
  },
  Switch: {
    preview: <Switch label="자동 저장 / Autosave" defaultChecked />,
    code: `import { Switch } from "@workspace/ui";\n\n<Switch label="자동 저장 / Autosave" defaultChecked />`
  },
  FileUploader: {
    preview: <FileUploader label="첨부 / Attachment" description="여러 파일을 선택할 수 있습니다. / Multiple files are allowed." />,
    code: `import { FileUploader } from "@workspace/ui";`
  },
  Alert: {
    preview: <Alert tone="success" title="저장 완료 / Saved" description="변경 사항이 반영되었습니다. / Your changes have been applied." dismissible actionsPlacement="bottom" />,
    code: `import { Alert } from "@workspace/ui";\n\n<Alert tone="success" title="저장 완료 / Saved" dismissible />`
  },
  Toast: {
    preview: <Toast tone="info" title="동기화됨 / Synced" description="컴포넌트 카탈로그가 최신 상태입니다. / Component catalog is up to date." />,
    code: `import { Toast } from "@workspace/ui";`
  },
  Badge: {
    preview: (
      <Inline gap="sm" justify="center">
        <Badge label="준비 / Ready" tone="brand" iconStart="*" />
        <Badge label="활성 / Active" tone="success" />
        <Badge label="경고 / Warning" tone="warning" />
        <Badge label="오류 / Error" tone="danger" removable />
      </Inline>
    ),
    code: `import { Badge } from "@workspace/ui";`
  },
  Progress: {
    preview: <Progress label="완료율 / Completion" value={64} />,
    code: `import { Progress } from "@workspace/ui";`
  },
  Skeleton: {
    preview: (
      <Stack gap="sm">
        <Skeleton width="14rem" height="1.25rem" />
        <Skeleton width="20rem" height="0.85rem" />
        <Skeleton width="16rem" height="0.85rem" />
      </Stack>
    ),
    code: `import { Skeleton } from "@workspace/ui";`
  },
  Dialog: {
    preview: <Dialog triggerLabel="다이얼로그 열기 / Open dialog" title="변경 확인 / Confirm changes" description="이 작업은 현재 설정에 반영됩니다. / This action applies to current settings.">계속 진행할까요? / Do you want to continue?</Dialog>,
    code: `import { Dialog } from "@workspace/ui";`
  },
  Popover: {
    preview: <Popover triggerLabel="필터 / Filter" title="필터 옵션 / Filter options"><Checkbox label="초안 포함 / Include drafts" defaultChecked /></Popover>,
    code: `import { Popover } from "@workspace/ui";`
  },
  Tooltip: {
    preview: <Tooltip label="도움말 / Help" content="아이콘 버튼에는 accessible label이 필요합니다. / Icon buttons need accessible labels." />,
    code: `import { Tooltip } from "@workspace/ui";`
  },
  DropdownMenu: {
    preview: <DropdownMenu triggerLabel="작업 / Actions" items={[{ label: "편집 / Edit" }, { label: "복제 / Duplicate" }, { label: "삭제 / Delete" }]} />,
    code: `import { DropdownMenu } from "@workspace/ui";`
  },
  CommandPalette: {
    preview: <CommandPalette commands={[{ label: "프로젝트 열기 / Open project", value: "open", shortcut: "O" }, { label: "새 컴포넌트 / New component", value: "new", shortcut: "N" }]} />,
    code: `import { CommandPalette } from "@workspace/ui";`
  },
  Tabs: {
    preview: <Tabs variant="underline" fullWidth items={[{ label: "미리보기 / Preview", value: "preview", content: "컴포넌트 화면입니다. / Component preview." }, { label: "코드 / Code", value: "code", content: "사용 예시입니다. / Usage example." }]} />,
    code: `import { Tabs } from "@workspace/ui";`
  },
  Breadcrumb: {
    preview: <Breadcrumb items={[{ label: "홈 / Home", href: "#" }, { label: "컴포넌트 / Components", href: "#" }, { label: "Button", current: true }]} />,
    code: `import { Breadcrumb } from "@workspace/ui";`
  },
  Pagination: {
    preview: <Pagination page={2} totalPages={5} />,
    code: `import { Pagination } from "@workspace/ui";`
  },
  Stepper: {
    preview: <Stepper defaultValue="api" steps={[{ label: "요구사항 / Requirements", value: "requirements" }, { label: "API", value: "api" }, { label: "검증 / Verify", value: "verify" }]} />,
    code: `import { Stepper } from "@workspace/ui";`
  },
  NavigationRail: {
    preview: <NavigationRail defaultValue="components" items={[{ label: "홈 / Home", value: "home", icon: "H" }, { label: "컴포넌트 / Components", value: "components", icon: "C" }, { label: "문서 / Docs", value: "docs", icon: "D" }]} />,
    code: `import { NavigationRail } from "@workspace/ui";`
  },
  SideNav: {
    preview: <SideNav defaultValue="props" sections={[{ title: "문서 / Docs", items: [{ label: "개요 / Overview", value: "overview" }, { label: "Prop API", value: "props", badge: "new" }, { label: "릴리즈 / Release", value: "release" }] }]} />,
    code: `import { SideNav } from "@workspace/ui";`
  },
  Card: {
    preview: <Card eyebrow="가이드 / Guide" title="컴포넌트 가이드 / Component guide" description="상태와 사용 기준을 함께 보여줍니다. / Shows states and usage rules together." meta="v0.1" selected actions={[{ label: "보기 / View", variant: "outline", tone: "neutral" }]}><Badge label="게시됨 / Published" tone="success" /></Card>,
    code: `import { Card } from "@workspace/ui";`
  },
  Divider: {
    preview: <Stack gap="sm"><Badge label="위 영역 / Above" /><Divider label="구분 / Section" /><Badge label="아래 영역 / Below" tone="brand" /></Stack>,
    code: `import { Divider } from "@workspace/ui";`
  },
  Table: {
    preview: <Table caption="컴포넌트 상태 / Component status" striped columns={[{ key: "name", label: "이름 / Name" }, { key: "status", label: "상태 / Status" }]} rows={[{ name: "Button", status: "ready" }, { name: "Dialog", status: "ready" }]} rowActions={(row) => <Button size="sm" variant="ghost" tone="neutral">{row.name} 보기 / View</Button>} />,
    code: `import { Table } from "@workspace/ui";`
  },
  DataGrid: {
    preview: <DataGrid caption="작업 목록 / Task list" selectionMode="multiple" columns={[{ key: "task", label: "작업 / Task" }, { key: "state", label: "상태 / State" }]} rows={[{ task: "DatePicker", state: "ready" }, { task: "DataGrid", state: "ready" }]} />,
    code: `import { DataGrid } from "@workspace/ui";`
  },
  EmptyState: {
    preview: <EmptyState title="결과 없음 / No results" description="필터를 조정해 다시 시도하세요. / Adjust filters and try again." actions={[{ label: "필터 초기화 / Reset filters" }]} />,
    code: `import { EmptyState } from "@workspace/ui";`
  },
  List: {
    preview: <List selectionMode="single" items={[{ title: "Button", description: "명령 실행 / Command action", meta: "P0", leading: "B", selected: true }, { title: "TextField", description: "텍스트 입력 / Text input", meta: "P0", leading: "T", trailing: ">" }]} />,
    code: `import { List } from "@workspace/ui";`
  }
};

function App() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [activeTheme, setActiveTheme] = useState("normal");
  const summaries = useMemo(() => new Map(componentCatalog.map((component) => [component.name, component])), []);

  useEffect(() => {
    const updateActiveNav = () => {
      let current = navItems[0].id;
      for (const item of navItems) {
        const section = document.querySelector(`#${item.id}`);
        if (section instanceof HTMLElement && section.offsetTop - 120 <= window.scrollY) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };
    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveNav);
  }, []);

  return (
    <div className="shell" data-ds-theme={activeTheme}>
      <aside className="sidebar" aria-label="문서 메뉴 / Documentation menu">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">DS</span>
          <div>
            <strong>디자인 시스템 / Design System</strong>
            <span>React + TypeScript</span>
          </div>
        </div>
        <nav className="nav">
          {navItems.map((item) => <a className={activeSection === item.id ? "active" : undefined} href={`#${item.id}`} key={item.id}>{item.label}</a>)}
        </nav>
      </aside>

      <main className="content">
        <section className="intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">React 컴포넌트 카탈로그 / React component catalog</p>
            <h1 id="page-title">React + TypeScript 디자인 시스템 / React + TypeScript Design System</h1>
            <p className="intro-copy">
              이 문서 앱은 `@workspace/ui`의 실제 React 컴포넌트를 import해 렌더링합니다.
              This docs app renders real React components imported from `@workspace/ui`.
            </p>
          </div>
          <div className="intro-panel" aria-label="실행 명령어 / Run command">
            <span>로컬 실행 / Run locally</span>
            <code>npm run dev</code>
          </div>
        </section>

        <Section id="overview" eyebrow="개요 / Overview" title="구성 원칙 / Principles">
          <div className="principles">
            <InfoCard title="React 우선 / React First">DOM factory가 아니라 typed JSX component를 기준으로 구현합니다. / Implemented as typed JSX components, not DOM factories.</InfoCard>
            <InfoCard title="토큰 기반 / Token Based">hover, active, focus, disabled 상태를 token contract로 통일합니다. / Interaction states are normalized through token contracts.</InfoCard>
            <InfoCard title="반응형 primitive / Responsive Primitives">Container, Row, Col, Stack, Inline을 실제 export로 제공합니다. / Layout primitives are real exports.</InfoCard>
          </div>
        </Section>

        <Section id="tokens" eyebrow="기반 / Foundations" title="디자인 토큰 / Design Tokens">
          <div className="token-grid">
            <article className="token-card">
              <h3>색상 / Colors</h3>
              <div className="swatches" aria-label="컬러 토큰 / Color tokens">
                {[
                  ["var(--ds-color-action-primary-bg)", "주요 / Primary"],
                  ["var(--ds-color-feedback-success)", "성공 / Success"],
                  ["var(--ds-color-feedback-warning)", "경고 / Warning"],
                  ["var(--ds-color-feedback-danger)", "위험 / Danger"],
                  ["var(--ds-color-gray-700)", "중립 / Neutral"]
                ].map(([swatch, label]) => (
                  <span key={label} style={{ "--swatch": swatch } as CSSProperties}>{label}</span>
                ))}
              </div>
            </article>
            <article className="token-card">
              <h3>타이포그래피 / Typography</h3>
              <div className="type-samples">
                <span className="type-display">디스플레이 / Display</span>
                <span className="type-title">제목 텍스트 / Title text</span>
                <span className="type-body">제품 인터페이스 본문입니다. / Body text for product interfaces.</span>
                <span className="type-caption">캡션 / Caption / metadata</span>
              </div>
            </article>
            <article className="token-card">
              <h3>간격 / Spacing</h3>
              <div className="spacing-samples" aria-label="간격 토큰 / Spacing tokens">
                {["2", "4", "6", "8"].map((size) => (
                  <span key={size} style={{ "--space-width": `var(--ds-space-${size})` } as CSSProperties}>{Number(size) * 4}</span>
                ))}
              </div>
            </article>
          </div>
        </Section>

        <Section id="themes" eyebrow="테마 / Themes" title="테마 시스템 / Theme System">
          <div className="theme-layout">
            <article className="theme-control">
              <h3>전역 테마 전환 / Global Theme Switch</h3>
              <p>
                `data-ds-theme` 값을 바꾸면 semantic color token이 재정의되고 모든 컴포넌트가 같은 색상 체계를 상속합니다.
                Changing `data-ds-theme` redefines semantic color tokens, so every component inherits the same color system.
              </p>
              <Inline gap="sm">
                {themeOptions.map((theme) => (
                  <Button
                    key={theme.id}
                    onClick={() => setActiveTheme(theme.id)}
                    selected={activeTheme === theme.id}
                    size="sm"
                    tone="neutral"
                    variant={activeTheme === theme.id ? "solid" : "outline"}
                  >
                    {theme.label}
                  </Button>
                ))}
              </Inline>
            </article>
            <div className="theme-preview-grid">
              {themeOptions.map((theme) => (
                <article className="theme-preview-card" data-ds-theme={theme.id} key={theme.id}>
                  <div>
                    <span className="theme-preview-name">{theme.label}</span>
                    <p>{theme.description}</p>
                  </div>
                  <Alert tone="info" title="테마 적용 / Theme applied" description="semantic token으로 렌더링합니다. / Rendered through semantic tokens." />
                  <Inline gap="sm">
                    <Button size="sm">확인 / Confirm</Button>
                    <Button size="sm" variant="outline" tone="neutral">취소 / Cancel</Button>
                  </Inline>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section id="rules" eyebrow="규약 / Conventions" title="개발 규약 / Development Conventions">
          <div className="rule-grid">
            <InfoCard title="파일 / Files">컴포넌트 source는 `.tsx`, barrel entry는 `.ts`를 사용합니다. / Component source uses `.tsx`, barrel entries use `.ts`.</InfoCard>
            <InfoCard title="Props">event prop은 `onValueChange`, `onOpenChange`처럼 `onPascalCase`를 사용합니다. / Event props use `onPascalCase`.</InfoCard>
            <InfoCard title="CSS">공개 class는 `ds-` prefix, 상태는 `data-*` hook을 사용합니다. / Public classes use `ds-`, states use `data-*` hooks.</InfoCard>
          </div>
        </Section>

        <Section id="roadmap" eyebrow="로드맵 / Roadmap" title="컴포넌트 개발 로드맵 / Component Development Roadmap">
          <div className="roadmap-list">
            {roadmapGroups.map((group) => (
              <article className="roadmap-card" key={group.category}>
                <div className="roadmap-card-header">
                  <h3>{group.category}</h3>
                  <span className="status-pill">{group.priority}</span>
                </div>
                <div className="roadmap-tags">{group.components.map((component) => <span key={component}>{component}</span>)}</div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="components" eyebrow="컴포넌트 / Components" title="컴포넌트 카탈로그 / Component Catalog">
          <div className="component-list">
            {componentCatalog.map((component) => {
              const example = showcase[component.name];
              const summary = summaries.get(component.name);
              return (
                <article className="component-card" key={component.name}>
                  <div className="component-info">
                    <h3>{component.name}</h3>
                    <p className="component-meta">{component.priority} · {component.category} · {component.status}</p>
                    <p className="component-copy">{summary?.summary} / {summary?.purpose}</p>
                    <div className="code-block"><pre><code>{example?.code ?? `import { ${component.name} } from "@workspace/ui";`}</code></pre></div>
                  </div>
                  <div className="preview" aria-label={`${component.name} 미리보기 / ${component.name} preview`}>
                    {example?.preview ?? <EmptyState title={`${component.name} 예시 없음 / No example`} />}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="example" eyebrow="예시 / Example" title="조합 예시 / Composition Example">
          <Container size="xl">
            <Row gap="lg">
              <Col span={12} md={6}>
                <Stack className="sample-form">
                  <TextField label="프로젝트 이름 / Project name" defaultValue="Design System Docs" />
                  <Select label="상태 / Status" defaultValue="ready" options={[{ label: "준비 / Ready", value: "ready" }, { label: "초안 / Draft", value: "draft" }]} />
                  <Inline justify="end" gap="sm">
                    <Button variant="outline" tone="neutral">취소 / Cancel</Button>
                    <Button>저장 / Save</Button>
                  </Inline>
                </Stack>
              </Col>
              <Col span={12} md={6}>
                <Card title="문서 앱의 역할 / Docs App Role" description="이 영역도 실제 React export를 조합해 렌더링합니다. / This area is rendered by composing real React exports.">
                  <Alert tone="info" title="실제 컴포넌트 사용 중 / Using real components" description="@workspace/ui에서 import한 React 컴포넌트입니다. / These are React components imported from @workspace/ui." />
                </Card>
              </Col>
            </Row>
          </Container>
        </Section>
      </main>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article>
      <strong>{title}</strong>
      <p>{children}</p>
    </article>
  );
}

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
