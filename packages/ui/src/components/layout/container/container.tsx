import type { HTMLAttributes } from "react";
import { classNames } from "../../../shared/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Container({ children, size = "lg", className, ...props }: ContainerProps) {
  return <div className={classNames("ds-Container", className)} data-size={size} {...props}>{children}</div>;
}
