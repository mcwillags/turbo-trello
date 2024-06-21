import { useState } from "react";

export const useBooleanToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((value) => !value);
  };

  const set = (value: boolean) => {
    setValue(value);
  };

  return [value, toggle, set] as const;
};
