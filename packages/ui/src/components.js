let idCounter = 0;

function createId(prefix = "ds") {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

function isNode(value) {
  return typeof Node !== "undefined" && value instanceof Node;
}

function appendContent(parent, content) {
  if (content === undefined || content === null || content === false) {
    return parent;
  }

  if (Array.isArray(content)) {
    content.forEach((item) => appendContent(parent, item));
    return parent;
  }

  if (isNode(content)) {
    parent.append(content);
    return parent;
  }

  parent.append(String(content));
  return parent;
}

function element(tagName, options = {}, children = []) {
  const node = document.createElement(tagName);
  const {
    className,
    text,
    html,
    attrs = {},
    dataset = {},
    events = {}
  } = options;

  if (className) {
    node.className = className;
  }

  Object.entries(attrs).forEach(([name, value]) => {
    if (value === undefined || value === null || value === false) {
      return;
    }

    if (value === true) {
      node.setAttribute(name, "");
      return;
    }

    node.setAttribute(name, String(value));
  });

  Object.entries(dataset).forEach(([name, value]) => {
    if (value !== undefined && value !== null) {
      node.dataset[name] = String(value);
    }
  });

  Object.entries(events).forEach(([name, handler]) => {
    if (typeof handler === "function") {
      node.addEventListener(name, handler);
    }
  });

  if (html !== undefined) {
    node.innerHTML = html;
  } else if (text !== undefined) {
    node.textContent = String(text);
  }

  appendContent(node, children);
  return node;
}

function setDisabled(node, disabled) {
  if (!disabled) {
    return;
  }

  node.disabled = true;
  node.dataset.disabled = "";
  node.setAttribute("aria-disabled", "true");
}

function normalizeActions(actions = []) {
  return actions
    .map((action) => (isNode(action) ? action : Button(action)))
    .filter(Boolean);
}

function withDocumentListener(type, handler) {
  if (typeof document === "undefined") {
    return () => {};
  }

  document.addEventListener(type, handler);
  return () => document.removeEventListener(type, handler);
}

function textContent(value, fallback = "") {
  return value === undefined || value === null ? fallback : String(value);
}

function iconNode(icon, fallback = "") {
  if (isNode(icon)) {
    return icon;
  }

  return element("span", {
    className: "ds-Icon",
    attrs: { "aria-hidden": "true" },
    text: textContent(icon, fallback)
  });
}

export function Button({
  children,
  label,
  variant = "solid",
  tone = "brand",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  iconStart,
  iconEnd,
  className = "",
  onClick,
  attrs = {}
} = {}) {
  const button = element("button", {
    className: `ds-Button ${className}`.trim(),
    attrs: {
      type,
      "aria-busy": loading ? "true" : undefined,
      ...attrs
    },
    dataset: { variant, tone, size, loading: loading ? "true" : undefined },
    events: { click: onClick }
  });

  setDisabled(button, disabled || loading);

  if (loading) {
    appendContent(button, element("span", {
      className: "ds-Spinner",
      attrs: { "aria-hidden": "true" }
    }));
  }

  if (iconStart) {
    appendContent(button, iconNode(iconStart));
  }

  appendContent(button, children ?? label ?? "Button");

  if (iconEnd) {
    appendContent(button, iconNode(iconEnd));
  }

  return button;
}

export function IconButton({
  label,
  icon = "+",
  variant = "ghost",
  tone = "neutral",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  attrs = {}
} = {}) {
  return Button({
    children: iconNode(icon),
    variant,
    tone,
    size,
    disabled,
    loading,
    onClick,
    className: "ds-IconButton",
    attrs: {
      "aria-label": label || "Icon button",
      ...attrs
    }
  });
}

export function Field({
  label,
  description,
  error,
  required = false,
  disabled = false,
  control,
  controlId = createId("field"),
  children
} = {}) {
  const root = element("div", {
    className: "ds-Field",
    dataset: {
      disabled: disabled ? "true" : undefined,
      invalid: error ? "true" : undefined
    }
  });
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ");

  if (label) {
    appendContent(root, element("label", {
      className: "ds-Field-label",
      attrs: { for: controlId }
    }, [
      label,
      required ? element("span", {
        className: "ds-Field-required",
        attrs: { "aria-hidden": "true" },
        text: "*"
      }) : null
    ]));
  }

  if (description) {
    appendContent(root, element("p", {
      className: "ds-Field-description",
      attrs: { id: descriptionId },
      text: description
    }));
  }

  const controlNode = control || children;
  if (isNode(controlNode)) {
    controlNode.id = controlNode.id || controlId;
    controlNode.disabled = Boolean(disabled || controlNode.disabled);
    if (required) {
      controlNode.required = true;
    }
    if (error) {
      controlNode.setAttribute("aria-invalid", "true");
    }
    if (describedBy) {
      controlNode.setAttribute("aria-describedby", describedBy);
    }
  }

  appendContent(root, controlNode);

  if (error) {
    appendContent(root, element("p", {
      className: "ds-Field-error",
      attrs: { id: errorId },
      text: error
    }));
  }

  return root;
}

export function TextField({
  label,
  description,
  error,
  required,
  disabled,
  value,
  defaultValue,
  placeholder,
  type = "text",
  readOnly = false,
  invalid = false,
  onInput,
  attrs = {}
} = {}) {
  const input = element("input", {
    className: "ds-TextField",
    attrs: {
      type,
      value,
      placeholder,
      readonly: readOnly,
      "aria-invalid": invalid || error ? "true" : undefined,
      ...attrs
    },
    events: { input: onInput }
  });

  if (defaultValue !== undefined && value === undefined) {
    input.defaultValue = defaultValue;
  }

  return Field({ label, description, error, required, disabled, control: input });
}

export function Textarea({
  label,
  description,
  error,
  required,
  disabled,
  value,
  defaultValue,
  placeholder,
  rows = 4,
  resize = "vertical",
  readOnly = false,
  onInput,
  attrs = {}
} = {}) {
  const textarea = element("textarea", {
    className: "ds-Textarea",
    attrs: {
      rows,
      placeholder,
      readonly: readOnly,
      ...attrs
    },
    dataset: { resize },
    events: { input: onInput }
  });

  if (value !== undefined) {
    textarea.value = value;
  } else if (defaultValue !== undefined) {
    textarea.defaultValue = defaultValue;
  }

  return Field({ label, description, error, required, disabled, control: textarea });
}

export function Select({
  label,
  description,
  error,
  required,
  disabled,
  value,
  defaultValue,
  placeholder,
  options = [],
  onChange,
  attrs = {}
} = {}) {
  const select = element("select", {
    className: "ds-Select",
    attrs,
    events: { change: onChange }
  });

  if (placeholder) {
    appendContent(select, element("option", {
      attrs: { value: "", disabled: true, selected: value === undefined && defaultValue === undefined },
      text: placeholder
    }));
  }

  options.forEach((option) => {
    const optionValue = typeof option === "object" ? option.value : option;
    const optionLabel = typeof option === "object" ? option.label : option;
    appendContent(select, element("option", {
      attrs: {
        value: optionValue,
        disabled: typeof option === "object" ? option.disabled : undefined
      },
      text: optionLabel
    }));
  });

  if (value !== undefined) {
    select.value = value;
  } else if (defaultValue !== undefined) {
    select.value = defaultValue;
  }

  return Field({ label, description, error, required, disabled, control: select });
}

export function Checkbox({
  label,
  description,
  checked = false,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  invalid = false,
  onChange,
  attrs = {}
} = {}) {
  const input = element("input", {
    className: "ds-Checkbox-input",
    attrs: {
      type: "checkbox",
      checked,
      "aria-invalid": invalid ? "true" : undefined,
      ...attrs
    },
    events: { change: onChange }
  });
  input.checked = defaultChecked ?? checked;
  input.indeterminate = indeterminate;
  setDisabled(input, disabled);

  return element("label", {
    className: "ds-Checkbox",
    dataset: { disabled: disabled ? "true" : undefined, invalid: invalid ? "true" : undefined }
  }, [
    input,
    element("span", { className: "ds-Checkbox-box", attrs: { "aria-hidden": "true" } }),
    element("span", { className: "ds-Checkbox-copy" }, [
      element("span", { className: "ds-Checkbox-label", text: label || "Checkbox" }),
      description ? element("span", { className: "ds-Checkbox-description", text: description }) : null
    ])
  ]);
}

export function RadioGroup({
  label,
  description,
  value,
  defaultValue,
  options = [],
  orientation = "vertical",
  disabled = false,
  invalid = false,
  onChange,
  name = createId("radio")
} = {}) {
  const legendId = createId("radio-legend");
  const root = element("fieldset", {
    className: "ds-RadioGroup",
    attrs: { "aria-labelledby": legendId, "aria-invalid": invalid ? "true" : undefined },
    dataset: { orientation, disabled: disabled ? "true" : undefined }
  });

  setDisabled(root, disabled);
  appendContent(root, element("legend", {
    className: "ds-RadioGroup-legend",
    attrs: { id: legendId },
    text: label || "Radio group"
  }));

  if (description) {
    appendContent(root, element("p", { className: "ds-RadioGroup-description", text: description }));
  }

  const current = value ?? defaultValue;
  const list = element("div", { className: "ds-RadioGroup-list" });
  options.forEach((option) => {
    const optionValue = typeof option === "object" ? option.value : option;
    const optionLabel = typeof option === "object" ? option.label : option;
    const input = element("input", {
      className: "ds-Radio-input",
      attrs: {
        type: "radio",
        name,
        value: optionValue,
        checked: optionValue === current,
        disabled: disabled || (typeof option === "object" ? option.disabled : false)
      },
      events: { change: onChange }
    });
    input.checked = optionValue === current;

    appendContent(list, element("label", { className: "ds-Radio" }, [
      input,
      element("span", { className: "ds-Radio-mark", attrs: { "aria-hidden": "true" } }),
      element("span", { text: optionLabel })
    ]));
  });

  appendContent(root, list);
  return root;
}

export function Switch({
  label,
  checked = false,
  defaultChecked,
  disabled = false,
  onChange
} = {}) {
  let currentChecked = Boolean(defaultChecked ?? checked);
  const button = element("button", {
    className: "ds-Switch",
    attrs: {
      type: "button",
      role: "switch",
      "aria-checked": String(currentChecked)
    },
    dataset: { state: currentChecked ? "checked" : "unchecked" },
    events: {
      click: (event) => {
        event.preventDefault();
        currentChecked = !currentChecked;
        button.setAttribute("aria-checked", String(currentChecked));
        button.dataset.state = currentChecked ? "checked" : "unchecked";
        onChange?.(currentChecked);
      }
    }
  }, [
    element("span", { className: "ds-Switch-track", attrs: { "aria-hidden": "true" } }, [
      element("span", { className: "ds-Switch-thumb" })
    ]),
    element("span", { className: "ds-Switch-label", text: label || "Switch" })
  ]);

  setDisabled(button, disabled);
  return button;
}

export function Badge({
  children,
  label,
  tone = "neutral",
  variant = "soft",
  size = "md"
} = {}) {
  return element("span", {
    className: "ds-Badge",
    dataset: { tone, variant, size },
    text: children ?? label ?? "Badge"
  });
}

export function Alert({
  tone = "info",
  title,
  description,
  icon = "i",
  actions = []
} = {}) {
  const role = tone === "danger" || tone === "warning" ? "alert" : "status";
  const root = element("section", {
    className: "ds-Alert",
    attrs: { role },
    dataset: { tone }
  }, [
    icon ? iconNode(icon) : null,
    element("div", { className: "ds-Alert-content" }, [
      title ? element("strong", { className: "ds-Alert-title", text: title }) : null,
      description ? element("p", { className: "ds-Alert-description", text: description }) : null
    ])
  ]);

  const actionNodes = normalizeActions(actions);
  if (actionNodes.length > 0) {
    appendContent(root, element("div", { className: "ds-Alert-actions" }, actionNodes));
  }

  return root;
}

export function Toast({
  tone = "info",
  title,
  description,
  dismissible = true,
  actions = [],
  duration,
  onDismiss
} = {}) {
  const root = element("section", {
    className: "ds-Toast",
    attrs: { role: "status" },
    dataset: { tone }
  }, [
    element("div", { className: "ds-Toast-content" }, [
      title ? element("strong", { className: "ds-Toast-title", text: title }) : null,
      description ? element("p", { className: "ds-Toast-description", text: description }) : null
    ])
  ]);

  const dismiss = () => {
    root.dataset.state = "dismissed";
    root.remove();
    onDismiss?.();
  };

  const actionNodes = normalizeActions(actions);
  if (actionNodes.length > 0 || dismissible) {
    appendContent(root, element("div", { className: "ds-Toast-actions" }, [
      actionNodes,
      dismissible ? IconButton({ label: "닫기 / Dismiss", icon: "x", size: "sm", onClick: dismiss }) : null
    ]));
  }

  if (duration) {
    window.setTimeout(dismiss, duration);
  }

  return root;
}

export function Progress({
  label,
  value,
  max = 100,
  indeterminate = false,
  tone = "brand"
} = {}) {
  const id = createId("progress");
  const progress = element("progress", {
    className: "ds-Progress-bar",
    attrs: {
      id,
      max,
      value: indeterminate ? undefined : value
    }
  });

  if (!indeterminate && value !== undefined) {
    progress.value = value;
  }

  return element("div", {
    className: "ds-Progress",
    dataset: { tone, indeterminate: indeterminate ? "true" : undefined }
  }, [
    label ? element("label", { className: "ds-Progress-label", attrs: { for: id }, text: label }) : null,
    progress,
    !indeterminate && value !== undefined ? element("span", {
      className: "ds-Progress-value",
      text: `${Math.round((value / max) * 100)}%`
    }) : null
  ]);
}

export function Skeleton({
  shape = "rect",
  width,
  height,
  animated = true,
  label = "콘텐츠 로딩 중 / Loading content"
} = {}) {
  const node = element("span", {
    className: "ds-Skeleton",
    attrs: { role: "status", "aria-label": label },
    dataset: { shape, animated: animated ? "true" : "false" }
  });

  if (width) {
    node.style.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height) {
    node.style.height = typeof height === "number" ? `${height}px` : height;
  }

  return node;
}

export function Dialog({
  triggerLabel = "열기 / Open",
  title,
  description,
  children,
  actions = [],
  size = "md",
  modal = true
} = {}) {
  const dialog = element("dialog", {
    className: "ds-Dialog",
    dataset: { size }
  });
  const titleId = createId("dialog-title");
  const descriptionId = description ? createId("dialog-description") : undefined;

  dialog.setAttribute("aria-labelledby", titleId);
  if (descriptionId) {
    dialog.setAttribute("aria-describedby", descriptionId);
  }

  const close = () => {
    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  };
  const open = () => {
    if (typeof dialog.showModal === "function" && modal) {
      dialog.showModal();
    } else if (typeof dialog.show === "function") {
      dialog.show();
    } else {
      dialog.setAttribute("open", "");
    }
  };

  appendContent(dialog, [
    element("div", { className: "ds-Dialog-header" }, [
      element("h3", { className: "ds-Dialog-title", attrs: { id: titleId }, text: title || "Dialog" }),
      IconButton({ label: "닫기 / Close", icon: "x", onClick: close })
    ]),
    description ? element("p", {
      className: "ds-Dialog-description",
      attrs: { id: descriptionId },
      text: description
    }) : null,
    element("div", { className: "ds-Dialog-body" }, children ?? "Dialog content"),
    element("div", { className: "ds-Dialog-actions" }, [
      normalizeActions(actions),
      Button({ label: "닫기 / Close", variant: "outline", tone: "neutral", onClick: close })
    ])
  ]);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      close();
    }
  });

  const root = element("div", { className: "ds-DialogRoot" }, [
    Button({ label: triggerLabel, onClick: open }),
    dialog
  ]);
  root.open = open;
  root.close = close;
  return root;
}

