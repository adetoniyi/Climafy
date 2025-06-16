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
exports.mphToMs = exports.msToMph = exports.fahrenheitToCelsius = exports.celsiusToFahrenheit = exports.fetchSevereWeatherAlerts = void 0;
const axios_1 = __importDefault(require("axios"));
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const fetchSevereWeatherAlerts = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${BASE_URL}/onecall`, {
        params: {
            lat,
            lon,
            exclude: "current,minutely,hourly,daily",
            appid: OPENWEATHERMAP_API_KEY,
        },
    });
    const data = res.data;
    return data.alerts || [];
});
exports.fetchSevereWeatherAlerts = fetchSevereWeatherAlerts;
/**
 * Convert Celsius to Fahrenheit
 */
const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
};
exports.celsiusToFahrenheit = celsiusToFahrenheit;
/**
 * Convert Fahrenheit to Celsius
 */
const fahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
};
exports.fahrenheitToCelsius = fahrenheitToCelsius;
/**
 * Convert meters per second to miles per hour
 */
const msToMph = (ms) => {
    return ms * 2.23694;
};
exports.msToMph = msToMph;
/**
 * Convert miles per hour to meters per second
 */
const mphToMs = (mph) => {
    return mph / 2.23694;
};
exports.mphToMs = mphToMs;
