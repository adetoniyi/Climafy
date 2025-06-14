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
exports.getUserPreferences = exports.updateNotificationSettings = exports.updateUnits = void 0;
const preferences_model_1 = require("../models/preferences.model");
const updateUnits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { temperature, windSpeed } = req.body;
        const preferences = yield preferences_model_1.Preferences.findOneAndUpdate({ user: userId }, { "units.temperature": temperature, "units.windSpeed": windSpeed }, { new: true, upsert: true });
        res.json(preferences);
    }
    catch (err) {
        res.status(400).json({ message: "Failed to update units", error: err });
    }
});
exports.updateUnits = updateUnits;
const updateNotificationSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { email, sms, push } = req.body;
        const preferences = yield preferences_model_1.Preferences.findOneAndUpdate({ user: userId }, {
            "notifications.email": email,
            "notifications.sms": sms,
            "notifications.push": push,
        }, { new: true, upsert: true });
        res.json(preferences);
    }
    catch (err) {
        res
            .status(400)
            .json({ message: "Failed to update notifications", error: err });
    }
});
exports.updateNotificationSettings = updateNotificationSettings;
const getUserPreferences = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preferences = yield preferences_model_1.Preferences.findOne({ user: req.user.id });
        res.json(preferences || {});
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Failed to retrieve preferences", error: err });
    }
});
exports.getUserPreferences = getUserPreferences;
