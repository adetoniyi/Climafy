import express from "express";
import * as alertController from "../controllers/alert.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { broadcastSevereAlert } from "../utils/websocket.utils";

const router = express.Router();

function asyncHandler(
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => any
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
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
router.post("/", asyncHandler(authenticate), alertController.createAlert);

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
router.get("/", asyncHandler(authenticate), alertController.getAlerts);

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
router.delete(
  "/:id",
  asyncHandler(authenticate),
  asyncHandler(alertController.deleteAlert)
);

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
  broadcastSevereAlert("🚨 Test Severe Weather Alert: Thunderstorm Incoming!");
  res
    .status(200)
    .json({ message: "Test severe weather alert sent via WebSocket" });
});

export default router;
