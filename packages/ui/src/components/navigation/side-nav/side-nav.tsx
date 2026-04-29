import { useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { useControllableState } from "../../../shared/use-controllable-state";
import { classNames } from "../../../shared/utils";

export interface SideNavItem {
  label: ReactNode;
  value: string;
  href?: string;
  disabled?: boolean;
  badge?: ReactNode;
}

export interface SideNavSection {
  title?: ReactNode;
  items: SideNavItem[];
}

export interface SideNavProps extends Omit<HTMLAttributes<HTMLElement>, "defaultValue" | "onChange"> {
  sections?: SideNavSection[];
  value?: string;
  defaultValue?: string;
  label?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  onValueChange?: (value: string) => void;
}

export function SideNav({ sections = [], value, defaultValue, label = "사이드 내비게이션 / Side navigation", collapsible = false, collapsed = false, onValueChange, className, ...props }: SideNavProps) {
  const flatItems = sections.flatMap((section) => section.items);
  const fallbackValue = defaultValue ?? flatItems[0]?.value ?? "";
  const [currentValue, setCurrentValue] = useControllableState({ value, defaultValue: fallbackValue, onChange: onValueChange });
  const navRef = useRef<HTMLElement>(null);
  const enabledItems = flatItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.disabled);
  const focusItem = (enabledIndex: number) => {
    const nextIndex = (enabledIndex + enabledItems.length) % enabledItems.length;
    const nextItem = enabledItems[nextIndex];
    if (!nextItem) return;
    navRef.current?.querySelectorAll<HTMLElement>(".ds-SideNav-item:not(:disabled)")[nextIndex]?.focus();
  };
  const onItemKeyDown = (event: KeyboardEvent<HTMLElement>, item: SideNavItem, flatIndex: number) => {
    const enabledIndex = enabledItems.findIndex((enabledItem) => enabledItem.index === flatIndex);
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
  let flatIndex = 0;

  return (
    <nav className={classNames("ds-SideNav", className)} data-collapsible={collapsible ? "true" : undefined} data-collapsed={collapsed ? "true" : undefined} aria-label={label} ref={navRef} {...props}>
      {sections.map((section, sectionIndex) => (
        <div className="ds-SideNav-section" key={sectionIndex}>
          {section.title ? <strong className="ds-SideNav-title">{section.title}</strong> : null}
          <ul className="ds-SideNav-list">
            {section.items.map((item) => {
              const itemIndex = flatIndex;
              flatIndex += 1;
              const selected = item.value === currentValue;
              const content = (
                <>
                  <span className="ds-SideNav-label">{item.label}</span>
                  {item.badge ? <span className="ds-SideNav-badge">{item.badge}</span> : null}
                </>
              );
              return (
                <li key={item.value}>
                  {item.href ? (
                    <a className="ds-SideNav-item" data-selected={selected ? "true" : undefined} aria-current={selected ? "page" : undefined} href={item.href} onClick={() => setCurrentValue(item.value)} onKeyDown={(event) => onItemKeyDown(event, item, itemIndex)}>{content}</a>
                  ) : (
                    <button className="ds-SideNav-item" data-selected={selected ? "true" : undefined} disabled={item.disabled} type="button" onClick={() => setCurrentValue(item.value)} onKeyDown={(event) => onItemKeyDown(event, item, itemIndex)}>{content}</button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
