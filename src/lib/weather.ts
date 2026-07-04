import type { WeatherData } from "../types";

interface OpenMeteoCurrentWeather {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
}

interface OpenMeteoResponse {
  current: OpenMeteoCurrentWeather;
}

export interface WeatherLocation {
  latitude: number;
  longitude: number;
  timezone?: string;
}

const defaultLocation: WeatherLocation = {
  latitude: 31.2304,
  longitude: 121.4737,
  timezone: "Asia/Shanghai",
};

export const fallbackWeather: WeatherData = {
  temperature: 27,
  feelsLike: 29,
  condition: "Sunny",
};

function isOpenMeteoResponse(value: unknown): value is OpenMeteoResponse {
  if (typeof value !== "object" || value === null || !("current" in value)) {
    return false;
  }

  const current = (value as { current: unknown }).current;

  if (typeof current !== "object" || current === null) {
    return false;
  }

  const candidate = current as Partial<OpenMeteoCurrentWeather>;

  return (
    typeof candidate.temperature_2m === "number" &&
    typeof candidate.apparent_temperature === "number" &&
    typeof candidate.weather_code === "number"
  );
}

function mapWeatherCode(code: number): WeatherData["condition"] {
  if (code === 0 || code === 1) {
    return "Sunny";
  }

  if (code === 2 || code === 3) {
    return "Cloudy";
  }

  if (code === 45 || code === 48) {
    return "Fog";
  }

  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return "Snow";
  }

  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) {
    return "Rain";
  }

  return "Cloudy";
}

function buildOpenMeteoUrl(location: WeatherLocation): string {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", location.latitude.toString());
  url.searchParams.set("longitude", location.longitude.toString());
  url.searchParams.set("current", "temperature_2m,apparent_temperature,weather_code");
  url.searchParams.set("timezone", location.timezone ?? "auto");

  return url.toString();
}

export async function getWeather(
  location: WeatherLocation = defaultLocation,
  signal?: AbortSignal,
): Promise<WeatherData> {
  const response = await fetch(buildOpenMeteoUrl(location), { signal });

  if (!response.ok) {
    throw new Error(`Open-Meteo request failed: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isOpenMeteoResponse(data)) {
    throw new Error("Open-Meteo response shape changed.");
  }

  return {
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    condition: mapWeatherCode(data.current.weather_code),
  };
}
