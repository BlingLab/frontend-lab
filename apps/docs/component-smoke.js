import {
  Alert,
  Button,
  Dialog,
  DropdownMenu,
  Popover,
  Switch,
  Tabs,
  TextField
} from "/ui/index.js";

function card(title, content) {
  const node = document.createElement("article");
  const heading = document.createElement("h2");

  node.className = "smoke-card";
  heading.textContent = title;
  node.append(heading, content);
  return node;
}

const root = document.querySelector("#smoke-root");

root.append(
  card("Switch", Switch({ label: "자동 저장 / Autosave", defaultChecked: true })),
  card(
    "DropdownMenu",
    DropdownMenu({
      triggerLabel: "작업 / Actions",
      items: [{ label: "편집 / Edit" }, { label: "복제 / Duplicate" }, { label: "삭제 / Delete" }]
    })
  ),
  card(
    "Popover",
    Popover({
      triggerLabel: "필터 / Filter",
      title: "필터 옵션 / Filter options",
      children: Alert({
        title: "옵션 표시 / Options visible",
        description: "popover panel이 열렸습니다. / The popover panel is open."
      })
    })
  ),
  card(
    "Dialog",
    Dialog({
      triggerLabel: "다이얼로그 열기 / Open dialog",
      title: "확인 / Confirm",
      description: "dialog 동작 확인입니다. / Dialog behavior check.",
      children: TextField({ label: "이름 / Name", defaultValue: "frontend-lab" }),
      actions: [Button({ label: "확인 / Confirm" })]
    })
  ),
  card(
    "Tabs",
    Tabs({
      items: [
        { label: "미리보기 / Preview", value: "preview", content: "첫 번째 panel / First panel" },
        { label: "코드 / Code", value: "code", content: "두 번째 panel / Second panel" }
      ]
    })
  )
);
