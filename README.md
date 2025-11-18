<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Weather & Disaster Watch

Vite + React app that aggregates OpenWeather, Open-Meteo, and disaster feeds into a single dashboard with mock fallback data.

## Data Sources

- **Weather (paid key optional):** OpenWeather (requires `VITE_OPENWEATHER_API_KEY`)
- **Weather (free):** Open-Meteo + mock dataset for demo cities
- **Disasters:** ReliefWeb disasters filtered to India (location-aware; falls back to curated state alerts when no live reports exist)

## Project Structure

```
weather---disaster-watch/
├── App.tsx
├── components/
├── config/
│   ├── apiConfig.ts        # central place for API URLs + env lookups
│   ├── env.template        # copy to .env and add your keys
│   └── README.md           # explains how to work with API settings
├── services/
│   ├── weatherService.ts   # uses config exports instead of hard-coded keys
│   └── mockData.ts
├── types.ts
└── README.md
```

## Prerequisites

- Node.js 18+
- npm 9+

## 1. Install dependencies

```bash
npm install
```

## 2. Configure API keys

1. Copy the template file and create your real env file:
   ```bash
   cd weather---disaster-watch
   cp config/env.template .env
   ```
2. Open `.env`, replace `your_openweather_key_here` with the key from https://home.openweathermap.org/api_keys
3. That key is automatically read inside `config/apiConfig.ts` and used by `weatherService.ts`. No other files need edits.

> **Where are keys stored?**  
> Every service imports from `config/apiConfig.ts`, so you only touch that folder when rotating or adding keys. See `config/README.md` for more details.

## 3. Run the app

```bash
npm run dev
```

## 4. Build for production

```bash
npm run build
```

## Future: plugging in your own ML model

Want to pipe predictions from a Python/ML model into the UI? One approach:

1. **Expose the model** via a REST endpoint (Flask/FastAPI) or WebSocket that accepts payloads such as `{ location: string, weather: WeatherData }` and returns predictions/alerts.
2. **Create a new service** under `services/aiModelService.ts` that calls your endpoint (e.g., with `fetch`/`axios`). Reuse the types in `types.ts` to standardize responses.
3. **Wire it into the UI** by extending `WeatherService`:
   - Add a new `DataSource` option (e.g., `'customModel'`)
   - In the switch statement, call your new service and merge its results with the weather data.
4. **Secure the channel** by adding another env entry (e.g., `VITE_MODEL_API_URL`) and documenting it in `config/apiConfig.ts`.

Because all secrets now flow through the `config/` layer, adding future API keys or model endpoints is just a matter of:

```
config/
  apiConfig.ts    <-- import.meta.env lookups
  env.template    <-- add new VITE_* entries
```

and updating the README so teammates know what to set. This keeps the TSX files clean while making it obvious where configuration belongs.
