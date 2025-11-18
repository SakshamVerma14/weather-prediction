// src/services/weatherService.ts
import type { WeatherAlert, WeatherData, AlertSeverity } from '../types';
import {
  fetchWeatherData as fetchMockData,
  MockLocation,
  MOCK_WEATHER_DATA,
} from './mockData';
export type { MockLocation } from './mockData';
import {
  OPENWEATHER_CONFIG,
  OPEN_METEO_CONFIG,
  DISASTER_ALERT_CONFIG,
} from '../config/apiConfig';

// ============================================
// 1. REAL API SERVICE (OpenWeather + Others)
// ============================================

const OPENWEATHER_API_KEY = OPENWEATHER_CONFIG.apiKey;
const OPENWEATHER_BASE = OPENWEATHER_CONFIG.baseUrl;

// Alternative: Open-Meteo (NO API KEY NEEDED!)
const OPEN_METEO_BASE = OPEN_METEO_CONFIG.baseUrl;

const normalizeLocationName = (name: string) => name.trim().toLowerCase();

export const MOCK_LOCATION_OPTIONS: MockLocation[] = [
  'Uttarakhand',
  'Mumbai',
  'Kashmir',
  'Jaipur',
  'Assam',
  'Himachal Pradesh',
  'Bihar',
  'Kerala',
  'Punjab',
] as const;

const mockLocationLookup: Record<string, MockLocation> = MOCK_LOCATION_OPTIONS.reduce(
  (acc, loc) => {
    acc[normalizeLocationName(loc)] = loc;
    return acc;
  },
  {} as Record<string, MockLocation>
);

interface OpenWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

interface OpenMeteoResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  hourly: {
    temperature_2m: number[];
    relativehumidity_2m: number[];
  };
}

// Convert weather codes to conditions
const getWeatherCondition = (code: number): string => {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67) return 'Rainy';
  if (code <= 77) return 'Snowy';
  if (code <= 82) return 'Rainy';
  if (code <= 86) return 'Snowy';
  if (code <= 99) return 'Thunderstorm';
  return 'Cloudy';
};

// ============================================
// 2. FETCH REAL WEATHER DATA
// ============================================

async function fetchRealWeatherOpenWeather(location: string): Promise<WeatherData> {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('OpenWeather API key not found. Add VITE_OPENWEATHER_API_KEY to .env');
  }

  try {
    // Current weather
    const country = OPENWEATHER_CONFIG.defaultCountryCode;
    const currentResponse = await fetch(
      `${OPENWEATHER_BASE}/weather?q=${location},${country}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    if (!currentResponse.ok) {
      throw new Error(`Weather API error: ${currentResponse.status}`);
    }

    const currentData: OpenWeatherResponse = await currentResponse.json();

    // 5-day forecast
    const forecastResponse = await fetch(
      `${OPENWEATHER_BASE}/forecast?q=${location},${country}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    const forecastData = await forecastResponse.json();

    // Process forecast (group by day)
    const dailyForecast = processForecast(forecastData.list);

    // Fetch disaster alerts (using mock for now, or integrate GDACS)
    const alerts = await fetchDisasterAlerts(location);

    return {
      current: {
        location: `${currentData.name}, ${currentData.sys.country}`,
        temperature: Math.round(currentData.main.temp),
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
        feelsLike: Math.round(currentData.main.feels_like),
      },
      forecast: dailyForecast,
      alerts: alerts,
    };
  } catch (error) {
    console.error('OpenWeather API Error:', error);
    throw error;
  }
}

// ============================================
// 3. ALTERNATIVE: Open-Meteo (No API Key!)
// ============================================

async function fetchRealWeatherOpenMeteo(location: string): Promise<WeatherData> {
  try {
    // First, get coordinates using geocoding
    const country = OPENWEATHER_CONFIG.defaultCountryCode;
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        location
      )}&count=5&language=en&format=json&country=${country}`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('Location not found');
    }

    const filteredResults = geoData.results.filter(
      (result: any) => result.country_code?.toUpperCase() === country
    );

    if (filteredResults.length === 0) {
      throw new Error('Only Indian locations are supported in Open-Meteo mode. Try another city/state in India.');
    }

    const bestMatch = filteredResults[0];

    const { latitude, longitude, name, country: countryName } = bestMatch;

    // Fetch weather data
    const weatherResponse = await fetch(
      `${OPEN_METEO_BASE}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );

    const weatherData = await weatherResponse.json();

    // Process daily forecast
    const dailyForecast = weatherData.daily.time.slice(0, 5).map((date: string, i: number) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      high: Math.round(weatherData.daily.temperature_2m_max[i]),
      low: Math.round(weatherData.daily.temperature_2m_min[i]),
      condition: getWeatherCondition(weatherData.daily.weathercode[i]),
    }));

    // Fetch disaster alerts
    const alerts = await fetchDisasterAlerts(location);

    return {
      current: {
        location: `${name}, ${countryName}`,
        temperature: Math.round(weatherData.current_weather.temperature),
        condition: getWeatherCondition(weatherData.current_weather.weathercode),
        humidity: weatherData.hourly.relativehumidity_2m[0],
        windSpeed: Math.round(weatherData.current_weather.windspeed),
        feelsLike: Math.round(weatherData.current_weather.temperature - 2), // Approximation
      },
      forecast: dailyForecast,
      alerts: alerts,
    };
  } catch (error) {
    console.error('Open-Meteo API Error:', error);
    throw error;
  }
}

// ============================================
// 4. DISASTER ALERTS (ReliefWeb)
// ============================================

