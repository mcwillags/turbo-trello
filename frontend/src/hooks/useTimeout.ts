import { useEffect, useState } from "react";

export const useTimeout = (timeout: number) => {
  const [isTimeoutEnded, setTimeoutEnded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeoutEnded(true);
    }, timeout);
  }, []);

  return isTimeoutEnded;
};
