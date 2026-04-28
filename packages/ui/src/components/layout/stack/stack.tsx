import type { HTMLAttributes } from "react";
import type { Align, Gap } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
  align?: Align;
}

export function Stack({ children, gap = "md", align = "stretch", className, ...props }: StackProps) {
  return <div className={classNames("ds-Stack", className)} data-gap={gap} data-align={align} {...props}>{children}</div>;
}
