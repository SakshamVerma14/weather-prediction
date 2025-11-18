# API / Config Guide

This folder explains where API settings live and how to provide secrets for the app.

## Files

- `apiConfig.ts` – central export the app uses to know the base URLs and API keys for OpenWeather, Open-Meteo, and the ReliefWeb India disaster feed. All services import from here so you only have one place to update settings.
- `env.template` – starter file you can copy to `.env` in the project root. Add this variable:

  ```
  VITE_OPENWEATHER_API_KEY=your_openweather_key_here
  ```

  The key is consumed inside `apiConfig.ts` and eventually by `weatherService`.

## Quick steps to add/rotate keys

1. `cp config/env.template .env`
2. Paste your real value in place of the placeholder.
3. Restart Vite (`npm run dev`) or rebuild (`npm run build`) so the new key is picked up.

That’s it—no component needs to change, because they all talk to this config layer.

