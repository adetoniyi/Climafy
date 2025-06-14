"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alert_controller_1 = require("../controllers/alert.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Weather alerts
 */
/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: Get severe weather alerts
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: lat
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *       - name: lon
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of severe alerts
 */
router.get("/alerts", asyncHandler(auth_middleware_1.authenticate), alert_controller_1.getSevereAlerts);
/**
 * @swagger
 * /api/alerts/custom:
 *   post:
 *     summary: Create a custom weather alert
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [temperature, wind, humidity]
 *               operator:
 *                 type: string
 *                 enum: [">", "<", ">=", "<="]
 *               threshold:
 *                 type: number
 *               location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lon:
 *                     type: number
 *     responses:
 *       201:
 *         description: Alert created
 */
router.post("/alerts/custom", asyncHandler(auth_middleware_1.authenticate), alert_controller_1.createCustomAlert);
/**
 * @swagger
 * /api/alerts/custom:
 *   get:
 *     summary: Get all custom alerts for the user
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's custom alerts
 */
router.get("/alerts/custom", asyncHandler(auth_middleware_1.authenticate), alert_controller_1.getUserCustomAlerts);
exports.default = router;
