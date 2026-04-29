import { useId, useMemo, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { Field, type FieldProps } from "../field";
import { Icon } from "../../actions/icon";
import type { FieldWidth, Size } from "../../../shared/types";
import { useControllableState } from "../../../shared/use-controllable-state";
import { useListboxHighlight } from "../../../shared/use-listbox-highlight";
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
  const {
    highlightedIndex,
    highlightedItem: highlightedOption,
    highlightedItemId: highlightedOptionId,
    setHighlightedIndex,
    resetHighlight,
    highlightFirst,
    moveHighlight,
    getItemId
  } = useListboxHighlight({ items: filteredOptions, idBase: listboxId });

  const selectOption = (option: ComboboxOption) => {
    if (option.disabled) return;
    setSelectedValue(option.value);
    setQuery("");
    setOpen(false);
    resetHighlight();
  };
  const openListbox = () => {
    setOpen(true);
    if (highlightedIndex < 0) highlightFirst();
  };
  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) openListbox();
      else moveHighlight(1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) openListbox();
      else moveHighlight(-1);
    }
    if (event.key === "Enter" && open && highlightedOption) {
      event.preventDefault();
      selectOption(highlightedOption);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      resetHighlight();
    }
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
          aria-activedescendant={highlightedOptionId}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-invalid={Boolean(error) || undefined}
          aria-required={required || undefined}
          onBlur={() => window.setTimeout(() => {
            setOpen(false);
            resetHighlight();
          }, 120)}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={openListbox}
          onKeyDown={onInputKeyDown}
        />
        <button className="ds-Combobox-toggle" type="button" disabled={disabled} aria-label="옵션 열기 / Open options" onMouseDown={(event) => event.preventDefault()} onClick={() => setOpen((currentOpen) => !currentOpen)}>
          <Icon name="chevron-down" />
        </button>
        <div className="ds-Combobox-listbox" id={listboxId} role="listbox" hidden={!open}>
          {filteredOptions.length > 0 ? filteredOptions.map((option, index) => (
            <button
              className="ds-Combobox-option"
              data-selected={option.value === selectedValue ? "true" : undefined}
              data-highlighted={index === highlightedIndex ? "true" : undefined}
              disabled={option.disabled}
              id={getItemId(index)}
              key={option.value}
              role="option"
              type="button"
              aria-selected={option.value === selectedValue}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => {
                if (!option.disabled) setHighlightedIndex(index);
              }}
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
