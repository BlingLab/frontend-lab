import "@workspace/tokens/tokens.css";
import "@workspace/ui/styles.css";
import "../styles.css";

import { StrictMode, type ReactNode } from "react";
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
} from "@workspace/ui";

const docsRepositoryBaseUrl = "https://github.com/BlingLab/frontend-lab/tree/main";

function getComponentReadmeUrl(component: (typeof componentCatalog)[number]) {
  return `${docsRepositoryBaseUrl}/packages/ui/src/components/${component.category}/${component.slug}/README.md`;
}

function SmokeCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="smoke-card">
      <h2>{title}</h2>
      {children}
    </article>
  );
}

function SmokeApp() {
  return (
    <main className="smoke-page">
      <header>
        <h1>컴포넌트 smoke 확인 / Component Smoke Check</h1>
        <p>이 화면은 실제 `@workspace/ui` React export만 사용합니다. / This page uses only real `@workspace/ui` React exports.</p>
        <nav className="smoke-doc-links" aria-label="컴포넌트 문서 링크 / Component documentation links">
          {componentCatalog.map((component) => (
            <a href={getComponentReadmeUrl(component)} key={component.name} target="_blank" rel="noreferrer">{component.name}</a>
          ))}
        </nav>
      </header>
      <section className="smoke-grid" id="smoke-root">
        <SmokeCard title="Button">
          <Button iconStart={<Icon name="plus" />}>저장 / Save</Button>
        </SmokeCard>
        <SmokeCard title="IconButton">
          <IconButton label="검색 / Search" icon={<Icon name="search" />} />
        </SmokeCard>
        <SmokeCard title="Badge">
          <Badge label="준비 / Ready" tone="success" />
        </SmokeCard>
        <SmokeCard title="Alert">
          <Alert title="상태 / Status" description="정상 렌더링입니다. / Rendered correctly." />
        </SmokeCard>
        <SmokeCard title="Progress">
          <Progress label="완료율 / Completion" value={72} />
        </SmokeCard>
        <SmokeCard title="Skeleton">
          <Stack gap="sm">
            <Skeleton width="12rem" />
            <Skeleton width="8rem" />
          </Stack>
        </SmokeCard>
        <SmokeCard title="Toast">
          <Toast title="저장됨 / Saved" description="작업 결과입니다. / This is a task result." />
        </SmokeCard>
        <SmokeCard title="TextField">
          <TextField label="이름 / Name" defaultValue="frontend-lab" />
        </SmokeCard>
        <SmokeCard title="Textarea">
          <Textarea label="메모 / Note" defaultValue="긴 설명 / Long note" />
        </SmokeCard>
        <SmokeCard title="Select">
          <Select label="상태 / Status" defaultValue="ready" options={[{ label: "준비 / Ready", value: "ready" }]} />
        </SmokeCard>
        <SmokeCard title="Checkbox">
          <Checkbox label="알림 / Notifications" defaultChecked />
        </SmokeCard>
        <SmokeCard title="RadioGroup">
          <RadioGroup label="밀도 / Density" options={[{ label: "기본 / Default", value: "default" }]} />
        </SmokeCard>
        <SmokeCard title="Switch">
          <Switch label="자동 저장 / Autosave" defaultChecked />
        </SmokeCard>
        <SmokeCard title="DatePicker">
          <DatePicker label="시작일 / Start date" defaultValue="2026-04-29" />
        </SmokeCard>
        <SmokeCard title="Combobox">
          <Combobox label="담당자 / Owner" options={[{ label: "디자인 / Design", value: "design" }, { label: "프론트엔드 / Frontend", value: "frontend" }]} />
        </SmokeCard>
        <SmokeCard title="FileUploader">
          <FileUploader label="첨부 / Attachment" />
        </SmokeCard>
        <SmokeCard title="DropdownMenu">
          <DropdownMenu triggerLabel="작업 / Actions" items={[{ label: "편집 / Edit" }, { label: "복제 / Duplicate" }, { label: "삭제 / Delete" }]} />
        </SmokeCard>
        <SmokeCard title="Popover">
          <Popover triggerLabel="필터 / Filter" title="필터 옵션 / Filter options">
            <Alert title="옵션 표시 / Options visible" description="popover panel이 열렸습니다. / The popover panel is open." />
          </Popover>
        </SmokeCard>
        <SmokeCard title="Dialog">
          <Dialog
            triggerLabel="다이얼로그 열기 / Open dialog"
            title="확인 / Confirm"
            description="dialog 동작 확인입니다. / Dialog behavior check."
            actions={[{ label: "확인 / Confirm" }]}
          >
            <TextField label="이름 / Name" defaultValue="frontend-lab" />
          </Dialog>
        </SmokeCard>
        <SmokeCard title="Tabs">
          <Tabs items={[
            { label: "미리보기 / Preview", value: "preview", content: "첫 번째 panel / First panel" },
            { label: "코드 / Code", value: "code", content: "두 번째 panel / Second panel" }
          ]} />
        </SmokeCard>
        <SmokeCard title="CommandPalette">
          <CommandPalette commands={[{ label: "새 컴포넌트 / New component", value: "new" }]} />
        </SmokeCard>
        <SmokeCard title="Stepper">
          <Stepper steps={[{ label: "API", value: "api" }, { label: "검증 / Verify", value: "verify" }]} />
        </SmokeCard>
        <SmokeCard title="NavigationRail">
          <NavigationRail items={[{ label: "홈 / Home", value: "home" }, { label: "문서 / Docs", value: "docs" }]} />
        </SmokeCard>
        <SmokeCard title="SideNav">
          <SideNav sections={[{ title: "문서 / Docs", items: [{ label: "개요 / Overview", value: "overview" }] }]} />
        </SmokeCard>
        <SmokeCard title="Breadcrumb">
          <Breadcrumb items={[{ label: "홈 / Home", href: "#" }, { label: "현재 / Current", current: true }]} />
        </SmokeCard>
        <SmokeCard title="Pagination">
          <Pagination totalPages={5} defaultPage={2} />
        </SmokeCard>
        <SmokeCard title="DataGrid">
          <DataGrid columns={[{ key: "name", label: "이름 / Name" }]} rows={[{ name: "DatePicker" }]} />
        </SmokeCard>
        <SmokeCard title="Table">
          <Table columns={[{ key: "name", label: "이름 / Name" }]} rows={[{ name: "Button" }]} />
        </SmokeCard>
        <SmokeCard title="EmptyState">
          <EmptyState title="결과 없음 / No results" />
        </SmokeCard>
        <SmokeCard title="List">
          <List items={[{ title: "Button", description: "명령 / Command" }]} />
        </SmokeCard>
        <SmokeCard title="Card">
          <Card title="카드 / Card" description="surface 확인 / Surface check" />
        </SmokeCard>
        <SmokeCard title="Divider">
          <Stack gap="sm"><span>위 / Top</span><Divider /><span>아래 / Bottom</span></Stack>
        </SmokeCard>
        <SmokeCard title="Container">
          <Container size="sm"><Alert title="Container" /></Container>
        </SmokeCard>
        <SmokeCard title="RowCol">
          <Row gap="sm"><Col span={12} md={6}><Badge label="A" /></Col><Col span={12} md={6}><Badge label="B" /></Col></Row>
        </SmokeCard>
        <SmokeCard title="Inline">
          <Inline gap="sm"><Badge label="A" /><Badge label="B" tone="brand" /></Inline>
        </SmokeCard>
        <SmokeCard title="Tooltip">
          <Tooltip label="도움말 / Help" content="설명 / Description" />
        </SmokeCard>
        <SmokeCard title="Stack">
          <Stack gap="sm">
            <Button>저장 / Save</Button>
            <Button variant="outline" tone="neutral">취소 / Cancel</Button>
          </Stack>
        </SmokeCard>
      </section>
    </main>
  );
}

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <SmokeApp />
  </StrictMode>
);
