"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    preferences: {
        unit: { type: String, enum: ["metric", "imperial"], default: "metric" },
        severeAlerts: { type: Boolean, default: true },
        customAlerts: { type: Boolean, default: true },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
