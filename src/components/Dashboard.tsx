import { useEffect, useState } from "react";
import { Clock } from "./Clock";
import { Quote } from "./Quote";
import { Weather } from "./Weather";
import { getDailyQuote } from "../lib/quote";
import { fallbackWeather, getWeather } from "../lib/weather";

const quote = getDailyQuote();
const weatherRefreshMs = 30 * 60 * 1000;

export function Dashboard() {
  const [weather, setWeather] = useState(fallbackWeather);

  useEffect(() => {
    const controller = new AbortController();

    const refreshWeather = async () => {
      try {
        setWeather(await getWeather(undefined, controller.signal));
      } catch (error) {
        console.warn(error);
      }
    };

    void refreshWeather();
    const intervalId = window.setInterval(refreshWeather, weatherRefreshMs);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="relative h-dvh overflow-hidden bg-white text-black">
      <div className="mx-auto grid h-full w-full max-w-[82rem] grid-rows-[0.84fr_auto_auto_auto_1fr] px-[clamp(2rem,7vw,4.25rem)] py-[clamp(4rem,8vh,5.5rem)] min-[700px]:grid-cols-[minmax(0,0.42fr)_1px_minmax(0,0.58fr)] min-[700px]:grid-rows-1 min-[700px]:items-center min-[700px]:gap-[clamp(3rem,6vw,5.75rem)] min-[700px]:px-[clamp(4rem,6vw,6.5rem)] min-[700px]:py-[clamp(3rem,7vh,5.5rem)]">
        <div className="self-end min-[700px]:self-center min-[700px]:justify-self-start">
          <Clock />
        </div>

        <div className="my-[clamp(1.8rem,4.6vh,2.6rem)] h-px w-full bg-neutral-300 min-[700px]:my-0 min-[700px]:h-[60%] min-[700px]:w-px min-[700px]:self-center" aria-hidden="true" />

        <div className="flex min-h-0 flex-col items-center justify-center min-[700px]:items-start">
          <div className="w-full">
            <Weather weather={weather} />
          </div>
          <div className="my-[clamp(1.8rem,4.6vh,2.6rem)] h-px w-full bg-neutral-300 min-[700px]:my-[clamp(2rem,4.8vh,3rem)]" aria-hidden="true" />
          <div className="w-full">
            <Quote quote={quote} />
          </div>
        </div>
      </div>
    </main>
  );
}
