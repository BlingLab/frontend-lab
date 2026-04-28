import { useId, type HTMLAttributes, type ReactNode } from "react";
import { classNames, dataFlag } from "../../../shared/utils";

export interface RadioOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  label?: ReactNode;
  description?: ReactNode;
  value?: string;
  defaultValue?: string;
  options?: RadioOption[];
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({
  label = "Radio group",
  description,
  value,
  defaultValue,
  options = [],
  orientation = "vertical",
  disabled,
  invalid,
  name,
  onValueChange,
  className,
  ...props
}: RadioGroupProps) {
  const fallbackName = useId();
  const groupName = name ?? `radio-${fallbackName}`;

  return (
    <fieldset
      className={classNames("ds-RadioGroup", className)}
      data-disabled={dataFlag(disabled)}
      data-orientation={orientation}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      {...props}
    >
      <legend className="ds-RadioGroup-legend">{label}</legend>
      {description ? <p className="ds-RadioGroup-description">{description}</p> : null}
      <div className="ds-RadioGroup-list">
        {options.map((option) => (
          <label className="ds-Radio" data-disabled={dataFlag(disabled || option.disabled)} key={option.value}>
            <input
              className="ds-Radio-input"
              type="radio"
              name={groupName}
              value={option.value}
              checked={value === undefined ? undefined : value === option.value}
              defaultChecked={defaultValue === option.value}
              disabled={disabled || option.disabled}
              onChange={() => onValueChange?.(option.value)}
            />
            <span className="ds-Radio-mark" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
