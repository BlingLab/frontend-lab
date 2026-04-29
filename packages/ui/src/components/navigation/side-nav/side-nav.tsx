import type { HTMLAttributes, ReactNode } from "react";
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
  const fallbackValue = defaultValue ?? sections.flatMap((section) => section.items)[0]?.value ?? "";
  const [currentValue, setCurrentValue] = useControllableState({ value, defaultValue: fallbackValue, onChange: onValueChange });

  return (
    <nav className={classNames("ds-SideNav", className)} data-collapsible={collapsible ? "true" : undefined} data-collapsed={collapsed ? "true" : undefined} aria-label={label} {...props}>
      {sections.map((section, sectionIndex) => (
        <div className="ds-SideNav-section" key={sectionIndex}>
          {section.title ? <strong className="ds-SideNav-title">{section.title}</strong> : null}
          <ul className="ds-SideNav-list">
            {section.items.map((item) => {
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
                    <a className="ds-SideNav-item" data-selected={selected ? "true" : undefined} aria-current={selected ? "page" : undefined} href={item.href} onClick={() => setCurrentValue(item.value)}>{content}</a>
                  ) : (
                    <button className="ds-SideNav-item" data-selected={selected ? "true" : undefined} disabled={item.disabled} type="button" onClick={() => setCurrentValue(item.value)}>{content}</button>
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
