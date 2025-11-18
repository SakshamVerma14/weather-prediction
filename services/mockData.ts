// src/services/mockData.ts
import type { WeatherData } from '../types';

export type MockLocation =
  | 'Uttarakhand'
  | 'Mumbai'
  | 'Kashmir'
  | 'Jaipur'
  | 'Assam'
  | 'Himachal Pradesh'
  | 'Bihar'
  | 'Kerala'
  | 'Punjab';

const mockData: Record<MockLocation, WeatherData> = {
  'Uttarakhand': {
    current: {
      location: 'Uttarakhand, IN',
      temperature: 18,
      condition: 'Partly Cloudy',
      humidity: 75,
      windSpeed: 25,
      feelsLike: 17,
    },
    forecast: [
      { day: 'Mon', high: 20, low: 14, condition: 'Sunny' },
      { day: 'Tue', high: 21, low: 15, condition: 'Sunny' },
      { day: 'Wed', high: 19, low: 13, condition: 'Cloudy' },
      { day: 'Thu', high: 18, low: 12, condition: 'Rainy' },
      { day: 'Fri', high: 20, low: 14, condition: 'Partly Cloudy' },
    ],
    alerts: [
      {
        id: 'UK2024-1',
        type: 'Earthquake',
        severity: 'Warning',
        title: 'Earthquake Warning: 6.8 Magnitude',
        description:
          'Strong seismic activity expected. Secure heavy items and prepare emergency kits.',
        area: 'Uttarakhand Fault Lines',
      },
    ],
  },

  'Mumbai': {
    current: {
      location: 'Mumbai, IN',
      temperature: 30,
      condition: 'Humid',
      humidity: 88,
      windSpeed: 12,
      feelsLike: 35,
    },
    forecast: [
      { day: 'Mon', high: 32, low: 27, condition: 'Rainy' },
      { day: 'Tue', high: 31, low: 26, condition: 'Rainy' },
      { day: 'Wed', high: 30, low: 25, condition: 'Cloudy' },
      { day: 'Thu', high: 32, low: 27, condition: 'Sunny' },
      { day: 'Fri', high: 33, low: 28, condition: 'Humid' },
    ],
    alerts: [
      {
        id: 'MUM2024-1',
        type: 'Flood',
        severity: 'Watch',
        title: 'Monsoon Flood Watch',
        description:
          'Heavy rainfall expected. Possible waterlogging in low-lying areas.',
        area: 'Mumbai Metropolitan Region',
      },
    ],
  },

  'Kashmir': {
    current: {
      location: 'Kashmir, IN',
      temperature: 12,
      condition: 'Snowfall',
      humidity: 80,
      windSpeed: 10,
      feelsLike: 9,
    },
    forecast: [
      { day: 'Mon', high: 10, low: 2, condition: 'Snowy' },
      { day: 'Tue', high: 11, low: 1, condition: 'Cloudy' },
      { day: 'Wed', high: 12, low: 0, condition: 'Snowy' },
      { day: 'Thu', high: 13, low: 3, condition: 'Sunny' },
      { day: 'Fri', high: 14, low: 5, condition: 'Partly Cloudy' },
    ],
    alerts: [
      {
        id: 'KASH2024-1',
        type: 'Avalanche',
        severity: 'Warning',
        title: 'Avalanche Risk',
        description:
          'High avalanche danger in higher reaches. Avoid mountain travel.',
        area: 'Gulmarg & Sonmarg',
      },
    ],
  },

  'Jaipur': {
    current: {
      location: 'Jaipur, IN',
      temperature: 28,
      condition: 'Thunderstorm',
      humidity: 92,
      windSpeed: 30,
      feelsLike: 32,
    },
    forecast: [
      { day: 'Mon', high: 29, low: 24, condition: 'Thunderstorm' },
      { day: 'Tue', high: 30, low: 25, condition: 'Rainy' },
      { day: 'Wed', high: 31, low: 26, condition: 'Partly Cloudy' },
      { day: 'Thu', high: 30, low: 25, condition: 'Sunny' },
      { day: 'Fri', high: 29, low: 24, condition: 'Thunderstorm' },
    ],
    alerts: [
      {
        id: 'JP2024-1',
        type: 'Heatwave',
        severity: 'Advisory',
        title: 'Extreme Heat Advisory',
        description:
          'Temperatures may rise above 42°C. Stay hydrated and avoid outdoor work.',
        area: 'Jaipur & Surroundings',
      },
    ],
  },

  'Assam': {
    current: {
      location: 'Assam, IN',
      temperature: 25,
      condition: 'Rainy',
      humidity: 90,
      windSpeed: 15,
      feelsLike: 28,
    },
    forecast: [
      { day: 'Mon', high: 27, low: 22, condition: 'Rainy' },
      { day: 'Tue', high: 28, low: 23, condition: 'Rainy' },
      { day: 'Wed', high: 26, low: 21, condition: 'Cloudy' },
      { day: 'Thu', high: 27, low: 22, condition: 'Rainy' },
      { day: 'Fri', high: 28, low: 23, condition: 'Rainy' },
    ],
    alerts: [
      {
        id: 'ASM2024-1',
        type: 'Flood',
        severity: 'Warning',
        title: 'Brahmaputra Flood Alert',
        description:
          'Rising water levels in Brahmaputra River. Evacuation may be needed in low-lying areas.',
        area: 'Dispur & Nearby Villages',
      },
    ],
  },

  'Himachal Pradesh': {
    current: {
      location: 'Himachal Pradesh, IN',
      temperature: 14,
      condition: 'Foggy',
      humidity: 82,
      windSpeed: 10,
      feelsLike: 12,
    },
    forecast: [
      { day: 'Mon', high: 16, low: 10, condition: 'Cloudy' },
      { day: 'Tue', high: 17, low: 11, condition: 'Rainy' },
      { day: 'Wed', high: 15, low: 9, condition: 'Foggy' },
      { day: 'Thu', high: 16, low: 10, condition: 'Cloudy' },
      { day: 'Fri', high: 17, low: 11, condition: 'Partly Cloudy' },
    ],
    alerts: [
      {
        id: 'HP2024-1',
        type: 'Flood',
        severity: 'Warning',
        title: 'Landslide & Heavy Rain Alert',
        description:
          'Continuous rainfall triggering landslides in Kullu and Mandi regions. Avoid hilly routes.',
        area: 'Shimla, Kullu & Mandi',
      },
    ],
  },

  'Bihar': {
    current: {
      location: 'Bihar, IN',
      temperature: 33,
      condition: 'Sunny',
      humidity: 60,
      windSpeed: 18,
      feelsLike: 36,
    },
    forecast: [
      { day: 'Mon', high: 34, low: 28, condition: 'Sunny' },
      { day: 'Tue', high: 33, low: 27, condition: 'Sunny' },
      { day: 'Wed', high: 32, low: 26, condition: 'Cloudy' },
      { day: 'Thu', high: 33, low: 27, condition: 'Sunny' },
      { day: 'Fri', high: 34, low: 28, condition: 'Sunny' },
    ],
    alerts: [
      {
        id: 'BR2024-1',
        type: 'Flood',
        severity: 'Advisory',
        title: 'Kosi Flood Advisory',
        description:
          'Heavy rainfall in catchment areas may cause flooding.',
        area: 'Kosi River Basin',
      },
    ],
  },

  'Kerala': {
    current: {
      location: 'Kerala, IN',
      temperature: 29,
      condition: 'Humid',
      humidity: 85,
      windSpeed: 10,
      feelsLike: 32,
    },
    forecast: [
      { day: 'Mon', high: 30, low: 25, condition: 'Rainy' },
      { day: 'Tue', high: 31, low: 26, condition: 'Rainy' },
      { day: 'Wed', high: 29, low: 24, condition: 'Cloudy' },
      { day: 'Thu', high: 30, low: 25, condition: 'Rainy' },
      { day: 'Fri', high: 31, low: 26, condition: 'Rainy' },
    ],
    alerts: [
      {
        id: 'KL2024-1',
        type: 'Flood',
        severity: 'Warning',
        title: 'Heavy Rainfall Flood Watch',
        description:
          'Monsoon rains expected. Stay alert for local flooding.',
        area: 'Kochi & Alappuzha',
      },
    ],
  },

  'Punjab': {
    current: {
      location: 'Punjab, IN',
      temperature: 35,
      condition: 'Sunny',
      humidity: 58,
      windSpeed: 22,
      feelsLike: 38,
    },
    forecast: [
      { day: 'Mon', high: 36, low: 27, condition: 'Sunny' },
      { day: 'Tue', high: 37, low: 28, condition: 'Sunny' },
      { day: 'Wed', high: 34, low: 26, condition: 'Cloudy' },
      { day: 'Thu', high: 33, low: 25, condition: 'Rainy' },
      { day: 'Fri', high: 32, low: 24, condition: 'Rainy' },
    ],
    alerts: [
      {
        id: 'PB2024-1',
        type: 'Flood',
        severity: 'Warning',
        title: 'Beas River Flood Warning',
        description:
          'Heavy rains in Himachal leading to overflow in Beas river. Evacuations may be required in border areas.',
        area: 'Hoshiarpur & Gurdaspur Districts',
      },
      {
        id: 'PB2024-2',
        type: 'Heatwave',
        severity: 'Advisory',
        title: 'Post-Monsoon Heat Advisory',
        description:
          'Temperatures expected to rise above 40°C in plains. Stay indoors during peak hours.',
        area: 'Amritsar & Ludhiana',
      },
    ],
  },
};

export const MOCK_WEATHER_DATA = mockData;

export const fetchWeatherData = (location: MockLocation): Promise<WeatherData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockData[location]) {
        resolve(mockData[location]);
      } else {
        reject(new Error('Location not found'));
      }
    }, 800);
  });
};