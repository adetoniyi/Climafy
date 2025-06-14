import axios from "axios";
import { getWeatherApiUrl } from "../utils/openweather.utils";

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
  units: string
) => {
  const url = getWeatherApiUrl("weather", lat, lon, units);
  const { data } = await axios.get(url);
  return data;
};

export const fetchDailyForecast = async (
  lat: number,
  lon: number,
  units: string
) => {
  const url = getWeatherApiUrl("forecast/daily", lat, lon, units);
  const { data } = await axios.get(url);
  return data;
};

export const fetchHourlyForecast = async (
  lat: number,
  lon: number,
  units: string
) => {
  const url = getWeatherApiUrl("forecast/hourly", lat, lon, units);
  const { data } = await axios.get(url);
  return data;
};
