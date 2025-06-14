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
exports.deleteUserById = exports.getAllUsers = exports.getSystemStats = void 0;
const user_1 = __importDefault(require("../models/user"));
const preferences_1 = require("../models/preferences");
const location_1 = __importDefault(require("../models/location"));
const alert_1 = require("../models/alert");
const getSystemStats = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield user_1.default.countDocuments();
        const totalLocations = yield location_1.default.countDocuments();
        const totalAlerts = yield alert_1.Alert.countDocuments();
        res.json({
            users: totalUsers,
            locations: totalLocations,
            alerts: totalAlerts,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error retrieving system stats", error: err });
    }
});
exports.getSystemStats = getSystemStats;
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().select("-password");
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        yield preferences_1.Preferences.deleteOne({ user: user._id });
        yield location_1.default.deleteMany({ user: user._id });
        yield alert_1.Alert.deleteMany({ user: user._id });
        res.json({ message: "User and related data deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete user", error: err });
    }
});
exports.deleteUserById = deleteUserById;
