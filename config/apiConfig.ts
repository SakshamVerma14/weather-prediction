// config/apiConfig.ts
// Central place to document and access all API-related settings.

export const OPENWEATHER_CONFIG = {
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  defaultCountryCode: 'IN',
  /**
   * Reads the OpenWeather key from your Vite env file.
   * Define VITE_OPENWEATHER_API_KEY in .env (see README for details).
   */
  get apiKey() {
    return import.meta.env.VITE_OPENWEATHER_API_KEY?.trim() ?? '';
  },
};

export const OPEN_METEO_CONFIG = {
  baseUrl: 'https://api.open-meteo.com/v1',
};

export const DISASTER_ALERT_CONFIG = {
  reliefWeb: {
    baseUrl: 'https://api.reliefweb.int/v1/disasters',
    defaultCountry: 'India',
    appName: 'weather-disaster-watch',
    limit: 5,
  },
};

