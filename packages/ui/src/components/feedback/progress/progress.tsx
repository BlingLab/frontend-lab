import { useId, type HTMLAttributes, type ReactNode } from "react";
import type { Tone } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  value?: number;
  max?: number;
  indeterminate?: boolean;
  tone?: Tone;
}

export function Progress({ label, value, max = 100, indeterminate = false, tone = "brand", className, ...props }: ProgressProps) {
  const id = useId();

  return (
    <div className={classNames("ds-Progress", className)} data-tone={tone} data-indeterminate={indeterminate || undefined} {...props}>
      {label ? <label className="ds-Progress-label" htmlFor={id}>{label}</label> : null}
      <progress className="ds-Progress-bar" id={id} max={max} value={indeterminate ? undefined : value} />
      {!indeterminate && value !== undefined ? <span className="ds-Progress-value">{Math.round((value / max) * 100)}%</span> : null}
    </div>
  );
}