async function fetchDisasterAlerts(location: string) {
  const alerts: WeatherAlert[] = [];
  const normalizedLocation = normalizeLocationName(location);
  const resolvedMockLocation = mockLocationLookup[normalizedLocation];

  try {
    const reliefWebAlerts = await fetchReliefWebAlerts();
    const locationSpecific = filterAlertsForLocation(
      reliefWebAlerts,
      resolvedMockLocation ?? location
    );

    if (locationSpecific.length > 0) {
      alerts.push(...locationSpecific);
    } else if (reliefWebAlerts.length > 0) {
      alerts.push(...reliefWebAlerts.slice(0, 3));
    }
  } catch (error) {
    console.warn('Could not fetch disaster alerts:', error);
  }

  if (alerts.length === 0 && resolvedMockLocation) {
    const mockAlerts = MOCK_WEATHER_DATA[resolvedMockLocation]?.alerts ?? [];
    alerts.push(...mockAlerts);
  }

  if (alerts.length === 0) {
    alerts.push({
      id: 'NO-ALERT',
      type: 'Info',
      severity: 'Advisory',
      title: `No Active Alerts for ${resolvedMockLocation ?? location}`,
      description: 'No major disasters reported in this region right now.',
      area: resolvedMockLocation ?? location,
    });
  }

  return alerts;
}

async function fetchReliefWebAlerts(): Promise<WeatherAlert[]> {
  const alerts: WeatherAlert[] = [];

  try {
    const reliefWebConfig = DISASTER_ALERT_CONFIG.reliefWeb;
    const url = new URL(reliefWebConfig.baseUrl);
    url.searchParams.set('appname', reliefWebConfig.appName);
    url.searchParams.set('limit', String(reliefWebConfig.limit));
    url.searchParams.append('sort[]', 'date:desc');
    url.searchParams.append('filter[field]', 'country');
    url.searchParams.append('filter[value]', reliefWebConfig.defaultCountry);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`ReliefWeb API error: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data?.data)) {
      data.data.forEach((item: any) => {
        const fields = item.fields ?? {};
        const area =
          fields.primary_country?.name ??
          fields.country?.[0]?.name ??
          reliefWebConfig.defaultCountry;

        alerts.push({
          id: `RW-${item.id}`,
          type:
            fields.primary_type?.name ||
            fields.disaster_type?.name ||
            fields.disaster_type?.[0]?.name ||
            fields.type?.name ||
            'Info',
          severity: mapReliefWebStatusToSeverity(fields.status),
          title: fields.name || fields.headline || 'ReliefWeb Alert',
          description:
            fields.description ||
            fields.summary ||
            fields['description-html'] ||
            'ReliefWeb reported event',
          area,
        });
      });
    }
  } catch (error) {
    console.warn('ReliefWeb API Error:', error);
  }

  return alerts;
}

const mapReliefWebStatusToSeverity = (status?: string): AlertSeverity => {
  const normalized = status?.toLowerCase() ?? '';

  if (normalized === 'alert') return 'Warning';
  if (normalized === 'current' || normalized === 'ongoing') return 'Watch';
  if (normalized === 'past') return 'Advisory';

  return 'Advisory';
};

const filterAlertsForLocation = (alerts: WeatherAlert[], location: string): WeatherAlert[] => {
  const normalized = normalizeLocationName(location);
  const keywords = new Set<string>();

  if (normalized) {
    keywords.add(normalized);
  }

  const resolvedMockLocation = mockLocationLookup[normalized];
  if (resolvedMockLocation) {
    keywords.add(normalizeLocationName(resolvedMockLocation));
  }

  if (keywords.size === 0) {
    return [];
  }

  return alerts.filter((alert) => {
    const haystack = `${alert.title} ${alert.description} ${alert.area}`.toLowerCase();
    for (const keyword of keywords) {
      if (keyword && haystack.includes(keyword)) {
        return true;
      }
    }
    return false;
  });
};

// ============================================
// 5. HELPER: Process forecast data
// ============================================

function processForecast(list: any[]) {
  const dailyMap = new Map();

  list.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });

    if (!dailyMap.has(day) && dailyMap.size < 5) {
      dailyMap.set(day, {
        day,
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        condition: item.weather[0].main,
      });
    }
  });

  return Array.from(dailyMap.values());
}

// ============================================
// 6. MAIN SERVICE WITH TOGGLE
// ============================================

export type DataSource = 'mock' | 'openweather' | 'openmeteo';

export class WeatherService {
  private dataSource: DataSource = 'openmeteo'; // Default to free API

  setDataSource(source: DataSource) {
    this.dataSource = source;
    console.log(`Data source switched to: ${source}`);
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }

  async getWeather(location: string): Promise<WeatherData> {
    const trimmedLocation = location.trim();
    if (!trimmedLocation) {
      throw new Error('Location is required');
    }

    const normalizedLocation = normalizeLocationName(trimmedLocation);
    const resolvedMockLocation = mockLocationLookup[normalizedLocation];
    const queryLocation = resolvedMockLocation ?? trimmedLocation;

    console.log(`Fetching weather for ${queryLocation} using ${this.dataSource}`);

    switch (this.dataSource) {
      case 'mock':
        // Use mock data
        if (resolvedMockLocation) {
          return fetchMockData(resolvedMockLocation);
        }
        throw new Error(`Mock location not available. Try: ${MOCK_LOCATION_OPTIONS.join(', ')}`);

      case 'openweather':
        // Use OpenWeather API (requires key)
        return fetchRealWeatherOpenWeather(queryLocation);

      case 'openmeteo':
        // Use Open-Meteo API (no key needed)
        return fetchRealWeatherOpenMeteo(queryLocation);

      default:
        throw new Error('Invalid data source');
    }
  }
}

// Export singleton instance
export const weatherService = new WeatherService();