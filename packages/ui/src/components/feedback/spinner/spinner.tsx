import type { HTMLAttributes } from "react";
import type { Size, Tone } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export type SpinnerStatus = "status" | "decorative";

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  size?: Size;
  tone?: Tone;
  label?: string;
  status?: SpinnerStatus;
}

export function Spinner({
  size = "md",
  tone = "neutral",
  label = "불러오는 중",
  status = "status",
  className,
  ...props
}: SpinnerProps) {
  const isDecorative = status === "decorative";

  return (
    <span
      className={classNames("ds-Spinner", className)}
      data-size={size}
      data-tone={tone}
      role={isDecorative ? undefined : "status"}
      aria-hidden={isDecorative ? true : undefined}
      aria-live={isDecorative ? undefined : "polite"}
      {...props}
    >
      {isDecorative ? null : <span className="ds-SrOnly">{label}</span>}
    </span>
  );
}
