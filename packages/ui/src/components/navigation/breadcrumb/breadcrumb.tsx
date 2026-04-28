import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../../shared/utils";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items?: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}

export function Breadcrumb({ items = [], separator = "/", maxItems = Infinity, className, ...props }: BreadcrumbProps) {
  const visibleItems = items.length > maxItems
    ? [items[0], { label: "...", href: undefined }, ...items.slice(items.length - maxItems + 2)]
    : items;

  return (
    <nav className={classNames("ds-Breadcrumb", className)} aria-label="이동 경로 / Breadcrumb" {...props}>
      <ol className="ds-Breadcrumb-list">
        {visibleItems.map((item, index) => {
          const current = index === visibleItems.length - 1 || item.current;
          return (
            <li className="ds-Breadcrumb-item" key={index}>
              {item.href && !current ? <a href={item.href}>{item.label}</a> : <span aria-current={current ? "page" : undefined}>{item.label}</span>}
              {index < visibleItems.length - 1 ? <span className="ds-Breadcrumb-separator" aria-hidden="true">{separator}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
