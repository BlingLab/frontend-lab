import "@workspace/ui/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Badge, Button, Card, DataGrid, Stack, TextField, componentCatalog } from "@workspace/ui";
import { Button as ButtonEntry } from "@workspace/ui/components/actions/button";
import { DataGrid as DataGridEntry } from "@workspace/ui/components/data-display/data-grid";

const rows = [
  { id: "ready", name: "Root export", status: "통과 / Pass" },
  { id: "entry", name: "Per-component export", status: "통과 / Pass" }
];

function ConsumerFixture() {
  return (
    <main data-ds-theme="dark" style={{ padding: "24px" }}>
      <Stack gap="md">
        <Card
          eyebrow="외부 소비자 / External consumer"
          title="패키지 import 검증 / Package import verification"
          description={`catalog ${componentCatalog.length}개 항목을 root export에서 읽었습니다. / Read ${componentCatalog.length} catalog items from the root export.`}
          actions={[{ label: "Root action", variant: "outline", tone: "neutral" }]}
        >
          <Stack gap="sm">
            <TextField label="토큰 적용 / Token applied" defaultValue="data-ds-theme=dark" width="full" />
            <Button>Root Button</Button>
            <ButtonEntry variant="outline" tone="neutral">Entry Button</ButtonEntry>
            <Badge label="styles.css imported" tone="success" />
          </Stack>
        </Card>
        <DataGrid
          caption="Root DataGrid"
          columns={[
            { key: "name", label: "이름 / Name" },
            { key: "status", label: "상태 / Status" }
          ]}
          rows={rows}
          rowKey={(row) => row.id}
        />
        <DataGridEntry
          caption="Entry DataGrid"
          columns={[
            { key: "name", label: "이름 / Name" },
            { key: "status", label: "상태 / Status" }
          ]}
          rows={rows}
          rowKey={(row) => row.id}
        />
      </Stack>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConsumerFixture />
  </StrictMode>
);
