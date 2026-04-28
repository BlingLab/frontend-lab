import type { CSSProperties, HTMLAttributes } from "react";
import { classNames } from "../../../shared/utils";

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: "rect" | "circle";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  animated?: boolean;
  label?: string;
}

export function Skeleton({ shape = "rect", width, height, animated = true, label = "콘텐츠 로딩 중 / Loading content", className, style, ...props }: SkeletonProps) {
  return (
    <span
      className={classNames("ds-Skeleton", className)}
      data-shape={shape}
      data-animated={animated ? "true" : "false"}
      role="status"
      aria-label={label}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
