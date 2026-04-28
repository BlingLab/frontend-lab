import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { Field, type FieldProps } from "../field";
import type { FieldWidth, Size } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "prefix" | "size"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  placeholder?: string;
  options?: SelectOption[];
  size?: Size;
  width?: FieldWidth;
  prefix?: ReactNode;
  suffix?: ReactNode;
  fieldProps?: Omit<FieldProps, "children" | "controlId" | "label" | "description" | "error" | "required" | "disabled">;
  selectClassName?: string;
}

export function Select({
  label,
  description,
  error,
  required,
  disabled,
  id,
  className,
  selectClassName,
  placeholder,
  options = [],
  size = "md",
  width = "auto",
  prefix,
  suffix,
  fieldProps,
  ...props
}: SelectProps) {
  const fallbackId = useId();
  const controlId = id ?? `select-${fallbackId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} controlId={controlId} width={width} className={className} {...fieldProps}>
      <span className="ds-InputShell" data-size={size} data-disabled={disabled ? "true" : undefined} data-invalid={error ? "true" : undefined}>
        {prefix ? <span className="ds-InputShell-slot" data-position="start">{prefix}</span> : null}
        <select
          className={classNames("ds-Select", selectClassName)}
          disabled={disabled}
          id={controlId}
          required={required}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error) || props["aria-invalid"] ? true : undefined}
          {...props}
        >
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {suffix ? <span className="ds-InputShell-slot" data-position="end">{suffix}</span> : null}
      </span>
    </Field>
  );
}
