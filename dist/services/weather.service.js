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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHourlyForecast = exports.fetchDailyForecast = exports.fetchCurrentWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const fetchCurrentWeather = (lat_1, lon_1, ...args_1) => __awaiter(void 0, [lat_1, lon_1, ...args_1], void 0, function* (lat, lon, units = "metric") {
    const res = yield axios_1.default.get(`${BASE_URL}/weather`, {
        params: {
            lat,
            lon,
            units,
            appid: OPENWEATHERMAP_API_KEY,
        },
    });
    return res.data;
});
exports.fetchCurrentWeather = fetchCurrentWeather;
const fetchDailyForecast = (lat_1, lon_1, ...args_1) => __awaiter(void 0, [lat_1, lon_1, ...args_1], void 0, function* (lat, lon, units = "metric") {
    const res = yield axios_1.default.get(`${BASE_URL}/onecall`, {
        params: {
            lat,
            lon,
            exclude: "current,minutely,hourly,alerts",
            units,
            appid: OPENWEATHERMAP_API_KEY,
        },
    });
    return res.data.daily;
});
exports.fetchDailyForecast = fetchDailyForecast;
const fetchHourlyForecast = (lat_1, lon_1, ...args_1) => __awaiter(void 0, [lat_1, lon_1, ...args_1], void 0, function* (lat, lon, units = "metric") {
    const res = yield axios_1.default.get(`${BASE_URL}/onecall`, {
        params: {
            lat,
            lon,
            exclude: "current,minutely,daily,alerts",
            units,
            appid: OPENWEATHERMAP_API_KEY,
        },
    });
    return res.data.hourly;
});
exports.fetchHourlyForecast = fetchHourlyForecast;
