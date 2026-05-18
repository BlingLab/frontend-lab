import "@workspace/tokens/tokens.css";
import "@bling-lab/ui/styles.css";
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
  InlineLoading,
  Inline,
  Link,
  List,
  NavigationRail,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Row,
  SearchField,
  Select,
  SideNav,
  Skeleton,
  Spinner,
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
        <h1>컴포넌트 smoke 확인</h1>
        <p>이 화면은 실제 `@bling-lab/ui` React export만 사용합니다.</p>
        <nav className="smoke-doc-links" aria-label="컴포넌트 문서 링크">
          {componentCatalog.map((component) => (
            <a href={getComponentReadmeUrl(component)} key={component.name} target="_blank" rel="noreferrer">{component.name}</a>
          ))}
        </nav>
      </header>
      <section className="smoke-grid" id="smoke-root">
        <SmokeCard title="Button">
          <Button iconStart={<Icon name="plus" />}>저장</Button>
        </SmokeCard>
        <SmokeCard title="IconButton">
          <IconButton label="검색" icon={<Icon name="search" />} />
        </SmokeCard>
        <SmokeCard title="Link">
          <Link href="/docs" external>문서 열기</Link>
        </SmokeCard>
        <SmokeCard title="Badge">
          <Badge label="준비" tone="success" />
        </SmokeCard>
        <SmokeCard title="Alert">
          <Alert title="상태" description="정상 렌더링입니다." />
        </SmokeCard>
        <SmokeCard title="Progress">
          <Progress label="완료율" value={72} />
        </SmokeCard>
        <SmokeCard title="Spinner">
          <Spinner label="목록을 불러오는 중" tone="brand" />
        </SmokeCard>
        <SmokeCard title="InlineLoading">
          <InlineLoading label="저장 중" description="상태를 확인하고 있습니다." tone="brand" />
        </SmokeCard>
        <SmokeCard title="Skeleton">
          <Stack gap="sm">
            <Skeleton width="12rem" />
            <Skeleton width="8rem" />
          </Stack>
        </SmokeCard>
        <SmokeCard title="Toast">
          <Toast title="저장됨" description="작업 결과입니다." />
        </SmokeCard>
        <SmokeCard title="TextField">
          <TextField label="이름" defaultValue="frontend-lab" />
        </SmokeCard>
        <SmokeCard title="SearchField">
          <SearchField label="컴포넌트 검색" defaultValue="button" resultsId="smoke-results" />
        </SmokeCard>
        <SmokeCard title="Textarea">
          <Textarea label="메모" defaultValue="긴 설명" />
        </SmokeCard>
        <SmokeCard title="Select">
          <Select label="상태" defaultValue="ready" options={[{ label: "준비", value: "ready" }]} />
        </SmokeCard>
        <SmokeCard title="Checkbox">
          <Checkbox label="알림" defaultChecked />
        </SmokeCard>
        <SmokeCard title="RadioGroup">
          <RadioGroup label="밀도" options={[{ label: "기본", value: "default" }]} />
        </SmokeCard>
        <SmokeCard title="Switch">
          <Switch label="자동 저장" defaultChecked />
        </SmokeCard>
        <SmokeCard title="DatePicker">
          <DatePicker label="시작일" defaultValue="2026-04-29" />
        </SmokeCard>
        <SmokeCard title="Combobox">
          <Combobox label="담당자" options={[{ label: "디자인", value: "design" }, { label: "프론트엔드", value: "frontend" }]} />
        </SmokeCard>
        <SmokeCard title="FileUploader">
          <FileUploader label="첨부" />
        </SmokeCard>
        <SmokeCard title="DropdownMenu">
          <DropdownMenu triggerLabel="작업" items={[{ label: "편집" }, { label: "복제" }, { label: "삭제" }]} />
        </SmokeCard>
        <SmokeCard title="Popover">
          <Popover triggerLabel="필터" title="필터 옵션">
            <Alert title="옵션 표시" description="popover panel이 열렸습니다." />
          </Popover>
        </SmokeCard>
        <SmokeCard title="Dialog">
          <Dialog
            triggerLabel="다이얼로그 열기"
            title="확인"
            description="dialog 동작 확인입니다."
            actions={[{ label: "확인" }]}
          >
            <TextField label="이름" defaultValue="frontend-lab" />
          </Dialog>
        </SmokeCard>
        <SmokeCard title="Tabs">
          <Tabs items={[
            { label: "미리보기", value: "preview", content: "첫 번째 panel" },
            { label: "코드", value: "code", content: "두 번째 panel" }
          ]} />
        </SmokeCard>
        <SmokeCard title="CommandPalette">
          <CommandPalette commands={[{ label: "새 컴포넌트", value: "new" }]} />
        </SmokeCard>
        <SmokeCard title="Stepper">
          <Stepper steps={[{ label: "API", value: "api" }, { label: "검증", value: "verify" }]} />
        </SmokeCard>
        <SmokeCard title="NavigationRail">
          <NavigationRail items={[{ label: "홈", value: "home" }, { label: "문서", value: "docs" }]} />
        </SmokeCard>
        <SmokeCard title="SideNav">
          <SideNav sections={[{ title: "문서", items: [{ label: "개요", value: "overview" }] }]} />
        </SmokeCard>
        <SmokeCard title="Breadcrumb">
          <Breadcrumb items={[{ label: "홈", href: "#" }, { label: "현재", current: true }]} />
        </SmokeCard>
        <SmokeCard title="Pagination">
          <Pagination totalPages={5} defaultPage={2} />
        </SmokeCard>
        <SmokeCard title="DataGrid">
          <DataGrid columns={[{ key: "name", label: "이름" }]} rows={[{ name: "DatePicker" }]} />
        </SmokeCard>
        <SmokeCard title="Table">
          <Table columns={[{ key: "name", label: "이름" }]} rows={[{ name: "Button" }]} />
        </SmokeCard>
        <SmokeCard title="EmptyState">
          <EmptyState title="결과 없음" />
        </SmokeCard>
        <SmokeCard title="List">
          <List items={[{ title: "Button", description: "명령" }]} />
        </SmokeCard>
        <SmokeCard title="Card">
          <Card title="카드" description="surface 확인" />
        </SmokeCard>
        <SmokeCard title="Divider">
          <Stack gap="sm"><span>위</span><Divider /><span>아래</span></Stack>
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
          <Tooltip label="도움말" content="설명" />
        </SmokeCard>
        <SmokeCard title="Stack">
          <Stack gap="sm">
            <Button>저장</Button>
            <Button variant="outline" tone="neutral">취소</Button>
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
