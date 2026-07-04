import { useEffect, useState } from "react";
import { Clock } from "../Clock";
import { Quote } from "../Quote";
import { Weather } from "../Weather";
import { getDailyQuote } from "../../lib/quote";
import { fallbackWeather, getWeather } from "../../lib/weather";
import "./index.css";

const quote = getDailyQuote();
const weatherRefreshMs = 30 * 60 * 1000;

export function Dashboard() {
  const [weather, setWeather] = useState(fallbackWeather);

  useEffect(() => {
    // const controller = new AbortController();
    // const refreshWeather = async () => {
    //   try {
    //     setWeather(await getWeather(undefined, controller.signal));
    //   } catch (error) {
    //     console.warn(error);
    //   }
    // };
    // void refreshWeather();
    // const intervalId = window.setInterval(refreshWeather, weatherRefreshMs);
    // return () => {
    //   controller.abort();
    //   window.clearInterval(intervalId);
    // };
  }, []);

  return (
    <main className="dashboard">
      <div className="dashboard-layout">
        <div className="dashboard-clock">
          <Clock />
        </div>

        <div className="dashboard-divider" aria-hidden="true" />

        <div className="dashboard-content">
          <div className="dashboard-weather">
            <Weather weather={weather} />
          </div>

          <div
            className="dashboard-divider dashboard-divider-horizontal"
            aria-hidden="true"
          />

          <div className="dashboard-quote">
            <Quote quote={quote} />
          </div>
        </div>
      </div>
    </main>
  );
}
