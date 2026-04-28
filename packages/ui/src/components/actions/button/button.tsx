import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ActionTone, Justify, Size, Variant } from "../../../shared/types";
import { classNames, dataFlag } from "../../../shared/utils";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children?: ReactNode;
  label?: ReactNode;
  variant?: Variant;
  tone?: ActionTone;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  selected?: boolean;
  justify?: Justify;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

export function Button({
  children,
  label,
  variant = "solid",
  tone = "brand",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  selected = false,
  justify = "center",
  iconStart,
  iconEnd,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={classNames("ds-Button", className)}
      data-disabled={dataFlag(isDisabled)}
      data-loading={loading ? "true" : undefined}
      data-full-width={fullWidth ? "true" : undefined}
      data-selected={selected ? "true" : undefined}
      data-justify={justify}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      disabled={isDisabled}
      type={type}
      aria-busy={loading || undefined}
      aria-pressed={selected || undefined}
      {...props}
    >
      {loading ? <span className="ds-Spinner" aria-hidden="true" /> : null}
      {iconStart ? <span className="ds-Icon" aria-hidden="true">{iconStart}</span> : null}
      {children ?? label ?? "Button"}
      {iconEnd ? <span className="ds-Icon" aria-hidden="true">{iconEnd}</span> : null}
    </button>
  );
}
