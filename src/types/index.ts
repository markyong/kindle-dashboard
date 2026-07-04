export type WeatherCondition = "Sunny" | "Cloudy" | "Rain" | "Snow" | "Fog";

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: WeatherCondition;
}

export interface QuoteData {
  text: string;
  author: string;
}
