import { useClock } from "../../hooks/useClock";
import "./index.css";

export function Clock() {
  const { time, dateLabel } = useClock();

  return (
    <section className="clock">
      <time className="clock-time" dateTime={time}>
        {time}
      </time>

      <p className="clock-date">{dateLabel}</p>
    </section>
  );
}
