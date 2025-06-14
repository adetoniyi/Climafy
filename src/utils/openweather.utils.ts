import axios from "axios";
import { OPENWEATHER_API_KEY } from "../config/weather.config";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherApiUrl = (
  endpoint: string,
  lat: number,
  lon: number,
  units: string = "metric"
) => {
  return `${BASE_URL}/${endpoint}?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=${units}`;
};

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchForecast = async (lat: number, lon: number) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};
