"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alertController = __importStar(require("../controllers/alert.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const websocket_utils_1 = require("../utils/websocket.utils");
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
 *   description: Custom and Severe Weather Alerts
 */
/**
 * @swagger
 * /api/alerts:
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
 *             required:
 *               - locationId
 *               - type
 *               - condition
 *               - threshold
 *             properties:
 *               locationId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               type:
 *                 type: string
 *                 enum: [temperature, wind, humidity]
 *                 example: temperature
 *               condition:
 *                 type: string
 *                 enum: [gt, lt, eq]
 *                 example: gt
 *               threshold:
 *                 type: number
 *                 example: 35
 *     responses:
 *       201:
 *         description: Custom alert created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", asyncHandler(auth_middleware_1.authenticate), alertController.createAlert);
/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: Get all custom alerts for the authenticated user
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's custom alerts
 *       401:
 *         description: Unauthorized
 */
router.get("/", asyncHandler(auth_middleware_1.authenticate), alertController.getAlerts);
/**
 * @swagger
 * /api/alerts/{id}:
 *   delete:
 *     summary: Delete a custom alert by ID
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Custom alert ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Custom alert deleted successfully
 *       404:
 *         description: Alert not found
 */
router.delete("/:id", asyncHandler(auth_middleware_1.authenticate), asyncHandler(alertController.deleteAlert));
/**
 * @swagger
 * /api/alerts/test:
 *   get:
 *     summary: Trigger a test severe weather alert via WebSocket
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: Test severe weather alert sent via WebSocket
 */
router.get("/test", (req, res) => {
    (0, websocket_utils_1.broadcastSevereAlert)("🚨 Test Severe Weather Alert: Thunderstorm Incoming!");
    res
        .status(200)
        .json({ message: "Test severe weather alert sent via WebSocket" });
});
exports.default = router;
