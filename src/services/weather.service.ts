import * as weatherAPI from "../utils/openweather.utils";

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  return await weatherAPI.getCurrentWeather(lat, lon);
};

export const fetchHourlyForecast = async (lat: number, lon: number) => {
  return await weatherAPI.getHourlyForecast(lat, lon);
};

export const fetchDailyForecast = async (lat: number, lon: number) => {
  return await weatherAPI.getDailyForecast(lat, lon);
};
