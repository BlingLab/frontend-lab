import { useId, useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { classNames } from "../../../shared/utils";
import { useControllableState } from "../../../shared/use-controllable-state";

export interface TabItem {
  label: ReactNode;
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items?: TabItem[];
  value?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
  variant?: "underline" | "pills" | "enclosed";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  keepMounted?: boolean;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  items = [],
  value,
  defaultValue,
  orientation = "horizontal",
  activationMode = "automatic",
  variant = "pills",
  size = "md",
  fullWidth = false,
  keepMounted = true,
  onValueChange,
  className,
  ...props
}: TabsProps) {
  const [selectedValue, setSelectedValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? items[0]?.value ?? "",
    onChange: onValueChange
  });
  const baseId = useId();
  const tabListRef = useRef<HTMLDivElement>(null);
  const enabledItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.disabled);
  const activate = (nextValue: string) => {
    setSelectedValue(nextValue);
  };
  const focusTab = (enabledIndex: number) => {
    const nextIndex = (enabledIndex + enabledItems.length) % enabledItems.length;
    const nextItem = enabledItems[nextIndex];
    if (!nextItem) return;
    tabListRef.current?.querySelectorAll<HTMLButtonElement>(".ds-Tabs-tab:not(:disabled)")[nextIndex]?.focus();
    if (activationMode === "automatic") activate(nextItem.item.value);
  };
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number, nextValue: string) => {
    const enabledIndex = enabledItems.findIndex((item) => item.index === index);
    const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (enabledIndex < 0) return;
    if (event.key === previousKey) {
      event.preventDefault();
      focusTab(enabledIndex - 1);
    }
    if (event.key === nextKey) {
      event.preventDefault();
      focusTab(enabledIndex + 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      focusTab(enabledItems.length - 1);
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate(nextValue);
    }
  };

  return (
    <div className={classNames("ds-Tabs", className)} data-orientation={orientation} data-activation-mode={activationMode} data-variant={variant} data-size={size} data-full-width={fullWidth ? "true" : undefined} {...props}>
      <div className="ds-Tabs-list" role="tablist" aria-orientation={orientation} ref={tabListRef}>
        {items.map((item, index) => {
          const selected = item.value === selectedValue;
          return (
            <button
              className="ds-Tabs-tab"
              disabled={item.disabled}
              id={`${baseId}-${item.value}-tab`}
              key={item.value}
              role="tab"
              type="button"
              aria-controls={`${baseId}-${item.value}-panel`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(item.value)}
              onKeyDown={(event) => onTabKeyDown(event, index, item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="ds-Tabs-panels">
        {items.map((item) => {
          const selected = item.value === selectedValue;
          if (!keepMounted && !selected) return null;
          return (
            <div
              className="ds-Tabs-panel"
              hidden={!selected}
              id={`${baseId}-${item.value}-panel`}
              key={item.value}
              role="tabpanel"
              aria-labelledby={`${baseId}-${item.value}-tab`}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
