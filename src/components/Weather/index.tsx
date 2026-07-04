import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  LucideIcon,
  Sun,
  CloudFog,
} from "lucide-react";
import type { WeatherData } from "../../types";
import "./index.css";

interface WeatherProps {
  weather: WeatherData;
}

const weatherIcons: Record<WeatherData["condition"], LucideIcon> = {
  Sunny: Sun,
  Cloudy: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Fog: CloudFog,
};

export function Weather({ weather }: WeatherProps) {
  const Icon =
    weather.condition === "Sunny" ? CloudSun : weatherIcons[weather.condition];

  return (
    <section className="weather">
      <div className="weather-row">
        <Icon aria-hidden="true" strokeWidth={1.75} className="weather-icon" />

        <div className="weather-temp">
          <p className="weather-value">{weather.temperature}</p>
          <span className="weather-unit">°</span>
        </div>
      </div>

      <p className="weather-condition">{weather.condition}</p>

      <p className="weather-feels">Feels like {weather.feelsLike}°</p>
    </section>
  );
}
