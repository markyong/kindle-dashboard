import { Cloud, CloudRain, CloudSnow, CloudSun, LucideIcon, Sun, CloudFog } from "lucide-react";
import type { WeatherData } from "../types";

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
  const Icon = weather.condition === "Sunny" ? CloudSun : weatherIcons[weather.condition];

  return (
    <section className="kindle-fade flex flex-col items-center text-center min-[700px]:items-center">
      <div className="flex items-center justify-center gap-7">
        <Icon
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-[clamp(4rem,13vw,5.5rem)] text-black min-[700px]:size-[clamp(4.25rem,6vw,5.5rem)]"
        />
        <div className="flex items-start">
          <p className="text-[clamp(4rem,15vw,6.25rem)] font-semibold leading-none tracking-normal text-black min-[700px]:text-[clamp(4rem,6vw,5.75rem)]">
            {weather.temperature}
          </p>
          <span className="mt-1 text-[clamp(2rem,6vw,3rem)] font-semibold leading-none text-black">
            °
          </span>
        </div>
      </div>
      <p className="mt-3 text-[clamp(1.15rem,3.7vw,1.55rem)] font-medium leading-none text-black">
        {weather.condition}
      </p>
      <p className="mt-3 text-[clamp(0.98rem,3vw,1.25rem)] leading-tight text-neutral-700">
        Feels like {weather.feelsLike}°
      </p>
    </section>
  );
}
