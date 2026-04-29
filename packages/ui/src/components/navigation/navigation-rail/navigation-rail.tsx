import type { HTMLAttributes, ReactNode } from "react";
import { useControllableState } from "../../../shared/use-controllable-state";
import { classNames } from "../../../shared/utils";

export interface NavigationRailItem {
  label: ReactNode;
  value: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
}

export interface NavigationRailProps extends Omit<HTMLAttributes<HTMLElement>, "defaultValue" | "onChange"> {
  items?: NavigationRailItem[];
  value?: string;
  defaultValue?: string;
  label?: string;
  collapsed?: boolean;
  onValueChange?: (value: string) => void;
}

export function NavigationRail({ items = [], value, defaultValue, label = "주요 내비게이션 / Primary navigation", collapsed = false, onValueChange, className, ...props }: NavigationRailProps) {
  const [currentValue, setCurrentValue] = useControllableState({ value, defaultValue: defaultValue ?? items[0]?.value ?? "", onChange: onValueChange });

  return (
    <nav className={classNames("ds-NavigationRail", className)} data-collapsed={collapsed ? "true" : undefined} aria-label={label} {...props}>
      <ul className="ds-NavigationRail-list">
        {items.map((item) => {
          const selected = item.value === currentValue;
          const content = (
            <>
              <span className="ds-NavigationRail-icon" aria-hidden="true">{item.icon ?? item.label?.toString().slice(0, 1)}</span>
              <span className="ds-NavigationRail-label">{item.label}</span>
            </>
          );
          return (
            <li key={item.value}>
              {item.href ? (
                <a className="ds-NavigationRail-item" data-selected={selected ? "true" : undefined} aria-current={selected ? "page" : undefined} href={item.href} onClick={() => setCurrentValue(item.value)}>{content}</a>
              ) : (
                <button className="ds-NavigationRail-item" data-selected={selected ? "true" : undefined} disabled={item.disabled} type="button" onClick={() => setCurrentValue(item.value)}>{content}</button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
