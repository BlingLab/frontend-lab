import "@workspace/tokens/tokens.css";
import "@bling-lab/ui/styles.css";
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
  Icon,
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
} from "@bling-lab/ui";

const navItems = [
  { id: "overview", label: "구성 원칙" },
  { id: "tokens", label: "디자인 토큰" },
  { id: "themes", label: "테마 시스템" },
  { id: "responsive", label: "반응형" },
  { id: "rules", label: "개발 규약" },
  { id: "roadmap", label: "로드맵" },
  { id: "components", label: "컴포넌트" },
  { id: "example", label: "조합 예시" }
];

const themeOptions = [
  { id: "normal", label: "NORMAL", description: "기본 제품 톤" },
  { id: "ocean", label: "OCEAN", description: "청록 액션 톤" },
  { id: "forest", label: "FOREST", description: "녹색 업무 톤" },
  { id: "dark", label: "DARK", description: "어두운 표면 톤" }
];

const systemMetrics = [
  { label: "컴포넌트", value: componentCatalog.length },
  { label: "레이아웃", value: 5 },
  { label: "테마", value: themeOptions.length },
  { label: "스택", value: "React + TS" }
];

const responsiveMatrix = [
  { label: "모바일", range: "< 40rem", primitive: "Stack + full width fields", check: "single column" },
  { label: "태블릿", range: "40rem - 64rem", primitive: "Row wrapping + adaptive cards", check: "two column when space allows" },
  { label: "데스크톱", range: "64rem+", primitive: "Container + grid density", check: "카탈로그 and preview side by side" }
];

const roadmapGroups = [
  { category: "액션", priority: "P0/P1", components: ["Button", "Icon", "IconButton"] },
  { category: "폼", priority: "P0/P1", components: ["Field", "TextField", "DatePicker", "Combobox", "Select", "Checkbox", "RadioGroup", "Switch", "FileUploader"] },
  { category: "피드백", priority: "P0/P1", components: ["Alert", "Badge", "Toast", "Progress", "Skeleton"] },
  { category: "오버레이", priority: "P1", components: ["Dialog", "Popover", "Tooltip", "DropdownMenu", "CommandPalette"] },
  { category: "내비게이션", priority: "P0/P1", components: ["Tabs", "Breadcrumb", "Pagination", "Stepper", "NavigationRail", "SideNav"] },
  { category: "레이아웃", priority: "P0/P1", components: ["Container", "Row", "Col", "Stack", "Inline", "Card", "Divider"] },
  { category: "데이터", priority: "P1", components: ["Table", "DataGrid", "EmptyState", "List"] }
];

