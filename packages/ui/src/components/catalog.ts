export type ComponentStatus = "planned" | "draft" | "ready" | "stable";

export interface ComponentCategory {
  id: string;
  label: string;
  description: string;
}

export interface ComponentCatalogItem {
  name: string;
  slug: string;
  category: string;
  priority: "P0" | "P1" | "P2";
  status: ComponentStatus;
  summary: string;
  purpose: string;
  primitive: string;
  apg: string;
  props: string[];
  states: string[];
  tokens: string[];
}

export const componentStatuses: Record<ComponentStatus, string> = {
  planned: "Folder, README, and spec exist; implementation has not started.",
  draft: "Static API and accessibility contract are documented; implementation can start.",
  ready: "Implemented with examples and core accessibility checks.",
  stable: "Used by docs app, API reviewed, and covered by regression tests."
};

export const componentCategories: ComponentCategory[] = [
  {
    id: "actions",
    label: "Actions",
    description: "Trigger user intent through explicit commands."
  },
  {
    id: "forms",
    label: "Forms",
    description: "Collect, validate, and submit user input."
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Communicate status, progress, and system outcomes."
  },
  {
    id: "overlays",
    label: "Overlays",
    description: "Layer contextual or blocking UI over the current surface."
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Move across locations, sections, and related panels."
  },
  {
    id: "layout",
    label: "Layout",
    description: "Structure content and repeated product surfaces."
  },
  {
    id: "data-display",
    label: "Data Display",
    description: "Present collections, records, empty states, and tabular data."
  }
];

