import { useId, type HTMLAttributes, type ReactNode } from "react";
import type { FieldWidth } from "../../../shared/types";
import { classNames, dataFlag } from "../../../shared/utils";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  controlId?: string;
  orientation?: "vertical" | "horizontal";
  width?: FieldWidth;
  hideLabel?: boolean;
  children: ReactNode;
}

export function Field({
  label,
  description,
  error,
  required = false,
  disabled = false,
  controlId,
  orientation = "vertical",
  width = "auto",
  hideLabel = false,
  children,
  className,
  ...props
}: FieldProps) {
  const fallbackId = useId();
  const id = controlId ?? `field-${fallbackId}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div
      className={classNames("ds-Field", className)}
      data-disabled={dataFlag(disabled)}
      data-invalid={dataFlag(Boolean(error))}
      data-orientation={orientation}
      data-width={width}
      {...props}
    >
      {label ? (
        <label className={classNames("ds-Field-label", hideLabel && "ds-SrOnly")} htmlFor={id}>
          {label}
          {required ? <span className="ds-Field-required" aria-hidden="true">*</span> : null}
        </label>
      ) : null}
      <div className="ds-Field-control">
        {children}
      </div>
      {description ? <p className="ds-Field-description" id={descriptionId}>{description}</p> : null}
      {error ? <p className="ds-Field-error" id={errorId}>{error}</p> : null}
    </div>
  );
}
