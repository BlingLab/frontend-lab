import { useId, type HTMLAttributes, type ReactNode } from "react";
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
  const activate = (nextValue: string) => {
    setSelectedValue(nextValue);
  };

  return (
    <div className={classNames("ds-Tabs", className)} data-orientation={orientation} data-activation-mode={activationMode} data-variant={variant} data-size={size} data-full-width={fullWidth ? "true" : undefined} {...props}>
      <div className="ds-Tabs-list" role="tablist" aria-orientation={orientation}>
        {items.map((item) => {
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