const showcase: Record<string, { preview: ReactNode; code: string }> = {
  Button: {
    preview: (
      <Inline gap="sm" justify="center">
        <Button iconStart={<Icon name="plus" />} selected>저장</Button>
        <Button variant="outline" tone="neutral">취소</Button>
        <Button tone="danger">삭제</Button>
      </Inline>
    ),
    code: `import { Button, Icon } from "@bling-lab/ui";\n\n<Button iconStart={<Icon name="plus" />} selected>저장</Button>`
  },
  IconButton: {
    preview: (
      <Inline gap="sm" justify="center">
        <IconButton label="추가" icon={<Icon name="plus" />} shape="circle" />
        <IconButton label="검색" icon={<Icon name="search" />} variant="outline" />
        <IconButton label="삭제" icon={<Icon name="x" />} tone="danger" variant="outline" />
      </Inline>
    ),
    code: `import { Icon, IconButton } from "@bling-lab/ui";\n\n<IconButton label="검색" icon={<Icon name="search" />} />`
  },
  Icon: {
    preview: (
      <Inline gap="sm" justify="center">
        <Icon name="search" label="검색" />
        <Icon name="command" label="명령" />
        <Icon name="upload" label="업로드" />
        <Icon name="check" label="완료" />
      </Inline>
    ),
    code: `import { Icon } from "@bling-lab/ui";\n\n<Icon name="search" label="검색" />`
  },
  Field: {
    preview: <TextField label="프로젝트" description="Field composition으로 label 관계를 고정합니다." defaultValue="frontend-lab" />,
    code: `import { Field, TextField } from "@bling-lab/ui";`
  },
  TextField: {
    preview: <TextField label="이름" description="한 줄 입력입니다." defaultValue="Design System" prefix="Aa" suffix="필수" width="full" />,
    code: `import { TextField } from "@bling-lab/ui";\n\n<TextField label="이름" prefix="Aa" suffix="필수" width="full" />`
  },
  Textarea: {
    preview: <Textarea label="메모" defaultValue="긴 설명을 입력합니다." rows={4} />,
    code: `import { Textarea } from "@bling-lab/ui";\n\n<Textarea label="메모" rows={4} />`
  },
  Select: {
    preview: <Select label="상태" defaultValue="ready" prefix="상태" width="full" options={[{ label: "준비", value: "ready" }, { label: "초안", value: "draft" }]} />,
    code: `import { Select } from "@bling-lab/ui";\n\n<Select options={[{ label: "준비", value: "ready" }]} />`
  },
  DatePicker: {
    preview: <DatePicker label="시작일" defaultValue="2026-04-29" width="full" />,
    code: `import { DatePicker } from "@bling-lab/ui";\n\n<DatePicker label="시작일" />`
  },
  Combobox: {
    preview: <Combobox label="담당자" defaultValue="design" options={[{ label: "디자인", value: "design" }, { label: "프론트엔드", value: "frontend" }, { label: "제품", value: "product" }]} />,
    code: `import { Combobox } from "@bling-lab/ui";`
  },
  Checkbox: {
    preview: <Checkbox label="알림 받기" description="중요 변경 사항을 알려줍니다." defaultChecked />,
    code: `import { Checkbox } from "@bling-lab/ui";\n\n<Checkbox label="알림 받기" />`
  },
  RadioGroup: {
    preview: <RadioGroup label="밀도" defaultValue="comfortable" orientation="horizontal" options={[{ label: "촘촘함", value: "compact" }, { label: "기본", value: "comfortable" }]} />,
    code: `import { RadioGroup } from "@bling-lab/ui";`
  },
  Switch: {
    preview: <Switch label="자동 저장" defaultChecked />,
    code: `import { Switch } from "@bling-lab/ui";\n\n<Switch label="자동 저장" defaultChecked />`
  },
  FileUploader: {
    preview: <FileUploader label="첨부" description="여러 파일을 선택할 수 있습니다." />,
    code: `import { FileUploader } from "@bling-lab/ui";`
  },
  Alert: {
    preview: <Alert tone="success" title="저장 완료" description="변경 사항이 반영되었습니다." dismissible actionsPlacement="bottom" />,
    code: `import { Alert } from "@bling-lab/ui";\n\n<Alert tone="success" title="저장 완료" dismissible />`
  },
  Toast: {
    preview: <Toast tone="info" title="동기화됨" description="컴포넌트 카탈로그가 최신 상태입니다." />,
    code: `import { Toast } from "@bling-lab/ui";`
  },
  Badge: {
    preview: (
      <Inline gap="sm" justify="center">
        <Badge label="준비" tone="brand" iconStart={<Icon name="check" size="sm" />} />
        <Badge label="활성" tone="success" />
        <Badge label="경고" tone="warning" />
        <Badge label="오류" tone="danger" removable />
      </Inline>
    ),
    code: `import { Badge } from "@bling-lab/ui";`
  },
  Progress: {
    preview: <Progress label="완료율" value={64} />,
    code: `import { Progress } from "@bling-lab/ui";`
  },
  Skeleton: {
    preview: (
      <Stack gap="sm">
        <Skeleton width="14rem" height="1.25rem" />
        <Skeleton width="20rem" height="0.85rem" />
        <Skeleton width="16rem" height="0.85rem" />
      </Stack>
    ),
    code: `import { Skeleton } from "@bling-lab/ui";`
  },
  Dialog: {
    preview: <Dialog triggerLabel="다이얼로그 열기" title="변경 확인" description="이 작업은 현재 설정에 반영됩니다.">계속 진행할까요?</Dialog>,
    code: `import { Dialog } from "@bling-lab/ui";`
  },
  Popover: {
    preview: <Popover triggerLabel="필터" title="필터 옵션"><Checkbox label="초안 포함" defaultChecked /></Popover>,
    code: `import { Popover } from "@bling-lab/ui";`
  },
  Tooltip: {
    preview: <Tooltip label="도움말" content="아이콘 버튼에는 accessible label이 필요합니다." />,
    code: `import { Tooltip } from "@bling-lab/ui";`
  },
  DropdownMenu: {
    preview: <DropdownMenu triggerLabel="작업" items={[{ label: "편집" }, { label: "복제" }, { label: "삭제" }]} />,
    code: `import { DropdownMenu } from "@bling-lab/ui";`
  },
  CommandPalette: {
    preview: <CommandPalette commands={[{ label: "프로젝트 열기", value: "open", shortcut: "O" }, { label: "새 컴포넌트", value: "new", shortcut: "N" }]} />,
    code: `import { CommandPalette } from "@bling-lab/ui";`
  },
  Tabs: {
    preview: <Tabs variant="underline" fullWidth items={[{ label: "미리보기", value: "preview", content: "컴포넌트 화면입니다." }, { label: "코드", value: "code", content: "사용 예시입니다." }]} />,
    code: `import { Tabs } from "@bling-lab/ui";`
  },
  Breadcrumb: {
    preview: <Breadcrumb items={[{ label: "홈", href: "#" }, { label: "컴포넌트", href: "#" }, { label: "Button", current: true }]} />,
    code: `import { Breadcrumb } from "@bling-lab/ui";`
  },
  Pagination: {
    preview: <Pagination page={2} totalPages={5} />,
    code: `import { Pagination } from "@bling-lab/ui";`
  },
  Stepper: {
    preview: <Stepper defaultValue="api" steps={[{ label: "요구사항", value: "requirements" }, { label: "API", value: "api" }, { label: "검증", value: "verify" }]} />,
    code: `import { Stepper } from "@bling-lab/ui";`
  },
  NavigationRail: {
    preview: <NavigationRail defaultValue="components" items={[{ label: "홈", value: "home", icon: "H" }, { label: "컴포넌트", value: "components", icon: "C" }, { label: "문서", value: "docs", icon: "D" }]} />,
    code: `import { NavigationRail } from "@bling-lab/ui";`
  },
  SideNav: {
    preview: <SideNav defaultValue="props" sections={[{ title: "문서", items: [{ label: "개요", value: "overview" }, { label: "Prop API", value: "props", badge: "new" }, { label: "릴리즈", value: "release" }] }]} />,
    code: `import { SideNav } from "@bling-lab/ui";`
  },
  Container: {
    preview: <Container size="sm"><Alert title="Container" description="page gutter와 max width를 적용합니다." /></Container>,
    code: `import { Container } from "@bling-lab/ui";\n\n<Container size="sm">콘텐츠</Container>`
  },
  Row: {
    preview: <Row gap="sm"><Badge label="첫 번째" /><Badge label="두 번째" tone="brand" /><Badge label="세 번째" tone="success" /></Row>,
    code: `import { Row } from "@bling-lab/ui";\n\n<Row gap="sm">콘텐츠</Row>`
  },
  Col: {
    preview: <Row gap="sm"><Col span={12} md={6}><Alert title="A" description="span 6" /></Col><Col span={12} md={6}><Alert title="B" description="span 6" /></Col></Row>,
    code: `import { Col, Row } from "@bling-lab/ui";\n\n<Row><Col span={12} md={6}>콘텐츠</Col></Row>`
  },
  Stack: {
    preview: <Stack gap="sm"><Badge label="위" /><Badge label="가운데" tone="brand" /><Badge label="아래" tone="success" /></Stack>,
    code: `import { Stack } from "@bling-lab/ui";\n\n<Stack gap="sm">콘텐츠</Stack>`
  },
  Inline: {
    preview: <Inline gap="sm"><Badge label="필터" /><Badge label="활성" tone="success" /><Button size="sm" variant="outline" tone="neutral">초기화</Button></Inline>,
    code: `import { Inline } from "@bling-lab/ui";\n\n<Inline gap="sm">콘텐츠</Inline>`
  },
  Card: {
    preview: <Card eyebrow="가이드" title="컴포넌트 가이드" description="상태와 사용 기준을 함께 보여줍니다." meta="v0.1" selected actions={[{ label: "보기", variant: "outline", tone: "neutral" }]}><Badge label="게시됨" tone="success" /></Card>,
    code: `import { Card } from "@bling-lab/ui";`
  },
  Divider: {
    preview: <Stack gap="sm"><Badge label="위 영역" /><Divider label="구분" /><Badge label="아래 영역" tone="brand" /></Stack>,
    code: `import { Divider } from "@bling-lab/ui";`
  },
  Table: {
    preview: <Table caption="컴포넌트 상태" striped columns={[{ key: "name", label: "이름" }, { key: "status", label: "상태" }]} rows={[{ name: "Button", status: "ready" }, { name: "Dialog", status: "ready" }]} rowActions={(row) => <Button size="sm" variant="ghost" tone="neutral">{row.name} 보기</Button>} />,
    code: `import { Table } from "@bling-lab/ui";`
  },
  DataGrid: {
    preview: <DataGrid caption="작업 목록" selectionMode="multiple" columns={[{ key: "task", label: "작업" }, { key: "state", label: "상태" }]} rows={[{ task: "DatePicker", state: "ready" }, { task: "DataGrid", state: "ready" }]} />,
    code: `import { DataGrid } from "@bling-lab/ui";`
  },
  EmptyState: {
    preview: <EmptyState title="결과 없음" description="필터를 조정해 다시 시도하세요." actions={[{ label: "필터 초기화" }]} />,
    code: `import { EmptyState } from "@bling-lab/ui";`
  },
  List: {
    preview: <List selectionMode="single" items={[{ title: "Button", description: "명령 실행", meta: "P0", leading: "B", selected: true }, { title: "TextField", description: "텍스트 입력", meta: "P0", leading: "T", trailing: ">" }]} />,
    code: `import { List } from "@bling-lab/ui";`
  }
};

