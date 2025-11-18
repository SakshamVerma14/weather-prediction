# 🌦️ Weather & Disaster Watch

> Real-time weather monitoring and disaster prediction system with ML-ready architecture

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Configuration](#api-configuration)
- [Project Structure](#project-structure)
- [Available Data Sources](#available-data-sources)
- [Usage Guide](#usage-guide)
- [API Integration](#api-integration)
- [Future ML Model Integration](#future-ml-model-integration)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Weather & Disaster Watch** is a modern web application that provides real-time weather data, disaster alerts, and predictive analytics for cities across India and globally. Built with React and TypeScript, it features a beautiful Gruvbox dark theme with pixel-art aesthetics.

### Why This Project?

- 🆓 **100% Free APIs** - No cost to run
- 🔌 **Multiple Data Sources** - Switch between mock, real-time, and future ML models
- 🌍 **Global Coverage** - Works for cities worldwide
- 🎨 **Beautiful UI** - Gruvbox dark theme with retro pixel art
- 🚀 **Future-Ready** - Designed for easy ML model integration
- 📱 **Responsive** - Works on desktop, tablet, and mobile

---

## ✨ Features

### Current Features

- ✅ **Real-time Weather Data**
  - Current temperature, humidity, wind speed
  - Feels-like temperature
  - 5-day forecast
  - Weather conditions with icons

- ✅ **Disaster Alerts**
  - Earthquake monitoring (USGS API)
  - Global disaster alerts (GDACS)
  - Flood warnings
  - Cyclone tracking
  - Severity indicators (Advisory/Watch/Warning)

- ✅ **Multiple Data Sources**
  - Mock data (9 predefined Indian cities)
  - Open-Meteo (free, unlimited, no API key)
  - OpenWeather (requires free API key)
  - Easy toggle between sources

- ✅ **Modern UI/UX**
  - Gruvbox dark theme
  - Pixel art aesthetic
  - Responsive design
  - Smooth animations
  - Loading states
  - Error handling

### Planned Features

- 🔮 Custom ML model integration (Python-based)
- 📊 Historical weather charts
- 🗺️ Interactive maps
- 📧 Email/SMS alerts
- 📱 Mobile app (React Native)
- 🌐 Multi-language support
- 📈 Advanced analytics dashboard

---

## 🎥 Demo

### Screenshots

**Main Dashboard**
```
┌─────────────────────────────────────────────┐
│  🌦️ Weather & Disaster Predictor           │
│  [Search: Mumbai] [Date Picker] [Search]    │
│                                              │
│  Current Weather    |    Disaster Alerts    │
│  Mumbai, IN         |    ⚠️ Flood Warning   │
│  30°C Humid         |    🌊 High Risk 67%   │
│  Feels Like: 35°C   |                        │
│                     |    ✅ No Earthquakes  │
│  5-Day Forecast                              │
│  Mon  Tue  Wed  Thu  Fri                     │
│  32°  31°  30°  32°  33°                     │
└─────────────────────────────────────────────┘
```

### Live Demo

🔗 **[Live Demo Link]** *(Add your deployment URL here)*

---

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library
- **TypeScript 5+** - Type safety
- **Vite 5+** - Build tool & dev server
- **TailwindCSS 3+** - Utility-first CSS
- **Lucide React** - Icon library

### APIs
- **Open-Meteo** - Weather data (free, unlimited)
- **OpenWeather** - Alternative weather API
- **USGS Earthquake API** - Real-time seismic data
- **GDACS** - Global disaster alerts

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control

Check your installations:
```bash
node --version  # Should be v16+
npm --version   # Should be 7+
git --version
```

### Installation

#### 1. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/yourusername/weather-disaster-watch.git

# OR clone via SSH
git clone git@github.com:yourusername/weather-disaster-watch.git

# Navigate to project directory
cd weather-disaster-watch
```

#### 2. Install Dependencies

```bash
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

#### 3. Environment Setup

```bash
# Copy environment example
cp .env.example .env

# Edit .env file (optional - only needed for OpenWeather)
nano .env  # or use any text editor
```

#### 4. Start Development Server

```bash
npm run dev

# Server will start at http://localhost:5173
```

#### 5. Open in Browser

Navigate to: **http://localhost:5173**

You should see the Weather & Disaster Watch app! 🎉

---

## 🔑 API Configuration

### Option 1: Open-Meteo (Recommended - No Setup!)

**✅ Best for:**
- Zero configuration
- Unlimited requests
- Global coverage
- Production use

**Setup:** None needed! Just switch to "Open-Meteo" in the toggle.

---

### Option 2: OpenWeather API

**✅ Best for:**
- More detailed weather data
- Historical records
- Advanced features

**Setup Steps:**

1. **Get API Key**
   - Visit: https://openweathermap.org/api
   - Click "Sign Up" (free account)
   - Verify your email
   - Navigate to: https://home.openweathermap.org/api_keys
   - Copy your API key

2. **Add to .env File**
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. **Restart Dev Server**
   ```bash
   npm run dev
   ```

4. **Switch to OpenWeather**
   - Use the toggle in top-right corner
   - Select "OpenWeather"
   - Start searching!

**Rate Limits:**
- Free tier: 1,000 calls/day
- 60 calls/minute
- Activation time: 10-15 minutes after signup

---

### Option 3: Mock Data

**✅ Best for:**
- Testing UI
- Offline development
- Demos

**Available Locations:**
- Uttarakhand
- Mumbai
- Kashmir
- Jaipur
- Assam
- Himachal Pradesh
- Bihar
- Kerala
- Punjab

**Setup:** None needed! Just switch to "Mock Data" in the toggle.

---

## 📁 Project Structure

```
weather-disaster-watch/
│
├── public/                      # Static assets
│   └── vite.svg
│
├── src/
│   ├── components/              # React components
│   │   ├── DataSourceToggle.tsx # API source switcher
│   │   ├── WeatherCard.tsx      # (Future) Weather display
│   │   ├── DisasterPanel.tsx    # (Future) Alerts display
│   │   └── ...
│   │
│   ├── services/                # API services
│   │   ├── weatherService.ts    # Main service with abstraction
│   │   ├── mockData.ts          # Mock weather data
│   │   └── ...
│   │
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts             # Weather data interfaces
│   │
│   ├── styles/                  # CSS files
│   │   ├── gruvbox.css          # Gruvbox theme
│   │   └── pixel-art.css        # Pixel art styles
│   │
│   ├── utils/                   # Utility functions
│   │   ├── dateFormatter.ts
│   │   └── riskCalculator.ts
│   │
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
│
├── .env.example                 # Environment template
├── .env                         # Your environment (git-ignored)
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS config
├── README.md                    # This file!
└── LICENSE                      # MIT License
```

---

## 🔄 Available Data Sources

### Comparison Table

| Feature | Mock Data | Open-Meteo | OpenWeather |
|---------|-----------|------------|-------------|
| **Cost** | Free | Free | Free (1K/day) |
| **API Key Required** | ❌ No | ❌ No | ✅ Yes |
| **Setup Time** | 0 min | 0 min | 15 min |
| **Coverage** | 9 cities | Global | Global |
| **Real-time Data** | ❌ No | ✅ Yes | ✅ Yes |
| **Rate Limit** | None | Unlimited | 1K/day, 60/min |
| **Forecast Days** | 5 | 16 | 5 |
| **Historical Data** | ❌ No | ✅ Yes | ✅ Yes (paid) |
| **Best For** | Testing | Production | Detailed data |

### How to Switch

1. Look for the toggle in the **top-right corner**
2. Select your preferred data source:
   - 🎭 **Mock Data** - Instant dummy data
   - 🌍 **Open-Meteo** - Real data, no key needed
   - ☁️ **OpenWeather** - Real data, requires key
3. Start searching for cities!

---

## 📖 Usage Guide

### Basic Usage

1. **Select Data Source**
   - Click the toggle in top-right corner
   - Choose your preferred API source

2. **Search for Location**
   - Enter city name (e.g., "Mumbai", "Delhi")
   - For mock data: Use exact names (Mumbai, Kashmir, etc.)
   - For real APIs: Any city works globally

3. **View Results**
   - Current weather conditions
   - 5-day forecast
   - Active disaster alerts

### Advanced Usage

#### Searching Multiple Locations

```typescript
// Example: Batch search (future feature)
const locations = ['Mumbai', 'Delhi', 'Bangalore'];
await Promise.all(locations.map(loc => weatherService.getWeather(loc)));
```

#### Custom Date Queries

```typescript
// Example: Future date prediction (when ML model is integrated)
weatherService.getWeather('Mumbai', { date: '2024-12-25' });
```

#### Handling Errors

The app includes comprehensive error handling:
- ❌ Invalid location → Shows error message
- ❌ API down → Suggests switching to mock data
- ❌ Rate limit → Displays retry countdown
- ❌ Network error → Shows offline message

---

## 🔌 API Integration

### Architecture

The app uses a **service-based architecture** for easy API switching:

```typescript
// Abstraction layer
interface WeatherAPI {
  getCurrentWeather(location: string): Promise<WeatherData>;
  getForecast(location: string): Promise<ForecastData>;
  getDisasterAlerts(location: string): Promise<DisasterData>;
}

// Implementations
class OpenMeteoService implements WeatherAPI { ... }
class OpenWeatherService implements WeatherAPI { ... }
class MockDataService implements WeatherAPI { ... }
```

### Adding New APIs

To add a new weather API:

1. **Create Service Class**
   ```typescript
   // src/services/newapi.service.ts
   export class NewAPIService implements WeatherAPI {
     async getCurrentWeather(location: string) {
       const response = await fetch(`${API_URL}/weather?q=${location}`);
       return this.transformResponse(response);
     }
   }
   ```

2. **Add to Weather Service**
   ```typescript
   // src/services/weatherService.ts
   case 'newapi':
     return new NewAPIService().getWeather(location);
   ```

3. **Update Toggle Component**
   ```tsx
   <option value="newapi">🆕 New API</option>
   ```

---

## 🔮 Future ML Model Integration

### Preparing for Python ML Model

The architecture is designed for easy ML model integration:

#### Step 1: Create Python API (FastAPI)

```python
# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import pickle

app = FastAPI()

# Load your trained model
model = pickle.load(open('weather_model.pkl', 'rb'))

class PredictionRequest(BaseModel):
    location: str
    date: str
    historical_data: dict

@app.post("/predict")
async def predict_weather(request: PredictionRequest):
    # Run prediction
    prediction = model.predict(request.historical_data)
    
    return {
        "temperature": prediction['temp'],
        "flood_probability": prediction['flood_risk'],
        "cyclone_probability": prediction['cyclone_risk'],
        "confidence_score": prediction['confidence']
    }
```

#### Step 2: Update Frontend Service

```typescript
// src/services/mlmodel.service.ts
export class MLModelService implements WeatherAPI {
  private baseURL = import.meta.env.VITE_ML_MODEL_URL;

  async getWeather(location: string): Promise<WeatherData> {
    const response = await fetch(`${this.baseURL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        location,
        date: new Date().toISOString()
      })
    });
    
    return this.transformMLResponse(await response.json());
  }
}
```

#### Step 3: Add to Toggle

```typescript
// Add to DataSource type
export type DataSource = 'mock' | 'openweather' | 'openmeteo' | 'ml_model';

// Add to weatherService.ts
case 'ml_model':
  return new MLModelService().getWeather(location);
```

#### Step 4: Environment Variable

```env
# .env
VITE_ML_MODEL_URL=http://localhost:8000
VITE_ML_API_KEY=your_secure_key
```

---

## 🎨 Customization

### Changing Theme Colors

Edit the Gruvbox colors in your Tailwind config or CSS:

```css
/* src/styles/gruvbox.css */
:root {
  --gruvbox-dark0: #282828;
  --gruvbox-dark1: #3c3836;
  --gruvbox-dark2: #504945;
  
  --gruvbox-red: #fb4934;
  --gruvbox-green: #b8bb26;
  --gruvbox-yellow: #fabd2f;
  --gruvbox-blue: #83a598;
}
```

### Adding New Mock Locations

```typescript
// src/services/mockData.ts
export type MockLocation = 
  | 'Uttarakhand'
  | 'YourNewCity';  // Add here

const mockData: Record<MockLocation, WeatherData> = {
  'YourNewCity': {
    current: { ... },
    forecast: [ ... ],
    alerts: [ ... ]
  }
};
```

### Custom Weather Icons

Replace icons in your components or add new SVGs:

```tsx
const weatherIcons = {
  'Sunny': '☀️',
  'Rainy': '🌧️',
  'Cloudy': '☁️',
  'Snowy': '❄️',
  'YourCustom': '🌈'  // Add custom icons
};
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Failed to resolve import" Error

**Problem:** Missing files or incorrect import paths

**Solution:**
```bash
# Check file exists
ls -la src/services/mockData.ts

# Verify import path matches file location
# Correct: import from './mockData'
# Wrong: import from '../mockData'
```

#### 2. "API key not found" Error

**Problem:** .env file missing or incorrect format

**Solution:**
```bash
# Create .env file
cp .env.example .env

# Add your key
echo "VITE_OPENWEATHER_API_KEY=your_key" >> .env

# Restart dev server
npm run dev
```

#### 3. "Location not found" Error

**Problem:** Invalid city name or API issue

**Solution:**
- For Mock Data: Use exact names (Mumbai, Kashmir, etc.)
- For Real APIs: Try different spellings (e.g., "Mumbai, IN")
- Check spelling and capitalization
- Try switching to Open-Meteo (most reliable)

#### 4. Blank Screen on Startup

**Problem:** JavaScript errors or missing dependencies

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for console errors
# Open browser DevTools (F12)
```

#### 5. API Rate Limit Exceeded

**Problem:** Too many requests to OpenWeather

**Solution:**
- Switch to Open-Meteo (unlimited)
- Wait 1 hour for rate limit reset
- Implement request caching
- Upgrade to paid OpenWeather plan

### Getting Help

1. **Check Issues:** [GitHub Issues](https://github.com/yourusername/weather-disaster-watch/issues)
2. **Ask Questions:** [Discussions](https://github.com/yourusername/weather-disaster-watch/discussions)
3. **Email Support:** your.email@example.com

---

## 📊 Performance

### Optimization Tips

1. **Caching API Responses**
   ```typescript
   // Cache weather data for 10 minutes
   const cache = new Map();
   const CACHE_DURATION = 10 * 60 * 1000;
   ```

2. **Lazy Loading Components**
   ```typescript
   const WeatherCard = lazy(() => import('./components/WeatherCard'));
   ```

3. **Debounce Search Input**
   ```typescript
   const debouncedSearch = debounce(handleSearch, 500);
   ```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview

# Deploy dist/ folder to your hosting service
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Fork & Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/weather-disaster-watch.git
cd weather-disaster-watch
```

### Create Branch

```bash
git checkout -b feature/your-feature-name
```

### Make Changes

- Write clean, documented code
- Follow existing code style
- Add tests if applicable
- Update documentation

### Commit & Push

```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/your-feature-name
```

### Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Describe your changes
4. Submit for review

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

```typescript
// Example test
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/enter city/i);
  expect(searchInput).toBeInTheDocument();
});
```

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Netlify

```bash
# Build
npm run build

# Deploy dist/ folder via Netlify UI
# Or use Netlify CLI:
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/weather-disaster-watch",
"scripts": {
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run build
npm run deploy
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

- **Open-Meteo** - Free weather API
- **OpenWeather** - Weather data provider
- **USGS** - Earthquake monitoring
- **GDACS** - Global disaster alerts
- **Gruvbox** - Color scheme inspiration
- **React Team** - Amazing framework
- **Vite Team** - Lightning-fast build tool

---

## 📞 Contact & Support

- **Author:** Saksham Verma
- **Email:** your.email@example.com
- **GitHub:** [@SakshamVerma14](https://github.com/SakshamVerma14)


---

## 🗺️ Roadmap

### Version 1.0 (Current)
- ✅ Multiple data sources
- ✅ Real-time weather
- ✅ Disaster alerts
- ✅ Responsive UI

### Version 2.0 (Q1 2025)
- 🔮 ML model integration
- 📊 Historical charts
- 🗺️ Interactive maps
- 📱 PWA support

### Version 3.0 (Q2 2025)
- 🌐 Multi-language
- 📧 Alert notifications
- 📈 Advanced analytics
- 🔐 User accounts

---

## ⭐ Show Your Support

If you find this project helpful, please consider:

- ⭐ Starring the repo
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🤝 Contributing code
- 📢 Sharing with others

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Open-Meteo API Docs](https://open-meteo.com/en/docs)
- [OpenWeather API Docs](https://openweathermap.org/api)

---

<div align="center">

**Made with ❤️ by [Saksham](https://github.com/SakshamVerma14) and his team**

**[⬆ Back to Top](#-weather--disaster-watch)**

</div>
