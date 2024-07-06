import React from "react";
import { getTimeformatWithMomentAppend } from "../lib/format-date";

export const useTimer = (timer: number) => {
  const [seconds, setSeconds] = React.useState(timer);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return { seconds, formatted: getTimeformatWithMomentAppend(seconds) };
};
