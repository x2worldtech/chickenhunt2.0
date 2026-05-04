import { useQuery } from "@tanstack/react-query";

export interface CityWeather {
  city: string;
  lat: number;
  lon: number;
  current: {
    temperature: number;
    apparentTemperature: number;
    precipitation: number;
    weatherCode: number;
    windSpeed: number;
    humidity: number;
  };
  daily: {
    weatherCode: number[];
    tempMax: number[];
    tempMin: number[];
    precipitationProbability: number[];
    time: string[];
  };
}

export interface WeatherData {
  cities: CityWeather[];
  fetchedAt: number;
}

export const WEATHER_CITIES = [
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

interface OpenMeteoCurrentUnits {
  temperature_2m: string;
}

interface OpenMeteoCurrent {
  temperature_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weathercode: number;
  windspeed_10m: number;
  relativehumidity_2m: number;
}

interface OpenMeteoDaily {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

interface OpenMeteoResponse {
  current_units?: OpenMeteoCurrentUnits;
  current: OpenMeteoCurrent;
  daily: OpenMeteoDaily;
}

async function fetchCityWeather(
  name: string,
  lat: number,
  lon: number,
): Promise<CityWeather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=10`;
  const res = await fetch(url, { signal: AbortSignal.timeout(12_000) });
  if (!res.ok) throw new Error(`Open-Meteo ${res.status} for ${name}`);
  const data = (await res.json()) as OpenMeteoResponse;
  return {
    city: name,
    lat,
    lon,
    current: {
      temperature: Math.round(data.current.temperature_2m),
      apparentTemperature: Math.round(data.current.apparent_temperature),
      precipitation: data.current.precipitation,
      weatherCode: data.current.weathercode,
      windSpeed: Math.round(data.current.windspeed_10m),
      humidity: Math.round(data.current.relativehumidity_2m),
    },
    daily: {
      weatherCode: data.daily.weathercode,
      tempMax: data.daily.temperature_2m_max.map(Math.round),
      tempMin: data.daily.temperature_2m_min.map(Math.round),
      precipitationProbability: data.daily.precipitation_probability_max,
      time: data.daily.time,
    },
  };
}

export function useWeatherData() {
  return useQuery<WeatherData | null>({
    queryKey: ["weatherData"],
    queryFn: async () => {
      const results = await Promise.allSettled(
        WEATHER_CITIES.map((c) => fetchCityWeather(c.name, c.lat, c.lon)),
      );
      const cities: CityWeather[] = results
        .filter(
          (r): r is PromiseFulfilledResult<CityWeather> =>
            r.status === "fulfilled",
        )
        .map((r) => r.value);
      if (cities.length === 0) return null;
      return { cities, fetchedAt: Date.now() };
    },
    staleTime: 5 * 60_000,
    refetchInterval: 10 * 60_000,
    placeholderData: (prev) => prev ?? null,
  });
}

/** Returns the current temperature for a given city (by index 0-4) from weather data */
export function getCityTempTeaser(
  data: WeatherData | null | undefined,
  cityIndex: number,
): string {
  if (!data || !data.cities[cityIndex]) return "--°C";
  return `${data.cities[cityIndex].current.temperature}°C`;
}

/** Maps WMO weather code to a condition label */
export function getWeatherCondition(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow Showers";
  return "Thunderstorm";
}

/** Maps WMO code to particle type for animations */
export function getParticleType(
  code: number,
): "clear" | "cloudy" | "rain" | "snow" | "storm" {
  if (code === 0) return "clear";
  if (code <= 3) return "cloudy";
  if (code <= 48) return "cloudy";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 82) return "rain";
  if (code <= 86) return "snow";
  return "storm";
}

/** Returns sky gradient CSS based on weather code */
export function getSkyGradient(code: number): string {
  if (code === 0)
    return "linear-gradient(180deg, #1a6bce 0%, #3a8ee8 40%, #7bbff7 100%)";
  if (code <= 3)
    return "linear-gradient(180deg, #3a6080 0%, #5a82a8 40%, #8aafcc 100%)";
  if (code <= 48)
    return "linear-gradient(180deg, #2a3a48 0%, #4a5a68 40%, #6a7a88 100%)";
  if (code <= 67)
    return "linear-gradient(180deg, #1a2230 0%, #2a3448 40%, #3a4a58 100%)";
  if (code <= 77)
    return "linear-gradient(180deg, #2a3040 0%, #3a4258 40%, #5a6278 100%)";
  if (code <= 82)
    return "linear-gradient(180deg, #1a2835 0%, #2a3848 40%, #445060 100%)";
  if (code <= 86)
    return "linear-gradient(180deg, #252838 0%, #383d52 40%, #525870 100%)";
  return "linear-gradient(180deg, #0a0a14 0%, #141428 40%, #202040 100%)";
}
