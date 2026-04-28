import type { HTMLAttributes } from "react";
import type { Align, Gap, Justify } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
  align?: Align;
  justify?: Justify;
}

export function Inline({ children, gap = "md", align = "center", justify = "start", className, ...props }: InlineProps) {
  return <div className={classNames("ds-Inline", className)} data-gap={gap} data-align={align} data-justify={justify} {...props}>{children}</div>;
}