export function Popover({
  triggerLabel = "열기 / Open",
  title,
  children,
  placement = "bottom-start",
  modal = false
} = {}) {
  const buttonId = createId("popover-trigger");
  const panelId = createId("popover-panel");
  let cleanupOutsideClick = () => {};
  const panel = element("div", {
    className: "ds-Popover-panel",
    attrs: { id: panelId, role: modal ? "dialog" : "region", hidden: true },
    dataset: { placement, state: "closed" }
  }, [
    title ? element("strong", { className: "ds-Popover-title", text: title }) : null,
    element("div", { className: "ds-Popover-content" }, children ?? "Popover content")
  ]);
  const root = element("div", { className: "ds-Popover", dataset: { state: "closed" } });
  const setOpen = (open) => {
    panel.hidden = !open;
    panel.dataset.state = open ? "open" : "closed";
    root.dataset.state = open ? "open" : "closed";
    trigger.setAttribute("aria-expanded", String(open));

    cleanupOutsideClick();
    if (open) {
      cleanupOutsideClick = withDocumentListener("click", (event) => {
        if (!root.contains(event.target)) {
          setOpen(false);
        }
      });
    } else {
      cleanupOutsideClick = () => {};
    }
  };
  const trigger = Button({
    label: triggerLabel,
    variant: "outline",
    tone: "neutral",
    attrs: { id: buttonId, "aria-expanded": "false", "aria-controls": panelId },
    onClick: (event) => {
      event.stopPropagation();
      setOpen(panel.hidden);
    }
  });

  panel.addEventListener("click", (event) => event.stopPropagation());
  root.append(trigger, panel);
  return root;
}

