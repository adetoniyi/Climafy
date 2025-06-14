"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationSchema = exports.createLocationSchema = void 0;
const zod_1 = require("zod");
exports.createLocationSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    latitude: zod_1.z.number().min(-90).max(90),
    longitude: zod_1.z.number().min(-180).max(180),
});
exports.deleteLocationSchema = zod_1.z.object({
    locationId: zod_1.z.string(),
});
