import "@bling-lab/ui/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Badge, Button, Card, DataGrid, Stack, TextField, componentCatalog } from "@bling-lab/ui";
import { Button as ButtonEntry } from "@bling-lab/ui/components/actions/button";
import { DataGrid as DataGridEntry } from "@bling-lab/ui/components/data-display/data-grid";

const rows = [
  { id: "ready", name: "루트 export", status: "통과" },
  { id: "entry", name: "개별 component export", status: "통과" }
];

function ConsumerFixture() {
  return (
    <main data-ds-theme="dark" style={{ padding: "24px" }}>
      <Stack gap="md">
        <Card
          eyebrow="외부 소비자"
          title="패키지 import 검증"
          description={`카탈로그 ${componentCatalog.length}개 항목을 루트 export에서 읽었습니다.`}
          actions={[{ label: "루트 action", variant: "outline", tone: "neutral" }]}
        >
          <Stack gap="sm">
            <TextField label="토큰 적용" defaultValue="data-ds-theme=dark" width="full" />
            <Button>루트 Button</Button>
            <ButtonEntry variant="outline" tone="neutral">개별 entry Button</ButtonEntry>
            <Badge label="styles.css import됨" tone="success" />
          </Stack>
        </Card>
        <DataGrid
          caption="루트 DataGrid"
          columns={[
            { key: "name", label: "이름" },
            { key: "status", label: "상태" }
          ]}
          rows={rows}
          rowKey={(row) => row.id}
        />
        <DataGridEntry
          caption="개별 entry DataGrid"
          columns={[
            { key: "name", label: "이름" },
            { key: "status", label: "상태" }
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
