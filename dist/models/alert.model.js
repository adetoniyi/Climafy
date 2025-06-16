"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AlertSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: mongoose_1.Schema.Types.ObjectId, ref: "Location", required: true },
    type: {
        type: String,
        enum: ["temperature", "wind", "humidity"],
        required: true,
    },
    condition: { type: String, enum: ["gt", "lt", "eq"], required: true },
    threshold: { type: Number, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Alert", AlertSchema);
