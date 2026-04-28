import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../../shared/utils";

export interface DividerProps extends HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  label?: ReactNode;
}

export function Divider({ orientation = "horizontal", decorative = true, label, className, ...props }: DividerProps) {
  if (label) {
    return (
      <div className={classNames("ds-Divider", className)} data-orientation={orientation} data-labeled="true" role="separator" aria-orientation={orientation} {...props}>
        <span />
        <strong>{label}</strong>
        <span />
      </div>
    );
  }

  return <hr className={classNames("ds-Divider", className)} data-orientation={orientation} aria-hidden={decorative || undefined} aria-orientation={decorative ? undefined : orientation} {...props} />;
}
