import { Request, Response } from "express";
import {
  fetchCurrentWeather,
  fetchDailyForecast,
  fetchHourlyForecast,
} from "../services/weather.service";

export const getCurrentWeather = async (req: Request, res: Response) => {
  try {
    const { lat, lon, units } = req.query;
    const weather = await fetchCurrentWeather(
      Number(lat),
      Number(lon),
      units as string
    );
    res.json(weather);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch current weather", error: err });
  }
};

export const getDailyForecast = async (req: Request, res: Response) => {
  try {
    const { lat, lon, units } = req.query;
    const forecast = await fetchDailyForecast(
      Number(lat),
      Number(lon),
      units as string
    );
    res.json(forecast);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch daily forecast", error: err });
  }
};

export const getHourlyForecast = async (req: Request, res: Response) => {
  try {
    const { lat, lon, units } = req.query;
    const forecast = await fetchHourlyForecast(
      Number(lat),
      Number(lon),
      units as string
    );
    res.json(forecast);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch hourly forecast", error: err });
  }
};
