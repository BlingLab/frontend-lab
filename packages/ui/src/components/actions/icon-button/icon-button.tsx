import type { ReactNode } from "react";
import { Button, type ButtonProps } from "../button";
import { Icon } from "../icon";
import { classNames } from "../../../shared/utils";

export interface IconButtonProps extends Omit<ButtonProps, "children" | "label"> {
  label: string;
  icon?: ReactNode;
  shape?: "square" | "circle";
}

export function IconButton({
  label,
  icon = <Icon name="plus" />,
  shape = "square",
  variant = "ghost",
  tone = "neutral",
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      className={classNames("ds-IconButton", className)}
      data-shape={shape}
      variant={variant}
      tone={tone}
      {...props}
    >
      <span className="ds-Icon" aria-hidden="true">{icon}</span>
    </Button>
  );
}
