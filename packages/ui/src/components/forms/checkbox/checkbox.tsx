import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import { classNames, dataFlag } from "../../../shared/utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
  indeterminate?: boolean;
  invalid?: boolean;
}

export function Checkbox({
  label = "Checkbox",
  description,
  indeterminate = false,
  disabled,
  invalid,
  className,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // indeterminate는 HTML attribute가 아니라 DOM property입니다. / `indeterminate` is a DOM property, not an HTML attribute.
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={classNames("ds-Checkbox", className)} data-disabled={dataFlag(disabled)} data-invalid={dataFlag(invalid)}>
      <input
        className="ds-Checkbox-input"
        type="checkbox"
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : props.checked}
        aria-invalid={invalid || undefined}
        ref={inputRef}
        {...props}
      />
      <span className="ds-Checkbox-box" aria-hidden="true" />
      <span className="ds-Checkbox-copy">
        <span className="ds-Checkbox-label">{label}</span>
        {description ? <span className="ds-Checkbox-description">{description}</span> : null}
      </span>
    </label>
  );
}
