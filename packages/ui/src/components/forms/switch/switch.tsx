import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames, dataFlag } from "../../../shared/utils";
import { useControllableState } from "../../../shared/use-controllable-state";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  label = "Switch",
  checked,
  defaultChecked = false,
  disabled,
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  const [currentChecked, setCurrentChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange
  });

  return (
    <button
      className={classNames("ds-Switch", className)}
      data-disabled={dataFlag(disabled)}
      data-state={currentChecked ? "checked" : "unchecked"}
      type="button"
      role="switch"
      aria-checked={currentChecked}
      disabled={disabled}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (event.defaultPrevented) return;
        setCurrentChecked((previousChecked) => !previousChecked);
      }}
    >
      <span className="ds-Switch-track" aria-hidden="true">
        <span className="ds-Switch-thumb" />
      </span>
      <span className="ds-Switch-label">{label}</span>
    </button>
  );
}
