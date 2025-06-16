import { Request, Response, NextFunction } from "express";
import * as weatherService from "../services/weather.service";

export const getCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon)
      return res
        .status(400)
        .json({ message: "Latitude and Longitude required" });

    const data = await weatherService.fetchCurrentWeather(
      Number(lat),
      Number(lon)
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getHourly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon)
      return res
        .status(400)
        .json({ message: "Latitude and Longitude required" });

    const data = await weatherService.fetchHourlyForecast(
      Number(lat),
      Number(lon)
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getDaily = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon)
      return res
        .status(400)
        .json({ message: "Latitude and Longitude required" });

    const data = await weatherService.fetchDailyForecast(
      Number(lat),
      Number(lon)
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
