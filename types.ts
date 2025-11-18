// src/types/index.ts

export interface CurrentWeather {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
}

export type AlertSeverity =
  | 'Warning'
  | 'Watch'
  | 'Advisory'
  | 'Info'
  | 'Green'
  | 'Orange'
  | 'Red';

export type AlertType =
  | 'Flood'
  | 'Earthquake'
  | 'Avalanche'
  | 'Heatwave'
  | 'Cyclone'
  | 'Storm'
  | 'Info'
  | string;

export interface WeatherAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  area: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  alerts: WeatherAlert[];
}

export type Forecast = ForecastDay;
export type Alert = WeatherAlert;