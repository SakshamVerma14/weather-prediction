import type { WeatherData } from '../types';

export type MockLocation =
  | 'Uttarakhand'
  | 'Mumbai'
  | 'Kashmir'
  | 'Jaipur'
  | 'Assam'
  | 'Bihar'
  | 'Himachal Pradesh'
  | 'Sikkim'
  | 'Gujarat';

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
        description: 'Strong seismic activity expected. Secure heavy items and prepare emergency kits.',
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
        description: 'Heavy rainfall expected. Possible waterlogging in low-lying areas.',
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
        description: 'High avalanche danger in higher reaches. Avoid mountain travel.',
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
        description: 'Temperatures may rise above 42°C. Stay hydrated and avoid outdoor work.',
        area: 'Jaipur & Surroundings',
      },
    ],
  },
  'Assam': {
    current: {
      location: 'Assam, IN',
      temperature: 29,
      condition: 'Rainy',
      humidity: 90,
      windSpeed: 15,
      feelsLike: 33,
    },
    forecast: [
      { day: 'Mon', high: 31, low: 25, condition: 'Rainy' },
      { day: 'Tue', high: 32, low: 26, condition: 'Rainy' },
      { day: 'Wed', high: 30, low: 24, condition: 'Cloudy' },
      { day: 'Thu', high: 33, low: 27, condition: 'Sunny' },
      { day: 'Fri', high: 34, low: 28, condition: 'Humid' },
    ],
    alerts: [
      {
        id: 'ASS2024-1',
        type: 'Flood',
        severity: 'Warning',
        title: 'Brahmaputra Flood Alert',
        description: 'Rising water levels in the Brahmaputra. Evacuate low-lying areas.',
        area: 'Brahmaputra Basin',
      },
    ],
  },
  'Bihar': {
    current: {
      location: 'Bihar, IN',
      temperature: 32,
      condition: 'Humid',
      humidity: 85,
      windSpeed: 14,
      feelsLike: 36,
    },
    forecast: [
      { day: 'Mon', high: 33, low: 27, condition: 'Rainy' },
      { day: 'Tue', high: 34, low: 28, condition: 'Rainy' },
      { day: 'Wed', high: 35, low: 29, condition: 'Cloudy' },
      { day: 'Thu', high: 33, low: 27, condition: 'Sunny' },
      { day: 'Fri', high: 32, low: 26, condition: 'Humid' },
    ],
    alerts: [
      {
        id: 'BIH2024-1',
        type: 'Flood',
        severity: 'Watch',
        title: 'Ganga Flood Advisory',
        description: 'High water levels in Ganga may lead to flooding in northern districts.',
        area: 'North Bihar',
      },
    ],
  },
  'Himachal Pradesh': {
    current: {
      location: 'Himachal Pradesh, IN',
      temperature: 15,
      condition: 'Snowfall',
      humidity: 78,
      windSpeed: 12,
      feelsLike: 10,
    },
    forecast: [
      { day: 'Mon', high: 16, low: 8, condition: 'Snowy' },
      { day: 'Tue', high: 17, low: 9, condition: 'Cloudy' },
      { day: 'Wed', high: 18, low: 10, condition: 'Snowy' },
      { day: 'Thu', high: 19, low: 11, condition: 'Sunny' },
      { day: 'Fri', high: 20, low: 12, condition: 'Partly Cloudy' },
    ],
    alerts: [
      {
        id: 'HP2024-1',
        type: 'Avalanche',
        severity: 'Warning',
        title: 'Avalanche Risk',
        description: 'Snow and avalanche warning for high-altitude regions. Avoid trekking.',
        area: 'Kullu & Chamba',
      },
    ],
  },
  'Sikkim': {
    current: {
      location: 'Sikkim, IN',
      temperature: 14,
      condition: 'Cloudy',
      humidity: 82,
      windSpeed: 10,
      feelsLike: 11,
    },
    forecast: [
      { day: 'Mon', high: 15, low: 8, condition: 'Cloudy' },
      { day: 'Tue', high: 16, low: 9, condition: 'Sunny' },
      { day: 'Wed', high: 17, low: 10, condition: 'Partly Cloudy' },
      { day: 'Thu', high: 16, low: 9, condition: 'Rainy' },
      { day: 'Fri', high: 15, low: 8, condition: 'Cloudy' },
    ],
    alerts: [
      {
        id: 'SIK2024-1',
        type: 'Earthquake',
        severity: 'Advisory',
        title: 'Seismic Activity Advisory',
        description: 'Minor tremors detected. Stay alert in hilly areas.',
        area: 'Gangtok & Surroundings',
      },
    ],
  },
  'Gujarat': {
    current: {
      location: 'Gujarat, IN',
      temperature: 34,
      condition: 'Sunny',
      humidity: 60,
      windSpeed: 18,
      feelsLike: 37,
    },
    forecast: [
      { day: 'Mon', high: 36, low: 28, condition: 'Sunny' },
      { day: 'Tue', high: 35, low: 27, condition: 'Sunny' },
      { day: 'Wed', high: 34, low: 26, condition: 'Cloudy' },
      { day: 'Thu', high: 35, low: 27, condition: 'Sunny' },
      { day: 'Fri', high: 36, low: 28, condition: 'Partly Cloudy' },
    ],
    alerts: [
      {
        id: 'GUJ2024-1',
        type: 'Earthquake',
        severity: 'Warning',
        title: 'Seismic Zone Alert',
        description: 'Moderate earthquake risk in the region. Stay prepared.',
        area: 'Kutch & Surrounding Areas',
      },
    ],
  },
};

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
