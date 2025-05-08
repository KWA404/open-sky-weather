# Weather Dashboard

A modern, responsive weather dashboard built with React and Azure. This application allows users to search for cities and view current weather conditions including temperature, humidity, wind speed, and more.

## Features

- City search with autocomplete for popular cities
- Current weather display with dynamic theming based on conditions
- Temperature toggle between Celsius and Fahrenheit
- Wind speed toggle between km/h and mph
- Dark/light mode with automatic detection and manual toggle
- Persistent user preferences using localStorage
- Responsive design for all device sizes
- Secure API key handling via Azure Functions

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Azure Functions
- **API**: OpenWeatherMap
- **Deployment**: Azure Static Web Apps

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your OpenWeatherMap API key:
   ```
   VITE_OPEN_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Azure Deployment

### Prerequisites

- Azure account
- OpenWeatherMap API key

### Deployment Steps

1. **Create a GitHub repository** and push your code.

2. **Deploy to Azure Static Web Apps**:
   - Go to the Azure Portal
   - Create a new "Static Web App" resource
   - Connect to your GitHub repository
   - Configure build settings:
     - Build Preset: React
     - App location: `/`
     - API location: `/api`
     - Output location: `dist`

3. **Configure Environment Variables**:
   - In the Azure Portal, navigate to your Static Web App
   - Go to Configuration → Application settings
   - Add a new setting: `OPEN_WEATHER_API_KEY` with your API key

4. **Update API Endpoint** (if needed):
   - If you're not using the default URL, update the `API_URL` in `src/services/weatherService.ts`

## Project Structure

```
weather-dashboard/
├── src/
│   ├── components/         # UI components
│   ├── context/            # React context for state management
│   ├── services/           # API and other services
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── api/
│   └── getWeather/         # Azure Function for weather API proxy
├── public/                 # Static assets
└── static-web-app.config.json  # Azure Static Web App configuration
```

## License

MIT