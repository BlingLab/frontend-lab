import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { Field, type FieldProps } from "../field";
import type { FieldWidth, Size } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "size"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  size?: Size;
  width?: FieldWidth;
  prefix?: ReactNode;
  suffix?: ReactNode;
  fieldProps?: Omit<FieldProps, "children" | "controlId" | "label" | "description" | "error" | "required" | "disabled">;
  inputClassName?: string;
}

export function TextField({
  label,
  description,
  error,
  required,
  disabled,
  id,
  className,
  inputClassName,
  size = "md",
  width = "auto",
  prefix,
  suffix,
  fieldProps,
  ...props
}: TextFieldProps) {
  const fallbackId = useId();
  const controlId = id ?? `textfield-${fallbackId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} controlId={controlId} width={width} className={className} {...fieldProps}>
      <span className="ds-InputShell" data-size={size} data-disabled={disabled ? "true" : undefined} data-invalid={error ? "true" : undefined}>
        {prefix ? <span className="ds-InputShell-slot" data-position="start">{prefix}</span> : null}
        <input
          className={classNames("ds-TextField", inputClassName)}
          disabled={disabled}
          id={controlId}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error) || props["aria-invalid"] ? true : undefined}
          {...props}
        />
        {suffix ? <span className="ds-InputShell-slot" data-position="end">{suffix}</span> : null}
      </span>
    </Field>
  );
}
