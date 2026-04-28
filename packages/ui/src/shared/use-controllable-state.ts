import { useCallback, useState } from "react";

export interface UseControllableStateOptions<Value> {
  value?: Value;
  defaultValue: Value;
  onChange?: (value: Value) => void;
}

// controlled prop이 있으면 외부 값을 따르고, 없으면 내부 state를 사용합니다. / When a controlled prop exists, follow it; otherwise use internal state.
export function useControllableState<Value>({
  value,
  defaultValue,
  onChange
}: UseControllableStateOptions<Value>) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const setValue = useCallback((nextValue: Value | ((previousValue: Value) => Value)) => {
    const resolvedValue = typeof nextValue === "function"
      ? (nextValue as (previousValue: Value) => Value)(currentValue)
      : nextValue;

    if (Object.is(resolvedValue, currentValue)) return;

    if (value === undefined) {
      setInternalValue(resolvedValue);
    }
    onChange?.(resolvedValue);
  }, [currentValue, onChange, value]);

  return [currentValue, setValue] as const;
}
