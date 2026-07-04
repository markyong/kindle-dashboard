import { useEffect, useMemo, useState } from "react";

export interface ClockState {
  time: string;
  dateLabel: string;
}

function getNextMinuteDelay(date: Date): number {
  return (60 - date.getSeconds()) * 1000 - date.getMilliseconds();
}

function formatClock(date: Date): ClockState {
  return {
    time: new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date),
    dateLabel: new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(date),
  };
}

export function useClock(): ClockState {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      setNow(new Date());
      intervalId = window.setInterval(() => setNow(new Date()), 60_000);
    }, getNextMinuteDelay(new Date()));

    return () => {
      window.clearTimeout(timeoutId);

      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return useMemo(() => formatClock(now), [now]);
}
