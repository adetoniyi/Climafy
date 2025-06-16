import axios from "axios";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY as string;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (lat: number, lon: number) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const { data } = await axios.get(url);
  return data;
};

export const getHourlyForecast = async (lat: number, lon: number) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const { data } = await axios.get(url);
  return data;
};

export const getDailyForecast = async (lat: number, lon: number) => {
  const url = `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const { data } = await axios.get(url);
  return data;
};
