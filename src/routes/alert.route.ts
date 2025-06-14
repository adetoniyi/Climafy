import { Router } from "express";
import {
  createAlert,
  getUserAlerts,
  deleteAlert,
} from "../controllers/alert.controller";
import authenticate from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Alert
 *   description: Weather Alert Management
 */

/**
 * @swagger
 * /alert:
 *   post:
 *     summary: Create a custom weather alert
 *     tags: [Alert]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - condition
 *               - threshold
 *               - locationId
 *             properties:
 *               condition:
 *                 type: string
 *               threshold:
 *                 type: number
 *               locationId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Alert created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", authenticate, createAlert);

/**
 * @swagger
 * /alert:
 *   get:
 *     summary: Get all user alerts
 *     tags: [Alert]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of alerts
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getUserAlerts);

/**
 * @swagger
 * /alert/{id}:
 *   delete:
 *     summary: Delete a custom alert
 *     tags: [Alert]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Alert ID
 *     responses:
 *       200:
 *         description: Alert deleted successfully
 *       404:
 *         description: Alert not found
 */
router.delete("/:id", authenticate, deleteAlert);

export default router;
