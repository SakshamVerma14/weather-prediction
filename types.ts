// src/types.ts

export interface CurrentWeather {
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  source?: string;
  lat?: number;
  lon?: number;
}

export interface ForecastDay {
  day: string;          // e.g. "Mon"
  high: number;         // max temp
  low: number;          // min temp
  condition: string;    // short text
}

export type AlertSeverity = "Info" | "Warning";

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  area: string;
  severity: AlertSeverity;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  alerts: WeatherAlert[];
}