export const componentCatalog: ComponentCatalogItem[] = [
  {
    name: "Button",
    slug: "button",
    category: "actions",
    priority: "P0",
    status: "ready",
    summary: "Primary command control for explicit user actions.",
    purpose: "Use for form submission, confirmation, cancellation, or destructive actions.",
    primitive: "button",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/button/",
    props: ["variant", "tone", "size", "disabled", "loading", "type", "fullWidth", "selected", "justify", "iconStart", "iconEnd"],
    states: ["default", "hover", "focus-visible", "active", "disabled", "loading", "selected"],
    tokens: ["--ds-color-action-primary-bg", "--ds-radius-6", "--ds-focus-ring"]
  },
  {
    name: "IconButton",
    slug: "icon-button",
    category: "actions",
    priority: "P0",
    status: "ready",
    summary: "Compact icon-only action with a required accessible name.",
    purpose: "Use when space is constrained and the action can be represented by a familiar icon.",
    primitive: "button",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/button/",
    props: ["label", "icon", "variant", "tone", "size", "shape", "disabled", "loading"],
    states: ["default", "hover", "focus-visible", "active", "disabled", "loading"],
    tokens: ["--ds-color-action-primary-bg", "--ds-radius-6", "--ds-focus-ring"]
  },
  {
    name: "Field",
    slug: "field",
    category: "forms",
    priority: "P0",
    status: "ready",
    summary: "Shared label, description, error, and required marker wrapper for form controls.",
    purpose: "Use to normalize form copy, validation feedback, and accessible relationships.",
    primitive: "label and form control relationship",
    apg: "https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/",
    props: ["label", "description", "error", "required", "disabled", "controlId", "orientation", "width", "hideLabel"],
    states: ["default", "disabled", "invalid", "required"],
    tokens: ["--ds-color-text-primary", "--ds-color-text-muted", "--ds-color-feedback-danger"]
  },
  {
    name: "TextField",
    slug: "text-field",
    category: "forms",
    priority: "P0",
    status: "ready",
    summary: "Single-line text input with Field composition.",
    purpose: "Use for names, short descriptions, URLs, emails, search terms, and similar text values.",
    primitive: "input",
    apg: "https://html.spec.whatwg.org/multipage/input.html",
    props: ["value", "defaultValue", "placeholder", "type", "size", "width", "prefix", "suffix", "fieldProps", "inputClassName", "disabled", "readOnly", "invalid"],
    states: ["default", "hover", "focus-visible", "disabled", "read-only", "invalid"],
    tokens: ["--ds-color-bg-surface", "--ds-color-border-default", "--ds-focus-ring"]
  },
  {
    name: "Textarea",
    slug: "textarea",
    category: "forms",
    priority: "P1",
    status: "ready",
    summary: "Multi-line text entry with Field composition.",
    purpose: "Use for longer free-form content, comments, descriptions, or notes.",
    primitive: "textarea",
    apg: "https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element",
    props: ["value", "defaultValue", "placeholder", "rows", "resize", "size", "width", "fieldProps", "textareaClassName", "disabled", "readOnly", "invalid"],
    states: ["default", "hover", "focus-visible", "disabled", "read-only", "invalid"],
    tokens: ["--ds-color-bg-surface", "--ds-color-border-default", "--ds-focus-ring"]
  },
  {
    name: "Select",
    slug: "select",
    category: "forms",
    priority: "P0",
    status: "ready",
    summary: "Single option selection from a known set.",
    purpose: "Use native select first; move to custom listbox or combobox only when searchable or rich options are required.",
    primitive: "select or combobox/listbox pattern",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
    props: ["value", "defaultValue", "options", "placeholder", "size", "width", "prefix", "suffix", "fieldProps", "selectClassName", "disabled", "invalid"],
    states: ["default", "hover", "focus-visible", "open", "disabled", "invalid"],
    tokens: ["--ds-color-bg-surface", "--ds-color-border-default", "--ds-focus-ring"]
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    category: "forms",
    priority: "P0",
    status: "ready",
    summary: "Binary or mixed-state option control.",
    purpose: "Use for independent choices, agreement, or multi-select lists.",
    primitive: "input[type='checkbox']",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/",
    props: ["checked", "defaultChecked", "indeterminate", "disabled", "invalid"],
    states: ["unchecked", "checked", "indeterminate", "focus-visible", "disabled", "invalid"],
    tokens: ["--ds-color-action-primary-bg", "--ds-color-border-default", "--ds-focus-ring"]
  },
  {
    name: "RadioGroup",
    slug: "radio-group",
    category: "forms",
    priority: "P0",
    status: "ready",
    summary: "Mutually exclusive selection from a visible option set.",
    purpose: "Use when all choices should remain visible and only one value can be selected.",
    primitive: "fieldset with input[type='radio']",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/radio/",
    props: ["value", "defaultValue", "options", "orientation", "disabled", "invalid"],
    states: ["unchecked", "checked", "focus-visible", "disabled", "invalid"],
    tokens: ["--ds-color-action-primary-bg", "--ds-color-border-default", "--ds-focus-ring"]
  },
  {
    name: "Switch",
    slug: "switch",
    category: "forms",
    priority: "P0",
    status: "ready",
    summary: "Immediate on/off setting control.",
    purpose: "Use for settings that take effect immediately rather than form submission choices.",
    primitive: "button or input checkbox with switch semantics",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/switch/",
    props: ["checked", "defaultChecked", "disabled", "label", "onCheckedChange"],
    states: ["off", "on", "focus-visible", "disabled"],
    tokens: ["--ds-color-action-primary-bg", "--ds-color-border-default", "--ds-focus-ring"]
  },
  {
    name: "Alert",
    slug: "alert",
    category: "feedback",
    priority: "P0",
    status: "ready",
    summary: "Inline status message for important contextual feedback.",
    purpose: "Use for non-blocking information, success, warning, or error messages.",
    primitive: "role='status' or role='alert'",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/alert/",
    props: ["tone", "title", "description", "icon", "actions", "variant", "actionsPlacement", "dismissible", "dismissLabel", "onDismiss"],
    states: ["info", "success", "warning", "danger", "dismissible"],
    tokens: ["--ds-color-feedback-success", "--ds-color-feedback-warning", "--ds-color-feedback-danger"]
  },
  {
    name: "Toast",
    slug: "toast",
    category: "feedback",
    priority: "P1",
    status: "ready",
    summary: "Temporary global notification.",
    purpose: "Use for short-lived outcomes that should not interrupt the workflow.",
    primitive: "status region with dismiss control",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/alert/",
    props: ["tone", "title", "description", "duration", "dismissible", "dismissLabel", "actions", "onDismiss"],
    states: ["entering", "open", "exiting", "dismissed"],
    tokens: ["--ds-z-toast", "--ds-shadow-raised", "--ds-motion-duration-normal"]
  },
  {
    name: "Badge",
    slug: "badge",
    category: "feedback",
    priority: "P0",
    status: "ready",
    summary: "Small status or metadata label.",
    purpose: "Use to mark status, category, count, or short metadata in dense interfaces.",
    primitive: "span",
    apg: "",
    props: ["tone", "variant", "size", "iconStart", "iconEnd", "removable", "removeLabel", "onRemove"],
    states: ["neutral", "info", "success", "warning", "danger", "removable"],
    tokens: ["--ds-radius-pill", "--ds-color-bg-muted", "--ds-color-text-muted"]
  },
  {
    name: "Progress",
    slug: "progress",
    category: "feedback",
    priority: "P1",
    status: "ready",
    summary: "Determinate or indeterminate task progress.",
    purpose: "Use when users need to understand task completion or waiting state.",
    primitive: "progress",
    apg: "",
    props: ["value", "max", "label", "indeterminate", "tone"],
    states: ["determinate", "indeterminate", "complete"],
    tokens: ["--ds-color-action-primary-bg", "--ds-color-bg-muted", "--ds-motion-duration-normal"]
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    category: "feedback",
    priority: "P1",
    status: "ready",
    summary: "Placeholder surface for loading content.",
    purpose: "Use to preserve layout while asynchronous content loads.",
    primitive: "div with aria-hidden when decorative",
    apg: "",
    props: ["shape", "width", "height", "animated"],
    states: ["static", "animated"],
    tokens: ["--ds-color-bg-muted", "--ds-motion-duration-normal", "--ds-radius-6"]
  },
  {
    name: "Dialog",
    slug: "dialog",
    category: "overlays",
    priority: "P1",
    status: "ready",
    summary: "Modal surface that requires focused user attention.",
    purpose: "Use for confirmation, short forms, or tasks that must be completed before returning.",
    primitive: "dialog or modal dialog pattern",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    props: ["open", "defaultOpen", "onOpenChange", "modal", "size", "initialFocus", "closeLabel", "closeOnBackdropClick"],
    states: ["closed", "opening", "open", "closing"],
    tokens: ["--ds-z-dialog", "--ds-shadow-raised", "--ds-radius-8"]
  },
  {
    name: "Popover",
    slug: "popover",
    category: "overlays",
    priority: "P1",
    status: "ready",
    summary: "Non-modal contextual floating surface.",
    purpose: "Use for contextual details, filters, or lightweight controls anchored to a trigger.",
    primitive: "button plus positioned region",
    apg: "",
    props: ["open", "defaultOpen", "onOpenChange", "placement"],
    states: ["closed", "opening", "open", "closing"],
    tokens: ["--ds-z-popover", "--ds-shadow-raised", "--ds-radius-8"]
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "overlays",
    priority: "P1",
    status: "ready",
    summary: "Brief helper text for a focused or hovered control.",
    purpose: "Use to clarify icon-only or compact controls without replacing visible labels.",
    primitive: "tooltip pattern",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/",
    props: ["content", "placement", "delay", "disabled"],
    states: ["closed", "delayed-open", "open"],
    tokens: ["--ds-z-popover", "--ds-color-gray-900", "--ds-radius-4"]
  },
  {
    name: "DropdownMenu",
    slug: "dropdown-menu",
    category: "overlays",
    priority: "P1",
    status: "ready",
    summary: "Action menu opened from a trigger.",
    purpose: "Use for contextual commands, overflow actions, or compact action groups.",
    primitive: "menu button pattern",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/",
    props: ["open", "defaultOpen", "items", "placement", "onOpenChange"],
    states: ["closed", "open", "highlighted", "disabled"],
    tokens: ["--ds-z-dropdown", "--ds-shadow-raised", "--ds-radius-6"]
  },
  {
    name: "Tabs",
    slug: "tabs",
    category: "navigation",
    priority: "P0",
    status: "ready",
    summary: "Switch between related panels in the same context.",
    purpose: "Use for peer sections that share a page location and do not require full navigation.",
    primitive: "tabs pattern",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
    props: ["value", "defaultValue", "orientation", "activationMode", "variant", "size", "fullWidth", "keepMounted", "disabled"],
    states: ["selected", "unselected", "focus-visible", "disabled"],
    tokens: ["--ds-color-action-primary-bg", "--ds-color-border-default", "--ds-focus-ring"]
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    category: "navigation",
    priority: "P1",
    status: "ready",
    summary: "Hierarchical page location trail.",
    purpose: "Use to show parent locations and support quick navigation upward.",
    primitive: "nav with ordered list",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
    props: ["items", "separator", "maxItems"],
    states: ["current", "link"],
    tokens: ["--ds-color-text-muted", "--ds-color-action-primary-bg"]
  },
  {
    name: "Pagination",
    slug: "pagination",
    category: "navigation",
    priority: "P1",
    status: "ready",
    summary: "Navigate paged collections.",
    purpose: "Use for datasets that are split into pages and need direct or sequential navigation.",
    primitive: "nav with links or buttons",
    apg: "",
    props: ["page", "defaultPage", "totalPages", "siblingCount", "disabled", "onPageChange"],
    states: ["current", "available", "disabled"],
    tokens: ["--ds-color-border-default", "--ds-color-action-primary-bg", "--ds-focus-ring"]
  },
  {
    name: "Card",
    slug: "card",
    category: "layout",
    priority: "P0",
    status: "ready",
    summary: "Surface for grouping related content and actions.",
    purpose: "Use for repeated records, summary panels, or independent content groups.",
    primitive: "article or section",
    apg: "",
    props: ["title", "eyebrow", "description", "media", "meta", "actions", "footer", "variant", "density", "interactive", "selected", "fullWidth", "actionPlacement"],
    states: ["default", "hover", "focus-visible", "selected"],
    tokens: ["--ds-color-bg-surface", "--ds-color-border-default", "--ds-radius-8"]
  },
  {
    name: "Divider",
    slug: "divider",
    category: "layout",
    priority: "P1",
    status: "ready",
    summary: "Visual separator between related groups.",
    purpose: "Use to separate adjacent sections without introducing a new container.",
    primitive: "hr or role='separator'",
    apg: "",
    props: ["orientation", "decorative"],
    states: ["horizontal", "vertical"],
    tokens: ["--ds-color-border-default"]
  },
  {
    name: "Table",
    slug: "table",
    category: "data-display",
    priority: "P1",
    status: "ready",
    summary: "Structured rows and columns for comparable records.",
    purpose: "Use for dense data that benefits from scanning, sorting, and column alignment.",
    primitive: "table",
    apg: "https://www.w3.org/WAI/ARIA/apg/patterns/table/",
    props: ["columns", "rows", "density", "sortable", "selectionMode", "striped", "hoverable", "stickyHeader", "rowKey", "rowActions", "renderCell"],
    states: ["default", "hover", "sorted", "selected", "empty", "loading"],
    tokens: ["--ds-color-border-default", "--ds-color-bg-surface", "--ds-color-bg-muted"]
  },
  {
    name: "EmptyState",
    slug: "empty-state",
    category: "data-display",
    priority: "P1",
    status: "ready",
    summary: "Guidance shown when a view has no data.",
    purpose: "Use to explain why content is missing and offer the next useful action.",
    primitive: "section",
    apg: "",
    props: ["title", "description", "icon", "actions", "tone"],
    states: ["no-data", "filtered", "error", "permission"],
    tokens: ["--ds-color-text-muted", "--ds-color-bg-surface", "--ds-radius-8"]
  },
  {
    name: "List",
    slug: "list",
    category: "data-display",
    priority: "P1",
    status: "ready",
    summary: "Vertical collection of homogeneous items.",
    purpose: "Use for activity, options, navigation-adjacent records, or compact summaries.",
    primitive: "ul or ol",
    apg: "",
    props: ["items", "density", "dividers", "selectionMode", "variant", "renderItem", "leading", "trailing", "disabled", "selected"],
    states: ["default", "hover", "selected", "disabled", "empty", "loading"],
    tokens: ["--ds-color-border-default", "--ds-color-bg-surface", "--ds-space-4"]
  }
];
