import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { Button } from "../../actions/button";
import { classNames } from "../../../shared/utils";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
  label?: ReactNode;
  content?: ReactNode;
  placement?: string;
  delay?: number;
  disabled?: boolean;
  trigger?: ReactNode;
}

export function Tooltip({ label = "?", content = "Tooltip", placement = "top", delay = 300, disabled = false, trigger, className, ...props }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const openTimer = useRef<number | undefined>(undefined);
  const clearOpenTimer = () => {
    if (openTimer.current !== undefined) {
      window.clearTimeout(openTimer.current);
      openTimer.current = undefined;
    }
  };
  const show = () => {
    if (disabled) return;
    clearOpenTimer();
    // 짧은 hover 통과에는 tooltip이 열리지 않도록 지연합니다. / Delay opening so brief hover passes do not show the tooltip.
    openTimer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clearOpenTimer();
    setOpen(false);
  };

  useEffect(() => clearOpenTimer, []);

  return (
    <span className={classNames("ds-Tooltip", className)} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} {...props}>
      {trigger ?? <Button variant="outline" tone="neutral" aria-describedby={open ? tooltipId : undefined}>{label}</Button>}
      <span className="ds-Tooltip-content" id={tooltipId} role="tooltip" data-placement={placement} hidden={!open}>
        {content}
      </span>
    </span>
  );
}