export function Tooltip({
  label,
  content,
  placement = "top",
  delay = 0,
  disabled = false,
  trigger
} = {}) {
  const tooltipId = createId("tooltip");
  const tooltip = element("span", {
    className: "ds-Tooltip-content",
    attrs: { id: tooltipId, role: "tooltip", hidden: true },
    dataset: { placement },
    text: content || "Tooltip"
  });
  const triggerNode = trigger || Button({
    label: label || "?",
    variant: "outline",
    tone: "neutral"
  });
  let timer;
  const show = () => {
    if (disabled) {
      return;
    }
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      tooltip.hidden = false;
      triggerNode.setAttribute("aria-describedby", tooltipId);
    }, delay);
  };
  const hide = () => {
    window.clearTimeout(timer);
    tooltip.hidden = true;
    triggerNode.removeAttribute("aria-describedby");
  };

  triggerNode.addEventListener("mouseenter", show);
  triggerNode.addEventListener("focus", show);
  triggerNode.addEventListener("mouseleave", hide);
  triggerNode.addEventListener("blur", hide);

  return element("span", { className: "ds-Tooltip" }, [triggerNode, tooltip]);
}

export function DropdownMenu({
  triggerLabel = "메뉴 / Menu",
  items = [],
  placement = "bottom-start",
  onOpenChange
} = {}) {
  const menuId = createId("menu");
  let cleanupOutsideClick = () => {};
  const menu = element("div", {
    className: "ds-DropdownMenu-content",
    attrs: { id: menuId, role: "menu", hidden: true },
    dataset: { placement, state: "closed" }
  });
  const root = element("div", { className: "ds-DropdownMenu", dataset: { state: "closed" } });
  const trigger = Button({
    label: triggerLabel,
    variant: "outline",
    tone: "neutral",
    attrs: { "aria-haspopup": "menu", "aria-expanded": "false", "aria-controls": menuId }
  });
  const setOpen = (open) => {
    menu.hidden = !open;
    menu.dataset.state = open ? "open" : "closed";
    root.dataset.state = open ? "open" : "closed";
    trigger.setAttribute("aria-expanded", String(open));
    onOpenChange?.(open);

    cleanupOutsideClick();
    if (open) {
      cleanupOutsideClick = withDocumentListener("click", (event) => {
        if (!root.contains(event.target)) {
          setOpen(false);
        }
      });
    } else {
      cleanupOutsideClick = () => {};
    }
  };

  items.forEach((item) => {
    const button = element("button", {
      className: "ds-DropdownMenu-item",
      attrs: {
        type: "button",
        role: "menuitem",
        disabled: item.disabled
      },
      events: {
        click: (event) => {
          event.stopPropagation();
          item.onSelect?.(item);
          setOpen(false);
        }
      },
      text: item.label || item
    });
    appendContent(menu, button);
  });

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(menu.hidden);
  });
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
      menu.querySelector("[role='menuitem']")?.focus();
    }
  });
  menu.addEventListener("click", (event) => event.stopPropagation());
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      trigger.focus();
    }
  });

  root.append(trigger, menu);
  return root;
}

