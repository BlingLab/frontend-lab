import type { HTMLAttributes, ReactNode } from "react";
import type { Tone } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: ReactNode;
  tone?: Tone;
  variant?: "soft";
  size?: "sm" | "md";
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  removable?: boolean;
  removeLabel?: string;
  onRemove?: () => void;
}

export function Badge({
  children,
  label,
  tone = "neutral",
  variant = "soft",
  size = "md",
  iconStart,
  iconEnd,
  removable = false,
  removeLabel = "제거 / Remove",
  onRemove,
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={classNames("ds-Badge", className)} data-tone={tone} data-variant={variant} data-size={size} {...props}>
      {iconStart ? <span className="ds-Badge-icon" aria-hidden="true">{iconStart}</span> : null}
      {children ?? label ?? "Badge"}
      {iconEnd ? <span className="ds-Badge-icon" aria-hidden="true">{iconEnd}</span> : null}
      {removable ? (
        <button className="ds-Badge-remove" type="button" aria-label={removeLabel} onClick={onRemove}>
          x
        </button>
      ) : null}
    </span>
  );
}
