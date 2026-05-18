import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { Icon } from "../icon";
import type { Size, Tone } from "../../../shared/types";
import { classNames } from "../../../shared/utils";

export type LinkVariant = "inline" | "standalone" | "button";

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children?: ReactNode;
  label?: ReactNode;
  variant?: LinkVariant;
  tone?: Tone;
  size?: Size;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  external?: boolean;
  externalLabel?: string;
  disabled?: boolean;
}

function mergeRel(rel: string | undefined, external: boolean) {
  if (!external) return rel;

  const tokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));
  tokens.add("noopener");
  tokens.add("noreferrer");
  return [...tokens].join(" ");
}

export function Link({
  children,
  label,
  variant = "inline",
  tone = "brand",
  size = "md",
  iconStart,
  iconEnd,
  external = false,
  externalLabel = "새 창에서 열림",
  disabled = false,
  href,
  target,
  rel,
  tabIndex,
  className,
  onClick,
  ...props
}: LinkProps) {
  const content = children ?? label ?? href ?? "링크";
  const resolvedTarget = external ? (target ?? "_blank") : target;
  const resolvedRel = mergeRel(rel, external);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  }

  return (
    <a
      className={classNames("ds-Link", className)}
      data-disabled={disabled ? "true" : undefined}
      data-external={external ? "true" : undefined}
      data-size={size}
      data-tone={tone}
      data-variant={variant}
      href={disabled ? undefined : href}
      target={disabled ? undefined : resolvedTarget}
      rel={disabled ? undefined : resolvedRel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      onClick={handleClick}
      {...props}
    >
      {iconStart ? <span className="ds-Link-icon" aria-hidden="true">{iconStart}</span> : null}
      <span className="ds-Link-label">{content}</span>
      {iconEnd ? <span className="ds-Link-icon" aria-hidden="true">{iconEnd}</span> : null}
      {external ? (
        <span className="ds-Link-icon" aria-hidden="true">
          <Icon name="external-link" size="sm" />
        </span>
      ) : null}
      {external ? <span className="ds-SrOnly">{externalLabel}</span> : null}
    </a>
  );
}
