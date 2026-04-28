export function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function dataFlag(value?: boolean) {
  return value ? "" : undefined;
}
