import "@workspace/tokens/tokens.css";
import "@workspace/ui/styles.css";
import "../styles.css";

import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { Alert, Button, Combobox, CommandPalette, DataGrid, DatePicker, Dialog, DropdownMenu, FileUploader, NavigationRail, Popover, Stack, Stepper, Switch, Tabs, TextField } from "@workspace/ui";

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
      </header>
      <section className="smoke-grid" id="smoke-root">
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
        <SmokeCard title="DataGrid">
          <DataGrid columns={[{ key: "name", label: "이름 / Name" }]} rows={[{ name: "DatePicker" }]} />
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
