import { useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
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
  const listRef = useRef<HTMLOListElement>(null);
  const focusStep = (nextIndex: number) => {
    const enabledSteps = steps
      .map((step, index) => ({ step, index }))
      .filter(({ step }) => !step.disabled);
    const nextStep = enabledSteps.find(({ index }) => index === nextIndex) ?? enabledSteps[0];
    if (!nextStep) return;
    listRef.current?.querySelectorAll<HTMLButtonElement>(".ds-Stepper-button")[nextStep.index]?.focus();
    setCurrentValue(nextStep.step.value);
  };
  const onStepKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (event.key === previousKey) {
      event.preventDefault();
      focusStep(Math.max(index - 1, 0));
    }
    if (event.key === nextKey) {
      event.preventDefault();
      focusStep(Math.min(index + 1, steps.length - 1));
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusStep(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      focusStep(steps.length - 1);
    }
  };

  return (
    <nav className={classNames("ds-Stepper", className)} data-orientation={orientation} data-variant={variant} aria-label="단계 / Steps" {...props}>
      <ol className="ds-Stepper-list" ref={listRef}>
        {steps.map((step, index) => {
          const status = step.status ?? (index < activeIndex ? "complete" : index === activeIndex ? "active" : "pending");
          return (
            <li className="ds-Stepper-item" data-status={status} data-disabled={step.disabled ? "true" : undefined} key={step.value}>
              <button className="ds-Stepper-button" type="button" disabled={step.disabled} aria-current={status === "active" ? "step" : undefined} tabIndex={status === "active" ? 0 : -1} onClick={() => setCurrentValue(step.value)} onKeyDown={(event) => onStepKeyDown(event, index)}>
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
