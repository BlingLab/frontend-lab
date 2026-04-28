import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../../shared/utils";

export interface ListItem {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}

export interface ListProps extends Omit<HTMLAttributes<HTMLUListElement>, "onSelect"> {
  items?: ListItem[];
  density?: "compact" | "md";
  dividers?: boolean;
  selectionMode?: "none" | "single";
  variant?: "bordered" | "plain";
  renderItem?: (item: ListItem, index: number) => ReactNode;
  onSelect?: (item: ListItem, index: number) => void;
}

export function List({ items = [], density = "md", dividers = true, selectionMode = "none", variant = "bordered", renderItem, onSelect, className, ...props }: ListProps) {
  return (
    <ul className={classNames("ds-List", className)} data-density={density} data-dividers={dividers ? "true" : "false"} data-selection-mode={selectionMode} data-variant={variant} {...props}>
      {items.map((item, index) => (
        <li className="ds-List-item" key={index} data-selected={item.selected ? "true" : undefined} data-disabled={item.disabled ? "true" : undefined}>
          {selectionMode !== "none" ? (
            <button className="ds-List-action" type="button" disabled={item.disabled} onClick={() => onSelect?.(item, index)}>
              {renderItem?.(item, index) ?? <ListItemContent item={item} />}
            </button>
          ) : renderItem?.(item, index) ?? <ListItemContent item={item} />}
        </li>
      ))}
      {items.length === 0 ? <li className="ds-List-empty">목록이 비어 있습니다. / The list is empty.</li> : null}
    </ul>
  );
}

function ListItemContent({ item }: { item: ListItem }) {
  return (
    <>
      {item.leading ? <span className="ds-List-leading">{item.leading}</span> : null}
      <div className="ds-List-content">
        <span className="ds-List-title">{item.title}</span>
        {item.description ? <span className="ds-List-description">{item.description}</span> : null}
      </div>
      {item.meta ? <span className="ds-List-meta">{item.meta}</span> : null}
      {item.trailing ? <span className="ds-List-trailing">{item.trailing}</span> : null}
    </>
  );
}
