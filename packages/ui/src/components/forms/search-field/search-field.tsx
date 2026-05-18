import { useId, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { Icon } from "../../actions/icon";
import { Field, type FieldProps } from "../field";
import { useControllableState } from "../../../shared/use-controllable-state";
import type { FieldWidth, Size } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "onChange" | "prefix" | "size" | "type" | "value"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  size?: Size;
  width?: FieldWidth;
  fieldProps?: Omit<FieldProps, "children" | "controlId" | "label" | "description" | "error" | "required" | "disabled">;
  inputClassName?: string;
  resultsId?: string;
  clearLabel?: string;
}

export function SearchField({
  label = "검색",
  description,
  error,
  value,
  defaultValue = "",
  onValueChange,
  onClear,
  placeholder = "검색어 입력",
  required,
  disabled,
  id,
  className,
  inputClassName,
  size = "md",
  width = "auto",
  fieldProps,
  resultsId,
  clearLabel = "검색어 지우기",
  ...props
}: SearchFieldProps) {
  const fallbackId = useId();
  const controlId = id ?? `searchfield-${fallbackId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const [currentValue, setCurrentValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  });
  const hasValue = currentValue.length > 0;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(event.currentTarget.value);
  }

  function handleClear() {
    if (!hasValue || disabled) return;
    setCurrentValue("");
    onClear?.();
  }

  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} controlId={controlId} width={width} className={className} {...fieldProps}>
      <span className="ds-InputShell ds-SearchField-shell" data-size={size} data-disabled={disabled ? "true" : undefined} data-invalid={error ? "true" : undefined}>
        <span className="ds-InputShell-slot" data-position="start" aria-hidden="true">
          <Icon name="search" size="sm" />
        </span>
        <input
          {...props}
          className={classNames("ds-TextField", "ds-SearchField-input", inputClassName)}
          disabled={disabled}
          id={controlId}
          required={required}
          role="searchbox"
          type="search"
          value={currentValue}
          placeholder={placeholder}
          aria-controls={resultsId}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error) || props["aria-invalid"] ? true : undefined}
          onChange={handleChange}
        />
        <span className="ds-InputShell-slot" data-position="end">
          <button
            className="ds-SearchField-clear"
            type="button"
            disabled={disabled || !hasValue}
            aria-label={clearLabel}
            onClick={handleClear}
          >
            <Icon name="x" size="sm" />
          </button>
        </span>
      </span>
    </Field>
  );
}
