import type { HTMLAttributes, ReactNode } from "react";
import { Icon } from "../../actions/icon";
import type { Size, Tone } from "../../../shared/types";
import { classNames } from "../../../shared/utils";
import { Spinner } from "../spinner";

export type InlineLoadingStatus = "loading" | "success" | "error";

export interface InlineLoadingProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  description?: ReactNode;
  size?: Size;
  tone?: Tone;
  status?: InlineLoadingStatus;
}

export function InlineLoading({
  label = "불러오는 중",
  description,
  size = "md",
  tone = "neutral",
  status = "loading",
  className,
  ...props
}: InlineLoadingProps) {
  const liveMode = status === "error" ? "assertive" : "polite";

  return (
    <div
      className={classNames("ds-InlineLoading", className)}
      data-size={size}
      data-status={status}
      data-tone={tone}
      role="status"
      aria-live={liveMode}
      {...props}
    >
      <span className="ds-InlineLoading-indicator" aria-hidden="true">
        {status === "loading" ? <Spinner size={size} tone={tone} status="decorative" /> : <Icon name={status === "success" ? "check" : "alert"} size={size} />}
      </span>
      <span className="ds-InlineLoading-copy">
        <span className="ds-InlineLoading-label">{label}</span>
        {description ? <span className="ds-InlineLoading-description">{description}</span> : null}
      </span>
    </div>
  );
}
