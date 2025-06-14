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
exports.getUserCustomAlerts = exports.createCustomAlert = exports.getSevereAlerts = void 0;
const alert_services_1 = require("../utils/alert.services");
const alert_1 = require("../models/alert");
const getSevereAlerts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lon } = req.query;
        const alerts = yield (0, alert_services_1.fetchSevereWeatherAlerts)(Number(lat), Number(lon));
        res.json(alerts);
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Failed to fetch severe alerts", error: err });
    }
});
exports.getSevereAlerts = getSevereAlerts;
const createCustomAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const alert = new alert_1.Alert(Object.assign(Object.assign({}, req.body), { user: userId }));
        yield alert.save();
        res.status(201).json(alert);
    }
    catch (err) {
        res
            .status(400)
            .json({ message: "Failed to create custom alert", error: err });
    }
});
exports.createCustomAlert = createCustomAlert;
const getUserCustomAlerts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alerts = yield alert_1.Alert.find({ user: req.user.id });
        res.json(alerts);
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Failed to fetch custom alerts", error: err });
    }
});
exports.getUserCustomAlerts = getUserCustomAlerts;
