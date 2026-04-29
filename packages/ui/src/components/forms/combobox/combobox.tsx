import { useId, useMemo, useState, type HTMLAttributes, type ReactNode } from "react";
import { Field, type FieldProps } from "../field";
import type { FieldWidth, Size } from "../../../shared/types";
import { useControllableState } from "../../../shared/use-controllable-state";
import { classNames } from "../../../shared/utils";

export interface ComboboxOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  keywords?: string[];
}

export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  value?: string;
  defaultValue?: string;
  options?: ComboboxOption[];
  placeholder?: string;
  emptyMessage?: ReactNode;
  size?: Size;
  width?: FieldWidth;
  disabled?: boolean;
  required?: boolean;
  fieldProps?: Omit<FieldProps, "children" | "controlId" | "label" | "description" | "error" | "required" | "disabled">;
  onValueChange?: (value: string) => void;
}

export function Combobox({
  label,
  description,
  error,
  value,
  defaultValue = "",
  options = [],
  placeholder = "검색 또는 선택 / Search or select",
  emptyMessage = "결과가 없습니다. / No results.",
  size = "md",
  width = "auto",
  disabled = false,
  required = false,
  fieldProps,
  onValueChange,
  className,
  ...props
}: ComboboxProps) {
  const fallbackId = useId();
  const controlId = `combobox-${fallbackId}`;
  const listboxId = `${controlId}-listbox`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useControllableState({
    value,
    defaultValue,
    onChange: onValueChange
  });
  const selectedOption = options.find((option) => option.value === selectedValue);
  const inputValue = open ? query : selectedOption?.label?.toString() ?? "";
  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return options;
    return options.filter((option) => {
      const haystack = [option.value, option.label?.toString(), ...(option.keywords ?? [])].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [options, query]);

  const selectOption = (option: ComboboxOption) => {
    if (option.disabled) return;
    setSelectedValue(option.value);
    setQuery("");
    setOpen(false);
  };

  return (
    <Field label={label} description={description} error={error} required={required} disabled={disabled} controlId={controlId} width={width} className={className} {...fieldProps}>
      <div className="ds-Combobox" data-size={size} data-state={open ? "open" : "closed"} data-disabled={disabled ? "true" : undefined} data-invalid={error ? "true" : undefined} {...props}>
        <input
          className="ds-Combobox-input"
          disabled={disabled}
          id={controlId}
          placeholder={placeholder}
          role="combobox"
          value={inputValue}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-invalid={Boolean(error) || undefined}
          aria-required={required || undefined}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <button className="ds-Combobox-toggle" type="button" disabled={disabled} aria-label="옵션 열기 / Open options" onMouseDown={(event) => event.preventDefault()} onClick={() => setOpen((currentOpen) => !currentOpen)}>
          v
        </button>
        <div className="ds-Combobox-listbox" id={listboxId} role="listbox" hidden={!open}>
          {filteredOptions.length > 0 ? filteredOptions.map((option) => (
            <button
              className="ds-Combobox-option"
              data-selected={option.value === selectedValue ? "true" : undefined}
              disabled={option.disabled}
              key={option.value}
              role="option"
              type="button"
              aria-selected={option.value === selectedValue}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </button>
          )) : <span className="ds-Combobox-empty">{emptyMessage}</span>}
        </div>
      </div>
    </Field>
  );
}
