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
exports.getDailyForecast = exports.getHourlyForecast = exports.getCurrentWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const getCurrentWeather = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const { data } = yield axios_1.default.get(url);
    return data;
});
exports.getCurrentWeather = getCurrentWeather;
const getHourlyForecast = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const { data } = yield axios_1.default.get(url);
    return data;
});
exports.getHourlyForecast = getHourlyForecast;
const getDailyForecast = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const { data } = yield axios_1.default.get(url);
    return data;
});
exports.getDailyForecast = getDailyForecast;
