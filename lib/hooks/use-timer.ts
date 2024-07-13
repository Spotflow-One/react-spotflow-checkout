import React from "react";
import { getTimeformatWithMomentAppend } from "@library/utils/format-date";

export const useTimer = (timer: number, start?: boolean) => {
  const [seconds, setSeconds] = React.useState(timer);

  React.useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, start]);

  return { seconds, formatted: getTimeformatWithMomentAppend(seconds, true) };
};
