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
exports.fetchSevereWeatherAlerts = exports.deleteCustomAlert = exports.getUserAlerts = exports.createCustomAlert = void 0;
const axios_1 = __importDefault(require("axios"));
const websocket_utils_1 = require("../utils/websocket.utils");
const alert_model_1 = __importDefault(require("../models/alert.model"));
const createCustomAlert = (userId, locationId, type, condition, threshold) => __awaiter(void 0, void 0, void 0, function* () {
    const alert = new alert_model_1.default({
        user: userId,
        location: locationId,
        type,
        condition,
        threshold,
    });
    return yield alert.save();
});
exports.createCustomAlert = createCustomAlert;
const getUserAlerts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield alert_model_1.default.find({ user: userId }).populate("location");
});
exports.getUserAlerts = getUserAlerts;
const deleteCustomAlert = (alertId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield alert_model_1.default.findOneAndDelete({ _id: alertId, user: userId });
});
exports.deleteCustomAlert = deleteCustomAlert;
const fetchSevereWeatherAlerts = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`;
    const { data } = yield axios_1.default.get(url);
    const weatherData = data;
    if (weatherData.alerts && weatherData.alerts.length > 0) {
        weatherData.alerts.forEach((alert) => {
            (0, websocket_utils_1.broadcastSevereAlert)(`Severe Alert: ${alert.event} - ${alert.description}`);
        });
    }
});
exports.fetchSevereWeatherAlerts = fetchSevereWeatherAlerts;
