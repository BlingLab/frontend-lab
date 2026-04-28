import type { HTMLAttributes } from "react";
import { classNames } from "../../../shared/utils";

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  span?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

export function Col({ children, span = 12, sm, md, lg, className, ...props }: ColProps) {
  return <div className={classNames("ds-Col", className)} data-span={span} data-sm={sm} data-md={md} data-lg={lg} {...props}>{children}</div>;
}
