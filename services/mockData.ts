// src/services/mockData.ts
import type { WeatherData } from "../types";

function baseWeather(location: string): WeatherData {
  return {
    current: {
      location,
      temperature: 30,
      feelsLike: 34,
      humidity: 80,
      windSpeed: 12,
      condition: "Humid",
      source: "Mock data",
    },
    alerts: [],
    forecast: [
      { day: "Mon", high: 32, low: 27, condition: "Humid" },
      { day: "Tue", high: 31, low: 26, condition: "Cloudy" },
      { day: "Wed", high: 30, low: 25, condition: "Clear" },
      { day: "Thu", high: 32, low: 26, condition: "Humid" },
      { day: "Fri", high: 33, low: 27, condition: "Humid" },
    ],
  };
}

const MOCK_BY_NAME: Record<string, WeatherData> = {
  mumbai: {
    current: {
      location: "Mumbai, IN",
      temperature: 31,
      feelsLike: 36,
      humidity: 82,
      windSpeed: 14,
      condition: "Humid & cloudy",
      source: "Mock data",
    },
    alerts: [
      {
        id: "mumbai-flood-watch",
        title: "Monsoon Flood Watch",
        description:
          "Heavy rainfall expected. Possible waterlogging in low-lying areas.",
        area: "Mumbai Metropolitan Region",
        severity: "Warning",
      },
    ],
    forecast: [
      { day: "Mon", high: 32, low: 27, condition: "Rain" },
      { day: "Tue", high: 31, low: 26, condition: "Humid" },
      { day: "Wed", high: 30, low: 25, condition: "Cloudy" },
      { day: "Thu", high: 31, low: 26, condition: "Rain" },
      { day: "Fri", high: 32, low: 27, condition: "Humid" },
    ],
  },

  kerala: baseWeather("Kerala, IN"),
  punjab: baseWeather("Punjab, IN"),
  bihar: baseWeather("Bihar, IN"),
  delhi: baseWeather("Delhi, IN"),
};

function normalise(q: string) {
  return q.trim().toLowerCase();
}

export const mockWeatherService = {
  async getWeather(query: string): Promise<WeatherData> {
    const key = normalise(query);

    const found =
      MOCK_BY_NAME[key] ||
      // allow “New Delhi”, “Delhi NCR” etc.
      (key.includes("delhi") ? MOCK_BY_NAME["delhi"] : undefined);

    if (found) {
      // return a shallow clone with the original user text as location if you like
      return {
        ...found,
        current: {
          ...found.current,
          location: found.current.location || query,
        },
      };
    }

    // Fallback: generic weather using the query as display name
    const base = baseWeather(query);
    return base;
  },
};
