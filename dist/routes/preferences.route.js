"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const preferenes_controller_1 = require("../controllers/preferenes.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
//Utility to wrap async route handlers and forward errors to Express error handler.
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
/**
 * @swagger
 * tags:
 *   name: Preferences
 *   description: User preferences for units and notifications
 */
/**
 * @swagger
 * /api/preferences/units:
 *   put:
 *     summary: Update user's unit preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: string
 *                 enum: [C, F]
 *               windSpeed:
 *                 type: string
 *                 enum: [km/h, mph]
 *     responses:
 *       200:
 *         description: Preferences updated
 */
router.put("/preferences/units", asyncHandler(auth_middleware_1.authenticate), preferenes_controller_1.updateUnits);
/**
 * @swagger
 * /api/preferences/notifications:
 *   put:
 *     summary: Update user's notification settings
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: boolean
 *               sms:
 *                 type: boolean
 *               push:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Notification settings updated
 */
router.put("/preferences/notifications", asyncHandler(auth_middleware_1.authenticate), preferenes_controller_1.updateNotificationSettings);
/**
 * @swagger
 * /api/preferences:
 *   get:
 *     summary: Get user's preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences
 */
router.get("/preferences", asyncHandler(auth_middleware_1.authenticate), preferenes_controller_1.getUserPreferences);
exports.default = router;
