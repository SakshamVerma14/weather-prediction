// src/services/weatherService.ts
import type { WeatherData } from "../types";

/** Which backend the UI is "using" */
export type DataSource = "mock" | "open-meteo";

let currentSource: DataSource = "open-meteo";

export function getCurrentSource(): DataSource {
  return currentSource;
}

export function setCurrentSource(next: DataSource) {
  currentSource = next;
}

/* ------------------------------------------------------------------ */
/*  Open-Meteo geocoding & forecast (with India preference)           */
/* ------------------------------------------------------------------ */

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

/** Heuristic: does this query look like an Indian location? */
function looksIndian(query: string): boolean {
  const q = query.toLowerCase();

  const indianStates = [
    "andhra pradesh",
    "arunachal pradesh",
    "assam",
    "bihar",
    "chhattisgarh",
    "goa",
    "gujarat",
    "haryana",
    "himachal pradesh",
    "jharkhand",
    "karnataka",
    "kerala",
    "madhya pradesh",
    "maharashtra",
    "manipur",
    "meghalaya",
    "mizoram",
    "nagaland",
    "odisha",
    "punjab",
    "rajasthan",
    "sikkim",
    "tamil nadu",
    "telangana",
    "tripura",
    "uttar pradesh",
    "uttarakhand",
    "west bengal",
    "delhi",
    "nct of delhi",
    "jammu",
    "kashmir",
    "ladakh",
  ];

  const bigIndianCities = [
    "mumbai",
    "bombay",
    "delhi",
    "new delhi",
    "kolkata",
    "calcutta",
    "chennai",
    "madras",
    "bengaluru",
    "bangalore",
    "hyderabad",
    "pune",
    "ahmedabad",
    "jaipur",
    "lucknow",
    "kanpur",
    "patna",
    "bhopal",
    "indore",
    "nagpur",
    "surat",
    "thane",
  ];

  if (q.includes("india")) return true;
  if (indianStates.some((s) => q.includes(s))) return true;
  if (bigIndianCities.some((c) => q.includes(c))) return true;

  return false;
}

async function geocode(query: string) {
  const url =
    GEO_URL +
    `?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to contact geocoding service.");
  }

  const data = await res.json();
  const results: any[] = data.results ?? [];

  if (!results.length) {
    throw new Error("Location not found. Try another city / state.");
  }

  let chosen: any | undefined;

  // Prefer India for Indian-looking queries
  if (looksIndian(query)) {
    chosen = results.find(
      (r) => r.country_code === "IN" || r.country === "India"
    );
  }

  if (!chosen) {
    // fallback – first result
    chosen = results[0];
  }

  return {
    lat: chosen.latitude as number,
    lon: chosen.longitude as number,
    displayName: `${chosen.name}, ${chosen.country}`,
  };
}

async function fetchForecast(lat: number, lon: number) {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current_weather: "true",
    hourly: "relativehumidity_2m",
    daily: "temperature_2m_max,temperature_2m_min,weathercode",
    timezone: "auto",
  });

  const res = await fetch(`${FORECAST_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch forecast from Open-Meteo.");
  }
  return res.json();
}

function mapWeatherCodeToText(code: number): string {
  if (code === 0) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55].includes(code)) return "Drizzle";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Mixed conditions";
}

/* ------------------------------------------------------------------ */
/*  Simple mock data (for the toggle demo, no API)                    */
/* ------------------------------------------------------------------ */

const MOCK_TABLE: Record<string, Partial<WeatherData["current"]>> = {
  mumbai: {
    temperature: 32,
    feelsLike: 36,
    condition: "Humid and partly cloudy",
    humidity: 78,
    windSpeed: 14,
  },
  kerala: {
    temperature: 29,
    feelsLike: 32,
    condition: "Monsoon showers",
    humidity: 85,
    windSpeed: 12,
  },
  bihar: {
    temperature: 30,
    feelsLike: 34,
    condition: "Humid with rain spells",
    humidity: 80,
    windSpeed: 10,
  },
  punjab: {
    temperature: 27,
    feelsLike: 28,
    condition: "Warm and dry",
    humidity: 55,
    windSpeed: 9,
  },
};

function buildMockWeather(query: string): WeatherData {
  const key = query.trim().toLowerCase();
  const base = MOCK_TABLE[key] ?? {
    temperature: 28,
    feelsLike: 30,
    condition: "Warm and partly cloudy",
    humidity: 70,
    windSpeed: 10,
  };

  const current = {
    location: `${query} (Mock)`,
    temperature: base.temperature ?? 28,
    feelsLike: base.feelsLike ?? 30,
    condition: base.condition ?? "Mock weather",
    humidity: base.humidity ?? 70,
    windSpeed: base.windSpeed ?? 8,
    source: "Mock dataset",
  };

  const forecast = Array.from({ length: 5 }).map((_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri"][i],
    high: (base.temperature ?? 28) + (i % 3) - 1,
    low: (base.temperature ?? 28) - 4 + (i % 2),
    condition: base.condition ?? "Mock weather",
  }));

  return {
    current,
    forecast,
    alerts: [],
  };
}

/* ------------------------------------------------------------------ */
/*  Public service used by the React app                              */
/* ------------------------------------------------------------------ */

export const weatherService = {
  async getWeather(query: string): Promise<WeatherData> {
    if (currentSource === "mock") {
      // Don’t hit any API – return synthetic data
      return buildMockWeather(query);
    }

    // Live Open-Meteo path
    const geo = await geocode(query);
    const forecast = await fetchForecast(geo.lat, geo.lon);

    const currentTemp = forecast.current_weather?.temperature ?? 0;
    const windspeed = forecast.current_weather?.windspeed ?? 0;
    const weathercode = forecast.current_weather?.weathercode ?? 0;

    const humidityArray: number[] = forecast.hourly?.relativehumidity_2m ?? [];
    const humidity =
      humidityArray.length > 0
        ? Math.round(
            humidityArray.reduce((a, b) => a + b, 0) / humidityArray.length
          )
        : 0;

    const daily = forecast.daily ?? {};
    const days: string[] = daily.time ?? [];
    const max: number[] = daily.temperature_2m_max ?? [];
    const min: number[] = daily.temperature_2m_min ?? [];
    const codes: number[] = daily.weathercode ?? [];

    const forecastDays = days.slice(0, 5).map((d, i) => ({
      day: new Date(d).toLocaleDateString("en-IN", {
        weekday: "short",
      }),
      high: Math.round(max[i] ?? currentTemp),
      low: Math.round(min[i] ?? currentTemp),
      condition: mapWeatherCodeToText(codes[i] ?? weathercode),
    }));

    const data: WeatherData = {
      current: {
        location: geo.displayName,
        temperature: Math.round(currentTemp),
        feelsLike: Math.round(currentTemp),
        condition: mapWeatherCodeToText(weathercode),
        humidity,
        windSpeed: Math.round(windspeed),
        source: "Open-Meteo",
      },
      forecast: forecastDays,
      alerts: [],
    };

    return data;
  },
};
