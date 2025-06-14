import axios from "axios";

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY!;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchSevereWeatherAlerts = async (lat: number, lon: number) => {
  const res = await axios.get(`${BASE_URL}/onecall`, {
    params: {
      lat,
      lon,
      exclude: "current,minutely,hourly,daily",
      appid: OPENWEATHERMAP_API_KEY,
    },
  });

  const data = res.data as { alerts?: any[] };
  return data.alerts || [];
};

/**
 * Convert Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Convert Fahrenheit to Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

/**
 * Convert meters per second to miles per hour
 */
export const msToMph = (ms: number): number => {
  return ms * 2.23694;
};

/**
 * Convert miles per hour to meters per second
 */
export const mphToMs = (mph: number): number => {
  return mph / 2.23694;
};
