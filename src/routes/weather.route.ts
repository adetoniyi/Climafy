import { Router } from "express";
import {
  getCurrentWeather,
  getDailyForecast,
  getHourlyForecast,
} from "../controllers/weather.controller";
import authenticate from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Weather Forecast Fetching
 */

/**
 * @swagger
 * /weather/current:
 *   get:
 *     summary: Get current weather for a location
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Current weather data
 *       404:
 *         description: Location not found
 */
router.get("/current", authenticate, getCurrentWeather);

/**
 * @swagger
 * /weather/daily:
 *   get:
 *     summary: Get daily weather forecast for a location
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Daily forecast data
 *       404:
 *         description: Location not found
 */
router.get("/daily", authenticate, getDailyForecast);

/**
 * @swagger
 * /weather/hourly:
 *   get:
 *     summary: Get hourly weather forecast for a location
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Hourly forecast data
 *       404:
 *         description: Location not found
 */
router.get("/hourly", authenticate, getHourlyForecast);

export default router;
