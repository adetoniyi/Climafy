import express from "express";
import * as weatherController from "../controllers/weather.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

function asyncHandler(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => any
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Fetch weather forecasts
 */

/**
 * @swagger
 * /api/weather/current:
 *   get:
 *     summary: Get current weather for a location
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude of the location
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude of the location
 *     responses:
 *       200:
 *         description: Current weather data
 *       400:
 *         description: Missing latitude or longitude
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/current",
  asyncHandler(authenticate),
  asyncHandler(weatherController.getCurrent)
);

/**
 * @swagger
 * /api/weather/hourly:
 *   get:
 *     summary: Get hourly forecast for the next 48 hours
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude of the location
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude of the location
 *     responses:
 *       200:
 *         description: Hourly forecast data
 *       400:
 *         description: Missing latitude or longitude
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/hourly",
  asyncHandler(authenticate),
  asyncHandler(weatherController.getHourly)
);

/**
 * @swagger
 * /api/weather/daily:
 *   get:
 *     summary: Get daily forecast for the next 7 days
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude of the location
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude of the location
 *     responses:
 *       200:
 *         description: Daily forecast data
 *       400:
 *         description: Missing latitude or longitude
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/daily",
  asyncHandler(authenticate),
  asyncHandler(weatherController.getDaily)
);

export default router;
