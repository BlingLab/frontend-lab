import type { HTMLAttributes } from "react";
import type { Align, Gap, Justify } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
  align?: Align;
  justify?: Justify;
}

export function Row({ children, gap = "md", align = "stretch", justify = "start", className, ...props }: RowProps) {
  return <div className={classNames("ds-Row", className)} data-gap={gap} data-align={align} data-justify={justify} {...props}>{children}</div>;
}
