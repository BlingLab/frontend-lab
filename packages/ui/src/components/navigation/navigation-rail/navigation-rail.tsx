import { useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
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
  const navRef = useRef<HTMLElement>(null);
  const enabledItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.disabled);
  const focusItem = (enabledIndex: number) => {
    const nextIndex = (enabledIndex + enabledItems.length) % enabledItems.length;
    const nextItem = enabledItems[nextIndex];
    if (!nextItem) return;
    navRef.current?.querySelectorAll<HTMLElement>(".ds-NavigationRail-item:not(:disabled)")[nextIndex]?.focus();
  };
  const onItemKeyDown = (event: KeyboardEvent<HTMLElement>, item: NavigationRailItem, index: number) => {
    const enabledIndex = enabledItems.findIndex((enabledItem) => enabledItem.index === index);
    if (enabledIndex < 0) return;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusItem(enabledIndex - 1);
    }
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusItem(enabledIndex + 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusItem(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      focusItem(enabledItems.length - 1);
    }
    if (event.key === "Enter") {
      setCurrentValue(item.value);
    }
    if (event.key === " ") {
      event.preventDefault();
      setCurrentValue(item.value);
    }
  };

  return (
    <nav className={classNames("ds-NavigationRail", className)} data-collapsed={collapsed ? "true" : undefined} aria-label={label} ref={navRef} {...props}>
      <ul className="ds-NavigationRail-list">
        {items.map((item, index) => {
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
                <a className="ds-NavigationRail-item" data-selected={selected ? "true" : undefined} aria-current={selected ? "page" : undefined} href={item.href} onClick={() => setCurrentValue(item.value)} onKeyDown={(event) => onItemKeyDown(event, item, index)}>{content}</a>
              ) : (
                <button className="ds-NavigationRail-item" data-selected={selected ? "true" : undefined} disabled={item.disabled} type="button" onClick={() => setCurrentValue(item.value)} onKeyDown={(event) => onItemKeyDown(event, item, index)}>{content}</button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
