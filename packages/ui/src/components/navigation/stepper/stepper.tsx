import type { HTMLAttributes, ReactNode } from "react";
import { useControllableState } from "../../../shared/use-controllable-state";
import { classNames } from "../../../shared/utils";

export interface StepperStep {
  label: ReactNode;
  value: string;
  description?: ReactNode;
  status?: "pending" | "active" | "complete" | "error";
  disabled?: boolean;
}

export interface StepperProps extends Omit<HTMLAttributes<HTMLElement>, "defaultValue" | "onChange"> {
  steps?: StepperStep[];
  value?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "dots" | "numbered";
  onValueChange?: (value: string) => void;
}

export function Stepper({ steps = [], value, defaultValue, orientation = "horizontal", variant = "numbered", onValueChange, className, ...props }: StepperProps) {
  const [currentValue, setCurrentValue] = useControllableState({ value, defaultValue: defaultValue ?? steps[0]?.value ?? "", onChange: onValueChange });
  const activeIndex = Math.max(0, steps.findIndex((step) => step.value === currentValue));

  return (
    <nav className={classNames("ds-Stepper", className)} data-orientation={orientation} data-variant={variant} aria-label="단계 / Steps" {...props}>
      <ol className="ds-Stepper-list">
        {steps.map((step, index) => {
          const status = step.status ?? (index < activeIndex ? "complete" : index === activeIndex ? "active" : "pending");
          return (
            <li className="ds-Stepper-item" data-status={status} data-disabled={step.disabled ? "true" : undefined} key={step.value}>
              <button className="ds-Stepper-button" type="button" disabled={step.disabled} aria-current={status === "active" ? "step" : undefined} onClick={() => setCurrentValue(step.value)}>
                <span className="ds-Stepper-marker">{variant === "numbered" ? index + 1 : ""}</span>
                <span className="ds-Stepper-copy">
                  <span className="ds-Stepper-label">{step.label}</span>
                  {step.description ? <span className="ds-Stepper-description">{step.description}</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
