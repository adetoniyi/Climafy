"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHourlyForecast = exports.getDailyForecast = exports.getCurrentWeather = void 0;
const weather_util_1 = require("../utils/weather.util");
const getCurrentWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lon, units } = req.query;
        const weather = yield (0, weather_util_1.fetchCurrentWeather)(Number(lat), Number(lon), units);
        res.json(weather);
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Failed to fetch current weather", error: err });
    }
});
exports.getCurrentWeather = getCurrentWeather;
const getDailyForecast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lon, units } = req.query;
        const forecast = yield (0, weather_util_1.fetchDailyForecast)(Number(lat), Number(lon), units);
        res.json(forecast);
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Failed to fetch daily forecast", error: err });
    }
});
exports.getDailyForecast = getDailyForecast;
const getHourlyForecast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lon, units } = req.query;
        const forecast = yield (0, weather_util_1.fetchHourlyForecast)(Number(lat), Number(lon), units);
        res.json(forecast);
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Failed to fetch hourly forecast", error: err });
    }
});
exports.getHourlyForecast = getHourlyForecast;
