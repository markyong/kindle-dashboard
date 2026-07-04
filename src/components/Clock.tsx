import { useClock } from "../hooks/useClock";

export function Clock() {
  const { time, dateLabel } = useClock();

  return (
    <section className="kindle-fade flex flex-col items-center text-center min-[700px]:items-start min-[700px]:text-left">
      <time
        className="font-extrabold leading-none tracking-normal text-black tabular-nums text-[clamp(5rem,22vw,8rem)] min-[700px]:text-[clamp(5.75rem,10vw,8.75rem)]"
        dateTime={time}
      >
        {time}
      </time>
      <p className="mt-5 text-[clamp(1rem,3vw,1.35rem)] font-medium leading-tight text-neutral-700 min-[700px]:mt-6 min-[700px]:text-[clamp(1.05rem,1.8vw,1.45rem)]">
        {dateLabel}
      </p>
    </section>
  );
}