const docsRepositoryBaseUrl = "https://github.com/BlingLab/frontend-lab/tree/main";
const priorityStateNames = ["default", "hover", "focus-visible", "disabled", "invalid", "selected", "open", "loading", "active", "empty"];

function getComponentDocPaths(component: (typeof componentCatalog)[number]) {
  const directory = `packages/ui/src/components/${component.category}/${component.slug}`;
  return {
    directory,
    source: `${directory}/${component.slug}.tsx`,
    readme: `${directory}/README.md`,
    spec: `${directory}/spec.md`,
    docsUrl: `${docsRepositoryBaseUrl}/${directory}`,
    readmeUrl: `${docsRepositoryBaseUrl}/${directory}/README.md`,
    specUrl: `${docsRepositoryBaseUrl}/${directory}/spec.md`
  };
}

function getCoveredStates(component: (typeof componentCatalog)[number]) {
  const prioritizedStates = priorityStateNames.filter((stateName) => component.states.includes(stateName));
  return prioritizedStates.length > 0 ? prioritizedStates : component.states.slice(0, 4);
}

function App() {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [activeTheme, setActiveTheme] = useState("normal");
  const [componentQuery, setComponentQuery] = useState("");
  const [selectedComponentName, setSelectedComponentName] = useState(componentCatalog[0].name);
  const summaries = useMemo(() => new Map(componentCatalog.map((component) => [component.name, component])), []);
  const filteredComponents = useMemo(() => {
    const normalizedQuery = componentQuery.trim().toLowerCase();
    if (!normalizedQuery) return componentCatalog;
    return componentCatalog.filter((component) => [
      component.name,
      component.category,
      component.summary,
      component.purpose,
      component.priority,
      component.status,
      ...component.props,
      ...component.states,
      ...component.tokens
    ].join(" ").toLowerCase().includes(normalizedQuery));
  }, [componentQuery]);
  const selectedComponent = componentCatalog.find((component) => component.name === selectedComponentName) ?? filteredComponents[0] ?? componentCatalog[0];
  const selectedDocPaths = getComponentDocPaths(selectedComponent);
  const coverageRows = useMemo(() => componentCatalog.map((component) => {
    const docPaths = getComponentDocPaths(component);
    return {
      component,
      docPaths,
      hasExample: Boolean(showcase[component.name]),
      coveredStates: getCoveredStates(component)
    };
  }), []);
  const coverageCounts = useMemo(() => ({
    examples: coverageRows.filter((row) => row.hasExample).length,
    docs: coverageRows.filter((row) => row.docPaths.readme && row.docPaths.spec).length,
    themes: themeOptions.filter((theme) => theme.id === "normal" || theme.id === "dark").length
  }), [coverageRows]);

  useEffect(() => {
    document.documentElement.dataset.dsTheme = activeTheme;

    return () => {
      delete document.documentElement.dataset.dsTheme;
    };
  }, [activeTheme]);

  useEffect(() => {
    const scrollToHash = () => {
      const targetId = decodeURIComponent(window.location.hash.replace("#", ""));
      const target = targetId ? document.getElementById(targetId) : null;
      target?.scrollIntoView({ block: "start" });
      target?.focus({ preventScroll: true });
    };

    requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

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
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          const target = document.getElementById("main-content");
          if (!target) return;
          event.preventDefault();
          window.history.replaceState(null, "", "#main-content");
          target.focus();
          target.scrollIntoView({ block: "start" });
        }}
      >
        본문으로 이동
      </a>
      <aside className="sidebar" aria-label="문서 메뉴">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">DS</span>
          <div>
            <strong>디자인 시스템</strong>
            <span>React + TypeScript</span>
          </div>
        </div>
        <nav className="nav">
          {navItems.map((item) => <a className={activeSection === item.id ? "active" : undefined} href={`#${item.id}`} key={item.id}>{item.label}</a>)}
        </nav>
      </aside>

      <main className="content" id="main-content" tabIndex={-1}>
        <section className="intro" aria-labelledby="page-title">
          <div className="intro-main">
            <p className="eyebrow">React 컴포넌트 카탈로그</p>
            <h1 id="page-title">프로젝트에 바로 가져다 쓰는 React 컴포넌트 시스템</h1>
            <p className="intro-copy">
              이 문서 앱은 `@bling-lab/ui`의 실제 React 컴포넌트를 import해 렌더링합니다.`@bling-lab/ui`.
            </p>
            <div className="intro-actions" aria-label="주요 이동">
              <a className="intro-link primary" href="#components">컴포넌트 보기</a>
              <a className="intro-link" href="#themes">테마 확인</a>
            </div>
            <div className="metrics-grid" aria-label="시스템 지표">
              {systemMetrics.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="intro-panel" aria-label="패키지 미리보기">
            <div className="intro-panel-header">
              <div>
                <span>패키지 미리보기</span>
                <strong>@bling-lab/ui</strong>
              </div>
              <Badge label="ready" tone="success" />
            </div>
            <div className="intro-workbench">
              <TextField label="컴포넌트" defaultValue="Button, DataGrid, CommandPalette" width="full" />
              <Select label="테마" onChange={(event) => setActiveTheme(event.currentTarget.value)} value={activeTheme} options={themeOptions.map((theme) => ({ label: theme.label, value: theme.id }))} />
              <Progress label="구현률" value={100} />
              <Inline gap="sm" justify="between">
                <Badge label="semantic tokens" tone="brand" />
                <Button size="sm">패키지 사용</Button>
              </Inline>
            </div>
            <code>npm run dev</code>
          </div>
        </section>

        <Section id="overview" eyebrow="개요" title="구성 원칙">
          <div className="principles">
            <InfoCard title="React 우선">DOM factory가 아니라 typed JSX component를 기준으로 구현합니다., not DOM factories.</InfoCard>
            <InfoCard title="토큰 기반">hover, active, focus, disabled 상태를 token contract로 통일합니다.</InfoCard>
            <InfoCard title="반응형 primitive">Container, Row, Col, Stack, Inline을 실제 export로 제공합니다.</InfoCard>
          </div>
        </Section>

        <Section id="tokens" eyebrow="기반" title="디자인 토큰">
          <div className="token-grid">
            <article className="token-card">
              <h3>색상</h3>
              <div className="swatches" aria-label="컬러 토큰">
                {[
                  ["var(--ds-color-action-primary-bg)", "주요"],
                  ["var(--ds-color-feedback-success)", "성공"],
                  ["var(--ds-color-feedback-warning)", "경고"],
                  ["var(--ds-color-feedback-danger)", "위험"],
                  ["var(--ds-color-gray-700)", "중립"]
                ].map(([swatch, label]) => (
                  <span key={label} style={{ "--swatch": swatch } as CSSProperties}>{label}</span>
                ))}
              </div>
            </article>
            <article className="token-card">
              <h3>타이포그래피</h3>
              <div className="type-samples">
                <span className="type-display">디스플레이</span>
                <span className="type-title">제목 텍스트</span>
                <span className="type-body">제품 인터페이스 본문입니다.</span>
                <span className="type-caption">캡션</span>
              </div>
            </article>
            <article className="token-card">
              <h3>간격</h3>
              <div className="spacing-samples" aria-label="간격 토큰">
                {["2", "4", "6", "8"].map((size) => (
                  <span key={size} style={{ "--space-width": `var(--ds-space-${size})` } as CSSProperties}>{Number(size) * 4}</span>
                ))}
              </div>
            </article>
          </div>
        </Section>

        <Section id="themes" eyebrow="테마" title="테마 시스템">
          <div className="theme-layout">
            <article className="theme-control">
              <h3>전역 테마 전환</h3>
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
            <div className="theme-compare" aria-label="NORMAL과 DARK 비교">
              {["normal", "dark"].map((themeId) => {
                const theme = themeOptions.find((option) => option.id === themeId)!;
                return (
                  <article className="theme-compare-panel" data-ds-theme={theme.id} key={theme.id}>
                    <div>
                      <span className="theme-preview-name">{theme.label}</span>
                      <h3>{theme.id === "normal" ? "기본 화면" : "다크 화면"}</h3>
                      <p>{theme.description}</p>
                    </div>
                    <Stack gap="sm">
                      <TextField label="프로젝트" defaultValue="frontend-lab" width="full" />
                      <Alert tone={theme.id === "normal" ? "success" : "info"} title="상태 확인" description="같은 컴포넌트가 theme token만 바꿔 렌더링됩니다." />
                      <Inline gap="sm" justify="between">
                        <Badge label="semantic token" tone="brand" />
                        <Button size="sm">{theme.id === "normal" ? "NORMAL 적용" : "DARK 적용"}</Button>
                      </Inline>
                    </Stack>
                  </article>
                );
              })}
            </div>
            <div className="theme-preview-grid">
              {themeOptions.map((theme) => (
                <article className="theme-preview-card" data-ds-theme={theme.id} key={theme.id}>
                  <div>
                    <span className="theme-preview-name">{theme.label}</span>
                    <p>{theme.description}</p>
                  </div>
                  <Alert tone="info" title="테마 적용" description="semantic token으로 렌더링합니다." />
                  <Inline gap="sm">
                    <Button size="sm">확인</Button>
                    <Button size="sm" variant="outline" tone="neutral">취소</Button>
                  </Inline>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section id="responsive" eyebrow="검증" title="반응형 시스템">
          <div className="responsive-layout">
            <article className="responsive-summary">
              <h3>layout primitive 기준</h3>
              <p>
                `Container`, `Row`, `Col`, `Stack`, `Inline`을 기준으로 화면 폭 변화에 대응하고, form control은 `width="full"`과 token gutter를 우선 사용합니다.
                Layout adapts through `Container`, `Row`, `Col`, `Stack`, and `Inline`, while form controls prefer `width="full"` and token gutters.
              </p>
              <Row gap="md">
                <Col span={12} md={6}>
                  <TextField label="검색어" placeholder="컴포넌트 검색" width="full" />
                </Col>
                <Col span={12} md={6}>
                  <Select label="상태" width="full" options={[{ label: "준비", value: "ready" }, { label: "안정", value: "stable" }]} />
                </Col>
              </Row>
            </article>
            <div className="responsive-matrix">
              {responsiveMatrix.map((item) => (
                <article className="responsive-card" key={item.label}>
                  <span>{item.range}</span>
                  <h3>{item.label}</h3>
                  <p>{item.primitive}</p>
                  <Badge label={item.check} tone="brand" />
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section id="rules" eyebrow="규약" title="개발 규약">
          <div className="rule-grid">
            <InfoCard title="파일">컴포넌트 source는 `.tsx`, barrel entry는 `.ts`를 사용합니다.`.tsx`, barrel entries use `.ts`.</InfoCard>
            <InfoCard title="Props">event prop은 `onValueChange`, `onOpenChange`처럼 `onPascalCase`를 사용합니다.`onPascalCase`.</InfoCard>
            <InfoCard title="CSS">공개 class는 `ds-` prefix, 상태는 `data-*` hook을 사용합니다.`ds-`, states use `data-*` hooks.</InfoCard>
          </div>
        </Section>

        <Section id="roadmap" eyebrow="로드맵" title="컴포넌트 개발 로드맵">
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

        <Section id="components" eyebrow="컴포넌트" title="컴포넌트 카탈로그">
          <div className="docs-explorer" aria-label="컴포넌트 문서 탐색">
            <div className="docs-explorer-panel">
              <div className="docs-explorer-header">
                <div>
                  <h3>문서 탐색</h3>
                  <p>컴포넌트별 prop, state, token, 문서 경로를 한 화면에서 확인합니다., states, tokens, and document paths for each component in one place.</p>
                </div>
                <Badge label={`${filteredComponents.length} / ${componentCatalog.length}`} tone="brand" />
              </div>
              <label className="doc-search">
                <span>검색</span>
                <input value={componentQuery} placeholder="컴포넌트명, 범주, 토큰" onChange={(event) => setComponentQuery(event.currentTarget.value)} />
              </label>
              <div className="doc-component-list" role="listbox" aria-label="컴포넌트 선택">
                {filteredComponents.map((component) => (
                  <button
                    aria-selected={selectedComponent.name === component.name}
                    className="doc-component-item"
                    key={component.name}
                    role="option"
                    type="button"
                    onClick={() => setSelectedComponentName(component.name)}
                  >
                    <strong>{component.name}</strong>
                    <span>{component.category} · {component.priority} · {component.status}</span>
                  </button>
                ))}
                {filteredComponents.length === 0 ? <p className="doc-empty">검색 결과가 없습니다.</p> : null}
              </div>
            </div>
            <article className="docs-detail">
              <div className="docs-detail-header">
                <div>
                  <span className="component-meta">{selectedComponent.category} · {selectedComponent.priority} · {selectedComponent.status}</span>
                  <h3>{selectedComponent.name}</h3>
                  <p>{selectedComponent.summary} · {selectedComponent.purpose}</p>
                </div>
                <Icon name="command" label="문서" />
              </div>
              <div className="docs-chip-group" aria-label="Props">
                <strong>Props</strong>
                <div>{selectedComponent.props.map((prop) => <span key={prop}>{prop}</span>)}</div>
              </div>
              <div className="docs-chip-group" aria-label="States">
                <strong>States</strong>
                <div>{selectedComponent.states.map((state) => <span key={state}>{state}</span>)}</div>
              </div>
              <div className="docs-chip-group" aria-label="Tokens">
                <strong>Tokens</strong>
                <div>{selectedComponent.tokens.map((token) => <span key={token}>{token}</span>)}</div>
              </div>
              <div className="doc-paths">
                <code>{selectedDocPaths.source}</code>
                <code>{selectedDocPaths.readme}</code>
                <code>{selectedDocPaths.spec}</code>
              </div>
              <Inline gap="sm">
                <a className="doc-link" href={selectedDocPaths.readmeUrl} target="_blank" rel="noreferrer">README</a>
                <a className="doc-link" href={selectedDocPaths.specUrl} target="_blank" rel="noreferrer">Spec</a>
              </Inline>
            </article>
          </div>
          <section className="coverage-panel" aria-labelledby="component-coverage-title">
            <div className="coverage-header">
              <div>
                <h3 id="component-coverage-title">컴포넌트 커버리지 매트릭스</h3>
                <p>카탈로그 기준으로 예시, 상태, NORMAL/DARK theme, README/spec 링크를 한 번에 확인합니다., states, NORMAL/DARK themes, and README/spec links from the catalog.</p>
              </div>
              <div className="coverage-summary" aria-label="커버리지 요약">
                <Badge label={`${coverageCounts.examples}/${componentCatalog.length} examples`} tone="success" />
                <Badge label={`${coverageCounts.docs}/${componentCatalog.length} docs`} tone="brand" />
                <Badge label={`${coverageCounts.themes} themes`} tone="neutral" />
              </div>
            </div>
            <div className="coverage-table-wrap">
              <table className="coverage-table">
                <caption>컴포넌트 예시와 문서 연결 상태</caption>
                <thead>
                  <tr>
                    <th scope="col">컴포넌트</th>
                    <th scope="col">예시</th>
                    <th scope="col">상태 커버리지</th>
                    <th scope="col">테마</th>
                    <th scope="col">문서</th>
                  </tr>
                </thead>
                <tbody>
                  {coverageRows.map(({ component, docPaths, hasExample, coveredStates }) => (
                    <tr key={component.name}>
                      <th scope="row">
                        <a href={`#component-${component.slug}`}>{component.name}</a>
                        <span>{component.category} · {component.priority}</span>
                      </th>
                      <td><Badge label={hasExample ? "렌더링됨" : "필요"} tone={hasExample ? "success" : "warning"} /></td>
                      <td>
                        <div className="coverage-state-list">
                          {coveredStates.map((state) => <span key={state}>{state}</span>)}
                        </div>
                      </td>
                      <td>NORMAL, DARK</td>
                      <td>
                        <Inline gap="sm">
                          <a href={docPaths.readmeUrl} target="_blank" rel="noreferrer">README</a>
                          <a href={docPaths.specUrl} target="_blank" rel="noreferrer">Spec</a>
                        </Inline>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div className="component-list">
            {componentCatalog.map((component) => {
              const example = showcase[component.name];
              const summary = summaries.get(component.name);
              const docPaths = getComponentDocPaths(component);
              return (
                <article className="component-card" id={`component-${component.slug}`} key={component.name}>
                  <div className="component-info">
                    <h3>{component.name}</h3>
                    <p className="component-meta">{component.priority} · {component.category} · {component.status}</p>
                    <p className="component-copy">{summary?.summary} {summary?.purpose}</p>
                    <Inline gap="sm">
                      <a className="doc-link" href={docPaths.readmeUrl} target="_blank" rel="noreferrer">README</a>
                      <a className="doc-link" href={docPaths.specUrl} target="_blank" rel="noreferrer">Spec</a>
                    </Inline>
                    <div className="code-block"><pre><code>{example?.code ?? `import { ${component.name} } from "@bling-lab/ui";`}</code></pre></div>
                  </div>
                  <div className="preview" aria-label={`${component.name} 미리보기`}>
                    {example?.preview ?? <EmptyState title={`${component.name} 예시 없음`} />}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="example" eyebrow="예시" title="조합 예시">
          <Container size="xl">
            <Row gap="lg">
              <Col span={12} md={6}>
                <Stack className="sample-form">
                  <TextField label="프로젝트 이름" defaultValue="Design System Docs" />
                  <Select label="상태" defaultValue="ready" options={[{ label: "준비", value: "ready" }, { label: "초안", value: "draft" }]} />
                  <Inline justify="end" gap="sm">
                    <Button variant="outline" tone="neutral">취소</Button>
                    <Button>저장</Button>
                  </Inline>
                </Stack>
              </Col>
              <Col span={12} md={6}>
                <Card title="문서 앱의 역할" description="이 영역도 실제 React export를 조합해 렌더링합니다.">
                  <Alert tone="info" title="실제 컴포넌트 사용 중" description="@bling-lab/ui에서 import한 React 컴포넌트입니다." />
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
    <section className="section" id={id} tabIndex={-1} aria-labelledby={`${id}-title`}>
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
