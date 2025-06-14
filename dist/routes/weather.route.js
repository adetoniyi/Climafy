"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weather_controller_1 = require("../controllers/weather.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
//Utility to wrap async route handlers and forward errors to Express error handler.
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Get weather data
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
 *       - name: lat
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: lon
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: units
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [metric, imperial]
 *     responses:
 *       200:
 *         description: Current weather data
 */
router.get("/weather/current", asyncHandler(auth_middleware_1.authenticate), weather_controller_1.getCurrentWeather);
/**
 * @swagger
 * /api/weather/daily:
 *   get:
 *     summary: Get 7-day daily forecast
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: lat
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: lon
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: units
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [metric, imperial]
 *     responses:
 *       200:
 *         description: Daily forecast
 */
router.get("/weather/daily", asyncHandler(auth_middleware_1.authenticate), weather_controller_1.getDailyForecast);
/**
 * @swagger
 * /api/weather/hourly:
 *   get:
 *     summary: Get 24-hour hourly forecast
 *     tags: [Weather]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: lat
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: lon
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: units
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [metric, imperial]
 *     responses:
 *       200:
 *         description: Hourly forecast
 */
router.get("/weather/hourly", asyncHandler(auth_middleware_1.authenticate), weather_controller_1.getHourlyForecast);
exports.default = router;
