import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { Field, type FieldProps } from "../field";
import type { FieldWidth, Size } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  resize?: "none" | "vertical";
  size?: Size;
  width?: FieldWidth;
  fieldProps?: Omit<FieldProps, "children" | "controlId" | "label" | "description" | "error" | "required" | "disabled">;
  textareaClassName?: string;
}

export function Textarea({
  label,
  description,
  error,
  required,
  disabled,
  id,
  className,
  textareaClassName,
  resize = "vertical",
  size = "md",
  width = "auto",
  fieldProps,
  rows = 4,
  ...props
}: TextareaProps) {
  const fallbackId = useId();
  const controlId = id ?? `textarea-${fallbackId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} controlId={controlId} width={width} className={className} {...fieldProps}>
      <textarea
        className={classNames("ds-Textarea", textareaClassName)}
        data-resize={resize}
        data-size={size}
        disabled={disabled}
        id={controlId}
        required={required}
        rows={rows}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error) || props["aria-invalid"] ? true : undefined}
        {...props}
      />
    </Field>
  );
}
