import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { Field, type FieldProps } from "../field";
import type { FieldWidth, Size } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "size" | "type"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  minDate?: string;
  maxDate?: string;
  size?: Size;
  width?: FieldWidth;
  fieldProps?: Omit<FieldProps, "children" | "controlId" | "label" | "description" | "error" | "required" | "disabled">;
  inputClassName?: string;
}

export function DatePicker({
  label,
  description,
  error,
  required,
  disabled,
  id,
  className,
  inputClassName,
  minDate,
  maxDate,
  size = "md",
  width = "auto",
  fieldProps,
  ...props
}: DatePickerProps) {
  const fallbackId = useId();
  const controlId = id ?? `date-picker-${fallbackId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} controlId={controlId} width={width} className={className} {...fieldProps}>
      <input
        className={classNames("ds-DatePicker", inputClassName)}
        data-size={size}
        disabled={disabled}
        id={controlId}
        max={maxDate}
        min={minDate}
        required={required}
        type="date"
        aria-describedby={describedBy}
        aria-invalid={Boolean(error) || props["aria-invalid"] ? true : undefined}
        {...props}
      />
    </Field>
  );
}
