import type { SVGAttributes } from "react";
import { classNames } from "../../../shared/utils";

export type IconName =
  | "alert"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "command"
  | "menu"
  | "plus"
  | "search"
  | "upload"
  | "x";

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "children"> {
  name: IconName;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const iconPaths: Record<IconName, string[]> = {
  alert: ["M12 9v4", "M12 17h.01", "M10.3 4.3 2.8 17.2A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.8L13.7 4.3a2 2 0 0 0-3.4 0Z"],
  check: ["M20 6 9 17l-5-5"],
  "chevron-down": ["m6 9 6 6 6-6"],
  "chevron-left": ["m15 18-6-6 6-6"],
  "chevron-right": ["m9 18 6-6-6-6"],
  command: ["M8 8h8v8H8z", "M8 8H6a2 2 0 1 1 2-2v2Z", "M16 8V6a2 2 0 1 1 2 2h-2Z", "M8 16v2a2 2 0 1 1-2-2h2Z", "M16 16h2a2 2 0 1 1-2 2v-2Z"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  plus: ["M12 5v14", "M5 12h14"],
  search: ["m21 21-4.3-4.3", "M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"],
  upload: ["M12 16V4", "m7 9 5-5 5 5", "M5 20h14"],
  x: ["M18 6 6 18", "M6 6l12 12"]
};

export function Icon({ name, label, size = "md", className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={classNames("ds-IconSvg", className)}
      data-size={size}
      fill="none"
      focusable="false"
      role={label ? "img" : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      {iconPaths[name].map((path, index) => <path d={path} key={index} />)}
    </svg>
  );
}
