import { useCallback, useState } from 'react';

/**
 * Gives a small view the same API in interactive product routes and deterministic
 * embeds: omit `value` for local interaction, provide it to drive the view from
 * a scene/test/parent. Changes always notify the parent when a callback exists.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (nextValue: T) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) setInternalValue(nextValue);
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [currentValue, setValue] as const;
}
