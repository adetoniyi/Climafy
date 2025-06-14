"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preferences = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const preferencesSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    units: {
        temperature: { type: String, enum: ["C", "F"], default: "C" },
        windSpeed: { type: String, enum: ["km/h", "mph"], default: "km/h" },
    },
    notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: false },
    },
}, { timestamps: true });
exports.Preferences = mongoose_1.default.model("Preferences", preferencesSchema);