export function Tabs({
  items = [],
  value,
  defaultValue,
  orientation = "horizontal",
  activationMode = "automatic",
  onValueChange
} = {}) {
  const root = element("div", {
    className: "ds-Tabs",
    dataset: { orientation, activationMode }
  });
  const tabList = element("div", {
    className: "ds-Tabs-list",
    attrs: { role: "tablist", "aria-orientation": orientation }
  });
  const panels = element("div", { className: "ds-Tabs-panels" });
  const selected = value ?? defaultValue ?? items[0]?.value ?? items[0]?.label;

  const activate = (nextValue) => {
    root.querySelectorAll("[role='tab']").forEach((tab) => {
      const active = tab.dataset.value === nextValue;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    root.querySelectorAll("[role='tabpanel']").forEach((panel) => {
      panel.hidden = panel.dataset.value !== nextValue;
    });
    onValueChange?.(nextValue);
  };

  items.forEach((item, index) => {
    const itemValue = item.value ?? item.label;
    const tabId = createId("tab");
    const panelId = createId("panel");
    const active = itemValue === selected;
    const tab = element("button", {
      className: "ds-Tabs-tab",
      attrs: {
        type: "button",
        role: "tab",
        id: tabId,
        "aria-selected": String(active),
        "aria-controls": panelId,
        tabindex: active ? 0 : -1,
        disabled: item.disabled
      },
      dataset: { value: itemValue },
      events: { click: () => activate(itemValue) },
      text: item.label || `Tab ${index + 1}`
    });
    const panel = element("div", {
      className: "ds-Tabs-panel",
      attrs: {
        id: panelId,
        role: "tabpanel",
        "aria-labelledby": tabId,
        hidden: !active
      },
      dataset: { value: itemValue }
    }, item.content);

    appendContent(tabList, tab);
    appendContent(panels, panel);
  });

  appendContent(root, [tabList, panels]);
  return root;
}

export function Breadcrumb({
  items = [],
  separator = "/",
  maxItems = Infinity
} = {}) {
  const visibleItems = items.length > maxItems
    ? [items[0], { label: "...", href: null }, ...items.slice(items.length - maxItems + 2)]
    : items;
  const list = element("ol", { className: "ds-Breadcrumb-list" });

  visibleItems.forEach((item, index) => {
    const current = index === visibleItems.length - 1 || item.current;
    const content = item.href && !current
      ? element("a", { attrs: { href: item.href }, text: item.label })
      : element("span", { attrs: { "aria-current": current ? "page" : undefined }, text: item.label });

    appendContent(list, element("li", { className: "ds-Breadcrumb-item" }, [
      content,
      index < visibleItems.length - 1 ? element("span", {
        className: "ds-Breadcrumb-separator",
        attrs: { "aria-hidden": "true" },
        text: separator
      }) : null
    ]));
  });

  return element("nav", {
    className: "ds-Breadcrumb",
    attrs: { "aria-label": "이동 경로 / Breadcrumb" }
  }, list);
}

export function Pagination({
  page = 1,
  totalPages = 1,
  siblingCount = 1,
  disabled = false,
  onPageChange
} = {}) {
  const root = element("nav", {
    className: "ds-Pagination",
    attrs: { "aria-label": "페이지 / Pagination" }
  });
  const list = element("div", { className: "ds-Pagination-list" });
  let currentPage = page;

  const render = () => {
    list.replaceChildren();
    const start = Math.max(1, currentPage - siblingCount);
    const end = Math.min(totalPages, currentPage + siblingCount);
    const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
    const go = (nextPage) => {
      currentPage = Math.min(totalPages, Math.max(1, nextPage));
      onPageChange?.(currentPage);
      render();
    };

    appendContent(list, Button({
      label: "이전 / Prev",
      variant: "outline",
      tone: "neutral",
      size: "sm",
      disabled: disabled || currentPage === 1,
      onClick: () => go(currentPage - 1)
    }));

    pages.forEach((pageNumber) => {
      appendContent(list, Button({
        label: pageNumber,
        variant: pageNumber === currentPage ? "solid" : "outline",
        tone: pageNumber === currentPage ? "brand" : "neutral",
        size: "sm",
        disabled,
        attrs: { "aria-current": pageNumber === currentPage ? "page" : undefined },
        onClick: () => go(pageNumber)
      }));
    });

    appendContent(list, Button({
      label: "다음 / Next",
      variant: "outline",
      tone: "neutral",
      size: "sm",
      disabled: disabled || currentPage === totalPages,
      onClick: () => go(currentPage + 1)
    }));
  };

  render();
  appendContent(root, list);
  return root;
}

export function Container({
  children,
  size = "lg",
  className = "",
  attrs = {}
} = {}) {
  return element("div", {
    className: `ds-Container ${className}`.trim(),
    attrs,
    dataset: { size }
  }, children);
}

export function Row({
  children,
  gap = "md",
  align = "stretch",
  justify = "start",
  className = "",
  attrs = {}
} = {}) {
  return element("div", {
    className: `ds-Row ${className}`.trim(),
    attrs,
    dataset: { gap, align, justify }
  }, children);
}

export function Col({
  children,
  span = 12,
  sm,
  md,
  lg,
  className = "",
  attrs = {}
} = {}) {
  return element("div", {
    className: `ds-Col ${className}`.trim(),
    attrs,
    dataset: { span, sm, md, lg }
  }, children);
}

export function Stack({
  children,
  gap = "md",
  align = "stretch",
  className = "",
  attrs = {}
} = {}) {
  return element("div", {
    className: `ds-Stack ${className}`.trim(),
    attrs,
    dataset: { gap, align }
  }, children);
}

export function Inline({
  children,
  gap = "md",
  align = "center",
  justify = "start",
  className = "",
  attrs = {}
} = {}) {
  return element("div", {
    className: `ds-Inline ${className}`.trim(),
    attrs,
    dataset: { gap, align, justify }
  }, children);
}

export function Card({
  title,
  description,
  children,
  actions = [],
  footer,
  variant = "surface",
  density = "md",
  interactive = false
} = {}) {
  const actionNodes = normalizeActions(actions);
  const root = element(interactive ? "button" : "article", {
    className: "ds-Card",
    attrs: { type: interactive ? "button" : undefined },
    dataset: { variant, density, interactive: interactive ? "true" : undefined }
  }, [
    title || description ? element("div", { className: "ds-Card-header" }, [
      title ? element("h3", { className: "ds-Card-title", text: title }) : null,
      description ? element("p", { className: "ds-Card-description", text: description }) : null
    ]) : null,
    children ? element("div", { className: "ds-Card-body" }, children) : null,
    actionNodes.length > 0 ? element("div", { className: "ds-Card-actions" }, actionNodes) : null,
    footer ? element("div", { className: "ds-Card-footer" }, footer) : null
  ]);

  return root;
}

export function Divider({
  orientation = "horizontal",
  decorative = true,
  label
} = {}) {
  if (label) {
    return element("div", {
      className: "ds-Divider",
      attrs: { role: "separator", "aria-orientation": orientation },
      dataset: { orientation, labeled: "true" }
    }, [
      element("span"),
      element("strong", { text: label }),
      element("span")
    ]);
  }

  return element("hr", {
    className: "ds-Divider",
    attrs: decorative ? { "aria-hidden": "true" } : { role: "separator", "aria-orientation": orientation },
    dataset: { orientation }
  });
}

export function Table({
  caption,
  columns = [],
  rows = [],
  density = "md",
  sortable = false,
  selectionMode = "none",
  onSort,
  onSelectionChange
} = {}) {
  const table = element("table", {
    className: "ds-Table",
    dataset: { density, selectionMode }
  });
  const selected = new Set();

  if (caption) {
    appendContent(table, element("caption", { text: caption }));
  }

  const thead = element("thead");
  const headerRow = element("tr");
  if (selectionMode === "multiple") {
    appendContent(headerRow, element("th", { attrs: { scope: "col" } }));
  }

  columns.forEach((column) => {
    const th = element("th", { attrs: { scope: "col" } });
    const canSort = sortable || column.sortable;
    if (canSort) {
      appendContent(th, element("button", {
        className: "ds-Table-sort",
        attrs: { type: "button" },
        events: { click: () => onSort?.(column.key) },
        text: `${column.label} ↕`
      }));
    } else {
      th.textContent = column.label;
    }
    appendContent(headerRow, th);
  });
  appendContent(thead, headerRow);

  const tbody = element("tbody");
  if (rows.length === 0) {
    appendContent(tbody, element("tr", {}, element("td", {
      className: "ds-Table-empty",
      attrs: { colspan: columns.length + (selectionMode === "multiple" ? 1 : 0) },
      text: "데이터가 없습니다. / No data."
    })));
  }

  rows.forEach((row, rowIndex) => {
    const tr = element("tr");
    if (selectionMode === "multiple") {
      const checkbox = Checkbox({
        label: `${rowIndex + 1}행 선택 / Select row ${rowIndex + 1}`,
        onChange: (event) => {
          if (event.target.checked) {
            selected.add(row);
          } else {
            selected.delete(row);
          }
          onSelectionChange?.([...selected]);
        }
      });
      checkbox.classList.add("ds-Table-checkbox");
      appendContent(tr, element("td", {}, checkbox));
    }
    columns.forEach((column) => {
      appendContent(tr, element("td", {}, row[column.key]));
    });
    appendContent(tbody, tr);
  });

  appendContent(table, [thead, tbody]);
  return element("div", { className: "ds-TableWrap" }, table);
}

export function EmptyState({
  title,
  description,
  icon = "∅",
  actions = [],
  tone = "neutral"
} = {}) {
  const actionNodes = normalizeActions(actions);

  return element("section", {
    className: "ds-EmptyState",
    dataset: { tone }
  }, [
    icon ? element("div", { className: "ds-EmptyState-icon", attrs: { "aria-hidden": "true" }, text: icon }) : null,
    element("h3", { className: "ds-EmptyState-title", text: title || "비어 있습니다 / Empty state" }),
    description ? element("p", { className: "ds-EmptyState-description", text: description }) : null,
    actionNodes.length > 0 ? element("div", { className: "ds-EmptyState-actions" }, actionNodes) : null
  ]);
}

export function List({
  items = [],
  density = "md",
  dividers = true,
  selectionMode = "none",
  onSelect
} = {}) {
  const list = element("ul", {
    className: "ds-List",
    dataset: { density, dividers: dividers ? "true" : "false", selectionMode }
  });

  items.forEach((item, index) => {
    const itemObject = typeof item === "object" ? item : { title: item };
    const content = element("div", { className: "ds-List-content" }, [
      element("span", { className: "ds-List-title", text: itemObject.title }),
      itemObject.description ? element("span", { className: "ds-List-description", text: itemObject.description }) : null
    ]);
    const li = element("li", { className: "ds-List-item" }, [
      selectionMode !== "none" ? element("button", {
        className: "ds-List-action",
        attrs: { type: "button" },
        events: { click: () => onSelect?.(itemObject, index) }
      }, content) : content,
      itemObject.meta ? element("span", { className: "ds-List-meta", text: itemObject.meta }) : null
    ]);
    appendContent(list, li);
  });

  if (items.length === 0) {
    appendContent(list, element("li", {
      className: "ds-List-empty",
      text: "목록이 비어 있습니다. / The list is empty."
    }));
  }

  return list;
}
