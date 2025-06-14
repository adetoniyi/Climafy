"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const alertSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    condition: { type: String, required: true }, // e.g., "temperature > 30"
    type: {
        type: String,
        enum: ["temperature", "wind", "humidity"],
        required: true,
    },
    threshold: { type: Number, required: true },
    operator: { type: String, enum: [">", "<", ">=", "<="], required: true },
    location: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
    },
}, { timestamps: true });
exports.Alert = mongoose_1.default.model("Alert", alertSchema);
